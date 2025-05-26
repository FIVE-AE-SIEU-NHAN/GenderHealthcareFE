import React from "react";

import { Link } from 'react-router-dom';

import { Button } from "@/components/ui/button";

const RequireLoginBooking: React.FC = () => {
    return (

        <div>

            <div>
                <section className='bg-blue-100 py-0 text-center'>
                    <div className='relative w-full'>
                    <img src='/images/banner_blog.png' alt='' className='rounded w-full' />
                    <div className='absolute inset-0 w-full bg-[#1A2159]/70 flex flex-col items-center justify-center'>
                        <h2 className='text-6xl font-bold text-white'>Our Blogs</h2>
                        <p className='text-sm mt-3'>
                        <span className='text-white'>Home</span>
                        <span className='text-[#55AEFF]'> &gt; BookingService</span>
                        </p>
                    </div>
                    </div>
                </section>
            </div>

            <div> 
                <form className="w-full max-w-2xl mx-auto space-y-6 p-6 bg-white shadow-2xl rounded-xl mt-15 mb-20">
                        <div className="text-4xl text-[#1C2359] font-bold text-center">Reproductive health care services</div>
                        <div className="text-xl text-[#1C2359] font-bold text-center-left">The professionalism and efficiency of the clinic made my visit
                            smooth and stress-free. I highly recommend Dr. Jakob Smith
                            and Medova to anyone in need of top-quality medical care.
                        </div>
                        <p className="text-sm text-[#1C2359] font-bold text-center mb-5">Please log in or register to use sexual health care and counseling services.</p>
                        <div className="gap-3 flex justify-center items-center">
                            
                            <Link to={"/login"} className="bg-dark-blue text-white px-6 py-2 rounded-button hover:bg-blue-800 transition duration-200 font-semibold">
                                Log In
                            </Link>
                            <p className="flex items-center my-0 text-[#4A4A4A] font-semibold">or</p>
                            <Link to={"/signup"} className="border-2 border-dark-blue text-dark-blue px-4 py-2 rounded-button hover:bg-blue-50 transition duration-200 font-semibold">
                                Sign Up
                            </Link>
                        </div>
                </form>
            </div>

        </div>
    );

}

export default RequireLoginBooking;