'use client';

import React from 'react';

interface Props {
  projects: number;
  experienceYears: number;
  technologies: number;
}

export default function Stats({ projects, experienceYears, technologies }: Props) {
  return (
    <section className="w-full bg-white dark:bg-gray-900 rounded-lg p-4 shadow-sm mt-4">
      <div className="flex items-center justify-around text-center">
        <div>
          <div className="text-xl font-bold text-gray-900 dark:text-white">{projects}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Projects</div>
        </div>
        <div>
          <div className="text-xl font-bold text-gray-900 dark:text-white">{experienceYears}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Years</div>
        </div>
        <div>
          <div className="text-xl font-bold text-gray-900 dark:text-white">{technologies}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Technologies</div>
        </div>
      </div>
    </section>
  );
}
