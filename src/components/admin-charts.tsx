import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Users,
  UserCheck,
  DollarSign,
  Calendar,
  Stethoscope,
  BarChart3,
  RefreshCw,
  Target,
  CheckCircle,
  MessageSquare,
  Shield,
  Heart,
  Brain,
  Eye,
  Activity,
  TrendingUp
} from 'lucide-react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts'
type BookingStatusDatum = {
  status: string
  count: number
  percentage: number
  color: string
}
type RecentActivity = {
  user: string
  action: string
  time: string // hoặc Date
  type: string
}
type DashboardStatistic = {
  customerCount: number
  staffCount: number
  doctorCount: number
  appointmentCount: number
  monthlyRevenue: number
  bookingStatusData: BookingStatusDatum[]
  testServiceStatusData: BookingStatusDatum[]
  serviceBookingCount: number
  monthlyStats: MonthlyStat[]
  systemHealth: SystemHealth
  userGrowthStats: UserGrowthDatum[]
}
type UserGrowthDatum = {
  month: string
  users: number
  doctors: number
  consultants: number
}
type SystemHealth = {
  server: {
    status: string
    uptime: number
    loadavg: number[]
    timestamp: string
  }
  database: string
  apiResponseTime: number
  storage: {
    total?: number
    free?: number
    available?: number
    used?: number
    percent?: number
    error?: boolean
  }
}
// Type cho props của StatCard
type StatCardProps = {
  title: string
  value: string | number
  icon: React.ReactNode
  gradientIcon: string
  valueColorClass: string
}
type MonthlyStat = {
  month: string
  revenue: number
  appointments: number
}

// Component StatCard
function StatCard({ title, value, icon, gradientIcon, valueColorClass }: StatCardProps) {
  return (
    <div className='flex flex-col items-center justify-center rounded-xl border bg-white px-4 py-6 shadow'>
      <div className={`mb-3 rounded-full bg-gradient-to-br p-3 ${gradientIcon} flex items-center justify-center`}>
        {icon}
      </div>
      <div className={`mb-1 text-xl font-bold ${valueColorClass}`}>{value}</div>
      <div className='text-center text-sm font-medium text-gray-600'>{title}</div>
    </div>
  )
}

