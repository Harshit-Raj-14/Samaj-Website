import React from 'react';
import Image from 'next/image';

const EventsPage = () => {
  // Example data for upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: 'Annual Community Festival',
      date: 'June 15-16, 2025',
      time: '10:00 AM - 8:00 PM',
      location: 'Baranwal Samaj Center',
      image: '/api/placeholder/600/400',
      description: 'Our biggest celebration of the year featuring cultural performances, traditional food, games, and activities for all ages.',
      registrationLink: '#',
    },
    {
      id: 2,
      title: 'Youth Leadership Workshop',
      date: 'May 25, 2025',
      time: '1:00 PM - 5:00 PM',
      location: 'Baranwal Samaj Center',
      image: '/api/placeholder/600/400',
      description: 'A hands-on workshop designed to help young community members develop leadership skills and connect with mentors.',
      registrationLink: '#',
    },
    {
      id: 3,
      title: 'Cultural Cooking Class',
      date: 'June 8, 2025',
      time: '2:00 PM - 4:00 PM',
      location: 'Baranwal Samaj Kitchen',
      image: '/api/placeholder/600/400',
      description: 'Learn to prepare traditional dishes from expert community cooks. All ingredients and equipment will be provided.',
      registrationLink: '#',
    },
  ];

  // Example data for past events
  const pastEvents = [
    {
      id: 1,
      title: 'Spring Charity Drive',
      date: 'April 10, 2025',
      image: '/api/placeholder/600/400',
      description: 'Community members collected donations for local families in need.',
    },
    {
      id: 2,
      title: 'Seniors Appreciation Day',
      date: 'March 21, 2025',
      image: '/api/placeholder/600/400',
      description: 'A special event to honor and celebrate our elderly community members.',
    },
    {
      id: 3,
      title: 'Cultural Heritage Workshop',
      date: 'February 15, 2025',
      image: '/api/placeholder/600/400',
      description: 'Interactive sessions on preserving and documenting family histories and traditions.',
    },
    {
      id: 4,
      title: 'Winter Gala',
      date: 'January 20, 2025',
      image: '/api/placeholder/600/400',
      description: 'Annual formal gathering with dinner, dancing, and community awards.',
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
      
      <section className="section calendar-section">
        <div className="container">
          <h2 className="section-title">Event Calendar</h2>
          <p className="calendar-intro">
            Plan ahead and mark your calendar for these important community dates.
            For the most up-to-date information, please check back regularly or subscribe to our newsletter.
          </p>
          
          <div className="calendar-embed">
            <Image
              src="/api/placeholder/1000/600"
              alt="Event Calendar"
              width={1000}
              height={600}
              style={{ width: '100%', height: 'auto', borderRadius: 'var(--border-radius)' }}
            />
            <p className="calendar-note">
              *This is a placeholder for an embedded calendar. In the actual implementation, 
              you would embed a Google Calendar or other calendar service here.
            </p>
          </div>
          
          <div className="calendar-actions">
            <a href="#" className="btn">
              Subscribe to Calendar
            </a>
            <a href="#" className="btn btn-secondary">
              Download Calendar (PDF)
            </a>
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
                  <a href="#" className="past-event-link">
                    View Photos
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          <div className="past-events-archive">
            <a href="#" className="btn">
              View All Past Events
            </a>
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
            <a href="#" className="btn">
              Submit Event Idea
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventsPage;