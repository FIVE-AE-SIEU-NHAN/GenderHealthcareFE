import React, { useState, useEffect } from 'react'
import backgroundImage from '@/assets/images/ser-bg.webp'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'

// --- Interfaces and Mock Data (Unchanged) ---
interface Service {
  name: string
  code: string
  price: number
}
interface ServicePacket {
  id: string
  name: string
  description: string | null
  price: number
  target_gender: 'male' | 'female'
  level: 'basic' | 'advanced'
  services: Service[]
}
const mockApiResponse = {
  message: 'Test service packets retrieved successfully',
  result: [
    {
      id: '83cf0d76-637e-11f0-bfde-0242ac110002',
      name: 'Basic package for men',
      description: null,
      price: 500000,
      target_gender: 'male' as const,
      level: 'basic' as const,
      services: [
        { name: 'HIV test', code: 'HIV', price: 200000 },
        { name: 'Syphilis test', code: 'SYPHILIS', price: 180000 },
        { name: 'Gonorrhea test', code: 'GONORRHEA', price: 150000 },
        { name: 'Chlamydia test', code: 'CHLAMYDIA', price: 150000 }
      ]
    },
    {
      id: '83cf134d-637e-11f0-bfde-0242ac110002',
      name: 'Advanced package for men',
      description: null,
      price: 950000,
      target_gender: 'male' as const,
      level: 'advanced' as const,
      services: [
        { name: 'HIV test', code: 'HIV', price: 200000 },
        { name: 'Syphilis test', code: 'SYPHILIS', price: 180000 },
        { name: 'Gonorrhea test', code: 'GONORRHEA', price: 150000 },
        { name: 'Chlamydia test', code: 'CHLAMYDIA', price: 150000 },
        { name: 'Herpes test', code: 'HSV', price: 220000 },
        { name: 'Hepatitis B test', code: 'HBV', price: 180000 },
        { name: 'Hepatitis C test', code: 'HCV', price: 200000 },
        { name: 'Mycoplasma test', code: 'MYCOPLASMA', price: 190000 }
      ]
    },
    {
      id: '83cf1469-637e-11f0-bfde-0242ac110002',
      name: 'Basic package for women',
      description: null,
      price: 500000,
      target_gender: 'female' as const,
      level: 'basic' as const,
      services: [
        { name: 'HIV test', code: 'HIV', price: 200000 },
        { name: 'Syphilis test', code: 'SYPHILIS', price: 180000 },
        { name: 'Gonorrhea test', code: 'GONORRHEA', price: 150000 },
        { name: 'Chlamydia test', code: 'CHLAMYDIA', price: 150000 }
      ]
    },
    {
      id: '83cf14e0-637e-11f0-bfde-0242ac110002',
      name: 'Advanced package for women',
      description: null,
      price: 1100000,
      target_gender: 'female' as const,
      level: 'advanced' as const,
      services: [
        { name: 'HIV test', code: 'HIV', price: 200000 },
        { name: 'Syphilis test', code: 'SYPHILIS', price: 180000 },
        { name: 'Gonorrhea test', code: 'GONORRHEA', price: 150000 },
        { name: 'Chlamydia test', code: 'CHLAMYDIA', price: 150000 },
        { name: 'HPV test', code: 'HPV', price: 300000 },
        { name: 'Herpes test', code: 'HSV', price: 220000 },
        { name: 'Hepatitis B test', code: 'HBV', price: 180000 },
        { name: 'Hepatitis C test', code: 'HCV', price: 200000 },
        { name: 'Trichomonas test', code: 'TRICHOMONAS', price: 160000 }
      ]
    }
  ]
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
}

