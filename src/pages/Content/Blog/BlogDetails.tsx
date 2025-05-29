import React from 'react'


import { IoPerson } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { FaTags } from "react-icons/fa6";
import { BsListOl } from "react-icons/bs";

const BlogDetails: React.FC = () => {
  return (
    <div className='font-sans text-gray-800'>
      {/* Banner */}
      <section className='bg-blue-100 py-0 text-center'>
        <div className='relative w-full'>
          <img src='/images/banner_blog.png' alt='' className='rounded w-full' />
          <div className='absolute inset-0 w-full bg-[#1A2159]/70 flex flex-col items-center justify-center'>
            <h2 className='text-6xl font-bold text-white'>Our Blogs</h2>
            <p className='text-sm mt-3'>
              <span className='text-white'>Home</span>
              <span className='text-[#55AEFF]'> &gt; Blog &gt; Blog Details</span>
            </p>
          </div>
        </div>
      </section>

      <div className='max-w-6xl mx-auto mt-10 pb-16 grid grid-cols-1 lg:grid-cols-4 gap-8'>
        {/* Main content */}
        <div className='lg:col-span-3 space-y-6'>
          {/* Title */}
          <h1 className='text-3xl font-bold '>lorem ipsum lorem ipsum lorem ipsum lorem </h1>

          {/* Meta info */}
          <div className='flex flex-wrap items-center gap-4 text-sm'>
            <span className='flex items-center gap-1'>
              <IoPerson className='text-blue-500 text-lg' />
              <span>Tác giả: Nguyễn Văn A</span>
            </span>
            <span className='flex items-center gap-1'>
              <FaCalendarAlt className='text-blue-500 text-lg' />
              <span>20/05/2025</span>
            </span>
            <span className='flex items-center gap-1'>
              <FaTags className='text-blue-500 text-lg' />
              <span>Tags: Sức khỏe, Y tế</span>
            </span>
          </div>

          {/* Table of contents */}
          <div className='bg-[#EAF3FF] p-4 rounded'>
            <h3 className='font-semibold mb-2 flex items-center gap-1'>
              <BsListOl className='text-blue-500 text-2xl' />
              <span>Table of Content</span>
            </h3>
            
            {/* Phần giới thiệu */}
            <div className='mb-3 text-sm text-gray-600'>
              <p>lorem ipsum lorem ipsum lorem ipsum lorem ipsum</p>
              <p>lorem ipsum lorem ipsum lorem ipsum lorem ipsum</p>
            </div>
            
            {/* Danh sách mục lục */}
            <ul className='list-disc list-inside text-sm space-y-1'>
              <li className='hover:text-blue-500 cursor-pointer'>Nội dung chính</li>
              <li className='hover:text-blue-500 cursor-pointer'>Tổng quan về vấn đề</li>
              <li className='hover:text-blue-500 cursor-pointer'>Phân tích chi tiết</li>
              <li className='hover:text-blue-500 cursor-pointer'>Kết luận</li>
            </ul>
          </div>

          {/* Summary */}
          <div>
            <h3 className='font-semibold text-xl mb-2'>Tóm tắt nội dung</h3>
            <p className='text-gray-700 text-sm leading-relaxed'>
              Đây là phần mô tả tóm tắt nội dung bài viết giúp người đọc nắm nhanh thông tin quan trọng.
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
            </p>
          </div>

          {/* Section 1 */}
          <div>
            <h3 className='text-xl font-semibold mb-2'>1. Nội dung chính</h3>
            <p className='text-gray-700 text-sm mb-3'>
              Nội dung chi tiết phần chính của bài viết trình bày ở đây. Có thể chứa các phân tích hoặc thông tin chuyên
              sâu.
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
            </p>
            <img src='/images/demo1.jpg' alt='' className='rounded w-full' />
          </div>

          {/* Section 2 */}
          <div>
            <h3 className='text-xl font-semibold mb-2'>2. Phân tích chi tiết</h3>
            <p className='text-gray-700 text-sm mb-3'>
              Đây là phần mở rộng thông tin kèm dẫn chứng, hình ảnh hoặc đồ thị.
              Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy
            </p>
            <img src='/images/bacsi1.jpg' alt='' className='rounded w-full' />
          </div>

          {/* Section 3 */}
          <div>
            <h3 className='text-xl font-semibold mb-2'>3. Kết luận</h3>
            <p className='text-gray-700 text-sm'>Tóm gọn lại ý chính, đưa ra kết luận và lời khuyên cuối bài viết.
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className='space-y-4'>
          <h2 className='font-bold text-lg mb-2'>RECENT POST</h2>
          <ul className='space-y-3 text-sm'>
            <li className='border-b pb-4'>
              <a href='#' className='flex hover:text-blue-500'>
                <div className='w-20 h-20 min-w-20 mr-2'>
                  <img src="/images/ab1.webp" alt="" className='w-full h-full object-cover rounded' />
                </div>
                <div className="font-medium flex flex-col">
                  <div className='flex items-center gap-1 mb-1'>
                    <FaCalendarAlt className='text-blue-500 text-lg' />
                    <span>May 20, 2025</span>
                  </div>
                  <div>Cometes contabesco audacia aeneus tui canonicus</div>
                </div>
              </a>
            </li>
            <li className='border-b pb-4'>
              <a href='#' className='flex hover:text-blue-500'>
                <div className='w-20 h-20 min-w-20 mr-2'>
                  <img src="/images/ab2.webp" alt="" className='w-full h-full object-cover rounded'/>
                </div>
                <div className="font-medium flex flex-col">
                  <div className='flex items-center gap-1 mb-1'>
                    <FaCalendarAlt className='text-blue-500 text-lg' />
                    <span>May 15, 2025</span>
                  </div>
                  <div>Cometes contabesco audacia aeneus tui canonicus</div>
                </div>
              </a>
            </li>
            <li className='border-b pb-4'>
              <a href='#' className='flex hover:text-blue-500'>
                <div className='w-20 h-20 min-w-20 mr-2'>
                  <img src="/images/bacsi1.jpg" alt="" className='w-full h-full object-cover rounded'/>
                </div>
                <div className="font-medium flex flex-col">
                  <div className='flex items-center gap-1 mb-1'>
                    <FaCalendarAlt className='text-blue-500 text-lg' />9
                    <span>April 02, 2025</span>
                  </div>
                  <div>Cometes contabesco audacia aeneus tui canonicus</div>
                </div>
              </a>
            </li>
            <li>
              <a href='#' className='flex hover:text-blue-500'>
                <div className='w-20 h-20 min-w-20 mr-2'>
                  <img src="/images/bacsi3.jpg" alt="" className='w-full h-full object-cover rounded'/>
                </div>
                <div className="font-medium flex flex-col">
                  <div className='flex items-center gap-1 mb-1'>
                    <FaCalendarAlt className='text-blue-500 text-lg' />
                    <span>March 28, 2025</span>
                  </div>
                  <div>Cometes contabesco audacia aeneus tui canonicus</div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default BlogDetails