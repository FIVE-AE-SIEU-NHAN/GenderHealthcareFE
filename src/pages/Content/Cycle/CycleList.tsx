import { useState } from "react";
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
  CalendarDays,
  Heart,
  Clock,
  Save,
  Bell,
  Pill,
  Baby,
  TrendingUp,
  BarChart3,
  Smile,
  Frown,
  Meh,
  HeartHandshake,
  Zap,
  Gauge,
  Brain,
  Activity,
} from "lucide-react";

interface CycleData {
  cycle_length: string;
  last_period_date: string;
  note: string;
  period_length: string;
  remind_ovulation: boolean;
  remind_period: boolean;
  birth_control_pill: boolean;
  pill_time: string;
  // New tracking fields
  mood: number | null; // Int 1-5
  libido: number | null; // Int 1-5
  stress: number | null; // Int 1-5
  sleep_hours: number | null; // Float hours
  energy: number | null; // Int 1-5
}

interface CycleResult {
  id: string;
  user_id: string;
  last_period_date: string;
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

export default function PeriodForm() {
  const [formData, setFormData] = useState<CycleData>({
    cycle_length: "28",
    last_period_date: "",
    note: "",
    period_length: "5",
    remind_ovulation: true,
    remind_period: true,
    birth_control_pill: false,
    pill_time: "09:00",
    // New tracking fields
    mood: null,
    libido: null,
    stress: null,
    sleep_hours: null,
    energy: null,
  });

  const [cycleResult, setCycleResult] = useState<CycleResult | null>(null);
  const [statusPredict, setStatusPredict] = useState<any | null>(null);
  const [predictions, setPredictions] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showChart, setShowChart] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  // Mood options with 1-5 scale
  const moodOptions = [
    {
      value: 1,
      label: "Rất tệ",
      icon: Frown,
      color: "text-red-500",
      bgColor: "bg-red-50 hover:bg-red-100",
    },
    {
      value: 2,
      label: "Tệ",
      icon: Meh,
      color: "text-orange-500",
      bgColor: "bg-orange-50 hover:bg-orange-100",
    },
    {
      value: 3,
      label: "Bình thường",
      icon: Meh,
      color: "text-gray-500",
      bgColor: "bg-gray-50 hover:bg-gray-100",
    },
    {
      value: 4,
      label: "Tốt",
      icon: Smile,
      color: "text-green-500",
      bgColor: "bg-green-50 hover:bg-green-100",
    },
    {
      value: 5,
      label: "Rất tốt",
      icon: HeartHandshake,
      color: "text-blue-500",
      bgColor: "bg-blue-50 hover:bg-blue-100",
    },
  ];

  // Libido options with 1-5 scale
  const libidoOptions = [
    {
      value: 1,
      label: "Rất thấp",
      icon: Heart,
      color: "text-red-500",
      bgColor: "bg-red-50 hover:bg-red-100",
    },
    {
      value: 2,
      label: "Thấp",
      icon: Heart,
      color: "text-orange-500",
      bgColor: "bg-orange-50 hover:bg-orange-100",
    },
    {
      value: 3,
      label: "Bình thường",
      icon: Heart,
      color: "text-gray-500",
      bgColor: "bg-gray-50 hover:bg-gray-100",
    },
    {
      value: 4,
      label: "Cao",
      icon: Heart,
      color: "text-green-500",
      bgColor: "bg-green-50 hover:bg-green-100",
    },
    {
      value: 5,
      label: "Rất cao",
      icon: Heart,
      color: "text-pink-500",
      bgColor: "bg-pink-50 hover:bg-pink-100",
    },
  ];

  // Stress options with 1-5 scale
  const stressOptions = [
    {
      value: 1,
      label: "Rất thấp",
      icon: HeartHandshake,
      color: "text-blue-500",
      bgColor: "bg-blue-50 hover:bg-blue-100",
    },
    {
      value: 2,
      label: "Thấp",
      icon: Smile,
      color: "text-green-500",
      bgColor: "bg-green-50 hover:bg-green-100",
    },
    {
      value: 3,
      label: "Bình thường",
      icon: Meh,
      color: "text-gray-500",
      bgColor: "bg-gray-50 hover:bg-gray-100",
    },
    {
      value: 4,
      label: "Cao",
      icon: Frown,
      color: "text-orange-500",
      bgColor: "bg-orange-50 hover:bg-orange-100",
    },
    {
      value: 5,
      label: "Rất cao",
      icon: Frown,
      color: "text-red-500",
      bgColor: "bg-red-50 hover:bg-red-100",
    },
  ];

