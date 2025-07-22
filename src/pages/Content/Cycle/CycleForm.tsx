import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/cycle/ui/card";
import { Button } from "@/components/cycle/ui/button";
import { Input } from "@/components/cycle/ui/input";
import { Label } from "@/components/cycle/ui/label";
import { Textarea } from "@/components/cycle/ui/textarea";
import { Checkbox } from "@/components/cycle/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/cycle/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/cycle/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/cycle/ui/dropdown-menu";
import {
  BarChart3,
  Edit,
  Eye,
  Trash2,
  MoreHorizontal,
  Plus,
  Save,
  Clock,
  Filter,
  Search,
  Hospital,
  Stethoscope,
  Users,
  CalendarDays,
  TrendingUp,
  Bell,
  Cross,
  Shield,
  Activity,
} from "lucide-react";
// ---------- HÀM TÍNH TRẠNG THÁI FE ----------

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
  mood?: number;
  libido?: number;
  stress?: number;
  sleep_hours?: number;
  energy?: number;
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
const moodOptions = [
  { value: 1, label: "Very bad" },
  { value: 2, label: "Bad" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Good" },
  { value: 5, label: "Very good" }
];

const libidoOptions = [
  { value: 1, label: "Very low" },
  { value: 2, label: "Low" },
  { value: 3, label: "Normal" },
  { value: 4, label: "High" },
  { value: 5, label: "Very high" }
];

const stressOptions = [
  { value: 1, label: "Very low" },
  { value: 2, label: "Low" },
  { value: 3, label: "Normal" },
  { value: 4, label: "High" },
  { value: 5, label: "Very high" }
];

const energyOptions = [
  { value: 1, label: "Very low" },
  { value: 2, label: "Low" },
  { value: 3, label: "Normal" },
  { value: 4, label: "High" },
  { value: 5, label: "Very high" }
];
// ---- INTERFACES ----
interface CycleRecord {
  id: string;
  user_id: string;
  user_name?: string;
  last_period_date: string;
  cycle_length: number;
  period_length: number;
  note: string;
  remind_ovulation: boolean;
  remind_period: boolean;
  created_at: string;
  updated_at: string;
  mood?: number;
  libido?: number;
  stress?: number;
  sleep_hours?: number;
  energy?: number;
}

interface PredictionResult {
  id: string;
  user_id: string;
  cycle_id: string;
  next_period_date: string;
  ovulation_date: string;
  fertile_window_start: string;
  fertile_window_end: string;
  created_at: string;
  pregnancy_risk?: string; 
}
// ---- MAIN COMPONENT ----
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
  const [formData, setFormData] = useState<{
    user_name: string;
    cycle_length: string;
    last_period_date: string;
    note: string;
    period_length: string;
    remind_ovulation: boolean;
    remind_period: boolean;
    mood: number | null;
    libido: number | null;
    stress: number | null;
    sleep_hours: number | null;
    energy: number | null;
  }>({
    user_name: "",
    cycle_length: "28",
    last_period_date: "",
    note: "",
    period_length: "5",
    remind_ovulation: true,
    remind_period: true,
    mood: null,          
    libido: null,        
    stress: null,        
    sleep_hours: null,   
    energy: null
  });
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);

  // LẤY TOÀN BỘ CYCLE RECORDS TỪ BE
  useEffect(() => {
    fetchRecords();
  }, []);

  useEffect(() => {
    filterRecords();
  }, [searchTerm, records]);

  const fetchRecords = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      const res = await axios.get<{ cycles: CycleRecord[] }>("http://localhost:3000/cycle/admin/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecords(res.data.cycles);
    } catch (err) {
      alert("We can't find your profile!");
    } finally {
      setIsLoading(false);
    }
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

  // ---- CRUD HANDLERS ----
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const resetForm = () => {
    setFormData({
      user_name: "",
      cycle_length: "28",
      last_period_date: "",
      note: "",
      period_length: "5",
      remind_ovulation: true,
      remind_period: true,
      mood: null,          
      libido: null,        
      stress: null,       
      sleep_hours: null,   
      energy: null
    });
  };

  // TẠO RECORD
  const handleCreate = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      await axios.post(
        "http://localhost:3000/cycle",
        {
          ...formData,
          cycle_length: parseInt(formData.cycle_length),
          period_length: parseInt(formData.period_length),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setShowCreateDialog(false);
      resetForm();
      fetchRecords();
    } catch (err) {
      alert("Lỗi khi thêm mới!");
    } finally {
      setIsLoading(false);
    }
  };

  // SỬA RECORD
  const handleEdit = async () => {
    if (!selectedRecord) return;
    setIsLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      await axios.put(
        `http://localhost:3000/cycle/${selectedRecord.id}`,
        {
          last_period_date: formData.last_period_date,
          cycle_length: parseInt(formData.cycle_length),
          period_length: parseInt(formData.period_length),
          note: formData.note,
          remind_ovulation: formData.remind_ovulation,
          remind_period: formData.remind_period,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setShowEditDialog(false);
      setSelectedRecord(null);
      resetForm();
      // Sau khi update, reload lại list và nếu muốn hiện dialog chi tiết thì gọi lại openViewDialog
      fetchRecords();
      // Nếu bạn muốn show luôn prediction mới thì:
      // openViewDialog(selectedRecord);
    } catch (err) {
      alert("Lỗi khi cập nhật!");
    } finally {
      setIsLoading(false);
    }
  };
  // XOÁ RECORD
  const handleDelete = async () => {
    if (!selectedRecord) return;
    setIsLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      await axios.delete(`http://localhost:3000/cycle/${selectedRecord.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowDeleteDialog(false);
      setSelectedRecord(null);
      fetchRecords();
    } catch (err) {
      alert("Lỗi khi xoá!");
    } finally {
      setIsLoading(false);
    }
  };

  // ---- DIALOG ----
  const openEditDialog = (record: CycleRecord) => {
    setSelectedRecord(record);
    setFormData({
      user_name: record.user_name ?? "",
      cycle_length: record.cycle_length.toString(),
      last_period_date: record.last_period_date,
      note: record.note,
      period_length: record.period_length.toString(),
      remind_ovulation: record.remind_ovulation,
      remind_period: record.remind_period,
      mood: record.mood ?? null,
      libido: record.libido ?? null,
      stress: record.stress ?? null,
      sleep_hours: record.sleep_hours ?? null,
      energy: record.energy ?? null,
    });
    setShowEditDialog(true);
  };

  const openViewDialog = async (record: CycleRecord) => {
    setSelectedRecord(record);
    const cycleDay = getCycleDay(record.last_period_date, record.cycle_length);
    const phase = getCyclePhase(cycleDay);
    const statusResult = predictStatus(phase, record as any);

    setStatusPredict({
      ...statusResult,
      cycleDay,
    });

    setShowViewDialog(true);
    setPrediction(null);

    try {
      const token = localStorage.getItem("access_token");
      const res = await axios.get<{ prediction: PredictionResult }>(
        `http://localhost:3000/cycle/predict/${record.user_id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPrediction(res.data.prediction);
    } catch (err) {
      setPrediction(null);
    }
  
    
    setShowViewDialog(true);
    setPrediction(null);
    // CALL API PREDICTION USER CỤ THỂ
    try {
      const token = localStorage.getItem("access_token");
      // Dùng đúng path của bạn. Thường BE bạn sẽ là GET /cycle/predict/:user_id hoặc query GET /cycle/predict?user_id=...
      const res = await axios.get<{ prediction: PredictionResult }>(
        `http://localhost:3000/cycle/predict/${record.user_id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPrediction(res.data.prediction);
    } catch (err) {
      setPrediction(null);
    }
  };

  const openDeleteDialog = (record: CycleRecord) => {
    setSelectedRecord(record);
    setShowDeleteDialog(true);
  };

  // ---- FORMAT ----
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  const formatDateTime = (dateString: string): string => {
    return new Date(dateString).toLocaleString("vi-VN");
  };

  // ---- UI ----
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
     
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ...Dashboard Cards ... */}
        {/* Data Table */}
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
            {/* Search & Filter */}
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
            {/* Table */}
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
                                onClick={() => openViewDialog(record)}
                                className="rounded-lg px-4 py-3 text-sm font-medium hover:bg-blue-50 cursor-pointer"
                              >
                                <Eye className="h-4 w-4 mr-3 text-blue-600" />
                                Xem hồ sơ chi tiết
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => openEditDialog(record)}
                                className="rounded-lg px-4 py-3 text-sm font-medium hover:bg-indigo-50 cursor-pointer"
                              >
                                <Edit className="h-4 w-4 mr-3 text-indigo-600" />
                                Chỉnh sửa hồ sơ
                              </DropdownMenuItem>
                              <div className="my-1 h-px bg-red-200"></div>
                              <DropdownMenuItem
                                onClick={() => openDeleteDialog(record)}
                                className="rounded-lg px-4 py-3 text-sm font-medium hover:bg-red-50 cursor-pointer text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-3" />
                                Xóa hồ sơ
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

      {/* CREATE DIALOG */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-3xl border-2 border-cyan-200 shadow-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader className="border-b border-blue-100 pb-4">
            <DialogTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                <Plus className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-800">Create New Medical Profile</h3>
                <p className="text-sm text-blue-600 font-medium">Input Patient Information</p>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="user_name">Name*</Label>
              <Input
                id="user_name"
                name="user_name"
                value={formData.user_name}
                onChange={handleInputChange}
                placeholder="Nhập tên người dùng"
                required
              />
            </div>
            <div>
              <Label htmlFor="last_period_date">First day of menstruations*</Label>
              <Input
                id="last_period_date"
                name="last_period_date"
                type="date"
                value={formData.last_period_date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cycle_length">Menstrual Cycle (days)</Label>
                <Input
                  id="cycle_length"
                  name="cycle_length"
                  type="number"
                  min="21"
                  max="35"
                  value={formData.cycle_length}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="period_length">Period Duration (days)</Label>
                <Input
                  id="period_length"
                  name="period_length"
                  type="number"
                  min="3"
                  max="7"
                  value={formData.period_length}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="note">Noted</Label>
              <Textarea
                id="note"
                name="note"
                value={formData.note}
                onChange={handleInputChange}
                placeholder="Nhập ghi chú..."
              />
            </div>
            <div>
              <Label className="font-medium">Your Feeling Today</Label>
              <div className="flex gap-2 mt-2">
                {moodOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, mood: opt.value }))}
                    className={`px-3 py-2 rounded-lg border ${formData.mood === opt.value ? "bg-pink-200 border-pink-500 font-bold" : "bg-white border-gray-300"}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Libido */}
            <div>
              <Label className="font-medium">Libido's Today</Label>
              <div className="flex gap-2 mt-2">
                {libidoOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, libido: opt.value }))}
                    className={`px-3 py-2 rounded-lg border ${formData.libido === opt.value ? "bg-purple-200 border-purple-500 font-bold" : "bg-white border-gray-300"}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Stress */}
            <div>
              <Label className="font-medium">Stress</Label>
              <div className="flex gap-2 mt-2">
                {stressOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, stress: opt.value }))}
                    className={`px-3 py-2 rounded-lg border ${formData.stress === opt.value ? "bg-indigo-200 border-indigo-500 font-bold" : "bg-white border-gray-300"}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sleep hours */}
            <div>
              <Label className="font-medium">Time of Sleep</Label>
              <Input
                type="number"
                min="0"
                max="24"
                step="0.5"
                value={formData.sleep_hours ?? ""}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  sleep_hours: e.target.value === "" ? null : parseFloat(e.target.value)
                }))}
                placeholder="Ví dụ: 7.5"
                className="mt-2 w-32"
              />
            </div>

            {/* Energy */}
            <div>
              <Label className="font-medium">Energy</Label>
              <div className="flex gap-2 mt-2">
                {energyOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, energy: opt.value }))}
                    className={`px-3 py-2 rounded-lg border ${formData.energy === opt.value ? "bg-teal-200 border-teal-500 font-bold" : "bg-white border-gray-300"}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remind_ovulation"
                  checked={formData.remind_ovulation}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      remind_ovulation: checked as boolean,
                    }))
                  }
                />
                <Label htmlFor="remind_ovulation">Ovulation Reminder</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remind_period"
                  checked={formData.remind_period}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      remind_period: checked as boolean,
                    }))
                  }
                />
                <Label htmlFor="remind_period">Next Cycle Reminder</Label>
              </div>
            </div>
            <div className="flex justify-end space-x-4 pt-6 border-t border-blue-100">
              <Button
                variant="outline"
                onClick={() => setShowCreateDialog(false)}
                className="px-6 py-3 border-2 border-slate-300 text-slate-600"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreate}
                disabled={isLoading}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white"
              >
                {isLoading ? (
                  <>
                    <Clock className="h-5 w-5 mr-2 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5 mr-2" />
                      <span> Save Record</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* EDIT DIALOG */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-lg border-2 border-indigo-200 shadow-2xl">
          <DialogHeader className="border-b border-indigo-100 pb-4">
            <DialogTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl">
                <Edit className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-indigo-800">
                  Edit Medical Record
                </h3>
                <p className="text-sm text-indigo-600 font-medium">
                  Update Cycle Information
                </p>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* KHÔNG có input tên người dùng ở đây */}
            <div>
              <Label htmlFor="edit_last_period_date">First Day of Menstruation*</Label>
              <Input
                id="edit_last_period_date"
                name="last_period_date"
                type="date"
                value={formData.last_period_date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit_cycle_length">Cycle Length (days)</Label>
                <Input
                  id="edit_cycle_length"
                  name="cycle_length"
                  type="number"
                  min="21"
                  max="35"
                  value={formData.cycle_length}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="edit_period_length">Period Duration (days)</Label>
                <Input
                  id="edit_period_length"
                  name="period_length"
                  type="number"
                  min="3"
                  max="7"
                  value={formData.period_length}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit_note">Noted</Label>
              <Textarea
                id="edit_note"
                name="note"
                value={formData.note}
                onChange={handleInputChange}
                placeholder="Nhập ghi chú..."
              />
            </div>
            {/* ...nhắc nhở nếu cần... */}
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                Cancle
              </Button>
              <Button onClick={handleEdit} disabled={isLoading}>
                {isLoading ? (
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Update
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* VIEW DIALOG: Prediction! */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="max-w-3xl border-2 border-cyan-200 shadow-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader className="border-b border-cyan-100 pb-4">
            <DialogTitle className="flex items-center gap-3 text-xl">
              <div className="p-3 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-cyan-800">
                  Medical Record Details
                </h3>
                <p className="text-sm text-cyan-600 font-medium">
                  Complete Patient Information
                </p>
              </div>
            </DialogTitle>
          </DialogHeader>
          {selectedRecord && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">ID</Label>
                  <p className="font-mono text-sm">{selectedRecord.id}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Username</Label>
                  <p className="font-medium">{selectedRecord.user_name}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Menstruation Date</Label>
                  <p>{formatDate(selectedRecord.last_period_date)}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Cycle Length</Label>
                  <p>{selectedRecord.cycle_length} day</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Period Duration</Label>
                  <p>{selectedRecord.period_length} day</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Reminders</Label>
                  <div className="flex space-x-2">
                    {selectedRecord.remind_ovulation && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                        Rụng trứng
                      </span>
                    )}
                    {selectedRecord.remind_period && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-pink-100 text-pink-800">
                        Chu kỳ
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Ghi chú</Label>
                <p className="text-sm bg-gray-50 p-3 rounded-md">
                  {selectedRecord.note}
                </p>
              </div>
              {(selectedRecord.mood || selectedRecord.libido || selectedRecord.stress || selectedRecord.sleep_hours || selectedRecord.energy) && (
                <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-2xl border-2 border-pink-200 shadow-lg">
                  <div className="font-bold text-pink-700 mb-4 flex items-center gap-2">
                    <Activity className="h-5 w-5 text-pink-600" />
                    📊 Today's Tracking
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {selectedRecord.mood !== undefined && (
                      <div className="bg-white p-3 rounded-lg shadow-md">
                        <span className="text-pink-600 font-medium">Mood:</span>
                        <div className="font-bold text-pink-700">{selectedRecord.mood}/5</div>
                      </div>
                    )}
                    {selectedRecord.libido !== undefined && (
                      <div className="bg-white p-3 rounded-lg shadow-md">
                        <span className="text-purple-600 font-medium">Libido:</span>
                        <div className="font-bold text-purple-700">{selectedRecord.libido}/5</div>
                      </div>
                    )}
                    {selectedRecord.stress !== undefined && (
                      <div className="bg-white p-3 rounded-lg shadow-md">
                        <span className="text-indigo-600 font-medium">Stress:</span>
                        <div className="font-bold text-indigo-700">{selectedRecord.stress}/5</div>
                      </div>
                    )}
                    {selectedRecord.sleep_hours !== undefined && (
                      <div className="bg-white p-3 rounded-lg shadow-md">
                        <span className="text-cyan-600 font-medium">Sleep Hours:</span>
                        <div className="font-bold text-cyan-700">{selectedRecord.sleep_hours}h</div>
                      </div>
                    )}
                    {selectedRecord.energy !== undefined && (
                      <div className="bg-white p-3 rounded-lg shadow-md">
                        <span className="text-teal-600 font-medium">Energy:</span>
                        <div className="font-bold text-teal-700">{selectedRecord.energy}/5</div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* KẾT QUẢ PREDICTION */}
              {statusPredict && (
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl border-2 border-yellow-200 shadow-lg mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-5 w-5 text-yellow-500" />
                    <span className="font-bold text-yellow-700 text-lg">
                      Trạng thái tổng thể hôm nay
                    </span>
                  </div>
                  <div className={`text-lg font-bold mb-2 ${statusPredict.status === "Not positive"
                    ? "text-red-500"
                    : statusPredict.status === "Need attention"
                      ? "text-orange-500"
                      : "text-green-600"
                    }`}>
                    {statusPredict.status === "Normal" ? "Bình thường" :
                      statusPredict.status === "Need attention" ? "Cần lưu ý" :
                        statusPredict.status === "Not positive" ? "Không tích cực" :
                          statusPredict.status
                    }
                  </div>
                  <div className="text-base text-gray-800 mb-1">
                    <span className="font-medium">Giai đoạn chu kỳ:</span>{" "}
                    <span className="italic">{statusPredict.phase === "menstrual" ? "Kinh nguyệt"
                      : statusPredict.phase === "follicular" ? "Nang noãn"
                        : statusPredict.phase === "ovulation" ? "Rụng trứng"
                          : "Hoàng thể (PMS)"}</span>
                    {statusPredict.cycleDay && (
                      <span className="ml-2 text-sm text-gray-500">(Ngày {statusPredict.cycleDay})</span>
                    )}
                  </div>
                  {statusPredict.notes && statusPredict.notes.length > 0 && (
                    <ul className="mt-2 list-disc pl-5 text-gray-700 space-y-1">
                      {statusPredict.notes.map((note: string, idx: number) => (
                        <li key={idx}>{note}</li>
                      ))}
                    </ul>
                  )}
                  {(!statusPredict.notes || statusPredict.notes.length === 0) && (
                    <div className="text-green-600">You dont have any problem today!</div>
                  )}
                </div>
              )}
              {prediction && (
                <div className="bg-pink-50 rounded-lg p-4 border border-pink-200 flex flex-col gap-3">
                  <div className="font-bold text-pink-700 mb-2">Cycle Prediction Results</div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs font-semibold text-gray-500">Next Period Date</Label>
                      <div className="font-semibold text-cyan-800">{formatDate(prediction.next_period_date)}</div>
                    </div>
                    <div>
                      <Label className="text-xs font-semibold text-gray-500">Ovulation Date</Label>
                      <div className="font-semibold text-blue-700">{formatDate(prediction.ovulation_date)}</div>
                    </div>
                    <div>
                      <Label className="text-xs font-semibold text-gray-500">Fertile Window Start</Label>
                      <div className="font-semibold text-green-700">{formatDate(prediction.fertile_window_start)}</div>
                    </div>
                    <div>
                      <Label className="text-xs font-semibold text-gray-500">Fertile Window End</Label>
                      <div className="font-semibold text-green-700">{formatDate(prediction.fertile_window_end)}</div>
                    </div>
                    <div>
                      <Label className="text-xs font-semibold text-gray-500">Pregnancy Risk</Label>
                      <div
                        className={
                          "font-bold " +
                          (prediction.pregnancy_risk === "CAO"
                            ? "text-red-500"
                            : prediction.pregnancy_risk === "TRUNG_BÌNH"
                              ? "text-orange-500"
                              : "text-green-600")
                        }
                      >
                        {prediction.pregnancy_risk
                          ? prediction.pregnancy_risk
                            .replace("CAO", "HIGH")
                            .replace("TRUNG_BÌNH", "MEDIUM")
                            .replace("THẤP", "LOW")
                          : ""}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          </DialogContent>
      </Dialog>

      {/* DELETE DIALOG */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="max-w-lg border-2 border-red-200 shadow-2xl">
          <DialogHeader className="border-b border-red-100 pb-4">
            <DialogTitle className="flex items-center gap-3 text-xl text-red-700">
              <div className="p-2 bg-gradient-to-br from-red-500 to-red-600 rounded-xl">
                <Trash2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Confirm Record Deletion</h3>
                <p className="text-sm text-red-600 font-medium">This action cannot be undone.</p>
              </div>
            </DialogTitle>
            <DialogDescription className="text-slate-600 mt-2 text-base">
              Are you sure you want to delete this medical record? All related data will be permanently lost.
            </DialogDescription>
          </DialogHeader>
          {selectedRecord && (
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <p className="text-sm font-medium">The following record will be deleted:</p>
                <p className="text-sm text-muted-foreground">
                  ID: {selectedRecord.id} - {selectedRecord.user_name}
                </p>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                  Cancle
                </Button>
                <Button variant="destructive" onClick={handleDelete} disabled={isLoading}>
                  {isLoading ? (
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4 mr-2" />
                  )}
                  Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
