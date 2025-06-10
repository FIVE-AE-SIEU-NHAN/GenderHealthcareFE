import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const LOCAL_STORAGE_KEY = "cycleTrackerDataFull";

// Hàm parse ngày từ input "yyyy-mm-dd" thành Date UTC 0h sáng
function parseDateFromInput(dateString: string) {
  if (!dateString) return null;
  const parts = dateString.split("-");
  if (parts.length !== 3) return null;
  const year = Number(parts[0]);
  const month = Number(parts[1]) - 1; // tháng 0-based
  const day = Number(parts[2]);
  return new Date(Date.UTC(year, month, day));
}

// Hàm thêm ngày vào Date (trả về Date mới, không mutate)
function addDays(date: Date, days: number) {
  if (!date) return null;
  const result = new Date(date.getTime());
  result.setUTCDate(result.getUTCDate() + days);
  return result;
}

// Format ngày sang dd/mm/yyyy hoặc dd/mm
function formatDate(date: Date | null | undefined, withYear: boolean = false) {
  if (!(date instanceof Date) || isNaN(date as any)) return "";
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = date.getUTCFullYear();
  return withYear ? `${day}/${month}/${year}` : `${day}/${month}`;
}

// Hàm tính số ngày giữa 2 ngày
function daysBetween(start: Date, end: Date) {
  return Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}

interface CycleInfo {
  cycleStart: Date;
  cycleLength: number;
}

