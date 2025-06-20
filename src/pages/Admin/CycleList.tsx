import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Cycle {
  id: number;
  userId?: string;
  startDate: string;
  endDate?: string;
  note?: string;
  createdAt?: string;
  userName?: string;
}

const API_URL = 'http://localhost:3000/api/cycles'; // Cập nhật theo backend của bạn

const CycleList: React.FC = () => {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchCycles = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Không thể lấy dữ liệu');
      const data: Cycle[] = await res.json();
      setCycles(data);
    } catch (e) {
      setError('Lỗi khi tải danh sách chu kỳ');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCycles();
  }, []);

  if (loading) return <div className="p-4 text-center text-gray-600">Đang tải danh sách chu kỳ...</div>;
  if (error) return <div className="p-4 text-center text-red-600">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Danh sách Chu Kỳ Kinh Nguyệt</h1>

      {cycles.length === 0 ? (
        <div className="text-center p-6 bg-gray-50 border rounded shadow">
          <p className="text-gray-600">Chưa có chu kỳ nào được ghi nhận.</p>
        </div>
      ) : (
        <table className="min-w-full bg-white border border-gray-300 rounded shadow overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">ID</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">Người dùng</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">Ngày bắt đầu</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">Ngày kết thúc</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">Ghi chú</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">Ngày tạo</th>
              <th className="p-3 text-sm text-right text-gray-700">Xem</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle.id} className="hover:bg-gray-50">
                <td className="p-3 border-t border-gray-200">{cycle.id}</td>
                <td className="p-3 border-t border-gray-200">{cycle.userName || '-'}</td>
                <td className="p-3 border-t border-gray-200">
                  {new Date(cycle.startDate).toLocaleDateString('vi-VN')}
                </td>
                <td className="p-3 border-t border-gray-200">
                  {cycle.endDate ? new Date(cycle.endDate).toLocaleDateString('vi-VN') : '-'}
                </td>
                <td className="p-3 border-t border-gray-200 text-gray-700">{cycle.note || '-'}</td>
                <td className="p-3 border-t border-gray-200 text-gray-500">
                  {cycle.createdAt ? new Date(cycle.createdAt).toLocaleDateString('vi-VN') : '-'}
                </td>
                <td className="p-3 border-t border-gray-200 text-right">
                  {cycle.userId ? (
                    <button
                      onClick={() => navigate(`/cyclehistory/${cycle.userId}`)}
                      className="text-blue-600 hover:underline"
                    >
                      Xem
                    </button>
                  ) : (
                    <span className="text-gray-400">Không rõ</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CycleList;
