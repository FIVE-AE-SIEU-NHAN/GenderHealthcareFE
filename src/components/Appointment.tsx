import React from 'react';

const Appointment: React.FC = () => {
  return (
    <section id="appointment" className="py-16 bg-teal-50">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center md:items-start gap-12 max-w-7xl">
        
        {/* Left: Large Portrait */}
        <div className="w-full md:w-1/2">
          <img
            src="/images/bacsi1.jpg" 
            alt="Portrait"
            className="rounded-lg shadow-lg object-cover w-full h-[500px]"
          />
        </div>

        {/* Right: Appointment Form */}
        <div className="w-full md:w-1/2 bg-white p-10 rounded-lg shadow-lg">
          <h2 className="text-4xl font-extrabold text-teal-700 mb-8">Make an Appointment</h2>
          <form className="space-y-6">
            <input
              type="text"
              placeholder="Full Name"
              className="border border-teal-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="border border-teal-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="date"
              className="border border-teal-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <select
              className="border border-teal-300 rounded-md p-3 w-full bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option>General Health</option>
              <option>Cardiology</option>
              <option>Dental</option>
              <option>Medical Research</option>
            </select>
            <input
              type="tel"
              placeholder="Phone"
              className="border border-teal-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <textarea
              placeholder="Message"
              rows={4}
              className="border border-teal-300 rounded-md p-3 w-full resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-teal-600 text-white font-semibold p-4 rounded-md hover:bg-teal-700 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Appointment;