export default function TempAdminDashboard() {
  const [stats, setStats] = useState<DashboardStatistic | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('6m')
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([])
  const [monthlyStats, setMonthlyStats] = useState([])
  // Gọi API BE lấy dữ liệu thống kê
  useEffect(() => {
    setLoading(true)
    axios
      .get('http://localhost:3000/dashboard/statistic')
      .then((res) => {
        setStats(res.data)
        setMonthlyStats(res.data.monthlyStats)
        setRecentActivities(res.data.recentActivities || [])
      })
      .finally(() => setLoading(false))
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount)
  }
  const completed = stats?.bookingStatusData?.find((s) => s.status === 'COMPLETED')?.count ?? 0
  const pending = stats?.bookingStatusData?.find((s) => s.status === 'PENDING')?.count ?? 0
  const ongoing = stats?.bookingStatusData?.find((s) => s.status === 'ONGOING')?.count ?? 0
  const cancelled = stats?.bookingStatusData?.find((s) => s.status === 'CANCELLED')?.count ?? 0
  const systemHealth = stats?.systemHealth

  const mockUserGrowthData = [
    { month: 'Jan', users: 980, doctors: 20, consultants: 15 },
    { month: 'Feb', users: 1050, doctors: 21, consultants: 16 },
    { month: 'Mar', users: 1120, doctors: 22, consultants: 17 },
    { month: 'Apr', users: 1180, doctors: 23, consultants: 17 },
    { month: 'May', users: 1220, doctors: 24, consultants: 18 },
    { month: 'Jun', users: 1245, doctors: 24, consultants: 18 }
  ]

  const appointmentStatusData = stats?.bookingStatusData || []

  const mockDailyActiveUsers = [
    { day: 'T2', active: 145, new: 12 },
    { day: 'T3', active: 178, new: 15 },
    { day: 'T4', active: 123, new: 8 },
    { day: 'T5', active: 167, new: 18 },
    { day: 'T6', active: 189, new: 22 },
    { day: 'T7', active: 134, new: 9 },
    { day: 'CN', active: 98, new: 6 }
  ]

  const mockServiceStats = [
    { name: 'Tư vấn hormone', bookings: 89, trend: '+12%', icon: Heart, color: '#1A3973' },
    { name: 'Xét nghiệm STI', bookings: 67, trend: '+8%', icon: Shield, color: '#1977cc' },
    { name: 'Tư vấn tâm lý', bookings: 45, trend: '+15%', icon: Brain, color: '#1c2359' },
    { name: 'Khám tổng quát', bookings: 34, trend: '+5%', icon: Eye, color: '#1977cc' }
  ]

  const mockRecentActivities = [
    { user: 'Nguyễn Văn A', action: 'đặt lịch tư vấn hormone', time: '5 phút trước', type: 'booking' },
    { user: 'Trần Thị B', action: 'hoàn thành xét nghiệm STI', time: '15 phút trước', type: 'completed' },
    { user: 'Lê Văn C', action: 'đăng ký tài khoản mới', time: '30 phút trước', type: 'signup' },
    { user: 'Phạm Thị D', action: 'đánh giá 5 sao cho dịch vụ', time: '1 giờ trước', type: 'review' },
    { user: 'Hoàng Văn E', action: 'hủy lịch hẹn', time: '2 giờ trước', type: 'cancel' }
  ]

  const mockPerformanceMetrics = [
    { metric: 'Tỷ lệ hài lòng khách hàng', value: 96, target: 95 },
    { metric: 'Thời gian phản hồi trung bình', value: 87, target: 90 },
    { metric: 'Tỷ lệ hoàn thành lịch hẹn', value: 94, target: 92 },
    { metric: 'Tỷ lệ tái khám', value: 78, target: 80 }
  ]

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='mx-auto max-w-7xl px-4 py-8'>
        <div className='space-y-8'>
          {/* Header */}
          <div className='flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0'>
            <div></div>
            <div className='flex flex-col space-y-3 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-3'>
              <button
                onClick={() => window.location.reload()}
                className='flex items-center justify-center gap-2 rounded-lg border border-[#1977cc] bg-white px-4 py-2 text-[#1977cc] transition-colors hover:bg-[#1977cc] hover:text-white'
              >
                <RefreshCw className='h-4 w-4' />
                Làm mới
              </button>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className='rounded-lg border border-[#1977cc] bg-white px-3 py-2 focus:ring-2 focus:ring-[#1977cc] focus:outline-none'
              >
                <option value='1m'>1 tháng qua</option>
                <option value='3m'>3 tháng qua</option>
                <option value='6m'>6 tháng qua</option>
                <option value='1y'>1 năm qua</option>
              </select>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'>
            <StatCard
              title='Tổng người dùng'
              value={loading ? '...' : stats?.customerCount?.toLocaleString() || 0}
              icon={<Users className='h-7 w-7 text-white' />}
              gradientIcon='from-[#1A3973] to-[#1c2359]'
              valueColorClass='text-[#1A3973]'
            />
            <StatCard
              title='Bác sĩ'
              value={loading ? '...' : stats?.doctorCount || 0}
              icon={<Stethoscope className='h-7 w-7 text-white' />}
              gradientIcon='from-[#1977cc] to-[#1A3973]'
              valueColorClass='text-[#1977cc]'
            />
            <StatCard
              title='Nhân viên'
              value={loading ? '...' : stats?.staffCount || 0}
              icon={<UserCheck className='h-7 w-7 text-white' />}
              gradientIcon='from-[#1977cc] to-[#1c2359]'
              valueColorClass='text-[#1A3973]'
            />
            <StatCard
              title='Doanh thu tháng'
              value={loading ? '...' : formatCurrency(stats?.monthlyRevenue || 0)}
              icon={<DollarSign className='h-7 w-7 text-white' />}
              gradientIcon='from-[#1A3973] to-[#1977cc]'
              valueColorClass='text-[#1A3973]'
            />
            <StatCard
              title='Tổng lịch hẹn'
              value={loading ? '...' : stats?.appointmentCount || 0}
              icon={<BarChart3 className='h-7 w-7 text-white' />}
              gradientIcon='from-[#1977cc] to-[#1A3973]'
              valueColorClass='text-[#1977cc]'
            />
            <StatCard
              title='Dịch vụ đã đặt'
              value={loading ? '...' : stats?.serviceBookingCount || 0}
              icon={<Calendar className='h-7 w-7 text-white' />}
              gradientIcon='from-[#1c2359] to-[#1A3973]'
              valueColorClass='text-[#1c2359]'
            />
          </div>
          {/* Performance Metrics */}
          <div className='rounded-xl border bg-white shadow-sm'>
            <div className='border-b p-6'>
              <div className='flex items-center gap-2 text-[#1A3973]'>
                <Target className='h-5 w-5' />
                <h3 className='text-lg font-semibold'>Chỉ số Hiệu suất</h3>
              </div>
              <p className='mt-1 text-sm text-gray-600'>Theo dõi các KPI quan trọng của hệ thống</p>
            </div>
            <div className='p-6'>
              <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
                {mockPerformanceMetrics.map((metric, index) => (
                  <div key={index} className='space-y-3'>
                    <div className='flex items-center justify-between'>
                      <p className='text-sm font-medium text-gray-700'>{metric.metric}</p>
                      <span
                        className={`rounded px-2 py-1 text-xs font-medium ${
                          metric.value >= metric.target ? 'bg-[#1A3973] text-white' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {metric.value}%
                      </span>
                    </div>
                    <div className='h-2 w-full rounded-full bg-gray-200'>
                      <div
                        className='h-2 rounded-full bg-[#1A3973] transition-all duration-300'
                        style={{ width: `${metric.value}%` }}
                      ></div>
                    </div>
                    <p className='text-xs text-gray-500'>Mục tiêu: {metric.target}%</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className='grid gap-6 lg:grid-cols-2'>
            {/* Revenue Chart */}
            <div className='rounded-xl border bg-white shadow-sm'>
              <div className='border-b p-6'>
                <div className='flex items-center gap-2 text-[#1A3973]'>
                  <TrendingUp className='h-5 w-5' />
                  <h3 className='text-lg font-semibold'>Biểu đồ Doanh thu & Lượt đặt lịch</h3>
                </div>
                <p className='mt-1 text-sm text-gray-600'>Theo dõi doanh thu và số lượng đặt lịch theo tháng</p>
              </div>
              <div className='p-6'>
                <div className='h-[300px]'>
                  <ResponsiveContainer width='100%' height='100%'>
                    <AreaChart data={stats?.monthlyStats || []}>
                      <defs>
                        <linearGradient id='fillRevenue' x1='0' y1='0' x2='0' y2='1'>
                          <stop offset='5%' stopColor='#1A3973' stopOpacity={0.8} />
                          <stop offset='95%' stopColor='#1A3973' stopOpacity={0.1} />
                        </linearGradient>
                        <linearGradient id='fillAppointments' x1='0' y1='0' x2='0' y2='1'>
                          <stop offset='5%' stopColor='#1977cc' stopOpacity={0.8} />
                          <stop offset='95%' stopColor='#1977cc' stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray='3 3' stroke='#e5e7eb' />
                      <XAxis dataKey='month' stroke='#6b7280' />
                      <YAxis yAxisId='left' stroke='#6b7280' />
                      <YAxis yAxisId='right' orientation='right' stroke='#6b7280' />
                      <Area
                        yAxisId='left'
                        type='monotone'
                        dataKey='revenue'
                        stroke='#1A3973'
                        fill='url(#fillRevenue)'
                        strokeWidth={2}
                      />
                      <Area
                        yAxisId='right'
                        type='monotone'
                        dataKey='appointments'
                        stroke='#1977cc'
                        fill='url(#fillAppointments)'
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* User Growth Chart */}
            <div className='rounded-xl border bg-white shadow-sm'>
              <div className='border-b p-6'>
                <div className='flex items-center gap-2 text-[#1A3973]'>
                  <Users className='h-5 w-5' />
                  <h3 className='text-lg font-semibold'>Biểu đồ Tăng trưởng Người dùng</h3>
                </div>
                <p className='mt-1 text-sm text-gray-600'>Sự tăng trưởng của người dùng, bác sĩ và tư vấn viên</p>
              </div>
              <div className='p-6'>
                <div className='h-[300px]'>
                  <ResponsiveContainer width='100%' height='100%'>
                    <BarChart data={stats?.userGrowthStats || []}>
                      <CartesianGrid strokeDasharray='3 3' stroke='#e5e7eb' />
                      <XAxis dataKey='month' stroke='#6b7280' />
                      <YAxis stroke='#6b7280' />
                      <Bar dataKey='users' fill='#1A3973' radius={[4, 4, 0, 0]} />
                      <Bar dataKey='doctors' fill='#1977cc' radius={[4, 4, 0, 0]} />
                      <Bar dataKey='consultants' fill='#10B981' radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                {/* Legend nằm ngoài, sẽ không bị lệch khung */}
                <div className='mt-4 flex justify-center gap-6 pl-2'>
                  <div className='flex items-center gap-2'>
                    <span className='inline-block h-4 w-4 rounded' style={{ background: '#1A3973' }}></span>
                    <span className='text-sm text-gray-700'>Người dùng</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='inline-block h-4 w-4 rounded' style={{ background: '#1977cc' }}></span>
                    <span className='text-sm text-gray-700'>Bác sĩ</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='inline-block h-4 w-4 rounded' style={{ background: '#10B981' }}></span>
                    <span className='text-sm text-gray-700'>Tư vấn viên</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Activity and Services */}
          <div className='grid gap-6 lg:grid-cols-2'>
            {/* Daily Active Users */}
            <div className='rounded-xl border bg-white shadow-sm'>
              <div className='border-b p-6'>
                <div className='flex items-center gap-2 text-[#1A3973]'>
                  <Activity className='h-5 w-5' />
                  <h3 className='text-lg font-semibold'>Hoạt động Hàng ngày</h3>
                </div>
                <p className='mt-1 text-sm text-gray-600'>Người dùng hoạt động và đăng ký mới trong tuần</p>
              </div>
              <div className='p-6'>
                <div className='h-[250px]'>
                  <ResponsiveContainer width='100%' height='100%'>
                    <LineChart data={mockDailyActiveUsers}>
                      <CartesianGrid strokeDasharray='3 3' stroke='#e5e7eb' />
                      <XAxis dataKey='day' stroke='#6b7280' />
                      <YAxis stroke='#6b7280' />
                      <Line
                        type='monotone'
                        dataKey='active'
                        stroke='#1A3973'
                        strokeWidth={3}
                        dot={{ fill: '#1A3973', strokeWidth: 2, r: 4 }}
                      />
                      <Line
                        type='monotone'
                        dataKey='new'
                        stroke='#1977cc'
                        strokeWidth={2}
                        strokeDasharray='5 5'
                        dot={{ fill: '#1977cc', strokeWidth: 2, r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Top Services */}
            <div className='rounded-xl border bg-white shadow-sm'>
              <div className='border-b p-6'>
                <div className='flex items-center gap-2 text-[#1A3973]'>
                  <CheckCircle className='h-5 w-5' />
                  <h3 className='text-lg font-semibold'>Dịch vụ Phổ biến</h3>
                </div>
                <p className='mt-1 text-sm text-gray-600'>Các dịch vụ được đặt nhiều nhất</p>
              </div>
              <div className='p-6'>
                <div className='space-y-4'>
                  {mockServiceStats.map((service, index) => {
                    const IconComponent = service.icon
                    return (
                      <div key={index} className='flex items-center justify-between rounded-lg bg-gray-50 p-4'>
                        <div className='flex items-center gap-3'>
                          <div className='rounded-lg p-2' style={{ backgroundColor: `${service.color}20` }}>
                            <IconComponent className='h-5 w-5' style={{ color: service.color }} />
                          </div>
                          <div>
                            <p className='font-medium text-gray-900'>{service.name}</p>
                            <p className='text-sm text-gray-500'>{service.bookings} lượt đặt</p>
                          </div>
                        </div>
                        <span className='rounded bg-blue-50 px-2 py-1 text-sm font-medium text-[#1A3973]'>
                          {service.trend}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activities and Appointment Status */}
          <div className='grid gap-6 lg:grid-cols-3'>
            {/* Recent Activities */}
            <div className='rounded-xl border bg-white shadow-sm lg:col-span-2'>
              <div className='border-b p-6'>
                <div className='flex items-center gap-2 text-[#1A3973]'>
                  <MessageSquare className='h-5 w-5' />
                  <h3 className='text-lg font-semibold'>Hoạt động Gần đây</h3>
                </div>
                <p className='mt-1 text-sm text-gray-600'>Các hoạt động mới nhất trong hệ thống</p>
              </div>
              <div className='p-6'>
                <div className='space-y-4'>
                  {recentActivities.map((activity, index) => (
                    <div key={index} className='flex items-start gap-3 rounded-lg bg-gray-50 p-3'>
                      <div
                        className={`mt-2 h-2 w-2 rounded-full ${
                          activity.type === 'booking'
                            ? 'bg-[#1977cc]'
                            : activity.type === 'completed'
                              ? 'bg-green-500'
                              : activity.type === 'signup'
                                ? 'bg-[#1A3973]'
                                : activity.type === 'payment'
                                  ? 'bg-yellow-500'
                                  : 'bg-red-500'
                        }`}
                      />
                      <div>
                        <p className='text-sm'>
                          <span className='font-medium'>{activity.user}</span> {activity.action}
                        </p>
                        <p className='mt-1 text-xs text-gray-500'>{new Date(activity.time).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Appointment Status Pie Chart */}
            <div className='rounded-xl border bg-white shadow-sm'>
              <div className='border-b p-6'>
                <div className='flex items-center gap-2 text-[#1A3973]'>
                  <Activity className='h-5 w-5' />
                  <h3 className='text-lg font-semibold'>Trạng thái Lịch hẹn</h3>
                </div>
                <p className='mt-1 text-sm text-gray-600'>Phân bố các trạng thái</p>
              </div>
              <div className='p-6'>
                <div className='h-[200px]'>
                  <ResponsiveContainer width='100%' height='100%'>
                    <PieChart>
                      <Pie
                        data={appointmentStatusData}
                        cx='50%'
                        cy='50%'
                        outerRadius={80}
                        fill='#8884d8'
                        dataKey='count'
                      >
                        {appointmentStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className='mt-4 space-y-2'>
                  {appointmentStatusData.map((item, index) => (
                    <div key={index} className='flex items-center gap-3'>
                      <div className='h-3 w-3 rounded-sm' style={{ backgroundColor: item.color }} />
                      <div>
                        <p className='text-xs font-medium'>{item.status}</p>
                        <p className='text-xs text-gray-500'>
                          {item.count} ({item.percentage}%)
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* System Health Status */}
          <div className='rounded-xl border bg-white shadow-sm'>
            <div className='border-b p-6'>
              <div className='flex items-center gap-2 text-[#1A3973]'>
                <Shield className='h-5 w-5' />
                <h3 className='text-lg font-semibold'>Tình trạng Hệ thống</h3>
              </div>
              <p className='mt-1 text-sm text-gray-600'>Giám sát tình trạng và hiệu suất hệ thống</p>
            </div>
            <div className='p-6'>
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                {/* Server */}
                <div className='flex items-center justify-between rounded-lg bg-green-50 p-4'>
                  <div>
                    <p className='text-sm font-medium text-green-800'>Server Status</p>
                    <p className='text-xs text-green-600'>
                      {loading
                        ? 'Đang tải...'
                        : systemHealth?.server?.status === 'OK'
                          ? `Hoạt động bình thường (${Math.floor(systemHealth.server.uptime / 60)} phút uptime)`
                          : 'Lỗi!'}
                    </p>
                  </div>
                  <div
                    className={`h-3 w-3 rounded-full ${systemHealth?.server?.status === 'OK' ? 'bg-green-500' : 'bg-red-500'}`}
                  ></div>
                </div>
                {/* Database */}
                <div className='flex items-center justify-between rounded-lg bg-blue-50 p-4'>
                  <div>
                    <p className='text-sm font-medium text-[#1A3973]'>Database</p>
                    <p className='text-xs text-[#1977cc]'>
                      {loading
                        ? 'Đang tải...'
                        : systemHealth?.database === 'OK'
                          ? 'Kết nối ổn định'
                          : 'Lỗi kết nối DB!'}
                    </p>
                  </div>
                  <div
                    className={`h-3 w-3 rounded-full ${systemHealth?.database === 'OK' ? 'bg-[#1977cc]' : 'bg-red-500'}`}
                  ></div>
                </div>
                {/* API Response */}
                <div className='flex items-center justify-between rounded-lg bg-yellow-50 p-4'>
                  <div>
                    <p className='text-sm font-medium text-yellow-800'>API Response</p>
                    <p className='text-xs text-yellow-600'>
                      {loading ? 'Đang tải...' : `${systemHealth?.apiResponseTime ?? '---'}ms`}
                    </p>
                  </div>
                  <div className='h-3 w-3 rounded-full bg-yellow-500'></div>
                </div>
                {/* Storage */}
                <div className='flex items-center justify-between rounded-lg bg-purple-50 p-4'>
                  <div>
                    <p className='text-sm font-medium text-purple-800'>Storage</p>
                    <p className='text-xs text-purple-600'>
                      {loading
                        ? 'Đang tải...'
                        : systemHealth?.storage?.error
                          ? 'Không xác định'
                          : `${systemHealth?.storage?.percent ?? '---'}% sử dụng`}
                    </p>
                  </div>
                  <div
                    className={`h-3 w-3 rounded-full ${
                      loading
                        ? 'bg-gray-300'
                        : systemHealth?.storage?.error
                          ? 'bg-red-500'
                          : (systemHealth?.storage?.percent ?? 0) > 90
                            ? 'bg-red-500'
                            : (systemHealth?.storage?.percent ?? 0) > 75
                              ? 'bg-yellow-500'
                              : 'bg-purple-500'
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
