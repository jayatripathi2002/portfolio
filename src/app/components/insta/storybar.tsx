'use client';

import React from 'react';

const stories = [
  { id: 'skills', title: 'Skills' },
  { id: 'achievements', title: 'Achievements' },
  { id: 'progress', title: 'Progress' },
  { id: 'blogs', title: 'Blogs' },
];

export default function StoryBar() {
  return (
    <section className="w-full bg-white dark:bg-gray-900 rounded-lg p-3 shadow-sm mt-4">
      <div className="flex space-x-4 overflow-x-auto py-2 px-1">
        {stories.map((s) => (
          <div key={s.id} className="flex-shrink-0 text-center">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-tr from-pink-500 to-yellow-400 p-1">
              <div className="bg-white dark:bg-gray-800 w-full h-full rounded-full flex items-center justify-center overflow-hidden">
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{s.title[0]}</span>
              </div>
            </div>
            <div className="text-xs mt-2 text-gray-600 dark:text-gray-300">{s.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
