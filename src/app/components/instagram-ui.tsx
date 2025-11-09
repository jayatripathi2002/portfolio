'use client';

import React from 'react';
import ProfileHeader from './insta/profile-header';
import Stats from './insta/stats';
import StoryBar from './insta/storybar';
import Feed from './insta/feed';
import InstaFooter from './insta/footer';

export default function InstagramUI() {
  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-3xl">
        {/* Section 1: Profile Header (20:80 split) */}
        <ProfileHeader
          name="Jaya Tripathi"
          designation="Full-Stack Developer"
          bioTop="Results-driven B.Tech (IT) graduate with expertise in Full-Stack Development."
          bioBottom="I build web apps and explore data-driven solutions."
          email="jaya.tripathi.tech@gmail.com"
          resumeUrl="#"
          githubUrl="https://github.com/jayatripathi2002"
          linkedinUrl="#"
          avatarUrl="/images/avatar-placeholder.png"
        />

        {/* Section 2: Stats */}
        <Stats projects={6} experienceYears={2} technologies={12} />

        {/* Section 3: Stories */}
        <StoryBar />

        {/* Section 4: Feed (projects + employment) */}
        <Feed />

        {/* Section 5: Footer */}
        <InstaFooter />
      </div>
    </div>
  );
}