const ServiceList: React.FC = () => {
  const [packets, setPackets] = useState<ServicePacket[]>([])
  const [filteredPackets, setFilteredPackets] = useState<ServicePacket[]>([])
  const [activeTab, setActiveTab] = useState<'all' | 'male' | 'female'>('all')

  useEffect(() => {
    setPackets(mockApiResponse.result)
  }, [])

  useEffect(() => {
    if (activeTab === 'all') {
      const getSortOrder = (packet: ServicePacket) => {
        if (packet.target_gender === 'male' && packet.level === 'basic') return 1
        if (packet.target_gender === 'male' && packet.level === 'advanced') return 2
        if (packet.target_gender === 'female' && packet.level === 'advanced') return 3
        if (packet.target_gender === 'female' && packet.level === 'basic') return 4
        return 5
      }
      const sorted = [...packets].sort((a, b) => getSortOrder(a) - getSortOrder(b))
      setFilteredPackets(sorted)
    } else {
      const filtered = packets.filter((p) => p.target_gender === activeTab)
      setFilteredPackets(filtered)
    }
  }, [activeTab, packets])

  return (
    <>
      <section className="relative flex h-[150px] flex-col items-center justify-center bg-[url('@/assets/images/blog1.webp')] bg-cover bg-center py-12 text-center">
        <h2 className='text-5xl font-bold text-white'>Services</h2>
        <p className='mt-2 text-sm'>
          <span className='text-white'>Home</span>
          <span style={{ color: '#55AEFF' }}> / Services List</span>
        </p>
      </section>

      <section
        className='bg-brand-bg-light relative bg-cover bg-center bg-no-repeat py-10'
        style={{
          backgroundImage: `url(${backgroundImage})`
        }}
      >
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='mb-7 text-center'>
            <h1 className='mb-4 text-4xl font-extrabold tracking-wide md:text-5xl' style={{ color: '#1C2359' }}>
              STIs Testing Services
            </h1>
            <p className='text-brand-gray mx-auto max-w-3xl text-lg md:text-xl'>
              Choose the right testing package for you.
            </p>
          </div>

          <div className='mb-10 flex justify-center space-x-2'>
            <Button variant={activeTab === 'all' ? 'default' : 'outline'} onClick={() => setActiveTab('all')}>
              All
            </Button>
            <Button variant={activeTab === 'male' ? 'default' : 'outline'} onClick={() => setActiveTab('male')}>
              For men
            </Button>
            <Button variant={activeTab === 'female' ? 'default' : 'outline'} onClick={() => setActiveTab('female')}>
              For women
            </Button>
          </div>

          <div className='mx-auto px-4 pb-16 sm:px-6 lg:px-8 lg:py-8'>
            <div
              className={cn(
                'gap-8',
                activeTab === 'all' ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4' : 'flex flex-wrap justify-center'
              )}
            >
              {filteredPackets.map((pkg) => (
                <Card
                  key={pkg.id}
                  className={cn(
                    'relative flex flex-col p-5 transition-all duration-300',
                    pkg.level === 'advanced' ? 'z-10 ring-2 ring-blue-400 lg:scale-105' : 'z-0',
                    activeTab === 'all' ? '' : 'sm:w-[350px]'
                  )}
                >
                  {pkg.level === 'advanced' && (
                    <Badge variant='default' className='absolute -top-3 left-1/2 -translate-x-1/2'>
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className='p-0 text-center'>
                    <CardTitle className='text-xl whitespace-nowrap'>{pkg.name}</CardTitle>
                    <div className='text-medical-600 text-3xl font-bold'>{formatCurrency(pkg.price)}</div>
                    <CardDescription className='capitalize'>{pkg.level}</CardDescription>
                  </CardHeader>

                  <CardContent className='flex flex-1 flex-col space-y-4'>
                    <div>
                      <h4 className='mb-2 font-medium text-gray-900'>Includes the following tests:</h4>
                      <ul className='space-y-1'>
                        {pkg.services.map((service, testIndex) => (
                          <li key={testIndex} className='flex items-center text-sm'>
                            <CheckCircle className='mr-2 h-4 w-4 flex-shrink-0 text-blue-700' />
                            <span>{service.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className='flex-1'></div>
                    <Link to='/book-service' className='mt-auto w-full'>
                      <Button
                        variant={pkg.level === 'advanced' ? 'default' : 'outline'}
                        className='w-full cursor-pointer'
                      >
                        Book Now
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ServiceList
