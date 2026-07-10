import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin } from 'lucide-react';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu and Kashmir', 'Puducherry', 'Chandigarh'
];

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white pt-20 pb-10 border-t border-white/5 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo and Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Image 
                src="/footer_logo.jpeg" 
                alt="Vidyatraa Footer Logo" 
                width={200} 
                height={200} 
                className="rounded-2xl shadow-2xl object-cover" 
              />
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Empowering the next generation of Indian talent by bridging the gap between dreams and opportunities.
            </p>
            <div className="flex flex-col space-y-2">
              <div className="flex space-x-4">
                <Link href="/about" className="text-sm text-gray-500 hover:text-orange-500 transition-colors">About Us</Link>
                <Link href="/contact" className="text-sm text-gray-500 hover:text-orange-500 transition-colors">Contact</Link>
              </div>
              <a href="mailto:workwithsouravaxs@gmail.com" className="text-sm text-primary hover:text-orange-500 transition-colors">
                workwithsouravaxs@gmail.com
              </a>
            </div>
          </div>

          {/* States Grid - Clickable Search */}
          <div className="lg:col-span-3">
            <h3 className="text-xl font-bold mb-8 flex items-center">
              <MapPin className="mr-2 text-orange-500" size={20} />
              Scholarships by State
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-3 gap-x-4">
              {INDIAN_STATES.map(state => (
                <Link 
                  key={state} 
                  href={`/search?state=${encodeURIComponent(state)}`}
                  className="text-sm text-gray-500 hover:text-white transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-gray-700 group-hover:bg-orange-500 rounded-full mr-2 transition-colors" />
                  {state}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Vidyatraa. Made with ❤️ for Indian Students.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
