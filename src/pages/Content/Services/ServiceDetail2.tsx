import React from "react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { FaHeartbeat } from "react-icons/fa";

const ServiceDetail = () => {
  return (
    <div>
      {/* Banner */}
      <div className="mb-15">
        <section className="bg-[#1A3973] py-0 text-center">
          <div className="relative w-full">
            <img src="/images/banner_blog.png" alt="" className="rounded w-full" />
            <div className="absolute inset-0 w-full bg-[#1A3973]/70 flex flex-col items-center justify-center">
              <h2 className="text-6xl font-bold text-white">Service</h2>
              <p className="text-sm mt-3">
                <span className="text-white">Home</span>
                <span className="text-[#55AEFF]">
                  {" "}
                  &gt; Service &gt; Hormone therapy service for transgender people
                </span>
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-4 text-[#1A3973]">
          Hormone Therapy Service for Transgender People
        </h1>

        {/* Short description */}
        <p className="text-center text-gray-600 mb-6">
          We accompany you on your journey to express your gender identity safely and scientifically.
        </p>

        {/* Illustration */}
        <img
          src="/images/bs2.webp"
          alt="Hormone therapy illustration"
          className="rounded-2xl shadow-lg mb-4 w-full h-64 object-cover"
        />

        {/* Pricing & Book Button */}
        <div className="border border-[#1A3973]/30 rounded-2xl shadow p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-xl font-semibold text-[#1A3973]">Service Price</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">$49.99</p>
          </div>
          <Link to="/booking-form2">
            <Button
              className="min-w-[220px] px-8 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-[#1A3973] to-[#4F80E1] 
             hover:from-[#15305f] hover:to-[#3a6ad0] text-white text-lg sm:text-xl font-semibold 
             rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
              <span className="absolute inset-0 w-full h-full bg-white/10 -skew-x-12 -translate-x-full 
                               group-hover:translate-x-full transition-transform duration-700"></span>
              <div className="absolute inset-0 flex items-center justify-center">
                <FaHeartbeat className="mr-2" />
                <span>Book Consultant</span>
              </div>
            </Button>
          </Link>
        </div>

        {/* Service details */}
        <div className="space-y-6">
          <Card className="shadow border border-[#1A3973]/30">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2 text-[#1A3973]">Who is this for?</h2>
              <p>
                For transgender people (MTF or FTM) who are considering or starting hormone therapy.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow border border-[#1A3973]/30">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2 text-[#1A3973]">Service Workflow</h2>
              <ol className="list-decimal list-inside space-y-1">
                <li>Register for the service and provide your personal information.</li>
                <li>Receive guidance for hormone-related evaluations.</li>
                <li>Submit necessary health records or hormone test results.</li>
                <li>Receive a personalized hormone therapy plan.</li>
              </ol>
            </CardContent>
          </Card>

          <Card className="shadow border border-[#1A3973]/30">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2 text-[#1A3973]">Privacy & Support</h2>
              <p>
                All information is strictly confidential. Our team includes professionals with LGBTQ+ healthcare experience to ensure respectful and informed service.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* FAQ */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4 text-[#1A3973]">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="q1" title="Do I need to take tests beforehand?">
              Blood tests may be necessary to determine your current hormone levels before starting.
            </AccordionItem>
            <AccordionItem value="q2" title="Is this service inclusive for transgender people?">
              Yes, it is specifically designed to support transgender individuals with sensitivity and care.
            </AccordionItem>
          </Accordion>
        </div>



        {/* Related services */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4 text-[#1A3973]">You may be interested in</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Regular gynecological exams for transgender women</li>
            <li>Gender identity psychological support</li>
            <li>Legal counseling for gender change</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
