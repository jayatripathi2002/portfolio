'use client';

import { useState } from 'react';
import Sidebar from '@/app/components/sidebar';
import MainContent from '@/app/components/main-content';

export default function Home() {
  const [selectedSection, setSelectedSection] = useState('about');

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
      <Sidebar onSectionChange={setSelectedSection} activeSection={selectedSection} />
      <MainContent selectedSection={selectedSection} />
    </div>
  );
}
