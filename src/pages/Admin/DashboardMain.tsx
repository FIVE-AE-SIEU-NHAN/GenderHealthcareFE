// DashboardSection.tsx
import React from "react";
import { Line, Bar } from "react-chartjs-2";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  BarController,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  BarController
);

// Chart card
const ChartCard = ({
  title,
  value,
  data,
}: {
  title: string;
  value: string;
  data: number[];
}) => {
  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data,
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderColor: "#3B82F6",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    plugins: { legend: { display: false } },
    scales: {
      x: { display: false },
      y: { display: false },
    },
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <p className="text-sm text-gray-600 font-semibold mb-1">{title}</p>
      <h2 className="text-2xl font-bold mb-2">{value}</h2>
      <Line data={chartData} options={options} height={70} />
    </div>
  );
};

// Bar chart card
const BarChartCard = ({
  title,
  data,
  color,
}: {
  title: string;
  data: number[];
  color: string;
}) => {
  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data,
        backgroundColor: color,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        grid: { display: false },
        ticks: { stepSize: 100 },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow h-full">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <Bar data={chartData} options={options} height={200} />
    </div>
  );
};

// Birth/Death/Accident analytics
const BirthDeathAnalyticsCard = () => {
  const labels = ["Birth", "Death", "Accident"];
  const values = [65, 20, 15];
  const colors = ["#10B981", "#EF4444", "#F59E0B"];

  const chartData = {
    labels,
    datasets: [
      {
        label: "Percentage",
        data: values,
        backgroundColor: colors,
        borderRadius: 6,
      },
    ],
  };

  const options = {
    indexAxis: "y" as const,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        min: 0,
        max: 100,
        ticks: { stepSize: 20 },
        grid: { display: false },
      },
      y: { grid: { display: false } },
    },
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow h-full">
      <h3 className="text-lg font-semibold mb-4">Hospital Birth & Death Analytics</h3>
      <ul className="space-y-2 mb-4">
        {labels.map((label, i) => (
          <li key={label} className="flex justify-between text-sm">
            <span className="font-medium">{label}</span>
            <span className="text-gray-500">{values[i]}%</span>
          </li>
        ))}
      </ul>
      <Bar data={chartData} options={options} height={120} />
    </div>
  );
};

