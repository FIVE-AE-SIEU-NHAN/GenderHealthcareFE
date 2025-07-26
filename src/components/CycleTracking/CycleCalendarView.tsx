import React, { useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import { format, addMonths, subMonths, startOfDay } from 'date-fns'
import { ChevronLeft, ChevronRight, Sparkles, Calendar, Heart, Droplet, Flower2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

import { JSX } from 'react/jsx-runtime'
import CycleFormView from '@/components/CycleTracking/CycleFormView'
// ------ TYPES ------
type DayType = 'period' | 'fertile' | 'ovulation' | 'normal'

interface PredictionResult {
    next_period_date: string
    ovulation_date: string
    fertile_window_start: string
    fertile_window_end: string
    pregnancy_risk?: string
}
interface CycleLog {
    log_date: string
    mood?: number
    libido?: number
    stress?: number
    sleep_hours?: number
    energy?: number
    status?: 'NORMAL' | 'NEED_ATTENTION' | 'NOT_POSITIVE' | null
}
interface CycleInfo {
    cycle_length: number
    period_length: number
    note?: string
    user_name?: string
    start_period_date?: string
}
interface Props {
    cycleId: string
}

// ------ CONSTANTS ------
const dayTypeStyles: Record<DayType, string> = {
    period: 'bg-rose-200 text-rose-800 shadow-sm hover:shadow-md hover:bg-rose-300 border border-rose-300',
    fertile: 'bg-emerald-200 text-emerald-800 shadow-sm hover:shadow-md hover:bg-emerald-300 border border-emerald-300',
    ovulation: 'bg-violet-200 text-violet-800 shadow-sm hover:shadow-md hover:bg-violet-300 border border-violet-300',
    normal: 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm'
}
const dayTypeNames: Record<DayType, string> = {
    period: 'Period',
    fertile: 'Fertile window',
    ovulation: 'Ovulation',
    normal: 'Normal'
}
const dayTypeIcons: Record<DayType, React.ElementType | null> = {
    period: Droplet,
    fertile: Heart,
    ovulation: Flower2,
    normal: null
}
const dayTypeLegendStyles: Record<DayType, string> = {
    period: 'bg-rose-300 text-rose-800',
    fertile: 'bg-emerald-300 text-emerald-800',
    ovulation: 'bg-violet-300 text-violet-800',
    normal: 'bg-slate-300 text-slate-800'
}
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const weekDaysShort = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

function getDayType(
    date: Date,
    prediction: PredictionResult | null,
    cycle_length: number,
    period_length: number
): DayType {
    if (!prediction) return 'normal'
    const d = new Date(format(date, "yyyy-MM-dd"))
    const startPeriod = new Date(prediction.next_period_date)
    startPeriod.setDate(startPeriod.getDate() - (cycle_length ?? 28))
    const periodEnd = new Date(startPeriod)
    periodEnd.setDate(periodEnd.getDate() + (period_length ?? 5) - 1)
    const ovulation = new Date(prediction.ovulation_date)
    const fertileStart = new Date(prediction.fertile_window_start)
    const fertileEnd = new Date(prediction.fertile_window_end)
    if (d >= startPeriod && d <= periodEnd) return "period"
    if (d.getTime() === ovulation.getTime()) return "ovulation"
    if (d >= fertileStart && d <= fertileEnd) return "fertile"
    return "normal"
}

const CycleCalendarView: React.FC<Props> = ({ cycleId }) => {
    const [prediction, setPrediction] = useState<PredictionResult | null>(null)
    const [logs, setLogs] = useState<CycleLog[]>([])
    const [cycleInfo, setCycleInfo] = useState<CycleInfo | null>(null)
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date())
    const [showLogForm, setShowLogForm] = useState(false)
    const [formInitial, setFormInitial] = useState<any | undefined>(undefined)
    const [formDate, setFormDate] = useState<string | undefined>(undefined)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // --- Fetch Data ---
    const fetchData = () => {
        if (!cycleId) return
        setLoading(true)
        setError(null)
        const token = localStorage.getItem("access_token")
        Promise.all([
            axios.get<{ prediction: PredictionResult }>(`http://localhost:3000/prediction/cycle/${cycleId}`, { headers: { Authorization: `Bearer ${token}` } }),
            axios.get<{ logs: CycleLog[] }>(`http://localhost:3000/cycle/${cycleId}/logs`, { headers: { Authorization: `Bearer ${token}` } }),
            axios.get<{ cycle: CycleInfo }>(`http://localhost:3000/cycle/${cycleId}`, { headers: { Authorization: `Bearer ${token}` } }),
        ])
            .then(([predRes, logRes, infoRes]) => {
                setPrediction(predRes.data.prediction)
                setLogs((logRes.data.logs || []).map(log => ({
                    ...log,
                    log_date: typeof log.log_date === 'string'
                        ? log.log_date.slice(0, 10) // Lấy đúng "yyyy-MM-dd"
                        : log.log_date
                })))
                if (infoRes.data && infoRes.data.cycle) {
                    setCycleInfo({
                        cycle_length: infoRes.data.cycle.cycle_length,
                        period_length: infoRes.data.cycle.period_length,
                        note: infoRes.data.cycle.note,
                        user_name: infoRes.data.cycle.user_name,
                        start_period_date: infoRes.data.cycle.start_period_date
                    });
                } else {
                    setCycleInfo(null);
                    setError('Không tìm thấy thông tin chu kỳ này.')
                }
            })
            .catch(e => {
                setError('Không lấy được dữ liệu.')
            })
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line
    }, [cycleId])

    // --- Create days for the month ---
    const days = useMemo(() => {
        const year = currentMonth.getFullYear()
        const monthIdx = currentMonth.getMonth()
        const firstDay = new Date(year, monthIdx, 1)
        const lastDay = new Date(year, monthIdx + 1, 0)
        let arr: Date[] = []
        for (let d = 1; d <= lastDay.getDate(); d++) {
            arr.push(new Date(year, monthIdx, d))
        }
        return arr
    }, [currentMonth])

    // Map logs by date string (yyyy-MM-dd)
    const logMap = useMemo<Record<string, CycleLog>>(() => {
        const m: Record<string, CycleLog> = {}
        for (const log of logs) m[log.log_date] = log
        return m
    }, [logs])

    const cycle_length = cycleInfo?.cycle_length ?? 28
    const period_length = cycleInfo?.period_length ?? 5

    // --- Khi click vào ngày ---
    const handleDayClick = (day: Date) => {
        const dateStr = format(day, "yyyy-MM-dd");
        const log = logMap[dateStr]
        setFormDate(dateStr);
        setFormInitial(log
            ? {
                mood: log.mood,
                libido: log.libido,
                stress: log.stress,
                sleep: log.sleep_hours,
                energy: log.energy
            }
            : undefined
        )
        setShowLogForm(true)
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            {/* --- BLOCK THÔNG TIN CHU KỲ & PREDICTION --- */}
            {(cycleInfo || prediction) && (
                <div className="mb-8 rounded-xl shadow-lg bg-white border border-blue-100 px-6 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                        <div className="text-lg font-bold text-blue-800 mb-2">Thông tin chu kỳ</div>
                        {cycleInfo?.user_name && <div className="text-slate-700"><b>Bệnh nhân:</b> {cycleInfo.user_name}</div>}
                        {cycleInfo?.start_period_date && <div className="text-slate-700"><b>Ngày bắt đầu kỳ:</b> {format(new Date(cycleInfo.start_period_date), "dd/MM/yyyy")}</div>}
                        <div className="text-slate-700"><b>Chu kỳ:</b> {cycle_length} ngày</div>
                        <div className="text-slate-700"><b>Thời gian hành kinh:</b> {period_length} ngày</div>
                        {cycleInfo?.note && <div className="text-slate-700"><b>Note:</b> {cycleInfo.note}</div>}
                    </div>
                    <div>
                        <div className="text-lg font-bold text-blue-800 mb-2">Dự đoán</div>
                        {prediction && (
                            <>
                                <div className="text-slate-700"><b>Kinh tiếp theo:</b> {format(new Date(prediction.next_period_date), "dd/MM/yyyy")}</div>
                                <div className="text-slate-700"><b>Rụng trứng:</b> {format(new Date(prediction.ovulation_date), "dd/MM/yyyy")}</div>
                                <div className="text-slate-700"><b>Cửa sổ thụ thai:</b> {format(new Date(prediction.fertile_window_start), "dd/MM")} - {format(new Date(prediction.fertile_window_end), "dd/MM")}</div>
                                <div className="text-slate-700"><b>Nguy cơ mang thai:</b> <span className="font-semibold text-pink-700">{prediction.pregnancy_risk}</span></div>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* --- CALENDAR --- */}
            <div className='overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl/20 mb-4'>
                <div className='bg-slate-800 p-6 text-white'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                            <div className='rounded-xl bg-white/10 p-3'>
                                <Calendar className='h-6 w-6' />
                            </div>
                            <div>
                                <h2 className='text-2xl font-bold'>Reproductive Cycle Calendar</h2>
                                <p className='text-sm text-purple-100'>Track logs for each day</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-3'>
                            <Button
                                variant='ghost'
                                size='sm'
                                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                                className='h-10 w-10 rounded-lg p-0 text-white hover:bg-white/10'
                            >
                                <ChevronLeft className='h-5 w-5' />
                            </Button>
                            <div className='rounded-lg bg-white/10 px-6 py-2'>
                                <span className='text-xl font-bold'>{format(currentMonth, 'MMMM yyyy')}</span>
                            </div>
                            <Button
                                variant='ghost'
                                size='sm'
                                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                                className='h-10 w-10 rounded-lg p-0 text-white hover:bg-white/10'
                            >
                                <ChevronRight className='h-5 w-5' />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className='space-y-8 p-6'>
                    {/* Legend */}
                    <div className='flex flex-wrap justify-center gap-6'>
                        {Object.entries(dayTypeNames).map(([type, name]) => {
                            const t = type as DayType
                            const Icon = dayTypeIcons[t]
                            return (
                                <div key={type} className='flex items-center gap-2'>
                                    <div
                                        className={`flex h-5 w-5 items-center justify-center rounded-lg ${dayTypeLegendStyles[t]} shadow-sm`}
                                    >
                                        {Icon && <Icon className='h-3 w-3' />}
                                    </div>
                                    <span className='text-sm font-medium text-slate-700'>{name}</span>
                                </div>
                            )
                        })}
                    </div>
                    {/* Calendar grid */}
                    <div className='space-y-4'>
                        {/* Header week */}
                        <div className='grid grid-cols-7 gap-3'>
                            {weekDaysShort.map((day, index) => (
                                <div key={day} className='text-center'>
                                    <div className='mb-1 text-xs font-medium text-slate-400'>{weekDays[index]}</div>
                                    <div className='text-lg font-bold text-slate-600'>{day}</div>
                                </div>
                            ))}
                        </div>
                        {/* Days */}
                        <div className='grid grid-cols-7 gap-3'>
                            {(() => {
                                const firstDate = days[0]
                                let res: JSX.Element[] = []
                                for (let i = 0; i < firstDate.getDay(); i++) res.push(<div key={'empty-' + i}></div>)
                                return res.concat(days.map(day => {
                                    const dateStr = format(day, "yyyy-MM-dd")
                                    const hasLog = !!logMap[dateStr]
                                    const dayType = getDayType(day, prediction, cycle_length, period_length)
                                    const Icon = dayTypeIcons[dayType]
                                    const isToday = startOfDay(day).getTime() === startOfDay(new Date()).getTime()
                                    return (
                                        <div key={dateStr}
                                            className={`
                        relative min-h-[60px] rounded-2xl text-sm font-medium flex flex-col items-center justify-center gap-1 
                        transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer
                        ${dayTypeStyles[dayType]}
                        ${isToday ? "ring-2 ring-blue-400 ring-offset-2" : ""}
                      `}
                                            onClick={() => handleDayClick(day)}
                                        >
                                            <span className={`text-lg font-bold ${isToday ? "text-blue-600" : ""}`}>{day.getDate()}</span>
                                            {Icon && <Icon className='mt-1 h-3 w-3 opacity-80' />}
                                            {hasLog &&
                                                <span className="absolute -top-1 -right-1">
                                                    <Sparkles className='h-4 w-4 text-green-500' />
                                                </span>
                                            }
                                        </div>
                                    )
                                }))
                            })()}
                        </div>
                    </div>
                    {/* Guide */}
                    <div className='rounded-xl border border-slate-200 bg-slate-50 p-6'>
                        <div className='space-y-3 text-center'>
                            <h3 className='flex items-center justify-center gap-2 text-lg font-semibold text-slate-800'>
                                <Sparkles className='h-5 w-5 text-slate-600' />
                                User Guide
                            </h3>
                            <p className='text-slate-600'>Bấm vào bất kỳ ngày nào để xem/ghi log cho ngày đó.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ---- FORM MODAL (FULL SCREEN) ---- */}
            {showLogForm && (
                <div className="fixed inset-0 z-[1000] bg-black/60 flex items-center justify-center">
                    <div className="w-full h-full bg-white flex flex-col overflow-y-auto relative">
                        <Button
                            className="absolute top-8 right-10 px-7 py-4 text-lg rounded-2xl shadow bg-slate-100 hover:bg-slate-200 z-20"
                            onClick={() => setShowLogForm(false)}
                        >
                            <X className="w-6 h-6 mr-2" /> Đóng
                        </Button>
                        <div className="w-full max-w-3xl mx-auto flex-1 flex flex-col justify-center py-16 px-2 sm:px-10">
                            <h2 className="text-3xl font-bold mb-10 text-blue-700 text-center">
                                {formDate ? `Nhật ký ngày ${format(new Date(formDate), "dd/MM/yyyy")}` : "Nhật ký"}
                            </h2>
                            <CycleFormView
                                initialData={formInitial}
                                onSubmit={async (data) => {
                                    if (!formDate) {
                                        alert("Không xác định được ngày cần lưu log!");
                                        return;
                                    }
                                    try {
                                        const token = localStorage.getItem("access_token")
                                        await axios.post(
                                            `http://localhost:3000/cycle/${cycleId}/logs`,
                                            {
                                                log_date: formDate, // <-- PHẢI TRUYỀN CHÍNH XÁC GIÁ TRỊ NÀY!
                                                mood: data.mood,
                                                libido: data.libido,
                                                stress: data.stress,
                                                sleep_hours: data.sleep,
                                                energy: data.energy
                                            },
                                            { headers: { Authorization: `Bearer ${token}` } }
                                        )
                                        await fetchData()
                                        setShowLogForm(false)
                                    } catch (err: any) {
                                        alert('Lưu log thất bại! ' + (err?.response?.data?.message || ""));
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
            {loading && <div className="text-blue-500 text-center mt-8">Đang tải dữ liệu...</div>}
            {error && <div className="text-red-500 text-center mt-8">{error}</div>}
        </div>
    )
}

export default CycleCalendarView
