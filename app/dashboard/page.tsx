'use client';

import { useEffect, useState } from 'react';
import NameInputComponent from '../Components/NameInputComponent';
import AddSadqaModal, { SadqaEntry } from '../Components/AddSadqaModal';
import SadqaStats from '../Components/SadqaStats';
import RecentSadqa from '../Components/RecentSadqa';
import { useUser } from '../context/UserContext';
import { useModal } from '../context/ModalContext'; // New import

// Simple loader component
const Loader = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
  </div>
);

export default function DashboardPage() {
  const { userName, setUserName } = useUser();
const { isModalOpen, openModal, closeModal } = useModal();
  const [loading, setLoading] = useState(false);

  const [sadqaData, setSadqaData] = useState<SadqaEntry[]>(() => {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('sadqaData');
      return storedData ? JSON.parse(storedData) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sadqaData', JSON.stringify(sadqaData));
    }
  }, [sadqaData]);

  const handleNameSubmit = (name: string) => {
    setLoading(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('userName', name);
      setTimeout(() => {
        setUserName(name);
        setLoading(false);
      }, 500);
    }
  };

  const handleAddSadqa = (newEntry: SadqaEntry) => {
    setSadqaData(prevData => [...prevData, newEntry]);
  };

  if (loading) {
    return <Loader />;
  }

  if (!userName) {
    return <NameInputComponent onNameSubmit={handleNameSubmit} />;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen lg:ml-0">
      <div className="max-w-7xl mx-auto">
        {/* Header with dynamic name */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8 pt-16 lg:pt-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Assalamualaikum, {userName}</h1>
          {/* This button still works as before */}
          <button
            onClick={() => openModal()}
            className="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors text-center text-sm sm:text-base"
          >
            Add New Sadqa
          </button>
        </div>

        {/* Sadqa Stats component */}
        <SadqaStats sadqaData={sadqaData} />

        {/* Recent Sadqa component */}
        <RecentSadqa sadqaData={sadqaData} />
      </div>
      <AddSadqaModal
        isOpen={isModalOpen}
        onClose={closeModal} // Use closeModal from context
        onSubmit={handleAddSadqa}
      />
    </div>
  );
}