// Staff carousel
const StaffCarouselCard = () => {
  const staffMembers = [
    { name: "Dr. Linh", role: "Cardiologist", img: "https://i.ibb.co/sQzVMKZ/doctor.jpg" },
    { name: "Dr. Khoa", role: "Surgeon", img: "https://i.ibb.co/sQzVMKZ/doctor.jpg" },
    { name: "Dr. An", role: "Dentist", img: "https://i.ibb.co/sQzVMKZ/doctor.jpg" },
    { name: "Dr. Huyền", role: "Pediatrician", img: "https://i.ibb.co/sQzVMKZ/doctor.jpg" },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow h-full">
      <h3 className="text-lg font-semibold mb-4">Staff Members</h3>
      <Slider {...settings}>
        {staffMembers.map((staff, index) => (
          <div key={index} className="flex items-center space-x-3 p-2">
            <img
              src={staff.img}
              alt={staff.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-sm">{staff.name}</p>
              <p className="text-xs text-gray-500">{staff.role}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

// Calendar card
const CalendarCard = () => (
  <div className="bg-white p-6 rounded-xl shadow h-full">
    <h2 className="text-center text-lg font-semibold mb-4">June 2025</h2>
    <div className="text-center text-sm text-gray-500 mb-2">No Appointment</div>
    <div className="text-center text-blue-600 font-semibold cursor-pointer">Add Appointment</div>
    <div className="grid grid-cols-7 gap-1 mt-4 text-center text-xs text-gray-700">
      {[...Array(30)].map((_, i) => (
        <div key={i} className="py-1 rounded hover:bg-blue-100 cursor-pointer">
          {i + 1}
        </div>
      ))}
    </div>
  </div>
);

// Doctor card
const DoctorCard = () => (
  <div className="bg-white rounded-xl shadow overflow-hidden h-full flex flex-col">
    <div
      className="h-32 bg-cover bg-center"
      style={{ backgroundImage: 'url("https://i.ibb.co/JFJK0L1/bg.png")' }}
    />
    <div className="flex justify-center -mt-10">
      <img
        className="w-20 h-20 rounded-full border-4 border-white object-cover"
        src="https://i.ibb.co/sQzVMKZ/doctor.jpg"
        alt="Doctor"
      />
    </div>
    <div className="text-center px-6 pb-6">
      <h3 className="text-xl font-semibold mt-2">Minh Nhật</h3>
      <p className="text-sm text-gray-500">Bác Sĩ</p>
      <p className="text-xs text-gray-400 mt-2 mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in arcu turpis. Nunc.
      </p>
      <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 text-sm">
         Assign
      </button>
      <div className="flex justify-around mt-6 text-sm">
        <div>
          <p className="font-bold text-lg">5790</p>
          <p className="text-gray-500">Số ca thực hiẹn</p>
        </div>
        <div>
          <p className="font-bold text-lg">4.8</p>
          <p className="text-gray-500">Mức độ yêu thích</p>
        </div>
      </div>
    </div>
  </div>
);

// Patient assignment
const PatientAssignmentCard = () => {
  const patients = [
    { name: "Nguyễn Văn A", doctor: "Dr. Linh", status: true },
    { name: "Trần Thị B", doctor: "Dr. Khoa", status: false },
    { name: "Lê Văn C", doctor: "Dr. An", status: true },
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-4">Patient Assignments</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="pb-2">Patient</th>
            <th className="pb-2">Doctor</th>
            <th className="pb-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p, i) => (
            <tr key={i} className="border-t">
              <td className="py-2">{p.name}</td>
              <td className="py-2">{p.doctor}</td>
              <td className="py-2">
                <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={p.status} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600 relative after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// New patients
const NewPatientsCard = () => {
  const newPatients = ["Phạm Văn D", "Ngô Thị E", "Đặng Văn F"];
  return (
    <div className="bg-white p-4 rounded-xl shadow h-full">
      <h3 className="text-lg font-semibold mb-4">New Patients</h3>
      <ul className="space-y-2 text-sm">
        {newPatients.map((name, i) => (
          <li key={i} className="flex justify-between border-b pb-1">
            <span>{name}</span>
            <span className="text-gray-400 text-xs">Just Added</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Report buttons
const ReportActionsCard = () => (
  <div className="bg-white p-4 rounded-xl shadow h-full flex flex-col justify-between">
    <div>
      <h3 className="text-lg font-semibold mb-4">Actions</h3>
      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-2">
        📄 Generate Report
      </button>
      <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
        ⬇️ Download Data
      </button>
    </div>
  </div>
);

// Stats header
const StatsHeader = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {["Today", "This Week", "This Month", "This Year"].map((label) => (
      <div key={label} className="bg-white p-4 rounded-xl shadow text-center">
        <p className="text-sm text-gray-500">{label}</p>
        <h2 className="text-xl font-bold">1234</h2>
      </div>
    ))}
  </div>
);

// Main Dashboard Section
const DashboardSection = () => {
  return (
    <div className="p-6 space-y-6">
      <StatsHeader />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 min-h-[520px]">
        <div className="flex flex-col gap-4 h-full">
          <ChartCard title="APPOINTMENTS" value="3,973" data={[300, 500, 250, 700, 400, 600, 800]} />
          <ChartCard title="NEW PATIENTS" value="593" data={[100, 200, 150, 300, 250, 400, 350]} />
          <ChartCard title="HOSPITAL EARNING" value="3,973" data={[200, 300, 400, 500, 400, 600, 700]} />
        </div>

        <div className="h-full">
          <CalendarCard />
        </div>

        <div className="h-full">
          <DoctorCard />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BirthDeathAnalyticsCard />
        <StaffCarouselCard />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BarChartCard
          title="Patient Total"
          data={[1200, 1400, 1300, 1500, 1600, 1700, 1800]}
          color="#6366F1"
        />
        <BarChartCard
          title="Patient In"
          data={[300, 400, 350, 500, 450, 480, 510]}
          color="#10B981"
        />
      </div>

      {/* Patient Assignments */}
      <div className="grid grid-cols-1 gap-6">
        <PatientAssignmentCard />
      </div>

      {/* New Patients & Report Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <NewPatientsCard />
        <ReportActionsCard />
      </div>
    </div>
  );
};

export default DashboardSection;
