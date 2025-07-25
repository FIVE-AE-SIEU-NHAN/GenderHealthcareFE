import React, { useState } from 'react'
import axios from 'axios'
import { format } from 'date-fns'
import { RotateCcw, Heart, Flower2 } from 'lucide-react'
import { CycleData, DailyRating, CycleFormData } from '@/types/cycle'
import CycleForm from '@/components/CycleTracking/CycleForm'
import CycleCalendar from '@/components/CycleTracking/CycleCalendar'
import CycleSummary from '@/components/CycleTracking/CycleSummary'
import { Button } from '@/components/ui/button'


interface CycleResult {
  id: string;
  user_id: string;
  start_period_date: string;
  cycle_length: number;
  period_length: number;
  note: string;
  created_at: string;
}
interface PredictionResult {
  next_period_date: string;
  ovulation_date: string;
  fertile_window_start: string;
  fertile_window_end: string;
  pregnancy_risk: "CAO" | "TRUNG_BÌNH" | "THẤP";
}

export default function CycleTrackingPage() {
  const [cycleData, setCycleData] = useState<CycleData | null>(null)
  const [ratings, setRatings] = useState<Map<string, DailyRating>>(new Map())
  const [cycleResult, setCycleResult] = useState<CycleResult | null>(null)
  const [predictions, setPredictions] = useState<PredictionResult | null>(null)
  const [statusPredict, setStatusPredict] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const handleFormSubmit = async (formData: CycleFormData) => {
    setIsLoading(true)
    try {
      const body = {
        start_period_date: formData.firstPeriodDate,
        cycle_length: Number(formData.cycleLength),
        period_length: Number(formData.periodDuration),
        note: "",
        mood: formData.mood,
        libido: formData.libido,
        stress: formData.stress,
        sleep_hours: formData.sleep,
        energy: formData.energy
      }
      const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null
      const response = await axios.post(
        "http://localhost:3000/cycle",
        body,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setCycleResult(response.data.result)
      setPredictions(response.data.prediction)
      setStatusPredict(response.data.statusPredict)

      setCycleData({
        firstPeriodDate: new Date(response.data.result.start_period_date),
        cycleLength: response.data.result.cycle_length,
        periodDuration: response.data.result.period_length,
        initialRating: {
          mood: formData.mood,
          libido: formData.libido,
          stress: formData.stress,
          sleep: formData.sleep,
          energy: formData.energy
        }
      })
      const firstDateKey = format(new Date(formData.firstPeriodDate), 'yyyy-MM-dd')
      setRatings(new Map([[firstDateKey, {
        mood: formData.mood,
        libido: formData.libido,
        stress: formData.stress,
        sleep: formData.sleep,
        energy: formData.energy
      }]]))
      setShowResult(true)
    } catch (error) {
      alert('Lỗi khi gửi thông tin chu kỳ. Vui lòng thử lại.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateRating = (dateKey: string, rating: DailyRating) => {
    setRatings((prev) => new Map(prev.set(dateKey, rating)))
  }

  const handleReset = () => {
    setCycleData(null)
    setRatings(new Map())
    setCycleResult(null)
    setPredictions(null)
    setShowResult(false)
  }

  return (
    <div>
      {!cycleData ? (
        <div className='min-h-[calc(100vh-72px)] bg-gradient-to-br from-violet-50 via-pink-50 to-rose-50'>
         
          <div className='relative z-10 container mx-auto px-4 py-12'>
            <div className='mx-auto max-w-5xl space-y-12'>
           
              <CycleForm onSubmit={handleFormSubmit}  />
       
              {showResult && predictions && cycleResult && (
                <div className="mt-10 bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
                  <h2 className="text-2xl font-bold mb-4 text-blue-600">Kết quả dự đoán chu kỳ</h2>
                  <div className="flex flex-wrap gap-8">
                    <div>
                      <div className="font-bold text-gray-700">Chu kỳ:</div>
                      <div>{cycleResult.cycle_length} ngày</div>
                      <div className="font-bold text-gray-700 mt-2">Kinh tiếp theo:</div>
                      <div>{format(new Date(predictions.next_period_date), "dd/MM/yyyy")}</div>
                      <div className="font-bold text-gray-700 mt-2">Rụng trứng:</div>
                      <div>{format(new Date(predictions.ovulation_date), "dd/MM/yyyy")}</div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-700">Cửa sổ thụ thai:</div>
                      <div>{format(new Date(predictions.fertile_window_start), "dd/MM")} - {format(new Date(predictions.fertile_window_end), "dd/MM")}</div>
                      <div className="font-bold text-gray-700 mt-2">Nguy cơ mang thai:</div>
                      <div>{predictions.pregnancy_risk}</div>
                    </div>
                  </div>
                  <button
                    className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold"
                    onClick={() => setShowResult(false)}
                  >Đóng</button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className='min-h-[calc(100vh-72px)] bg-slate-100'>
          <div className='relative z-10 container mx-auto px-4 py-8'>
            <div className='space-y-8'>
              <div className='space-y-6 text-center'>
                {/* Header */}
                <Button onClick={handleReset}
                  variant='outline'
                  className='group rounded-full border-white/20 bg-white/80 px-6 py-3 shadow-lg backdrop-blur-sm hover:bg-white/90'
                >
                  <RotateCcw className='mr-2 h-4 w-4 transition-transform duration-500 group-hover:rotate-180' />
                  Reset cycle setup
                </Button>
              </div>
             
                {cycleData && cycleResult && (
                  <>
                    <CycleSummary cycleData={cycleData} />
                    <CycleCalendar
                      cycleData={cycleData}
                      ratings={ratings}
                      onUpdateRating={handleUpdateRating}
                      cycleId={cycleResult.id}
                    />
                  </>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
