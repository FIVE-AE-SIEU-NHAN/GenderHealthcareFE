import React from 'react';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight, FaHeartbeat } from 'react-icons/fa';
import Doctors from "@/pages/Common/Home/components/Doctors";

const coreValues = [
    {
        title: 'Comprehensive Gender Care at Care4Gender',
        image: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'We provide inclusive and comprehensive healthcare services for all gender identities, ensuring safe and respectful treatment for everyone.',
    },
    {
        title: 'Confidential Consultation at Care4Gender',
        image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 
        description: 'Private and confidential consultations with experienced specialists who understand gender-specific health needs and concerns.',
    },
    {
        title: 'Expert Sexual Health at Care4Gender',
        image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Professional sexual and reproductive health services including STI testing, contraception advice, and fertility consultations.',
    },
];

const testimonial = {
    name: 'Nguyen Thi Mai',
    role: 'Patient',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    message: 'Care4Gender provided me with exceptional support during my health journey. The doctors were understanding, professional, and made me feel completely comfortable discussing sensitive topics. I highly recommend their services to anyone seeking quality gender healthcare.',
};

export default function CoreValuesTestimonials() {
    return (
        <div className="bg-gray-50">
            {/* Core Values Section */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <p className="section-text flex gap-4 items-center justify-center">
                            <FaHeartbeat /> CARE4GENDER VALUES
                        </p>
                        <div className="font-semibold text-shadow-md font-outfit text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-dark-blue leading-snug">
                            <h2>
                                Our Core <span className="font-normal">Values</span>
                            </h2>
                            <div>at <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-400 text-transparent bg-clip-text">Care4Gender</span></div>
                        </div>
                        <p className="text-gray-600 text-lg mt-4 max-w-3xl mx-auto">
                            Committed to providing inclusive, respectful, and comprehensive healthcare for all gender identities
                        </p>
                    </div>

                    {/* Values Grid */}
                    <div className="grid md:grid-cols-3 gap-8">
                        {coreValues.map((value, index) => (
                            <div
                                key={value.title}
                                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                            >
                                <div className="h-64 overflow-hidden">
                                    <img 
                                        src={value.image} 
                                        alt={value.title} 
                                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        {value.title.split(' at ')[0]}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
                {/* Background avatars */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-20 left-10 w-16 h-16 bg-blue-200 rounded-full"></div>
                    <div className="absolute top-40 right-20 w-12 h-12 bg-purple-200 rounded-full"></div>
                    <div className="absolute bottom-20 left-20 w-14 h-14 bg-pink-200 rounded-full"></div>
                    <div className="absolute bottom-40 right-10 w-16 h-16 bg-indigo-200 rounded-full"></div>
                    <div className="absolute top-60 left-1/2 w-10 h-10 bg-green-200 rounded-full"></div>
                    <div className="absolute bottom-60 right-1/3 w-16 h-16 bg-yellow-200 rounded-full"></div>
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    {/* Header */}
                    <div className="mb-12">
                        <p className="section-text flex gap-4 items-center justify-center">
                            <FaHeartbeat /> PATIENT TESTIMONIALS
                        </p>
                        <div className="font-semibold text-shadow-md font-outfit text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-dark-blue leading-snug">
                            <h2>
                                What Our <span className="font-normal">Patients Say</span>
                            </h2>
                            <div>About <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-400 text-transparent bg-clip-text">Care4Gender</span></div>
                        </div>
                        <p className="text-gray-600 text-lg mt-4">
                            Real experiences from our valued patients
                        </p>
                    </div>

                    {/* Testimonial Card */}
                    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-3xl mx-auto relative">
                        <div className="absolute -top-6 left-8">
                            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                                <FaQuoteLeft className="text-white text-xl" />
                            </div>
                        </div>
                        
                        <div className="pt-6">
                            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 italic">
                                "{testimonial.message}"
                            </p>
                            
                            <div className="flex items-center justify-start gap-4">
                                <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden relative">
                                    <img 
                                        src={testimonial.avatar} 
                                        alt={testimonial.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.style.display = 'none';
                                            const fallback = target.parentNode?.querySelector('.fallback-avatar') as HTMLElement;
                                            if (fallback) {
                                                fallback.style.display = 'flex';
                                            }
                                        }}
                                    />
                                    <div className="fallback-avatar absolute inset-0 w-full h-full bg-blue-500 rounded-full items-center justify-center text-white font-bold text-xl hidden">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-gray-900 text-lg">
                                        {testimonial.name}
                                    </p>
                                    <p className="text-gray-500 text-sm">
                                        {testimonial.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Controls */}
                    <div className="mt-8 flex justify-center gap-4">
                        <button className="w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-110">
                            <FaChevronLeft />
                        </button>
                        <button className="w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-110">
                            <FaChevronRight />
                        </button>
                    </div>
                </div>
            </section>

            {/* Doctors Section */}
            <Doctors />
        </div>
    );
}