  // Energy options with 1-5 scale
  const energyOptions = [
    {
      value: 1,
      label: "Rất thấp",
      icon: Gauge,
      color: "text-red-500",
      bgColor: "bg-red-50 hover:bg-red-100",
    },
    {
      value: 2,
      label: "Thấp",
      icon: Gauge,
      color: "text-orange-500",
      bgColor: "bg-orange-50 hover:bg-orange-100",
    },
    {
      value: 3,
      label: "Bình thường",
      icon: Gauge,
      color: "text-gray-500",
      bgColor: "bg-gray-50 hover:bg-gray-100",
    },
    {
      value: 4,
      label: "Cao",
      icon: Zap,
      color: "text-green-500",
      bgColor: "bg-green-50 hover:bg-green-100",
    },
    {
      value: 5,
      label: "Rất cao",
      icon: Zap,
      color: "text-blue-500",
      bgColor: "bg-blue-50 hover:bg-blue-100",
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleMoodChange = (mood: number) => {
    setFormData((prev) => ({ ...prev, mood }));
  };

  const handleLibidoChange = (libido: number) => {
    setFormData((prev) => ({ ...prev, libido }));
  };

  const handleStressChange = (stress: number) => {
    setFormData((prev) => ({ ...prev, stress }));
  };

  const handleSleepHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? null : parseFloat(e.target.value);
    setFormData((prev) => ({ ...prev, sleep_hours: value }));
  };

  const handleEnergyChange = (energy: number) => {
    setFormData((prev) => ({ ...prev, energy }));
  };

  const formatDate = (dateString: string): string => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Include the new tracking fields in the request
      const response = await axios.post<{ result: CycleResult, statusPredict: any }>(
        "http://localhost:3000/cycle",
        {
          last_period_date: formData.last_period_date,
          cycle_length: parseInt(formData.cycle_length),
          period_length: parseInt(formData.period_length),
          note: formData.note,
          mood: formData.mood,
          libido: formData.libido,
          stress: formData.stress,
          sleep_hours: formData.sleep_hours,
          energy: formData.energy,
        },
        token ? { headers: { Authorization: `Bearer ${token}` } } : undefined,
      );

      setCycleResult(response.data.result);
      setStatusPredict(response.data.statusPredict);
      setShowResults(true);

      const predictRes = await axios.get<{ prediction: PredictionResult }>(
        "http://localhost:3000/cycle/predict",
        token ? { headers: { Authorization: `Bearer ${token}` } } : undefined,
      );

      setPredictions(predictRes.data.prediction);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Lỗi khi gửi thông tin chu kỳ. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* HEADER */}
        <div className="text-center space-y-6 mb-12">
          <div className="relative">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent animate-pulse">
              Theo Dõi Chu Kỳ Sinh Sản
            </h1>
            <div className="absolute -top-2 -left-2 w-6 h-6 bg-blue-400 rounded-full animate-bounce opacity-70"></div>
            <div
              className="absolute -top-1 -right-4 w-4 h-4 bg-indigo-500 rounded-full animate-bounce opacity-70"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
          <p className="text-blue-700 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed font-medium">
            Nhập thông tin chu kỳ kinh nguyệt để theo dõi và dự đoán chu kỳ tiếp
            theo một cách chính xác và khoa học
          </p>
          <div className="flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Card */}
          <Card className="backdrop-blur-sm bg-white/90 shadow-2xl border-0 overflow-hidden transform hover:scale-105 transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <CardTitle className="flex items-center gap-3 text-xl font-bold">
                <div className="p-2 bg-white/20 rounded-full">
                  <CalendarDays className="h-6 w-6" />
                </div>
                Thông Tin Chu Kỳ
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <Label
                    htmlFor="last_period_date"
                    className="text-base font-semibold text-blue-800"
                  >
                    Ngày kinh nguyệt đầu tiên *
                  </Label>
                  <Input
                    id="last_period_date"
                    name="last_period_date"
                    type="date"
                    value={formData.last_period_date}
                    onChange={handleInputChange}
                    required
                    className="h-12 border-2 border-blue-200 focus:border-blue-400 rounded-xl transition-all duration-300 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label
                      htmlFor="cycle_length"
                      className="text-base font-semibold text-blue-800"
                    >
                      Chu kỳ (ngày)
                    </Label>
                    <Input
                      id="cycle_length"
                      name="cycle_length"
                      type="number"
                      min="21"
                      max="35"
                      value={formData.cycle_length}
                      onChange={handleInputChange}
                      className="h-12 border-2 border-cyan-200 focus:border-cyan-400 rounded-xl transition-all duration-300 focus:ring-4 focus:ring-cyan-100"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label
                      htmlFor="period_length"
                      className="text-base font-semibold text-blue-800"
                    >
                      Thời gian kinh (ngày)
                    </Label>
                    <Input
                      id="period_length"
                      name="period_length"
                      type="number"
                      min="3"
                      max="7"
                      value={formData.period_length}
                      onChange={handleInputChange}
                      className="h-12 border-2 border-indigo-200 focus:border-indigo-400 rounded-xl transition-all duration-300 focus:ring-4 focus:ring-indigo-100"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label
                    htmlFor="note"
                    className="text-base font-semibold text-blue-800"
                  >
                    Ghi chú
                  </Label>
                  <Textarea
                    id="note"
                    name="note"
                    value={formData.note}
                    onChange={handleInputChange}
                    className="min-h-24 border-2 border-blue-200 focus:border-blue-400 rounded-xl transition-all duration-300 focus:ring-4 focus:ring-blue-100 resize-none"
                    placeholder="Nhập ghi chú về chu kỳ của bạn..."
                  />
                </div>

