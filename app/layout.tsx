'use client'; // You will need this since you are using hooks (useState) inside the modal logic

import Sidebar from './Components/Sidebar';
import { UserProvider } from './context/UserContext';
import { ModalProvider, useModal } from './context/ModalContext'; // Import useModal
import AddSadqaModal, { SadqaEntry } from './Components/AddSadqaModal'; // Import the modal and type
import './globals.css';
import { useState, useEffect } from 'react';

// You can create a wrapper component inside the layout to handle the modal
// and the sadqa data logic.
function AppContent({ children }: { children: React.ReactNode }) {
  const { isModalOpen, closeModal } = useModal();
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

  const handleAddSadqa = (newEntry: SadqaEntry) => {
    setSadqaData(prevData => [...prevData, newEntry]);
  };

  return (
    <>
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          {children}
        </main>
      </div>
      <AddSadqaModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleAddSadqa}
      />
    </>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <ModalProvider>
            {/* The new wrapper component */}
            <AppContent>{children}</AppContent>
          </ModalProvider>
        </UserProvider>
      </body>
    </html>
  );
}