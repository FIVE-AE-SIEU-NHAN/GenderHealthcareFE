import React from "react";

import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Prescription: React.FC = () => {
  return (
    <div className="font-sans">
      {/* Banner */}
      <section className="bg-blue-100 py-0 text-center">
        <div className="relative w-full">
          <img src="/images/banner_blog.png" alt="" className="rounded w-full" />
          <div className="absolute inset-0 w-full bg-[#1A2159]/70 flex flex-col items-center justify-center">
            <h2 className="text-6xl font-bold text-white">Prescriptions</h2>
            <p className="text-sm mt-3">
              <span className="text-white">Services</span>
              <span className="text-[#55AEFF]"> &gt; Prescription</span>
            </p>
          </div>
        </div>
      </section>

      {/* Cards */}
      <div className="max-w-7xl mx-auto p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition duration-300">
            <img src="/images/imgPrescription.webp" alt="" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-base font-semibold mb-2">Ketamin 5k$/1kg</h3>
              <Link to={"#"}>
                  <Button className="mx-auto block w-1/2 bg-[#1A3973] text-white font-semibold rounded-md mt-5">
                    Select product 
                  </Button>
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition duration-300">
            <img src="/images/imgPrescription.webp" alt="" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-base font-semibold mb-2">Ketamin 5k$/1kg</h3>
              <Link to={"#"}>
                  <Button className="mx-auto block w-1/2 bg-[#1A3973] text-white font-semibold rounded-md mt-5">
                    Select product 
                  </Button>
              </Link>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition duration-300">
            <img src="/images/imgPrescription.webp" alt="" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-base font-semibold mb-2">Ketamin 5k$/1kg</h3>
              <Link to={"#"}>
                  <Button className="mx-auto block w-1/2 bg-[#1A3973] text-white font-semibold rounded-md mt-5">
                    Select product 
                  </Button>
              </Link>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition duration-300">
            <img src="/images/imgPrescription.webp" alt="" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-base font-semibold mb-2">Ketamin 5k$/1kg</h3>
              <Link to={"#"}>
                  <Button className="mx-auto block w-1/2 bg-[#1A3973] text-white font-semibold rounded-md mt-5">
                    Select product 
                  </Button>
              </Link>
            </div>
          </div>

          {/* Card 5 */}
          <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition duration-300">
            <img src="/images/imgPrescription.webp" alt="" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-base font-semibold mb-2">Ketamin 5k$/1kg</h3>
              <Link to={"#"}>
                  <Button className="mx-auto block w-1/2 bg-[#1A3973] text-white font-semibold rounded-md mt-5">
                    Select product 
                  </Button>
              </Link>
            </div>
          </div>

          {/* Card 6 */}
          <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition duration-300">
            <img src="/images/imgPrescription.webp" alt="" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-base font-semibold mb-2">Ketamin 5k$/1kg</h3>
              <Link to={"#"}>
                  <Button className="mx-auto block w-1/2 bg-[#1A3973] text-white font-semibold rounded-md mt-5">
                    Select product 
                  </Button>
              </Link>
            </div>
          </div>

          {/* Card 7 */}
          <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition duration-300">
            <img src="/images/imgPrescription.webp" alt="" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-base font-semibold mb-2">Ketamin 5k$/1kg</h3>
              <Link to={"#"}>
                  <Button className="mx-auto block w-1/2 bg-[#1A3973] text-white font-semibold rounded-md mt-5">
                    Select product 
                  </Button>
              </Link>
            </div>
          </div>

          {/* Card 8 */}
          <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition duration-300">
            <img src="/images/imgPrescription.webp" alt="" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-base font-semibold mb-2">Ketamin 5k$/1kg</h3>
              <Link to={"#"}>
                  <Button className="mx-auto block w-1/2 bg-[#1A3973] text-white font-semibold rounded-md mt-5">
                    Select product 
                  </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-10 space-x-2">
          <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">1</button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded">2</button>
          <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">3</button>
          <span className="px-3 py-1">...</span>
          <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">8</button>
        </div>
      </div>
    </div>
  );
};

export default Prescription;