function CycleTrackerWithChart() {
  const [lastPeriodDateStr, setLastPeriodDateStr] = useState("");
  const [cycleLength, setCycleLength] = useState(28);
  const [periodLength, setPeriodLength] = useState(5);

  const [history, setHistory] = useState<CycleInfo[]>([]);
  const [ovulationDate, setOvulationDate] = useState<Date | null>(null);
  const [fertileWindow, setFertileWindow] = useState<{ start: Date | null; end: Date | null }>({ start: null, end: null });
  const [pillReminders, setPillReminders] = useState<Date[]>([]);

  // Load từ localStorage
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setLastPeriodDateStr(parsed.lastPeriodDateStr || "");
        setCycleLength(parsed.cycleLength || 28);
        setPeriodLength(parsed.periodLength || 5);
        setHistory(
          (parsed.history || []).map((h: any) => ({
            cycleStart: new Date(h.cycleStart),
            cycleLength: h.cycleLength,
          }))
        );
      } catch {
        // ignore
      }
    }
  }, []);

  // Lưu vào localStorage
  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        lastPeriodDateStr,
        cycleLength,
        periodLength,
        history,
      })
    );
  }, [lastPeriodDateStr, cycleLength, periodLength, history]);

  // Tính toán các dữ liệu
  useEffect(() => {
    if (!lastPeriodDateStr) {
      setHistory([]);
      setOvulationDate(null);
      setFertileWindow({ start: null, end: null });
      setPillReminders([]);
      return;
    }

    const startDate = parseDateFromInput(lastPeriodDateStr);
    if (!startDate) {
      setHistory([]);
      setOvulationDate(null);
      setFertileWindow({ start: null, end: null });
      setPillReminders([]);
      return;
    }

    // Tạo lịch sử 6 chu kỳ kế tiếp (tương lai) từ startDate
    const newHistory: CycleInfo[] = [];
    for (let i = 0; i < 6; i++) {
      const cycleStart = addDays(startDate, i * cycleLength);
      if (cycleStart) newHistory.push({ cycleStart, cycleLength });
    }
    setHistory(newHistory);

    // Ngày rụng trứng của chu kỳ đầu tiên
    const ovulation = addDays(startDate, cycleLength - 14);
    setOvulationDate(ovulation);

    // Giai đoạn khả năng mang thai (tính cho chu kỳ đầu tiên)
    setFertileWindow({
      start: ovulation ? addDays(ovulation, -5) : null,
      end: ovulation ? addDays(ovulation, 1) : null,
    });

    // Nhắc nhở uống thuốc tránh thai: từ ngày 2 đến hết kỳ kinh
    const reminders: Date[] = [];
    for (let i = 1; i <= periodLength; i++) {
      const reminderDate = addDays(startDate, i);
      if (reminderDate) reminders.push(reminderDate);
    }
    setPillReminders(reminders);
  }, [lastPeriodDateStr, cycleLength, periodLength]);

  // Dữ liệu cho biểu đồ Scatter

  // Base date để tính số ngày kể từ
  const baseDate = history.length > 0 ? history[0].cycleStart : null;

  // Chuyển Date thành số ngày kể từ baseDate
  function daysFromBase(date: Date) {
    if (!date || !baseDate) return 0;
    return daysBetween(baseDate, date);
  }

  // Dữ liệu điểm chu kỳ bắt đầu và ngày rụng trứng cho từng chu kỳ
  const cycleStartPoints = history.map(({ cycleStart }) => ({
    x: formatDate(cycleStart, true),
    y: 0, // trục y = 0 cho ngày bắt đầu chu kỳ
  }));

  const ovulationPoints = history.map(({ cycleStart, cycleLength }) => {
    const ovDate = addDays(cycleStart, cycleLength - 14);
    return {
      x: formatDate(cycleStart, true),
      y: ovDate ? daysFromBase(ovDate) - daysFromBase(cycleStart) : 0,
    };
  });

  // Vì trục x là label ngày, trục y là số ngày (0 cho ngày bắt đầu chu kỳ, ~14 cho ngày rụng trứng)
  // Ta sẽ vẽ 2 dataset scatter

  const data = {
    labels: history.map(({ cycleStart }) => formatDate(cycleStart, true)),
    datasets: [
      {
        label: "Ngày bắt đầu chu kỳ",
        data: cycleStartPoints,
        backgroundColor: "#ec4899",
        pointRadius: 8,
      },
      {
        label: "Ngày rụng trứng",
        data: ovulationPoints,
        backgroundColor: "#f87171",
        pointRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      tooltip: {
        callbacks: {
          label(context: any) {
            const datasetLabel = context.dataset.label || "";
            const yValue = context.parsed.y;
            if (datasetLabel === "Ngày bắt đầu chu kỳ") {
              return `${datasetLabel}: ${context.label}`;
            } else if (datasetLabel === "Ngày rụng trứng") {
              return `${datasetLabel}: Ngày ${Math.round(yValue)} kể từ chu kỳ bắt đầu`;
            }
            return "";
          },
        },
      },
    },
    scales: {
      y: {
        title: { display: true, text: "Ngày trong chu kỳ" },
        min: 0,
        max: 20,
        ticks: {
          stepSize: 1,
        },
      },
      x: {
        title: { display: true, text: "Ngày bắt đầu chu kỳ" },
        type: "category" as const,
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-pink-600">
        Theo dõi chu kỳ sinh sản
      </h1>

      <form className="space-y-5 mb-10">
        <div>
          <label
            htmlFor="lastPeriodDate"
            className="block text-gray-700 font-medium mb-1"
          >
            Ngày bắt đầu kỳ kinh cuối
          </label>
          <input
            type="date"
            id="lastPeriodDate"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-pink-500"
            value={lastPeriodDateStr}
            onChange={(e) => setLastPeriodDateStr(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="cycleLength"
            className="block text-gray-700 font-medium mb-1"
          >
            Độ dài chu kỳ (ngày)
          </label>
          <input
            type="number"
            id="cycleLength"
            min={20}
            max={45}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-pink-500"
            value={cycleLength}
            onChange={(e) => setCycleLength(Number(e.target.value))}
          />
        </div>

        <div>
          <label
            htmlFor="periodLength"
            className="block text-gray-700 font-medium mb-1"
          >
            Độ dài kỳ kinh (ngày)
          </label>
          <input
            type="number"
            id="periodLength"
            min={2}
            max={10}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-pink-500"
            value={periodLength}
            onChange={(e) => setPeriodLength(Number(e.target.value))}
          />
        </div>
      </form>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3 text-pink-700">
          Kết quả dự đoán
        </h2>

        {ovulationDate && fertileWindow.start && fertileWindow.end ? (
          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Ngày rụng trứng dự kiến:</strong>{" "}
              <span className="text-pink-600 font-semibold">
                {formatDate(ovulationDate, true)}
              </span>
            </p>
            <p>
              <strong>Giai đoạn thụ thai tốt nhất:</strong>{" "}
              <span className="text-pink-600 font-semibold">
                {formatDate(fertileWindow.start, true)} -{" "}
                {formatDate(fertileWindow.end, true)}
              </span>
            </p>
            <p>
              <strong>Nhắc nhở uống thuốc tránh thai:</strong>{" "}
              {pillReminders.length > 0
                ? pillReminders
                    .map((d) => formatDate(d, true))
                    .join(", ")
                : "Không có"}
            </p>
          </div>
        ) : (
          <p className="text-gray-500">Vui lòng nhập ngày bắt đầu kỳ kinh và thông số.</p>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-pink-700">
          Biểu đồ chu kỳ và ngày rụng trứng
        </h2>
        {history.length > 0 ? (
          <Scatter data={data} options={options} />
        ) : (
          <p className="text-gray-500">Không có dữ liệu chu kỳ để hiển thị.</p>
        )}
      </div>
    </div>
  );
}

export default CycleTrackerWithChart;
