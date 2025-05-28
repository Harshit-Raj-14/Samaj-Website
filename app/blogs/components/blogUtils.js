// blogUtils.js - Simplified Blog Data
export const blogPosts = [
  {
    id: 1,
    title: "The Rich Heritage of Barnwal Community",
    slug: "barnwal-community-heritage",
    excerpt: "Discover the ancient traditions, cultural values, and significant contributions of the Barnwal community to Indian society.",
    content: `
      <p>The Barnwal community represents one of India's most distinguished business communities, with a rich heritage spanning several centuries. Known for their entrepreneurial spirit and commitment to social service, the Barnwal community has made significant contributions to trade, commerce, and philanthropy.</p>
      
      <h2>Historical Background</h2>
      <p>The Barnwal community traces its origins to ancient India, where they established themselves as successful merchants and traders. Their business acumen and ethical practices helped them build extensive trade networks across the Indian subcontinent.</p>
      
      <h2>Cultural Values</h2>
      <p>The community is deeply rooted in traditional values while embracing modernity. Their commitment to education, hard work, and social responsibility has been passed down through generations.</p>
      
      <h2>Social Contributions</h2>
      <p>One of the most notable contributions of the Barnwal community is the establishment of dharmshalas (guest houses) across India. These facilities provide affordable accommodation to travelers and pilgrims, embodying the community's spirit of service.</p>
      
      <h2>Modern Era</h2>
      <p>In contemporary times, the Barnwal community continues to excel in various fields including business, education, technology, and social service. They maintain their cultural identity while contributing to India's progress.</p>
    `,
    author: "Raj Kumar Barnwal",
    publishDate: "2024-12-15",
    readTime: "5 min read",
    image: "/blogs/barnwal-heritage.jpg"
  },
  {
    id: 2,
    title: "Dharmshalas: Pillars of Indian Hospitality",
    slug: "dharmshalas-indian-hospitality",
    excerpt: "Explore how dharmshalas have served as beacons of hospitality and spiritual refuge for travelers across India for centuries.",
    content: `
      <p>Dharmshalas represent one of India's most beautiful traditions of hospitality and service. These guest houses, established by philanthropic families and communities, have provided shelter, comfort, and spiritual solace to millions of travelers over the centuries.</p>
      
      <h2>The Concept of Dharmshalas</h2>
      <p>The word 'dharmshala' combines 'dharma' (righteousness) and 'shala' (house), literally meaning a house of righteousness. These establishments were built with the noble intention of providing free or affordable accommodation to pilgrims, travelers, and those in need.</p>
      
      <h2>Historical Significance</h2>
      <p>Dating back to ancient times, dharmshalas played a crucial role in India's pilgrimage tradition. They were strategically located along major trade routes and pilgrimage paths, ensuring that travelers always had a safe place to rest.</p>
      
      <h2>Modern Dharmshalas</h2>
      <p>Today's dharmshalas have evolved to include modern amenities while maintaining their core values of service and hospitality. They continue to serve travelers, students, and those seeking affordable accommodation with the same spirit of selfless service.</p>
      
      <h2>The Barnwal Legacy</h2>
      <p>The Barnwal community has been instrumental in establishing and maintaining numerous dharmshalas across India. Their network of guest houses stands as a testament to their commitment to social service and community welfare.</p>
    `,
    author: "Sunita Devi",
    publishDate: "2024-12-10",
    readTime: "4 min read",
    image: "/blogs/dharmshalas-hospitality.jpg"
  }
];

// Utility functions
export const getPostBySlug = (slug) => {
  return blogPosts.find(post => post.slug === slug);
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};