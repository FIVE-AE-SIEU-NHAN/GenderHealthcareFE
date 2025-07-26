import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  BarChart3, Edit, Eye, Trash2, MoreHorizontal, Plus, Clock, Filter, Search, Hospital, CalendarDays
} from "lucide-react";
import CycleCalendarView from '@/components/CycleTracking/CycleCalendarView';

// ----- Helper functions & types -----
function getCycleDay(startDate: string, cycleLength = 28): number {
  const start = new Date(startDate);
  const today = new Date();
  const diffDays = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return (diffDays % cycleLength) + 1;
}
function getCyclePhase(day: number): string {
  if (day <= 5) return "menstrual";
  if (day <= 12) return "follicular";
  if (day <= 15) return "ovulation";
  return "luteal";
}
interface StatusInput {
  mood?: number; libido?: number; stress?: number; sleep_hours?: number; energy?: number;
}
function predictStatus(phase: string, data: StatusInput) {
  const notes: string[] = [];
  let status = "Normal";
  if (data.stress !== undefined && data.sleep_hours !== undefined && data.stress >= 4 && data.sleep_hours < 6) {
    notes.push("High stress and insufficient sleep may negatively affect your cycle.");
  }
  if (phase === "ovulation" && data.libido !== undefined && data.libido <= 2) {
    notes.push("Low libido during ovulation phase may indicate hormonal imbalance.");
  }
  if (phase === "luteal" && data.mood !== undefined && data.mood <= 2) {
    notes.push("Poor mood during PMS phase may be a sign of premenstrual syndrome.");
  }
  if (phase === "follicular" && data.energy !== undefined && data.energy <= 2) {
    notes.push("Poor mood during PMS phase may be a sign of premenstrual syndrome.");
  }
  if (notes.length >= 2) status = "Not positive";
  else if (notes.length === 1) status = "Need attention";
  return { status, notes, phase };
}
interface CycleRecord {
  id: string; user_id: string; user_name?: string; last_period_date: string;
  cycle_length: number; period_length: number; note: string;
  remind_ovulation: boolean; remind_period: boolean; created_at: string; updated_at: string;
  mood?: number; libido?: number; stress?: number; sleep_hours?: number; energy?: number;
}
interface PredictionResult {
  id: string; user_id: string; cycle_id: string; next_period_date: string; ovulation_date: string;
  fertile_window_start: string; fertile_window_end: string; created_at: string; pregnancy_risk?: string;
}

