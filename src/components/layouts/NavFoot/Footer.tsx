import {
  FacebookIcon,
  LinkedinIcon,
  YoutubeIcon,
  MailIcon,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#1A2250] text-white text-sm">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <h2 className="font-semibold text-white mb-2">
            CARE4GENDER VIETNAM CO., LTD
          </h2>
          <p className="text-gray-300">Office: 3/1 Thanh Thai, Ward 14, District 10, Ho Chi Minh City</p>
          <p className="text-gray-300">
            Hotline:{' '}
            <span className="text-white font-medium">1900-2805</span> | 8:00 - 17:30 (Mon - Sat)
          </p>
          <p className="text-gray-300">Business Registration No. 0315268642 issued by Department of Planning and Investment of Ho Chi Minh City on September 14, 2018.</p>
          <p className="text-gray-300">
            Content Manager: <span className="text-blue-400 underline">Pharmacist Duong Anh Hoang</span>
          </p>

          {/* Social Media */}
          <div className="mt-4">
            <h4 className="font-semibold text-gray-300 mb-2">Connect with us</h4>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" className="hover:bg-white/10 text-white">
                <FacebookIcon className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-white/10 text-white">
                <LinkedinIcon className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-white/10 text-white">
                <YoutubeIcon className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-white/10 text-white">
                <MailIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-2">About Care4Gender</h3>
          <ul className="space-y-1 text-gray-300">
            <li>About Care4Gender Health News</li>
            <li>Care4Gender Management Board</li>
            <li>Advisory Council</li>
            <li>Editorial Team</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-2">Services</h3>
          <ul className="space-y-1 text-gray-300">
            <Link to="/book-consultant" className="hover:underline hover:text-white">Book Consultation</Link> <br />
            <Link to="/book-service" className="hover:underline hover:text-white">Book Medical Service</Link> <br />
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-2">Support</h3>
          <ul className="space-y-1 text-gray-300">
            <Link to="/editorial-policy" className="hover:underline hover:text-white">Editorial Policy</Link> <br />
            <Link to="/advertising-policy" className="hover:underline hover:text-white">Advertising Policy</Link> <br />
            <Link to="/privacy-policy" className="hover:underline hover:text-white">Privacy Policy</Link> <br />
            <Link to="/terms-of-use" className="hover:underline hover:text-white">Terms of Use</Link> <br />
            <Link to="/contact" className="hover:underline hover:text-white">Contact Us</Link> <br />
          </ul>
        </div>
      </div>

      <Separator className="my-4 bg-gray-600" />

      <div className="max-w-7xl mx-auto px-4 pb-10 text-center text-xs text-gray-400">
        <p>
          Information on Care4Gender is for reference and research purposes only and does not replace
          medical diagnosis or treatment.
        </p>
        <p>
          It is essential to strictly follow the guidance of doctors and medical staff.
        </p>
        <p className="mt-2">Copyright © 2018 - 2025 Care4Gender Vietnam Co., Ltd.</p>
      </div>
    </footer>
  );
}
