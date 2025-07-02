import React, { useEffect, useRef } from 'react';
import { 
  Heart, 
  Shield, 
  Users, 
  Award, 
  Target, 
  Lock,
  Sparkles,
  UserCheck,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

interface StatItemProps {
  number: string;
  label: string;
}

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const StatItem: React.FC<StatItemProps> = ({ number, label }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center p-6">
      <div 
        className={`text-5xl font-bold mb-3 transition-all duration-1000 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        }`}
      >
        {number}
      </div>
      <div className="text-lg opacity-90">{label}</div>
    </div>
  );
};

const ValueCard: React.FC<ValueCardProps> = ({ icon, title, description }) => {
  return (
    <div className="group bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-2xl text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#1A3973]/20 border border-[#1A3973]/10">
      <div className="w-16 h-16 bg-gradient-to-r from-[#1A3973] to-[#2c5282] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-slate-800 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
};

const AboutUsPage: React.FC = () => {
  const values = [
    {
      icon: <Users />,
      title: "Inclusivity",
      description: "We welcome all individuals regardless of gender identity, sexual orientation, race, or background, fostering an environment of acceptance and belonging."
    },
    {
      icon: <Target />,
      title: "Excellence",
      description: "We maintain the highest standards of medical care, continuously updating our practices based on the latest research and best practices."
    },
    {
      icon: <Heart />,
      title: "Compassion",
      description: "Every interaction is guided by empathy, understanding, and respect for each individual's unique journey and healthcare needs."
    },
    {
      icon: <Lock />,
      title: "Privacy",
      description: "We ensure complete confidentiality and create safe spaces where patients can discuss their health concerns openly and without judgment."
    },
    {
      icon: <Sparkles />,
      title: "Empowerment",
      description: "We believe in empowering our patients with knowledge, resources, and support to make informed decisions about their healthcare."
    },
    {
      icon: <UserCheck />,
      title: "Community",
      description: "We actively engage with and support the broader LGBTQ+ community through outreach, education, and advocacy efforts."
    }
  ];

  const stats = [
    { number: "5,000+", label: "Patients Served" },
    { number: "15+", label: "Healthcare Specialists" },
    { number: "98%", label: "Patient Satisfaction" },
    { number: "6", label: "Years of Excellence" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A3973] to-[#2c5282]">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        
        {/* Hero Section */}
        <div className="relative bg-white/95 backdrop-blur-lg rounded-3xl p-12 md:p-16 text-center mb-12 shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1A3973]/5 to-transparent animate-pulse"></div>
          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#1A3973] to-[#2c5282] bg-clip-text text-transparent mb-6 leading-tight">
              Gender Health Care Center
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-8 font-medium">
              Comprehensive, Compassionate, Affirming Care
            </p>
            <p className="text-lg text-slate-700 max-w-4xl mx-auto leading-relaxed">
              We are dedicated to providing exceptional healthcare services that affirm and support individuals across the gender spectrum. Our mission is to create a safe, inclusive environment where every patient receives personalized, evidence-based care with dignity and respect.
            </p>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 md:p-12 mb-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 relative">
            Our Story
            <div className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-[#1A3973] to-[#2c5282] rounded-full"></div>
          </h2>
          <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
            <p>
              Founded in 2018, Gender Health Care Center emerged from a recognized need for specialized, affirming healthcare services in our community. Our multidisciplinary team of healthcare professionals came together with a shared vision: to bridge the gap in gender-specific healthcare and provide comprehensive support for individuals on their health journey.
            </p>
            <p>
              What started as a small clinic has grown into a leading center of excellence, serving thousands of patients and pioneering innovative approaches to gender health. We've built partnerships with leading medical institutions and continue to advance research in gender-affirming care.
            </p>
          </div>
        </div>

        {/* Our Values Section */}
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 md:p-12 mb-8 shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8 relative">
            Our Values
            <div className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-[#1A3973] to-[#2c5282] rounded-full"></div>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <ValueCard
                key={index}
                icon={value.icon}
                title={value.title}
                description={value.description}
              />
            ))}
          </div>
        </div>

        {/* Statistics Section */}
        <div className="bg-gradient-to-r from-[#1A3973] to-[#2c5282] text-white text-center p-12 md:p-16 rounded-3xl mb-8 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
          <p className="text-xl opacity-90 mb-12">Making a difference in our community through dedicated care</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StatItem key={index} number={stat.number} label={stat.label} />
            ))}
          </div>
        </div>

        {/* Our Services Section */}
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 md:p-12 mb-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 relative">
            Our Services
            <div className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-[#1A3973] to-[#2c5282] rounded-full"></div>
          </h2>
          <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
            <p>
              We offer a comprehensive range of gender-affirming healthcare services, including hormone therapy, surgical consultations, mental health support, fertility preservation, and preventive care. Our multidisciplinary approach ensures that each patient receives coordinated, holistic care tailored to their individual needs and goals.
            </p>
            <p>
              Our team includes endocrinologists, surgeons, mental health professionals, nurses, and support staff who are specially trained in gender health. We work collaboratively to provide seamless care transitions and ongoing support throughout each patient's healthcare journey.
            </p>
          </div>
        </div>

        {/* Our Commitment Section */}
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 md:p-12 mb-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 relative">
            Our Commitment
            <div className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-[#1A3973] to-[#2c5282] rounded-full"></div>
          </h2>
          <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
            <p>
              We are committed to advancing the field of gender health through continuous education, research, and advocacy. We regularly participate in professional development, contribute to medical literature, and collaborate with other healthcare institutions to improve standards of care.
            </p>
            <p>
              Our center is also dedicated to training the next generation of healthcare providers in gender-affirming care practices, helping to expand access to quality care in our region and beyond.
            </p>
          </div>
          
          <div className="mt-8 p-6 bg-slate-50 rounded-2xl">
            <div className="flex items-center gap-4 text-slate-800">
              <Award className="text-[#1A3973] flex-shrink-0" size={24} />
              <div>
                <p className="font-semibold">Accreditations:</p>
                <p className="text-slate-600">Joint Commission Certified • WPATH Standards of Care Compliant • LGBTQ+ Healthcare Equality Index Leader</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white text-center p-12 md:p-16 rounded-3xl shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Begin Your Journey?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Take the first step toward affirming, comprehensive healthcare. Our team is here to support you every step of the way.
          </p>
          <button className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#1A3973] to-[#2c5282] text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#1A3973]/40">
            Schedule a Consultation
            <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={20} />
          </button>
          
          <div className="flex items-center justify-center gap-6 mt-8 text-sm opacity-75">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} />
              <span>Confidential</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={16} />
              <span>Safe Space</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart size={16} />
              <span>Affirming Care</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;