export default function AdminSafe() {
  const [records, setRecords] = useState<CycleRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<CycleRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<CycleRecord | null>(null);
  const [statusPredict, setStatusPredict] = useState<any | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // NEW: Hiển thị calendar view như một page riêng
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarRecord, setCalendarRecord] = useState<CycleRecord | null>(null);

  const [formData, setFormData] = useState({
    user_name: "", cycle_length: "28", last_period_date: "", note: "", period_length: "5",
    remind_ovulation: true, remind_period: true,
    mood: null as number | null, libido: null as number | null, stress: null as number | null,
    sleep_hours: null as number | null, energy: null as number | null
  });
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);

  useEffect(() => { fetchRecords(); }, []);
  useEffect(() => { filterRecords(); }, [searchTerm, records]);
  const fetchRecords = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      const res = await axios.get<{ cycles: CycleRecord[] }>("http://localhost:3000/cycle/admin/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecords(res.data.cycles);
    } catch (err) { alert("We can't find your profile!"); }
    finally { setIsLoading(false); }
  };
  const filterRecords = () => {
    if (!searchTerm) setFilteredRecords(records);
    else setFilteredRecords(records.filter(
      (record) =>
        (record.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
        record.note.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.id.includes(searchTerm)
    ));
  };

  const handleShowCalendar = (record: CycleRecord) => {
    setCalendarRecord(record);
    setShowCalendar(true);
  };

  // --- Các hàm CRUD, Dialog xóa, sửa, v.v... giữ nguyên không đổi ---
  // Bạn có thể chèn lại các Dialog (tạo/xoá/sửa hồ sơ) như trước đó nếu muốn.
  // Ở đây chỉ focus vào phần show Calendar

  // ---- FORMAT ----
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit", month: "2-digit", year: "numeric"
    });
  };
  const formatDateTime = (dateString: string): string => {
    return new Date(dateString).toLocaleString("vi-VN");
  };

  // ---- UI ----
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {!showCalendar ? (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="backdrop-blur-sm bg-white/95 border border-blue-200/50 shadow-xl mb-8">
            <CardHeader className="border-b border-blue-100/50 bg-gradient-to-r from-blue-50/50 to-cyan-50/50">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                    <Hospital className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-800">Quản lý hồ sơ y tế</h3>
                    <p className="text-sm text-blue-600 font-medium">Hệ thống theo dõi chu kỳ sinh sản</p>
                  </div>
                </span>
                <Button onClick={() => setShowCreateDialog(true)}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg border-0"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Tạo hồ sơ mới
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center space-x-6 mb-8">
                <div className="relative flex-1">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                    <Search className="text-blue-500 h-5 w-5" />
                  </div>
                  <Input
                    placeholder="Finding Patient Records, Note..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-4 py-3 text-base border-2 border-blue-200/50 focus:border-blue-400 rounded-xl bg-blue-50/30"
                  />
                </div>
                <Button variant="outline"
                  className="flex items-center gap-3 px-6 py-3 border-2 border-blue-300 text-blue-700"
                >
                  <Filter className="h-5 w-5" /> Bộ lọc nâng cao
                </Button>
                <Button variant="outline"
                  className="flex items-center gap-3 px-6 py-3 border-2 border-cyan-300 text-cyan-700"
                >
                  <BarChart3 className="h-5 w-5" /> Báo cáo
                </Button>
              </div>
              <div className="rounded-2xl border-2 border-blue-200/50 overflow-hidden shadow-lg bg-white/80">
                <Table>
                  <TableHeader className="bg-gradient-to-r from-blue-600 to-blue-700">
                    <TableRow>
                      <TableHead className="text-white font-bold py-4">Record ID</TableHead>
                      <TableHead className="text-white font-bold py-4">Patient</TableHead>
                      <TableHead className="text-white font-bold py-4">Menstrual Date</TableHead>
                      <TableHead className="text-white font-bold py-4">Cycle Length</TableHead>
                      <TableHead className="text-white font-bold py-4">Period Duration</TableHead>
                      <TableHead className="text-white font-bold py-4">Medical Notes</TableHead>
                      <TableHead className="text-white font-bold py-4">Tracking Info</TableHead>
                      <TableHead className="text-white font-bold py-4">Exam Date</TableHead>
                      <TableHead className="text-white font-bold py-4 text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRecords.map((record, index) => (
                      <TableRow key={record.id}
                        className={`hover:bg-blue-50/50 transition-all duration-200 ${index % 2 === 0 ? "bg-slate-50/30" : "bg-white/50"}`}
                      >
                        <TableCell className="font-mono text-sm font-bold text-blue-700 py-4">
                          {record.id}
                        </TableCell>
                        <TableCell className="font-mono text-sm font-bold text-blue-700 py-4">
                          {record.user_name}
                        </TableCell>
                        <TableCell className="font-medium text-slate-700 py-4">
                          {formatDate(record.last_period_date)}
                        </TableCell>
                        <TableCell className="py-4">
                          <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm font-semibold">
                            {record.cycle_length} day
                          </span>
                        </TableCell>
                        <TableCell className="py-4">
                          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold">
                            {record.period_length} day
                          </span>
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate py-4 text-slate-600">
                          {record.note}
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex flex-wrap gap-2">
                            {record.remind_ovulation && (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                                Ovulation
                              </span>
                            )}
                            {record.remind_period && (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                                Menstrual Cycle
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-slate-600 py-4">
                          {formatDateTime(record.created_at)}
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex items-center justify-center">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  className="h-10 w-10 p-0 rounded-full hover:bg-blue-100"
                                >
                                  <MoreHorizontal className="h-5 w-5 text-blue-600" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end"
                                className="w-56 p-2 border-2 border-blue-200/50 shadow-xl rounded-xl"
                              >
                                <DropdownMenuItem
                                // ... các menu khác ...
                                >
                                  <Eye className="h-4 w-4 mr-3 text-blue-600" />
                                  Xem hồ sơ chi tiết
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                // ... các menu khác ...
                                >
                                  <Edit className="h-4 w-4 mr-3 text-indigo-600" />
                                  Chỉnh sửa hồ sơ
                                </DropdownMenuItem>
                                <div className="my-1 h-px bg-red-200"></div>
                                <DropdownMenuItem
                                // ... các menu khác ...
                                >
                                  <Trash2 className="h-4 w-4 mr-3" />
                                  Xóa hồ sơ
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleShowCalendar(record)}
                                  className="rounded-lg px-4 py-3 text-sm font-medium hover:bg-rose-50 cursor-pointer text-rose-600"
                                >
                                  <CalendarDays className="h-4 w-4 mr-3 text-rose-500" />
                                  Xem lịch chu kỳ
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </main>
      ) : (
        <div className="max-w-6xl mx-auto py-8 px-4">
          <div className="mb-8 flex items-center gap-4">
            <Button
              onClick={() => setShowCalendar(false)}
              className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold px-5 py-2 rounded-xl shadow"
            >
              ← Quay lại danh sách hồ sơ
            </Button>
            <h2 className="text-2xl font-bold text-blue-800 flex items-center gap-3">
              <CalendarDays className="h-6 w-6 text-rose-500" />
              Lịch chu kỳ của {calendarRecord?.user_name}
            </h2>
          </div>
          {calendarRecord && <CycleCalendarView cycleId={calendarRecord.id} />}
        </div>
      )}
    </div>
  );
}