                {/* Mood Tracking */}
                <div className="space-y-6 border-t-2 border-gradient-to-r  pt-8 backdrop-blur-sm bg-gradient-to-r from-pink-50/30 via-purple-50/30 to-indigo-50/30 rounded-2xl">
                  <div className="text-center">
                    <h4 className="font-bold text-2xl flex items-center justify-center gap-4 text-gray-800 mb-2">
                      <div className="p-3 bg-gradient-to-br from-pink-400  via-purple-400 to-indigo-400 rounded-full shadow-xl animate-pulse">
                        <Heart className="h-6 w-6 text-white drop-shadow-sm" />
                      </div>
                      <span className="bg-gradient-to-r from-pink-600 via-purple-600 flex items-center justify-center to-indigo-600 bg-clip-text text-transparent">
                        Tâm trạng (1-5)
                      </span>
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Đánh giá tâm trạng của bạn hôm nay
                    </p>
                  </div>
                  <div className="grid grid-cols-5  gap-6 px-4">
                    {moodOptions.map((mood, index) => {
                      const IconComponent = mood.icon;
                      const isSelected = formData.mood === mood.value;
                      return (
                        <div
                          key={mood.value}
                          className="flex flex-col items-center animate-fadeIn"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <button
                            type="button"
                            onClick={() => handleMoodChange(mood.value)}
                            className={`relative group w-20 h-20 rounded-full border-4 transition-all flex items-center justify-center duration-500 transform hover:scale-110 active:scale-95 shadow-glow ${isSelected
                                ? `border-pink-400 ${mood.bgColor} shadow-2xl shadow-pink-300/50 animate-bounce`
                                : "border-gray-200 bg-white hover:border-pink-300 hover:shadow-xl"
                              }`}
                          >
                            <div
                              className={`absolute inset-0 rounded-full transition-all duration-300 ${isSelected
                                  ? "bg-gradient-to-br from-white/80 to-transparent backdrop-blur-sm"
                                  : "group-hover:bg-gradient-to-br group-hover:from-pink-50/80 group-hover:to-purple-50/80"
                                }`}
                            />
                            <IconComponent
                              className={`relative h-10 w-10 transition-all duration-300 ${isSelected
                                  ? `${mood.color} drop-shadow-lg`
                                  : `${mood.color} group-hover:scale-110`
                                }`}
                            />
                            {isSelected && (
                              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center animate-pulse">
                                <span className="text-white text-xs font-bold">
                                  {mood.value}
                                </span>
                              </div>
                            )}
                          </button>
                          <span
                            className={`mt-3 text-sm font-semibold transition-all duration-300 ${isSelected
                                ? "text-pink-600 scale-110"
                                : "text-gray-600 hover:text-pink-500"
                              }`}
                          >
                            {mood.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Libido Tracking */}
                <div className="space-y-6 border-t-2 border-gradient-to-r from-purple-200 pt-8 backdrop-blur-sm bg-gradient-to-r via-indigo-50/30 to-blue-50/30 rounded-2xl">
                  <div className="text-center">
                    <h4 className="font-bold text-2xl flex items-center justify-center gap-4 text-gray-800 mb-2">
                      <div className="p-3 bg-gradient-to-br from-purple-400 via-indigo-400 to-blue-400 rounded-full shadow-xl animate-pulse">
                        <Heart className="h-6 w-6 text-white drop-shadow-sm" />
                      </div>
                      <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                        Libido (1-5)
                      </span>
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Đánh giá ham muốn tình dục
                    </p>
                  </div>
                  <div className="grid grid-cols-5 gap-6 px-4">
                    {libidoOptions.map((libido, index) => {
                      const IconComponent = libido.icon;
                      const isSelected = formData.libido === libido.value;
                      return (
                        <div
                          key={libido.value}
                          className="flex flex-col items-center animate-fadeIn"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <button
                            type="button"
                            onClick={() => handleLibidoChange(libido.value)}
                            className={`relative group w-20 h-20 rounded-full border-4 flex items-center justify-center transition-all duration-500 transform hover:scale-110 active:scale-95 shadow-glow ${isSelected
                                ? `border-purple-400 ${libido.bgColor} shadow-2xl shadow-purple-300/50 animate-bounce`
                                : "border-gray-200 bg-white hover:border-purple-300 hover:shadow-xl"
                              }`}
                          >
                            <div
                              className={`absolute inset-0 rounded-full transition-all duration-300 ${isSelected
                                  ? "bg-gradient-to-br from-white/80 to-transparent backdrop-blur-sm"
                                  : "group-hover:bg-gradient-to-br group-hover:from-purple-50/80 group-hover:to-indigo-50/80"
                                }`}
                            />
                            <IconComponent
                              className={`relative h-10 w-10 transition-all duration-300 ${isSelected
                                  ? `${libido.color} drop-shadow-lg`
                                  : `${libido.color} group-hover:scale-110`
                                }`}
                            />
                            {isSelected && (
                              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center animate-pulse">
                                <span className="text-white text-xs font-bold">
                                  {libido.value}
                                </span>
                              </div>
                            )}
                          </button>
                          <span
                            className={`mt-3 text-sm font-semibold transition-all duration-300 ${isSelected
                                ? "text-purple-600 scale-110"
                                : "text-gray-600 hover:text-purple-500"
                              }`}
                          >
                            {libido.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Stress Tracking */}
                <div className="space-y-6 border-t-2 border-gradient-to-r from-indigo-200 pt-8 backdrop-blur-sm bg-gradient-to-r via-cyan-50/30 to-blue-50/30 rounded-2xl">
                  <div className="text-center">
                    <h4 className="font-bold text-2xl flex items-center justify-center gap-4 text-gray-800 mb-2">
                      <div className="p-3 bg-gradient-to-br from-indigo-400 via-cyan-400 to-blue-400 rounded-full shadow-xl animate-pulse">
                        <Brain className="h-6 w-6 text-white drop-shadow-sm" />
                      </div>
                      <span className="bg-gradient-to-r from-indigo-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
                        Stress (1-5)
                      </span>
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Đánh giá mức độ căng thẳng
                    </p>
                  </div>
                  <div className="grid grid-cols-5 gap-6 px-4">
                    {stressOptions.map((stress, index) => {
                      const IconComponent = stress.icon;
                      const isSelected = formData.stress === stress.value;
                      return (
                        <div
                          key={stress.value}
                          className="flex flex-col items-center animate-fadeIn"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <button
                            type="button"
                            onClick={() => handleStressChange(stress.value)}
                            className={`relative group w-20 h-20 rounded-full border-4 flex items-center justify-center transition-all duration-500 transform hover:scale-110 active:scale-95 shadow-glow ${isSelected
                                ? `border-indigo-400 ${stress.bgColor} shadow-2xl shadow-indigo-300/50 animate-bounce`
                                : "border-gray-200 bg-white hover:border-indigo-300 hover:shadow-xl"
                              }`}
                          >
                            <div
                              className={`absolute inset-0 rounded-full transition-all duration-300 ${isSelected
                                  ? "bg-gradient-to-br from-white/80 to-transparent backdrop-blur-sm"
                                  : "group-hover:bg-gradient-to-br group-hover:from-indigo-50/80 group-hover:to-cyan-50/80"
                                }`}
                            />
                            <IconComponent
                              className={`relative h-10 w-10 transition-all duration-300 ${isSelected
                                  ? `${stress.color} drop-shadow-lg`
                                  : `${stress.color} group-hover:scale-110`
                                }`}
                            />
                            {isSelected && (
                              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full flex items-center justify-center animate-pulse">
                                <span className="text-white text-xs font-bold">
                                  {stress.value}
                                </span>
                              </div>
                            )}
                          </button>
                          <span
                            className={`mt-3 text-sm font-semibold transition-all duration-300 ${isSelected
                                ? "text-indigo-600 scale-110"
                                : "text-gray-600 hover:text-indigo-500"
                              }`}
                          >
                            {stress.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Sleep Hours */}
                <div className="space-y-6 border-t-2 border-gradient-to-r pt-8 backdrop-blur-sm bg-gradient-to-r from-cyan-50/30 via-teal-50/30 to-emerald-50/30 rounded-2xl">
                  <div className="text-center">
                    <h4 className="font-bold text-2xl flex items-center justify-center gap-4 text-gray-800 mb-2">
                      <div className="p-3 bg-gradient-to-br from-cyan-400 via-teal-400 to-emerald-400 rounded-full shadow-xl animate-pulse">
                        <Clock className="h-6 w-6 text-white drop-shadow-sm" />
                      </div>
                      <span className="bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
                        Giờ ngủ
                      </span>
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Số giờ ngủ trong đêm qua
                    </p>
                  </div>
                  <div className="flex justify-center px-4">
                    <div className="w-full max-w-md">
                      <Input
                        id="sleep_hours"
                        type="number"
                        step="0.5"
                        min="0"
                        max="24"
                        value={formData.sleep_hours || ""}
                        onChange={handleSleepHoursChange}
                        className="h-16 text-2xl text-center border-4 border-cyan-200 focus:border-cyan-500 rounded-2xl transition-all duration-300 focus:ring-4 focus:ring-cyan-100"
                        placeholder="8.0"
                      />
                      <p className="text-center text-sm text-gray-600 mt-2">
                        Nhập số giờ ngủ (ví dụ: 7.5)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Energy Tracking */}
                <div className="space-y-6 border-t-2 border-gradient-to-r pt-8 backdrop-blur-sm bg-gradient-to-r from-teal-50/30 via-emerald-50/30 to-green-50/30 rounded-2xl">
                  <div className="text-center">
                    <h4 className="font-bold text-2xl flex items-center justify-center gap-4 text-gray-800 mb-2">
                      <div className="p-3 bg-gradient-to-br from-teal-400 via-emerald-400 to-green-400 rounded-full shadow-xl animate-pulse">
                        <Zap className="h-6 w-6 text-white drop-shadow-sm" />
                      </div>
                      <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-green-600 bg-clip-text text-transparent">
                        Năng lượng (1-5)
                      </span>
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Đánh giá mức năng lượng hiện tại
                    </p>
                  </div>
                  <div className="grid grid-cols-5 gap-6 px-4">
                    {energyOptions.map((energy, index) => {
                      const IconComponent = energy.icon;
                      const isSelected = formData.energy === energy.value;
                      return (
                        <div
                          key={energy.value}
                          className="flex flex-col items-center animate-fadeIn"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <button
                            type="button"
                            onClick={() => handleEnergyChange(energy.value)}
                            className={`relative group w-20 h-20 rounded-full flex items-center justify-center border-4 transition-all duration-500 transform hover:scale-110 active:scale-95 shadow-glow ${isSelected
                                ? `border-teal-400 ${energy.bgColor} shadow-2xl shadow-teal-300/50 animate-bounce`
                                : "border-gray-200 bg-white hover:border-teal-300 hover:shadow-xl"
                              }`}
                          >
                            <div
                              className={`absolute inset-0 rounded-full transition-all duration-300 ${isSelected
                                  ? "bg-gradient-to-br from-white/80 to-transparent backdrop-blur-sm"
                                  : "group-hover:bg-gradient-to-br group-hover:from-teal-50/80 group-hover:to-emerald-50/80"
                                }`}
                            />
                            <IconComponent
                              className={`relative h-10 w-10 transition-all duration-300 ${isSelected
                                  ? `${energy.color} drop-shadow-lg`
                                  : `${energy.color} group-hover:scale-110`
                                }`}
                            />
                            {isSelected && (
                              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full flex items-center justify-center animate-pulse">
                                <span className="text-white text-xs font-bold">
                                  {energy.value}
                                </span>
                              </div>
                            )}
                          </button>
                          <span
                            className={`mt-3 text-sm  flex items-center justify-center font-semibold transition-all duration-300 ${isSelected
                                ? "text-teal-600 scale-110"
                                : "text-gray-600 hover:text-teal-500"
                              }`}
                          >
                            {energy.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Reminders */}
                <div className="space-y-4 border-t-2 border-gradient-to-r from-blue-200 to-cyan-200 pt-6">
                  <h4 className="font-bold text-lg flex items-center gap-3 text-blue-800">
                    <div className="p-2 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full">
                      <Bell className="h-5 w-5 text-blue-500" />
                    </div>
                    Cài Đặt Nhắc Nhở
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-300">
                      <Checkbox
                        id="remind_ovulation"
                        checked={formData.remind_ovulation}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({
                            ...prev,
                            remind_ovulation: checked as boolean,
                          }))
                        }
                        className="h-5 w-5 border-2 border-blue-400"
                      />
                      <Label
                        htmlFor="remind_ovulation"
                        className="text-base font-medium text-blue-700 cursor-pointer"
                      >
                        Nhắc rụng trứng
                      </Label>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-cyan-50 to-indigo-50 rounded-xl border border-cyan-200 hover:shadow-lg transition-all duration-300">
                      <Checkbox
                        id="remind_period"
                        checked={formData.remind_period}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({
                            ...prev,
                            remind_period: checked as boolean,
                          }))
                        }
                        className="h-5 w-5 border-2 border-cyan-400"
                      />
                      <Label
                        htmlFor="remind_period"
                        className="text-base font-medium text-blue-700 cursor-pointer"
                      >
                        Nhắc chu kỳ tiếp theo
                      </Label>
                    </div>
                  </div>
                </div>
                {/* Birth Control */}
                <div className="space-y-4 border-t-2 border-gradient-to-r from-cyan-200 to-indigo-200 pt-6">
                  <h4 className="font-bold text-lg flex items-center gap-3 text-blue-800">
                    <div className="p-2 bg-gradient-to-r from-cyan-100 to-indigo-100 rounded-full">
                      <Pill className="h-5 w-5 text-indigo-500" />
                    </div>
                    Theo Dõi Thuốc Tránh Thai
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-cyan-50 to-indigo-50 rounded-xl border border-indigo-200 hover:shadow-lg transition-all duration-300">
                      <Checkbox
                        id="birth_control_pill"
                        checked={formData.birth_control_pill}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({
                            ...prev,
                            birth_control_pill: checked as boolean,
                          }))
                        }
                        className="h-5 w-5 border-2 border-indigo-400"
                      />
                      <Label
                        htmlFor="birth_control_pill"
                        className="text-base font-medium text-blue-700 cursor-pointer"
                      >
                        Tôi đang uống thuốc
                      </Label>
                    </div>
                    {formData.birth_control_pill && (
                      <div className="ml-6 space-y-3 p-4 bg-white rounded-xl border border-indigo-200 shadow-sm animate-fadeIn">
                        <Label
                          htmlFor="pill_time"
                          className="text-base font-semibold text-blue-800"
                        >
                          Thời gian uống thuốc
                        </Label>
                        <Input
                          type="time"
                          id="pill_time"
                          name="pill_time"
                          value={formData.pill_time}
                          onChange={handleInputChange}
                          className="h-12 border-2 border-indigo-200 focus:border-indigo-500 rounded-xl transition-all duration-300 focus:ring-4 focus:ring-indigo-100"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full h-14 bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 hover:from-blue-700 hover:via-cyan-700 hover:to-indigo-700 text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-0"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Clock className="h-5 w-5 mr-3 animate-spin" />
                      <span className="animate-pulse">Đang lưu...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5 mr-3" />
                      Lưu thông tin
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* RESULT CARD */}
          <Card className="backdrop-blur-sm bg-white/90 shadow-2xl border-0 overflow-hidden transform hover:scale-105 transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
              <CardTitle className="flex items-center gap-3 text-xl font-bold">
                <div className="p-2 bg-white/20 rounded-full">
                  <TrendingUp className="h-6 w-6" />
                </div>
                Dự Đoán Chu Kỳ
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-4">
              {predictions ? (
                <div className="space-y-6">
                  {/* Chu kỳ & ngày kinh tiếp theo */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-blue-100 to-blue-200 text-blue-800 text-center p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      <div className="text-3xl font-bold">
                        {formData.cycle_length}
                      </div>
                      <div className="text-sm font-medium opacity-80">
                        Chu kỳ (ngày)
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-cyan-100 to-cyan-200 text-cyan-800 text-center p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      <div className="text-lg font-bold">
                        {formatDate(predictions.next_period_date)}
                      </div>
                      <div className="text-sm font-medium opacity-80">
                        Kinh nguyệt tiếp theo
                      </div>
                    </div>
                  </div>

                  {/* Ngày rụng trứng */}
                  <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 p-6 rounded-2xl border-2 border-indigo-200 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="font-bold text-indigo-700 mb-2 flex items-center gap-2">
                      <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse"></div>
                      🔵 Ngày rụng trứng dự kiến
                    </div>
                    <div className="text-2xl font-bold text-indigo-700">
                      {formatDate(predictions.ovulation_date)}
                    </div>
                  </div>

                  {/* Thời kỳ sinh sản cao */}
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-2xl border-2 border-cyan-200 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="font-bold text-cyan-700 mb-2 flex items-center gap-2">
                      <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse"></div>
                      🔵 Thời kỳ sinh sản cao
                    </div>
                    <div className="text-lg font-bold text-cyan-700">
                      {formatDate(predictions.fertile_window_start)} -{" "}
                      {formatDate(predictions.fertile_window_end)}
                    </div>
                  </div>

                  {/* Khả năng mang thai */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="font-bold text-blue-700 mb-2 flex items-center gap-2">
                      <Baby className="h-5 w-5 text-blue-600" /> Khả năng mang
                      thai
                    </div>
                    <div
                      className={
                        "font-semibold text-lg " +
                        (predictions.pregnancy_risk === "CAO"
                          ? "text-red-500"
                          : predictions.pregnancy_risk === "TRUNG_BÌNH"
                            ? "text-orange-500"
                            : "text-green-600")
                      }
                    >
                      {predictions.pregnancy_risk.replace("_", " ")}
                    </div>
                  </div>

                  {/* Display New Tracking Fields */}
                  {(formData.mood ||
                    formData.libido ||
                    formData.stress ||
                    formData.sleep_hours ||
                    formData.energy) && (
                      <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-2xl border-2 border-pink-200 shadow-lg">
                        <div className="font-bold text-pink-700 mb-4 flex items-center gap-2">
                          <Activity className="h-5 w-5 text-pink-600" />
                          📊 Theo dõi hôm nay
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          {formData.mood && (
                            <div className="bg-white p-3 rounded-lg shadow-md">
                              <span className="text-pink-600 font-medium">
                                Tâm trạng:
                              </span>
                              <div className="font-bold text-pink-700">
                                {formData.mood}/5
                              </div>
                            </div>
                          )}
                          {formData.libido && (
                            <div className="bg-white p-3 rounded-lg shadow-md">
                              <span className="text-purple-600 font-medium">
                                Libido:
                              </span>
                              <div className="font-bold text-purple-700">
                                {formData.libido}/5
                              </div>
                            </div>
                          )}
                          {formData.stress && (
                            <div className="bg-white p-3 rounded-lg shadow-md">
                              <span className="text-indigo-600 font-medium">
                                Stress:
                              </span>
                              <div className="font-bold text-indigo-700">
                                {formData.stress}/5
                              </div>
                            </div>
                          )}
                          {formData.sleep_hours && (
                            <div className="bg-white p-3 rounded-lg shadow-md">
                              <span className="text-cyan-600 font-medium">
                                Giờ ngủ:
                              </span>
                              <div className="font-bold text-cyan-700">
                                {formData.sleep_hours}h
                              </div>
                            </div>
                          )}
                          {formData.energy && (
                            <div className="bg-white p-3 rounded-lg shadow-md">
                              <span className="text-teal-600 font-medium">
                                Năng lượng:
                              </span>
                              <div className="font-bold text-teal-700">
                                {formData.energy}/5
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
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

                  {/* Nhắc nhở */}
                  {(formData.remind_ovulation || formData.remind_period) && (
                    <div className="bg-gradient-to-br from-indigo-50 to-cyan-50 p-6 rounded-2xl border-2 border-indigo-200 shadow-lg">
                      <div className="font-bold text-indigo-700 mb-3 flex items-center gap-2">
                        <Bell className="h-5 w-5 text-indigo-600 animate-pulse" />
                        🔔 Nhắc nhở đã bật
                      </div>
                      <ul className="space-y-2 text-sm text-indigo-600">
                        {formData.remind_ovulation && (
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            Nhắc nhở rụng trứng
                          </li>
                        )}
                        {formData.remind_period && (
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                            Nhắc nhở chu kỳ tiếp theo
                          </li>
                        )}
                      </ul>
                    </div>
                  )}

                  {/* Button chart */}
                  <div className="pt-4">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setShowChart(true)}
                    >
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Xem Biểu Đồ Chi Tiết
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-blue-400">
                  <Heart className="h-20 w-20 mx-auto mb-6 opacity-30 animate-pulse" />
                  <p className="text-xl font-medium">
                    Nhập ngày kinh nguyệt để xem dự đoán
                  </p>
                  <p className="text-sm mt-2 opacity-70">
                    Hệ thống sẽ tự động tính toán và dự đoán cho bạn
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* RESULTS & DIALOGS */}
      {showResults && cycleResult && predictions && (
        <Dialog open={showResults} onOpenChange={setShowResults}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white to-blue-50 border-0 shadow-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3 text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                <div className="p-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full">
                  <Heart className="h-6 w-6 text-blue-500" />
                </div>
                Kết quả theo dõi chu kỳ
              </DialogTitle>
              <DialogDescription className="text-lg text-blue-600">
                Chu kỳ đã được lưu và dự đoán thành công.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-cyan-50 border-2 border-green-200 text-green-700 p-4 rounded-2xl text-base font-bold flex items-center gap-3 shadow-lg">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  ✅
                </div>
                Chu kỳ đã được theo dõi thành công
              </div>
              <div className="grid grid-cols-2 gap-4 text-base">
                <div className="bg-white p-4 rounded-xl shadow-md">
                  <span className="text-blue-500 font-medium">ID:</span>
                  <div className="font-mono text-xs break-all text-blue-700 mt-1">
                    {cycleResult?.id}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md">
                  <span className="text-blue-500 font-medium">
                    Thời gian lưu:
                  </span>
                  <div className="font-bold text-blue-700 mt-1">
                    {cycleResult &&
                      new Date(cycleResult.created_at).toLocaleTimeString(
                        "vi-VN",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}{" "}
                    {cycleResult && formatDate(cycleResult.created_at)}
                  </div>
                </div>
              </div>
              <div className="flex gap-4 pt-6">
                <Button
                  variant="outline"
                  className="flex-1 h-12 border-2 border-indigo-300 text-indigo-700 hover:bg-indigo-50 rounded-xl font-bold"
                  onClick={() => {
                    setShowResults(false);
                    setShowChart(true);
                  }}
                >
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Xem Biểu Đồ
                </Button>
                <Button
                  className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold"
                  onClick={() => setShowResults(false)}
                >
                  Đóng
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* BIỂU ĐỒ */}
      <Dialog open={showChart} onOpenChange={setShowChart}>
        <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto bg-gradient-to-br from-white via-blue-50 to-indigo-50 border-0 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              <div className="p-3 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full">
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
              Biểu Đồ Chu Kỳ Sinh Sản
            </DialogTitle>
            <DialogDescription className="text-lg text-blue-700">
              Trực quan hóa chu kỳ kinh nguyệt và các giai đoạn quan trọng dựa
              theo dữ liệu dự đoán.
            </DialogDescription>
          </DialogHeader>
          {cycleResult && predictions && (
            <div className="space-y-8">
              {/* Calendar by day */}
              <div className="bg-gradient-to-r from-blue-50 via-cyan-50 to-indigo-50 p-8 rounded-2xl border-2 border-blue-200 shadow-xl">
                <h3 className="font-bold text-2xl mb-6 flex items-center gap-3 text-blue-800">
                  <div className="p-2 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full">
                    <CalendarDays className="h-6 w-6 text-cyan-600" />
                  </div>
                  Lịch Trình Chi Tiết Theo Ngày (Dựa trên Dự Đoán)
                </h3>
                <div className="grid grid-cols-7 gap-2 mb-6">
                  {Array.from({ length: cycleResult.cycle_length }, (_, i) => {
                    const dayDate = new Date(cycleResult.last_period_date);
                    dayDate.setDate(dayDate.getDate() + i);

                    const ovulation = new Date(predictions.ovulation_date);
                    const fertileStart = new Date(
                      predictions.fertile_window_start,
                    );
                    const fertileEnd = new Date(predictions.fertile_window_end);
                    const periodEnd = new Date(cycleResult.last_period_date);
                    periodEnd.setDate(
                      periodEnd.getDate() + cycleResult.period_length - 1,
                    );

                    let bgColor =
                      "bg-gradient-to-br from-slate-100 to-blue-100";
                    let textColor = "text-blue-800";
                    let label = "Bình thường";

                    if (dayDate <= periodEnd) {
                      bgColor = "bg-gradient-to-br from-blue-500 to-blue-600";
                      textColor = "text-white";
                      label = "Kinh nguyệt";
                    } else if (
                      dayDate >= fertileStart &&
                      dayDate <= fertileEnd
                    ) {
                      bgColor = "bg-gradient-to-br from-cyan-300 to-cyan-500";
                      textColor = "text-white";
                      label = "Cửa sổ thụ thai";
                    }

                    if (dayDate.toDateString() === ovulation.toDateString()) {
                      bgColor =
                        "bg-gradient-to-br from-indigo-300 to-indigo-600";
                      textColor = "text-white";
                      label = "Rụng trứng";
                    }

                    return (
                      <div
                        key={i}
                        className={`${bgColor} ${textColor} aspect-square rounded-2xl flex flex-col items-center justify-center text-sm font-bold relative group cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                        title={`Ngày ${i + 1}: ${label}`}
                      >
                        <span className="text-lg font-bold">
                          {dayDate.getDate()}
                        </span>
                        <span className="text-xs opacity-90">
                          {dayDate.getMonth() + 1}
                        </span>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full bg-gray-900 text-white text-sm rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 whitespace-nowrap shadow-xl">
                          {label}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-md">
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg" />
                    <span className="font-medium">Kinh nguyệt</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-md">
                    <div className="w-6 h-6 bg-gradient-to-br from-cyan-300 to-cyan-500 rounded-lg" />
                    <span className="font-medium">Cửa sổ thụ thai</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-md">
                    <div className="w-6 h-6 bg-gradient-to-br from-indigo-300 to-indigo-600 rounded-lg" />
                    <span className="font-medium">Rụng trứng</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-md">
                    <div className="w-6 h-6 bg-gradient-to-br from-slate-100 to-blue-100 rounded-lg" />
                    <span className="font-medium">Bình thường</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
