import React from 'react';
import Link from 'next/link';
import HeroSection from './components/HeroSection/HeroSection';
import AboutSection from './components/AboutSection/AboutSection';
import ActivitiesSection from './components/ActivitiesSection/ActivitiesSection';
import FeaturedEventsSection from './components/FeaturedSection/FeaturedEventsSection';
import AchievementsSection from './components/AchievementSection/AchievementSection';

export const metadata = {
  title: 'Baranwal Ekta Sanstha Mumbai - Baranwal Samaj Community',
  description: 'Welcome to Baranwal Ekta Sanstha Mumbai - Official community platform for Ahibaran Baranwal families in Mumbai. Discover events, matrimony services, dharmshalas, and connect with the Baranwal samaj.',
  keywords: [
    'baranwal ekta sanstha mumbai',
    'baranwal ekta sanstha',
    'baranwal mumbai',
    'ahibaran baranwal samaj',
    'baranwal community mumbai',
    'baranwal events mumbai',
    'baranwal matrimony',
    'baranwal dharmshalas',
    'baranwal families mumbai',
    'ahibaran community'
  ],
  openGraph: {
    title: 'Baranwal Ekta Sanstha Mumbai',
    description: 'Official community platform for Ahibaran Baranwal families in Mumbai. Connect, celebrate, and grow together.',
    url: 'https://baranwalektasanstha.vercel.app',
  },
  alternates: {
    canonical: 'https://baranwalektasanstha.vercel.app',
  },
}

export default function Home() {
  return (
    <>
      {/* Hidden content for SEO - helps with keyword targeting */}
      <div style={{ display: 'none' }}>
        <h1>Baranwal Ekta Sanstha Mumbai - Baranwal Samaj</h1>
        <p>
          Baranwal Ekta Sanstha Mumbai serves the Baranwal community in Mumbai. 
          Our organization brings together Baranwal families through events, matrimony services, 
          dharmshalas, and community support. Join the Baranwal samaj and stay connected 
          with your heritage and community in Mumbai.
        </p>
      </div>
      <div className="home-page">
        <HeroSection />
        <AboutSection />
        <ActivitiesSection />
        <FeaturedEventsSection />
        <AchievementsSection />
      </div>
    </>
  );
}