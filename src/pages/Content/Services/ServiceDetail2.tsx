import React from "react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

const ServiceDetail = () => {
  return (
    <div>
      <div className="mb-15">
        {/* Banner */}
        <section className="bg-blue-100 py-0 text-center">
          <div className="relative w-full">
            <img src="/images/banner_blog.png" alt="" className="rounded w-full" />
            <div className="absolute inset-0 w-full bg-[#1A2159]/70 flex flex-col items-center justify-center">
              <h2 className="text-6xl font-bold text-white">Service</h2>
              <p className="text-sm mt-3">
                <span className="text-white">Home</span>
                <span className="text-[#55AEFF]">
                  {" "}
                  &gt; Service &gt; Hormone therapy counseling for transgender people
                </span>
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-4">
          Hormone Therapy Counseling for Transgender People
        </h1>

        {/* Short description */}
        <p className="text-center text-gray-600 mb-6">
          We accompany you on your journey to express your gender identity safely and scientifically.
        </p>

        {/* Illustration */}
        <img
          src="/images/bs2.webp"
          alt="Hormone therapy illustration"
          className="rounded-2xl shadow mb-8 w-full h-64 object-cover"
        />

        {/* Service details */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2">Who is this for?</h2>
              <p>
                For transgender people (MTF or FTM) who are considering or starting hormone therapy.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2">Consultation Process</h2>
              <ol className="list-decimal list-inside space-y-1">
                <li>Book an appointment and submit your personal information.</li>
                <li>Consult online or in person with a doctor.</li>
                <li>Take hormone tests if necessary.</li>
                <li>Create a personalized treatment plan.</li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2">Notes & Privacy</h2>
              <p>
                All information will be kept strictly confidential. You can choose a doctor of the same gender or with LGBTQ+ experience.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* FAQ */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="q1" title="Do I need to take tests beforehand?">
              Blood tests may be necessary to determine your current hormone levels before starting.
            </AccordionItem>
            <AccordionItem value="q2" title="Do the doctors have experience with transgender people?">
              Yes, all our specialists are trained in LGBTQ+ healthcare.
            </AccordionItem>
          </Accordion>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button className="px-6 py-3 text-lg rounded-2xl shadow bg-purple-600 hover:bg-purple-700 text-white">
            Book a Consultation Now
          </Button>
        </div>

        {/* Related services */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">You may be interested in</h2>
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
