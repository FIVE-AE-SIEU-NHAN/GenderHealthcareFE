import React from "react";
import { Link } from "react-router-dom";
const Blog: React.FC = () => {
  return (
    <div className="font-sans text-gray-800">

      <section className="bg-blue-100 py-12 text-center">
        <h2 className="text-4xl font-bold">Blog của chúng tôi</h2>
        <p className="text-sm text-gray-500 mt-2">Trang chủ / Blog</p>
      </section>

      <section className="max-w-6xl mx-auto mt-10">
        <div className="relative w-full h-72 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
          <p className="text-2xl text-center max-w-2xl">
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem
          </p>
          <div className="absolute left-0 p-4 cursor-pointer">❮</div>
          <div className="absolute right-0 p-4 cursor-pointer">❯</div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-4 gap-6">
    
        <div className="border p-4 rounded shadow">
          <img
            src="https://via.placeholder.com/500x300"
            alt=""
            className="rounded mb-4 w-full object-cover"
          />
          <p className="text-xs text-gray-500">📅 20/05/2025</p>
          <h3 className="font-semibold text-2xl mt-2">Bài viết nổi bật</h3>
          <p className="text-sm text-gray-600 mt-2">Mô tả ngắn về bài viết nổi bật...</p>
          <p className="text-xs text-gray-500 mt-2">Tác giả: Carmen Villasenor</p>
        </div>

{/* Col 2 */}
<div className="flex flex-col gap-4">
  {[1, 2, 3].map((i) => (
    <div key={i} className="border p-3 rounded shadow">
      <img
        src={`/images/new${i}.jpg`}
        alt={`Bài viết ${i}`}
        className="rounded mb-2 w-full object-cover"
      />
      <p className="text-xs text-gray-500">📅 20/05/2025</p>
      
      <Link to={`/blog/${i}`}>
        <h4 className="font-semibold text-md mt-1 text-blue-600 hover:underline">
          Bài viết {i}
        </h4>
      </Link>

      <p className="text-sm text-gray-600 mt-1">Mô tả ngắn về bài viết...</p>
      <p className="text-xs text-gray-500 mt-1">Tác giả: Carmen</p>
    </div>
  ))}
</div>


<div className="flex flex-col gap-4">
  {[1, 2, 3].map((i) => (
    <div key={i} className="border p-3 rounded shadow">
      <img
        src={`/images/bacsi${i}.jpg`} 
        alt={`Bài viết ${i}`}
        className="rounded mb-2 w-full object-cover"
      />
      <p className="text-xs text-gray-500">📅 20/05/2025</p>
      <h4 className="font-semibold text-md mt-1">Bài viết {i}</h4>
      <p className="text-xs text-gray-500 mt-1">Tác giả: Carmen</p>
    </div>
  ))}
</div>

        {/* Col 4 - Xu hướng */}
        <div className="border p-4 rounded shadow h-fit">
          <h4 className="font-bold mb-4 text-lg">📈 Xu hướng</h4>
          <ul className="space-y-2 text-sm">
            <li>🌟 Bài viết nổi bật nhất tháng này</li>
            <li>📌 10 mẹo chăm sóc sức khỏe hiệu quả</li>
            <li>💡 Cách nhận biết dấu hiệu sớm của bệnh</li>
            <li>🔍 Tại sao nên kiểm tra sức khỏe định kỳ?</li>
            <li>✨ Lời khuyên từ chuyên gia</li>
          </ul>
        </div>
      </section>

      {/* Pagination */}
      <div className="flex justify-center mt-10 space-x-2">
        <button className="px-3 py-1 border rounded">1</button>
        <button className="px-3 py-1 border rounded bg-blue-500 text-white">2</button>
        <button className="px-3 py-1 border rounded">3</button>
      </div>
    </div>
  );
};

export default Blog;
