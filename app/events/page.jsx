"use client"
import React from 'react';
import Image from 'next/image';
import './EventsPage.css';

const EventsPage = () => {
  // Example data for upcoming events
  const upcomingEvents = [
  {
    id: 3,
    title: 'महापूजा एवं सामूहिक हवन',
    date: '2025-2026',
    time: '7:00 AM - 1:00 PM',
    location: 'Baranwal Ekta Sanstha',
    image: '/images/maha-puja.png',
    description: 'धार्मिक अनुष्ठानों, सामूहिक हवन और भजन-कीर्तन के साथ एक दिव्य आयोजन जो पूरे समाज को अध्यात्म से जोड़ता है।',
    registrationLink: '#',
  },
];


  // Example data for past events
  const pastEvents = [
  {
    id: 1,
    title: 'सामाजिक कल्याण कार्यक्रम, 2025',
    date: '2025',
    image: '/images/social-education-program.jpg',
    description: 'बरनवाल एकता संस्था, मुंबई द्वारा गरीब बस्तियों में 140 बच्चों को शिक्षा सहयोग प्रदान करने हेतु आयोजित एक प्रेरणादायक कार्यक्रम, जिसमें समर्पित महिला शिक्षकों के साथ मिलकर बच्चों को पढ़ाया गया और उनकी भावनाओं से बने "Thank You" कार्ड संस्था को भेंट किए गए।',
  },
  {
    id: 2,
    title: 'महाराजा अहिबरन जयंती समारोह, 2024',
    date: '2024',
    image: '/images/ahivarn-jayanti.png',
    description: 'सांस्कृतिक कार्यक्रमों, इतिहास प्रस्तुतियों और भव्य भोजन प्रसाद के साथ एक भव्य समारोह जिसने हमारे गौरवशाली अतीत को जीवंत किया।',
  },
  {
    id: 3,
    title: 'होली मिलन समारोह',
    date: 'March, 2024',
    image: '/images/holi1.jpeg',
    description: 'रंग, संगीत और उत्सव के साथ मनाई गई होली, जिसने पूरे समुदाय को आपसी भाईचारे में बाँध दिया।',
  },
];


  return (
    <div className="events-page">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Events & Activities</h1>
          <p className="page-description">
            Stay connected with our community through our diverse events and activities.
          </p>
        </div>
      </div>
      
      <section className="section upcoming-events-section">
        <div className="container">
          <h2 className="section-title">Upcoming Events</h2>
          
          <div className="events-grid">
            {upcomingEvents.map((event) => (
              <div className="event-card" key={event.id}>
                <div className="event-image-container">
                  <Image
                    src={event.image}
                    alt={event.title}
                    width={600}
                    height={400}
                    className="event-image"
                  />
                  <div className="event-date-badge">
                    <span>{event.date}</span>
                  </div>
                </div>
                <div className="event-details">
                  <h3 className="event-title">{event.title}</h3>
                  <div className="event-info">
                    <div className="event-info-item">
                      <i className="fas fa-clock"></i>
                      <span>{event.time}</span>
                    </div>
                    <div className="event-info-item">
                      <i className="fas fa-map-marker-alt"></i>
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <p className="event-description">{event.description}</p>
                  <a href={event.registrationLink} className="btn">
                    Register
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="section past-events-section">
        <div className="container">
          <h2 className="section-title">Past Events</h2>
          
          <div className="past-events-grid grid-2">
            {pastEvents.map((event) => (
              <div className="past-event-card" key={event.id}>
                <div className="past-event-image">
                  <Image
                    src={event.image}
                    alt={event.title}
                    width={600}
                    height={400}
                    className="past-event-img"
                  />
                </div>
                <div className="past-event-details">
                  <h3 className="past-event-title">{event.title}</h3>
                  <p className="past-event-date">{event.date}</p>
                  <p className="past-event-description">{event.description}</p>
                  <a href="/gallery" className="past-event-link">
                    View Photos
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="section event-suggestions">
        <div className="container">
          <div className="suggestion-box">
            <h2>Suggest an Event</h2>
            <p>
              Have an idea for a community event or activity? We welcome your suggestions! 
              Please fill out the form below to share your ideas with the Events Committee.
            </p>
            <a href="mailto:baranwalektasanstha@gmail.com" className="btn">
              Submit Event Idea
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventsPage;