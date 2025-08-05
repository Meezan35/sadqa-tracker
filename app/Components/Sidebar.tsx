'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Plus, History, BarChart3, HelpingHand , Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useModal } from '../context/ModalContext'; // New import

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { userName } = useUser();
  const { openModal } = useModal(); // Use the openModal function from context

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, href: '/dashboard' },
    { id: 'add-sadqa', label: 'Add Sadqa', icon: Plus, href: '#' },
    { id: 'history', label: 'Sadqa History', icon: History, href: '/sadqa-history' },
    { id: 'insights', label: 'Insights', icon: BarChart3, href: '/insights' },
    { id: 'Donation Requests', label: 'Donation Requests', icon: HelpingHand , href: '/donation-requests' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  if (!userName) {
    return null;
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200"
        aria-label="Toggle menu"
      >
        <Menu className="w-6 h-6 text-gray-600" />
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:sticky top-0 right-0 lg:left-0 h-full lg:h-screen w-64 bg-white shadow-lg border-l lg:border-r lg:border-l-0 border-gray-200 z-40 transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Sadqa Tracker</h2>
          {/* Close button for mobile */}
          <button
            onClick={closeMobileMenu}
            className="lg:hidden p-1 hover:bg-gray-100 rounded-md"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="mt-6 overflow-y-auto h-full pb-20">
          {sidebarItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = pathname === item.href;

            // Handle the Add Sadqa item separately
            if (item.id === 'add-sadqa') {
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    openModal();
                    closeMobileMenu();
                  }}
                  className={`w-full flex items-center px-4 sm:px-6 py-3 text-left transition-colors text-gray-600 hover:bg-gray-50 hover:text-gray-900 active:bg-gray-100`}
                >
                  <IconComponent className={`w-5 h-5 mr-3 flex-shrink-0 text-gray-400`} />
                  <span className="font-medium text-sm sm:text-base">{item.label}</span>
                </button>
              );
            }
            
            // For all other items, use a standard Link
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={closeMobileMenu}
                className={`w-full flex items-center px-4 sm:px-6 py-3 text-left transition-colors ${
                  isActive
                    ? 'bg-green-50 text-green-700 border-r-2 border-green-500'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 active:bg-gray-100'
                }`}
              >
                <IconComponent className={`w-5 h-5 mr-3 flex-shrink-0 ${isActive ? 'text-green-600' : 'text-gray-400'}`} />
                <span className="font-medium text-sm sm:text-base">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}