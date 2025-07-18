import React, { useState, useEffect } from 'react';
import backgroundImage from '@/assets/images/ser-bg.webp';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

// --- Interfaces and Mock Data (Unchanged) ---
interface Service {
  name: string;
  code: string;
  price: number;
}
interface ServicePacket {
  id: string;
  name: string;
  description: string | null;
  price: number;
  target_gender: 'male' | 'female';
  level: 'basic' | 'advanced';
  services: Service[];
}
const mockApiResponse = {
  message: "Test service packets retrieved successfully",
  result: [
    {
      id: "83cf0d76-637e-11f0-bfde-0242ac110002",
      name: "Basic package for men",
      description: null,
      price: 500000,
      target_gender: "male" as const,
      level: "basic" as const,
      services: [
        { name: "HIV test", code: "HIV", price: 200000 },
        { name: "Syphilis test", code: "SYPHILIS", price: 180000 },
        { name: "Gonorrhea test", code: "GONORRHEA", price: 150000 },
        { name: "Chlamydia test", code: "CHLAMYDIA", price: 150000 },
      ],
    },
    {
      id: "83cf134d-637e-11f0-bfde-0242ac110002",
      name: "Advanced package for men",
      description: null,
      price: 950000,
      target_gender: "male" as const,
      level: "advanced" as const,
      services: [
        { name: "HIV test", code: "HIV", price: 200000 },
        { name: "Syphilis test", code: "SYPHILIS", price: 180000 },
        { name: "Gonorrhea test", code: "GONORRHEA", price: 150000 },
        { name: "Chlamydia test", code: "CHLAMYDIA", price: 150000 },
        { name: "Herpes test", code: "HSV", price: 220000 },
        { name: "Hepatitis B test", code: "HBV", price: 180000 },
        { name: "Hepatitis C test", code: "HCV", price: 200000 },
        { name: "Mycoplasma test", code: "MYCOPLASMA", price: 190000 },
      ],
    },
    {
      id: "83cf1469-637e-11f0-bfde-0242ac110002",
      name: "Basic package for women",
      description: null,
      price: 500000,
      target_gender: "female" as const,
      level: "basic" as const,
      services: [
        { name: "HIV test", code: "HIV", price: 200000 },
        { name: "Syphilis test", code: "SYPHILIS", price: 180000 },
        { name: "Gonorrhea test", code: "GONORRHEA", price: 150000 },
        { name: "Chlamydia test", code: "CHLAMYDIA", price: 150000 },
      ],
    },
    {
      id: "83cf14e0-637e-11f0-bfde-0242ac110002",
      name: "Advanced package for women",
      description: null,
      price: 1100000,
      target_gender: "female" as const,
      level: "advanced" as const,
      services: [
        { name: "HIV test", code: "HIV", price: 200000 },
        { name: "Syphilis test", code: "SYPHILIS", price: 180000 },
        { name: "Gonorrhea test", code: "GONORRHEA", price: 150000 },
        { name: "Chlamydia test", code: "CHLAMYDIA", price: 150000 },
        { name: "HPV test", code: "HPV", price: 300000 },
        { name: "Herpes test", code: "HSV", price: 220000 },
        { name: "Hepatitis B test", code: "HBV", price: 180000 },
        { name: "Hepatitis C test", code: "HCV", price: 200000 },
        { name: "Trichomonas test", code: "TRICHOMONAS", price: 160000 },
      ],
    },
  ],
};


const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};


const ServiceList: React.FC = () => {
  const [packets, setPackets] = useState<ServicePacket[]>([]);
  const [filteredPackets, setFilteredPackets] = useState<ServicePacket[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'male' | 'female'>('all');

  useEffect(() => {
    setPackets(mockApiResponse.result);
  }, []);

  useEffect(() => {
    if (activeTab === 'all') {
      const getSortOrder = (packet: ServicePacket) => {
        if (packet.target_gender === 'male' && packet.level === 'basic') return 1;
        if (packet.target_gender === 'male' && packet.level === 'advanced') return 2;
        if (packet.target_gender === 'female' && packet.level === 'advanced') return 3;
        if (packet.target_gender === 'female' && packet.level === 'basic') return 4;
        return 5;
      };
      const sorted = [...packets].sort((a, b) => getSortOrder(a) - getSortOrder(b));
      setFilteredPackets(sorted);
    } else {
      const filtered = packets.filter(p => p.target_gender === activeTab);
      setFilteredPackets(filtered);
    }
  }, [activeTab, packets]);


  return (
    <>
      <section
        className="py-12 text-center bg-cover bg-center h-[150px] relative flex flex-col items-center justify-center bg-[url('@/assets/images/blog1.webp')]"
      >
        <h2 className="text-5xl text-white font-bold">Services</h2>
        <p className="text-sm mt-2">
          <span className="text-white">Home</span>
          <span style={{ color: '#55AEFF' }}> / Services List</span>
        </p>
      </section>

      <section
        className="relative bg-brand-bg-light py-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-7">
            <h1
              className="text-4xl md:text-5xl font-extrabold mb-4 tracking-wide"
              style={{ color: '#1C2359' }}
            >
              STIs Testing Services
            </h1>
            <p className="text-lg md:text-xl text-brand-gray max-w-3xl mx-auto">
              Choose the right testing package for you.
            </p>
          </div>

          <div className="flex justify-center space-x-2 mb-10">
            <Button variant={activeTab === 'all' ? 'default' : 'outline'} onClick={() => setActiveTab('all')}>All</Button>
            <Button variant={activeTab === 'male' ? 'default' : 'outline'} onClick={() => setActiveTab('male')}>For men</Button>
            <Button variant={activeTab === 'female' ? 'default' : 'outline'} onClick={() => setActiveTab('female')}>For women</Button>
          </div>


          <div className="mx-auto px-4 pb-16 sm:px-6 lg:px-8 lg:py-8">
            <div className={cn(
              "gap-8",
              activeTab === 'all'
                ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4'
                : 'flex flex-wrap justify-center'
            )}>
              {filteredPackets.map((pkg) => (
                <Card
                  key={pkg.id}
                  className={cn(
                    "relative p-5 flex flex-col transition-all duration-300",
                    pkg.level === 'advanced'
                      ? "ring-2 ring-blue-400 lg:scale-105 z-10"
                      : "z-0",
                    activeTab === 'all'
                      ? ''
                      : 'sm:w-[350px]'
                  )}
                >
                  {pkg.level === 'advanced' && (
                    <Badge variant="default" className="absolute -top-3 left-1/2 -translate-x-1/2">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center p-0">
                    <CardTitle className="text-xl whitespace-nowrap">{pkg.name}</CardTitle>
                    <div className="text-3xl font-bold text-medical-600">{formatCurrency(pkg.price)}</div>
                    <CardDescription className="capitalize">
                      {pkg.level}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex flex-col flex-1 space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Includes the following tests:</h4>
                      <ul className="space-y-1">
                        {pkg.services.map((service, testIndex) => (
                          <li key={testIndex} className="flex items-center text-sm">
                            <CheckCircle className="h-4 w-4 text-blue-700 mr-2 flex-shrink-0" />
                            <span>{service.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex-1"></div>
                    <Button
                      className="w-full mt-auto"
                      variant={pkg.level === 'advanced' ? 'default' : 'outline'}
                      onClick={() => {
                        window.location.href = `/services/testing/book?package=${pkg.id}&name=${encodeURIComponent(pkg.name)}&price=${pkg.price}`;
                      }}
                    >
                      Book Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceList;