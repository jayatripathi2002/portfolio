'use client';

import React from 'react';

interface Props {
  name: string;
  designation: string;
  bioTop: string;
  bioBottom: string;
  email: string;
  resumeUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  avatarUrl?: string;
}

export default function ProfileHeader({ name, designation, bioTop, bioBottom, email, resumeUrl = '#', githubUrl = '#', linkedinUrl = '#', avatarUrl }: Props) {
  return (
    <section className="w-full bg-white dark:bg-gray-900 rounded-lg p-4 shadow-sm">
      <div className="flex items-start gap-6">
        <div className="w-1/5 flex justify-center">
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700">
            <img src={avatarUrl ?? '/images/avatar-placeholder.png'} alt="avatar" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="w-4/5">
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{name}</h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">{designation}</p>
              </div>
            </div>

            <div className="mt-3 text-gray-700 dark:text-gray-300">
              <p className="text-sm">{bioTop}</p>
              <p className="text-sm mt-1">{bioBottom}</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <a href={`mailto:${email}`} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md text-sm">Email</a>
              <a href={resumeUrl} target="_blank" rel="noreferrer" className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md text-sm">Resume</a>
              <a href={githubUrl} target="_blank" rel="noreferrer" className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md text-sm">GitHub</a>
              <a href={linkedinUrl} target="_blank" rel="noreferrer" className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md text-sm">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
