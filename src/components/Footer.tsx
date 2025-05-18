import React from 'react';

const Footer: React.FC = () => {
  return (
    <section className="bg-teal-700 text-white py-8 mt-12">
      <div className="container mx-auto px-4 max-w-4xl text-center space-y-4">
        <p className="text-lg font-semibold">Contact us: <a href="tel:0100700170" className="underline hover:text-teal-300">010-070-0170</a> | <a href="mailto:info@company.com" className="underline hover:text-teal-300">info@company.com</a></p>
        <p>Opening Hours: Mon-Fri 06:00 AM - 10:00 PM | Sat 09:00 AM - 08:00 PM | Sun Closed</p>
        <p className="italic text-sm text-teal-300">Latest News: Amazing Technology | New Healing Process</p>
      </div>
    </section>
  );
};

export default Footer;
