'use client';

import React from 'react';

export default function InstaFooter() {
  return (
    <footer className="w-full bg-white dark:bg-gray-900 rounded-lg p-4 shadow-sm mt-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-700 dark:text-gray-300">
        <a href="/blog" className="hover:underline">Blog Posts</a>
        <a href="#" className="hover:underline">Personal Album</a>
        <a href="mailto:jaya.tripathi.tech@gmail.com" className="hover:underline">Contact</a>
        <a href="#" className="hover:underline">Profile</a>
      </div>
    </footer>
  );
}
