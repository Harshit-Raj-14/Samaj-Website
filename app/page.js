import React from 'react';
import Link from 'next/link';
import HeroSection from './components/HeroSection/HeroSection';
import AboutSection from './components/AboutSection/AboutSection';
import ActivitiesSection from './components/ActivitiesSection/ActivitiesSection';
import FeaturedEventsSection from './components/FeaturedSection/FeaturedEventsSection';
import AchievementsSection from './components/AchievementSection/AchievementSection';

export default function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Activities Section */}
      <ActivitiesSection />

      {/* Featured Event Section */}
      <FeaturedEventsSection />

      {/* Achievement Section */}
      <AchievementsSection />
    </div>
  );
}