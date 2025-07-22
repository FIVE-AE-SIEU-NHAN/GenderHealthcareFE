import { useState, useEffect } from "react";
import {
  Users,
  Calendar,
  Activity,
  Bell,
  Settings,
  Search,
  MoreVertical,
  Heart,
  TrendingUp,
  PieChart,
  BarChart3,
  UserCheck,
  AlertCircle,
  CheckCircle,
  Clock,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  LogOut,
  User,
  Shield,
  CalendarPlus,
  Stethoscope,
  MapPin,
  Phone,
  Star,
  DollarSign,
  Zap,
  Sparkles,
  Briefcase,
  UserPlus,
  Calendar1,
  CalendarCheck,
  Wallet,
  CreditCard,
  Timer,
  Award,
  Target,
  Layers,
  Plus,
  FileText,
  MessageCircle,
  LineChart,
  TrendingDown,
  UserX,
  AlertTriangle,
  Thermometer,
  Pill,
  Microscope,
  Building2,
  PersonStanding,
  HeartPulse,
  Brain,
  Atom,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
} from "recharts";
import { Button } from "@/components/cycle/ui/button";
import { Input } from "@/components/cycle/ui/input";


import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/cycle/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/cycle/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/cycle/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/cycle/ui/dropdown-menu";
import { Badge } from "@/components/cycle/ui/badge";

import axios from "axios";
interface User {
  id: string;
  name: string;
  email: string;
  lastActive: string;
  cycleCount: number;
  status: "active" | "inactive" | "new";
  joinedDate: string;
}

interface CycleData {
  id: string;
  userId: string;
  userName: string;
  lastPeriod: string;
  cycleLength: number;
  prediction: string;
  status: "normal" | "irregular" | "missed";
}

interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  doctorName: string;
  service: string;
  date: string;
  time: string;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  price: number;
  notes?: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // minutes
  price: number;
  category: "consultation" | "checkup" | "treatment" | "wellness";
  doctorSpecialty: string;
  rating: number;
  bookingCount: number;
  isActive: boolean;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [userFilter, setUserFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

 
  const [stats, setStats] = useState({
    totalPatients: 0,
    activePatients: 0,
    newPatients: 0,
    appointmentCount: 0,
    todayAppointments: 0,
    monthlyRevenue: 0,
    doctorCount: 0,
    completedAppointments: 0,
    pendingAppointments: 0,
    emergencyAlerts: 0,
    bedOccupancy: 0,
    avgWaitTime: 0,
    staffCount: 0,
  });
  useEffect(() => {
    async function fetchStats() {
      try {
        // Có thể bỏ header thử nếu backend không check JWT
        const res = await axios.get("http://localhost:3000/dashboard/statistic");
        console.log("RES DATA:", res.data);
        setStats({
          totalPatients: res.data.customerCount || 0,
          activePatients: res.data.activePatients || 0,
          newPatients: res.data.newPatients || 0,
          appointmentCount: res.data.appointmentCount || 0,
          todayAppointments: res.data.todayAppointments || 0,
          monthlyRevenue: res.data.monthlyRevenue || 0,
          doctorCount: res.data.doctorCount || 0, 
          completedAppointments: res.data.completedAppointments || 0,
          pendingAppointments: res.data.pendingAppointments || 0,
          emergencyAlerts: res.data.emergencyAlerts || 0,
          bedOccupancy: res.data.bedOccupancy || 0,
          avgWaitTime: res.data.avgWaitTime || 0,
          staffCount: res.data.staffCount || 0,
        });
      } catch (err) {
        console.error("Lỗi khi lấy thống kê dashboard:", err);
      }
    }
    fetchStats();
  }, []);
  // Chart data
  const patientGrowthData = [
    { month: "T1", patients: 8400, appointments: 1200 },
    { month: "T2", patients: 9200, appointments: 1350 },
    { month: "T3", patients: 10100, appointments: 1480 },
    { month: "T4", patients: 11200, appointments: 1650 },
    { month: "T5", patients: 12800, appointments: 1820 },
    { month: "T6", patients: 13500, appointments: 1950 },
    { month: "T7", patients: 14200, appointments: 2100 },
    { month: "T8", patients: 15420, appointments: 2340 },
  ];

  const revenueData = [
    { month: "T1", revenue: 280, expenses: 180 },
    { month: "T2", revenue: 320, expenses: 200 },
    { month: "T3", revenue: 350, expenses: 220 },
    { month: "T4", revenue: 380, expenses: 240 },
    { month: "T5", revenue: 420, expenses: 260 },
    { month: "T6", revenue: 450, expenses: 280 },
  ];

  const departmentData = [
    { name: "Phụ Khoa", value: 35, patients: 5400, color: "#0EA5E9" },
    { name: "Tâm lý", value: 25, patients: 3850, color: "#06B6D4" },
    { name: "Cần Theo Dõi", value: 20, patients: 3080, color: "#0284C7" },
    { name: "Bình Thường", value: 12, patients: 1850, color: "#0369A1" },
    { name: "Khác", value: 8, patients: 1240, color: "#075985" },
  ];

  const appointmentStatusData = [
    { name: "Hoàn thành", value: 2180, color: "#22C55E" },
    { name: "Chờ xác nhận", value: 45, color: "#F59E0B" },
    { name: "Đã hủy", value: 115, color: "#EF4444" },
  ];

  const dailyStatsData = [
    { time: "06:00", appointments: 2, revenue: 1.2 },
    { time: "08:00", appointments: 12, revenue: 8.5 },
    { time: "10:00", appointments: 25, revenue: 18.2 },
    { time: "12:00", appointments: 18, revenue: 14.8 },
    { time: "14:00", appointments: 32, revenue: 24.5 },
    { time: "16:00", appointments: 28, revenue: 22.1 },
    { time: "18:00", appointments: 15, revenue: 12.8 },
    { time: "20:00", appointments: 8, revenue: 6.4 },
  ];

  const mockUsers: User[] = [
    {
      id: "1",
      name: "Nguyễn Thị Lan",
      email: "lan.nguyen@email.com",
      lastActive: "2024-01-15",
      cycleCount: 12,
      status: "active",
      joinedDate: "2023-08-15",
    },
    {
      id: "2",
      name: "Trần Thị Hoa",
      email: "hoa.tran@email.com",
      lastActive: "2024-01-14",
      cycleCount: 8,
      status: "active",
      joinedDate: "2023-10-20",
    },
    {
      id: "3",
      name: "Lê Thị Mai",
      email: "mai.le@email.com",
      lastActive: "2024-01-10",
      cycleCount: 3,
      status: "new",
      joinedDate: "2024-01-05",
    },
    {
      id: "4",
      name: "Phạm Thị Thu",
      email: "thu.pham@email.com",
      lastActive: "2024-01-05",
      cycleCount: 15,
      status: "inactive",
      joinedDate: "2023-06-12",
    },
    {
      id: "5",
      name: "Hoàng Thị Linh",
      email: "linh.hoang@email.com",
      lastActive: "2024-01-14",
      cycleCount: 6,
      status: "active",
      joinedDate: "2023-11-08",
    },
  ];

  const mockCycleData: CycleData[] = [
    {
      id: "1",
      userId: "1",
      userName: "Nguyễn Thị Lan",
      lastPeriod: "2024-01-01",
      cycleLength: 28,
      prediction: "2024-01-29",
      status: "normal",
    },
    {
      id: "2",
      userId: "2",
      userName: "Trần Thị Hoa",
      lastPeriod: "2024-01-03",
      cycleLength: 32,
      prediction: "2024-02-04",
      status: "irregular",
    },
    {
      id: "3",
      userId: "3",
      userName: "Lê Thị Mai",
      lastPeriod: "2023-12-20",
      cycleLength: 26,
      prediction: "2024-01-15",
      status: "missed",
    },
  ];

  const mockAppointments: Appointment[] = [
    {
      id: "1",
      patientName: "Nguyễn Thị Lan",
      patientPhone: "0987654321",
      doctorName: "BS. Trần Thị Hương",
      service: "Tư vấn sức khỏe sinh sản",
      date: "2024-01-20",
      time: "09:00",
      status: "confirmed",
      price: 500000,
      notes: "Khám định kỳ",
    },
    {
      id: "2",
      patientName: "Lê Thị Mai",
      patientPhone: "0912345678",
      doctorName: "BS. Phạm Văn Nam",
      service: "Khám phụ khoa",
      date: "2024-01-20",
      time: "10:30",
      status: "pending",
      price: 800000,
    },
    {
      id: "3",
      patientName: "Trần Thị Hoa",
      patientPhone: "0934567890",
      doctorName: "BS. Nguyễn Thị Linh",
      service: "Siêu âm thai",
      date: "2024-01-21",
      time: "14:00",
      status: "completed",
      price: 600000,
    },
    {
      id: "4",
      patientName: "Phạm Thị Thu",
      patientPhone: "0956789012",
      doctorName: "BS. Trần Thị Hương",
      service: "Tư vấn kế hoạch hóa gia đình",
      date: "2024-01-22",
      time: "08:30",
      status: "confirmed",
      price: 400000,
    },
  ];

  const mockServices: Service[] = [
    {
      id: "1",
      name: "Tư vấn sức khỏe sinh sản",
      description:
        "Tư vấn chuyên sâu về sức khỏe sinh sản và kế hoạch hóa gia đình",
      duration: 45,
      price: 500000,
      category: "consultation",
      doctorSpecialty: "Sản phụ khoa",
      rating: 4.8,
      bookingCount: 234,
      isActive: true,
    },
    {
      id: "2",
      name: "Khám phụ khoa định kỳ",
      description: "Khám sức khỏe phụ khoa định kỳ, tầm soát ung thư",
      duration: 60,
      price: 800000,
      category: "checkup",
      doctorSpecialty: "Phụ khoa",
      rating: 4.9,
      bookingCount: 456,
      isActive: true,
    },
    {
      id: "3",
      name: "Siêu âm thai",
      description: "Siêu âm theo dõi sự phát triển của thai nhi",
      duration: 30,
      price: 600000,
      category: "checkup",
      doctorSpecialty: "Sản khoa",
      rating: 4.7,
      bookingCount: 189,
      isActive: true,
    },
    {
      id: "4",
      name: "Massage thư giãn cho bà bầu",
      description: "Massage chuyên dụng giúp thư giãn và giảm căng thẳng",
      duration: 90,
      price: 1200000,
      category: "wellness",
      doctorSpecialty: "Vật lý trị liệu",
      rating: 4.6,
      bookingCount: 98,
      isActive: true,
    },
    {
      id: "5",
      name: "Điều trị rối loạn kinh nguyệt",
      description: "Điều trị các vấn đề liên quan đến chu kỳ kinh nguyệt",
      duration: 75,
      price: 1500000,
      category: "treatment",
      doctorSpecialty: "Nội tiết sinh sản",
      rating: 4.9,
      bookingCount: 67,
      isActive: true,
    },
  ];

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = userFilter === "all" || user.status === userFilter;
    return matchesSearch && matchesFilter;
  });

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-red-100 text-red-800",
      new: "bg-blue-100 text-blue-800",
      normal: "bg-green-100 text-green-800",
      irregular: "bg-yellow-100 text-yellow-800",
      missed: "bg-red-100 text-red-800",
    };

    const labels = {
      active: "Hoạt động",
      inactive: "Không hoạt động",
      new: "Mới",
      normal: "Bình thường",
      irregular: "Bất thường",
      missed: "Bỏ lỡ",
    };

    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };



  const renderOverview = () => (
    <div className="space-y-8">
      {/* Medical Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 border-0 hover:shadow-2xl hover:scale-105 transition-all duration-500 group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent" />
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium mb-2">
                  Tổng bệnh nhân
                </p>
                <p className="text-4xl font-bold text-white">
                  {stats.totalPatients.toLocaleString()}
                </p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-cyan-300 mr-1" />
                  <span className="text-cyan-300 text-sm">+12.5%</span>
                </div>
              </div>
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-300" />
        </Card>
        <Card className="relative overflow-hidden bg-gradient-to-br from-green-600 via-green-700 to-green-800 border-0 hover:shadow-2xl hover:scale-105 transition-all duration-500 group">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-transparent" />
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium mb-2">
                  Tổng nhân viên
                </p>
                <p className="text-4xl font-bold text-white">
                  {stats.staffCount}
                </p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-lime-300 mr-1" />
                  <span className="text-lime-300 text-sm">+2.5%</span>
                </div>
              </div>
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl group-hover:scale-110 transition-transform">
                <User className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-lime-400 to-green-300" />
        </Card>

        <Card className="relative overflow-hidden bg-gradient-to-br from-cyan-600 via-cyan-700 to-blue-700 border-0 hover:shadow-2xl hover:scale-105 transition-all duration-500 group">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-transparent" />
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-100 text-sm font-medium mb-2">
                  Lịch hẹn hôm nay
                </p>
                <p className="text-4xl font-bold text-white">
                  {stats.appointmentCount}
                </p>
                <div className="flex items-center mt-2">
                  <Clock className="h-4 w-4 text-blue-300 mr-1" />
                  <span className="text-blue-300 text-sm">
                    {stats.avgWaitTime} phút chờ
                  </span>
                </div>
              </div>
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl group-hover:scale-110 transition-transform">
                <CalendarCheck className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-cyan-300" />
        </Card>

        <Card className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-800 border-0 hover:shadow-2xl hover:scale-105 transition-all duration-500 group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent" />
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium mb-2">
                  Doanh thu tháng
                </p>
                <p className="text-4xl font-bold text-white">
                  {(stats.monthlyRevenue)}
                </p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-300 mr-1" />
                  <span className="text-green-300 text-sm">+8.2%</span>
                </div>
              </div>
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl group-hover:scale-110 transition-transform">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400 to-blue-300" />
        </Card>

        <Card className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-blue-700 border-0 hover:shadow-2xl hover:scale-105 transition-all duration-500 group">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-transparent" />
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-100 text-sm font-medium mb-2">
                  Bác sĩ trực
                </p>
                <p className="text-4xl font-bold text-white">
                  {stats.doctorCount}
                </p>
                <div className="flex items-center mt-2">
                  <HeartPulse className="h-4 w-4 text-cyan-300 mr-1" />
                  <span className="text-cyan-300 text-sm">Sẵn sàng</span>
                </div>
              </div>
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl group-hover:scale-110 transition-transform">
                <Stethoscope className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-300" />
        </Card>
      </div>

      {/* Alert Bar */}
      <Card className="border-l-4 border-l-red-500 bg-gradient-to-r from-red-50 to-orange-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <div>
                <h4 className="font-semibold text-red-800">
                  Cảnh báo khẩn cấp
                </h4>
                <p className="text-red-600 text-sm">
                  {stats.emergencyAlerts} trường hợp cần xử lý ngay
                </p>
              </div>
            </div>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              Xem chi tiết
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Patient Growth Chart */}
        <Card className="bg-white shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <LineChart className="h-6 w-6" />
              Tăng trưởng bệnh nhân & Lịch hẹn
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <RechartsLineChart data={patientGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0f2fe" />
                <XAxis dataKey="month" stroke="#0369a1" />
                <YAxis stroke="#0369a1" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f0f9ff",
                    border: "1px solid #0ea5e9",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="patients"
                  stroke="#0ea5e9"
                  strokeWidth={3}
                  name="Bệnh nhân"
                  dot={{ fill: "#0ea5e9", strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="appointments"
                  stroke="#06b6d4"
                  strokeWidth={3}
                  name="Lịch hẹn"
                  dot={{ fill: "#06b6d4", strokeWidth: 2, r: 4 }}
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Chart */}
        <Card className="bg-white shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-6 w-6" />
              Doanh thu & Chi phí (triệu VNĐ)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <RechartsBarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0f2fe" />
                <XAxis dataKey="month" stroke="#0369a1" />
                <YAxis stroke="#0369a1" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f0f9ff",
                    border: "1px solid #0ea5e9",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="revenue"
                  fill="#0ea5e9"
                  name="Doanh thu"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="expenses"
                  fill="#06b6d4"
                  name="Chi phí"
                  radius={[4, 4, 0, 0]}
                />
              </RechartsBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Distribution */}
        <Card className="bg-white shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-6 w-6" />
              Phân bố theo khoa
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f0f9ff",
                    border: "1px solid #0ea5e9",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {departmentData.map((dept, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: dept.color }}
                  />
                  <span className="text-sm text-gray-600">{dept.name}</span>
                  <span className="text-sm font-semibold text-blue-700">
                    {dept.patients}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Daily Activity Chart */}
        <Card className="bg-white shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-6 w-6" />
              Hoạt động trong ngày
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={dailyStatsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0f2fe" />
                <XAxis dataKey="time" stroke="#0369a1" />
                <YAxis stroke="#0369a1" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f0f9ff",
                    border: "1px solid #0ea5e9",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="appointments"
                  stroke="#0ea5e9"
                  fill="#bae6fd"
                  name="Lịch hẹn"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Medical Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-xl transition-all duration-300 cursor-pointer group">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl group-hover:scale-110 transition-transform">
                <CalendarPlus className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-blue-900">Đặt lịch khám</h3>
                <p className="text-blue-600 text-sm">Tạo lịch hẹn mới</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200 hover:shadow-xl transition-all duration-300 cursor-pointer group">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl group-hover:scale-110 transition-transform">
                <UserPlus className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-cyan-900">Thêm bệnh nhân</h3>
                <p className="text-cyan-600 text-sm">Đăng ký hồ sơ mới</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200 hover:shadow-xl transition-all duration-300 cursor-pointer group">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl group-hover:scale-110 transition-transform">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-indigo-900">Báo cáo y tế</h3>
                <p className="text-indigo-600 text-sm">Tạo báo cáo mới</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200 hover:shadow-xl transition-all duration-300 cursor-pointer group">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-blue-700 to-indigo-700 rounded-xl group-hover:scale-110 transition-transform">
                <AlertCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-blue-900">Cảnh báo</h3>
                <p className="text-blue-600 text-sm">Quản lý thông báo</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Thống kê người dùng theo tháng
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-t from-blue-50 to-white rounded-lg flex items-end justify-center">
              <div className="text-center text-gray-500">
                <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Biểu đồ thống kê sẽ được hiển thị ở đây</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-purple-600" />
              Phân bố trạng thái chu kỳ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-t from-purple-50 to-white rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <PieChart className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Biểu đồ tròn sẽ được hiển thị ở đây</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-green-600" />
            Hoạt động gần đây
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                user: "Nguyễn Thị Lan",
                action: "đã cập nhật chu kỳ mới",
                time: "2 phút trước",
                type: "cycle",
              },
              {
                user: "Trần Thị Hoa",
                action: "đã đăng ký tài khoản",
                time: "15 phút trước",
                type: "signup",
              },
              {
                user: "Lê Thị Mai",
                action: "đã xem dự đoán chu kỳ",
                time: "1 giờ trước",
                type: "view",
              },
              {
                user: "Phạm Thị Thu",
                action: "đã cập nhật thông tin cá nhân",
                time: "3 giờ trước",
                type: "profile",
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${activity.type === "cycle"
                        ? "bg-pink-100"
                        : activity.type === "signup"
                          ? "bg-green-100"
                          : activity.type === "view"
                            ? "bg-blue-100"
                            : "bg-yellow-100"
                      }`}
                  >
                    {activity.type === "cycle" && (
                      <Heart className="h-4 w-4 text-pink-600" />
                    )}
                    {activity.type === "signup" && (
                      <UserCheck className="h-4 w-4 text-green-600" />
                    )}
                    {activity.type === "view" && (
                      <Eye className="h-4 w-4 text-blue-600" />
                    )}
                    {activity.type === "profile" && (
                      <User className="h-4 w-4 text-yellow-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">
                      {activity.user} {activity.action}
                    </p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Tìm kiếm người dùng..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={userFilter} onValueChange={setUserFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Lọc theo trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="active">Hoạt động</SelectItem>
                  <SelectItem value="inactive">Không hoạt động</SelectItem>
                  <SelectItem value="new">Mới</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Xuất Excel
              </Button>
              <Button size="sm">
                <Users className="h-4 w-4 mr-2" />
                Thêm người dùng
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách người dùng ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Hoạt động cuối</TableHead>
                <TableHead>Số chu kỳ</TableHead>
                <TableHead>Ngày tham gia</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>{formatDate(user.lastActive)}</TableCell>
                  <TableCell>{user.cycleCount}</TableCell>
                  <TableCell>{formatDate(user.joinedDate)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-500">
                Hiển thị {(currentPage - 1) * itemsPerPage + 1} -{" "}
                {Math.min(currentPage * itemsPerPage, filteredUsers.length)} của{" "}
                {filteredUsers.length} kết quả
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Trước
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="w-8 h-8 p-0"
                      >
                        {page}
                      </Button>
                    ),
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  Sau
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderAppointments = () => (
    <div className="space-y-6">
      {/* Appointment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">
                  Tổng lịch hẹn
                </p>
                <p className="text-2xl font-bold text-blue-900">
                  {stats.appointmentCount}
                </p>
              </div>
              <CalendarCheck className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Hoàn thành</p>
                <p className="text-2xl font-bold text-green-900">
                  {stats.completedAppointments}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-600 text-sm font-medium">
                  Chờ xác nhận
                </p>
                <p className="text-2xl font-bold text-yellow-900">
                  {stats.pendingAppointments}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">Hôm nay</p>
                <p className="text-2xl font-bold text-purple-900">
                  {stats.todayAppointments}
                </p>
              </div>
              <Calendar1 className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Appointments Table */}
      <Card className="shadow-xl border-0">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CalendarPlus className="h-6 w-6" />
              Quản lý lịch hẹn
            </CardTitle>
            <Button className="bg-white/20 hover:bg-white/30 border-white/30">
              <Plus className="h-4 w-4 mr-2" />
              Tạo lịch hẹn
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Bệnh nhân</TableHead>
                <TableHead className="font-semibold">Bác sĩ</TableHead>
                <TableHead className="font-semibold">Dịch vụ</TableHead>
                <TableHead className="font-semibold">Ngày & Giờ</TableHead>
                <TableHead className="font-semibold">Giá</TableHead>
                <TableHead className="font-semibold">Trạng thái</TableHead>
                <TableHead className="text-right font-semibold">
                  Thao tác
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAppointments.map((appointment) => (
                <TableRow
                  key={appointment.id}
                  className="hover:bg-blue-50 transition-colors"
                >
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {appointment.patientName}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {appointment.patientPhone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {appointment.doctorName}
                  </TableCell>
                  <TableCell>{appointment.service}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {formatDate(appointment.date)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {appointment.time}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-bold text-green-600">
                      {appointment.price.toLocaleString()} ₫
                    </span>
                  </TableCell>
                  <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Gửi tin nhắn
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <X className="h-4 w-4 mr-2" />
                          Hủy lịch h��n
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const renderServices = () => (
    <div className="space-y-6">
      {/* Service Categories */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { name: "Tư vấn", count: 8, color: "blue", icon: MessageCircle },
          {
            name: "Khám sức khỏe",
            count: 12,
            color: "green",
            icon: Stethoscope,
          },
          { name: "Điều trị", count: 6, color: "purple", icon: Heart },
          { name: "Chăm sóc", count: 4, color: "pink", icon: Sparkles },
        ].map((category, index) => (
          <Card
            key={index}
            className={`bg-gradient-to-br from-${category.color}-50 to-${category.color}-100 border-${category.color}-200 hover:shadow-lg transition-all duration-300`}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`text-${category.color}-600 text-sm font-medium`}
                  >
                    {category.name}
                  </p>
                  <p
                    className={`text-2xl font-bold text-${category.color}-900`}
                  >
                    {category.count}
                  </p>
                </div>
                <category.icon
                  className={`h-8 w-8 text-${category.color}-600`}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockServices.map((service) => (
          <Card
            key={service.id}
            className="hover:shadow-xl transition-all duration-300 border-0 bg-white overflow-hidden group"
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {service.description}
                  </p>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <span className="text-sm text-gray-600">
                        {service.duration} phút
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">
                        {service.rating}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-600">
                        {service.bookingCount} lượt đặt
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-green-600">
                        {service.price.toLocaleString()} ₫
                      </span>
                      <p className="text-sm text-gray-500">
                        {service.doctorSpecialty}
                      </p>
                    </div>
                    <Badge
                      className={
                        service.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }
                    >
                      {service.isActive ? "Hoạt động" : "Tạm dừng"}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Chỉnh sửa
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  Chi tiết
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add New Service Button */}
      <Card className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors cursor-pointer group">
        <CardContent className="p-12 text-center">
          <div className="group-hover:scale-110 transition-transform">
            <Plus className="h-12 w-12 text-gray-400 group-hover:text-blue-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 group-hover:text-blue-600">
              Thêm dịch vụ mới
            </h3>
            <p className="text-gray-500 mt-2">
              Mở rộng danh mục dịch vụ của bạn
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCycles = () => (
    <div className="space-y-6">
      <Card className="shadow-xl border-0">
        <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-6 w-6" />
            Theo dõi chu kỳ kinh nguyệt
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Người dùng</TableHead>
                <TableHead className="font-semibold">
                  Kinh nguyệt cuối
                </TableHead>
                <TableHead className="font-semibold">Độ dài chu kỳ</TableHead>
                <TableHead className="font-semibold">
                  Dự đoán tiếp theo
                </TableHead>
                <TableHead className="font-semibold">Trạng thái</TableHead>
                <TableHead className="text-right font-semibold">
                  Thao tác
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCycleData.map((cycle) => (
                <TableRow
                  key={cycle.id}
                  className="hover:bg-pink-50 transition-colors"
                >
                  <TableCell className="font-medium">
                    {cycle.userName}
                  </TableCell>
                  <TableCell>{formatDate(cycle.lastPeriod)}</TableCell>
                  <TableCell>{cycle.cycleLength} ngày</TableCell>
                  <TableCell>{formatDate(cycle.prediction)}</TableCell>
                  <TableCell>{getStatusBadge(cycle.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          Xem lịch sử
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Calendar className="h-4 w-4 mr-2" />
                          Xem lịch
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return renderOverview();
      case "appointments":
        return renderAppointments();
      case "services":
        return renderServices();
      case "users":
        return renderUsers();
      case "cycles":
        return renderCycles();
      case "analytics":
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center text-gray-500">
              <PieChart className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">Phân tích chi tiết</p>
              <p>Chức năng này đang được phát triển</p>
            </div>
          </div>
        );
      case "notifications":
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center text-gray-500">
              <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">Quản lý thông báo</p>
              <p>Chức năng này đang được phát triển</p>
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center text-gray-500">
              <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">Cài đặt hệ thống</p>
              <p>Chức năng này đang được phát triển</p>
            </div>
          </div>
        );
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100">
     

      <div className="flex">
        {/* Sidebar */}
        

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">{renderContent()}</div>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
