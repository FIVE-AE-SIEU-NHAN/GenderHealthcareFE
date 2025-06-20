import React, { useState } from "react";
import axios from "axios";

export default function CycleForm() {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    note: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const res = await axios.post("http://localhost:3000/api/cycles", {
        userId,
        ...formData,
      });
      alert("Cycle saved successfully!");
      console.log(res.data);
    } catch (err) {
      alert("Failed to save cycle.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Theo dõi chu kỳ sinh sản</h2>
      <label className="block mb-2 font-medium">Ngày bắt đầu chu kỳ</label>
      <input
        type="date"
        name="startDate"
        value={formData.startDate}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
      />
      <label className="block mb-2 font-medium">Ngày kết thúc chu kỳ</label>
      <input
        type="date"
        name="endDate"
        value={formData.endDate}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
      />
      <label className="block mb-2 font-medium">Ghi chú</label>
      <textarea
        name="note"
        value={formData.note}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
      />
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Lưu kết quả
      </button>
    </div>
  );
}
