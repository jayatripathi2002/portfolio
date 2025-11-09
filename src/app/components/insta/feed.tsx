'use client';

import React, { useState } from 'react';

const sampleProjects = [
  { id: 'p1', title: 'Auction System', desc: 'Full-stack auction app with real-time bidding', img: null },
  { id: 'p2', title: 'Hospital Management', desc: 'Patient records and scheduling', img: null },
];

const sampleEmployment = [
  { id: 'e1', title: 'Jr. Software Engineer', company: 'Sterling Auxiliaries', duration: 'Aug 2024 - Aug 2025' },
  { id: 'e2', title: 'Software Developer Intern', company: 'RBI Tech', duration: 'May 2024 - Aug 2024' },
];

export default function Feed() {
  const [tab, setTab] = useState<'projects' | 'employment'>('projects');

  return (
    <section className="w-full bg-white dark:bg-gray-900 rounded-lg p-4 shadow-sm mt-4">
      <div className="flex items-center justify-center space-x-4 mb-4">
        <button onClick={() => setTab('projects')} className={`px-4 py-2 rounded ${tab === 'projects' ? 'bg-gray-200 dark:bg-gray-800' : 'bg-transparent'}`}>Projects</button>
        <button onClick={() => setTab('employment')} className={`px-4 py-2 rounded ${tab === 'employment' ? 'bg-gray-200 dark:bg-gray-800' : 'bg-transparent'}`}>Employment</button>
      </div>

      {tab === 'projects' ? (
        <div className="grid gap-4">
          {sampleProjects.map((p) => (
            <article key={p.id} className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{p.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{p.desc}</p>
            </article>
          ))}
        </div>
      ) : (
        <div className="grid gap-4">
          {sampleEmployment.map((e) => (
            <article key={e.id} className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{e.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{e.company} • {e.duration}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
