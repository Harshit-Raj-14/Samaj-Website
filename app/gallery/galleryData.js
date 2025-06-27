export const galleryItems = [
  // Maharaja Ahiban Jayanti images (1-12)
  ...Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: 'महाराजा अहिबरन जयंती समारोह',
    href: `/gallery/image (${i + 1}).jpg`,
    type: 'image',
    description: 'Celebration of our cultural heritage with performances, food, and activities.',
    date: '2024',
    category: 'maharaja-ahiban-jayanti'
  })),

  // Holi Milan Samaroh images (1-4)
  ...Array.from({ length: 4 }, (_, i) => ({
    id: i + 13, // Starting from 13 to continue the sequence
    title: 'होली मिलन समारोह',
    href: `/gallery/holi (${i + 1}).jpg`,
    type: 'image',
    description: 'Celebration of our cultural heritage with performances, food, and activities.',
    date: '2024',
    category: 'holi-milan-samaroh'
  })),

  // Samjik Kalyan Karikram images (1-48)
  ...Array.from({ length: 48 }, (_, i) => ({
    id: i + 17, // Starting from 17 to continue the sequence
    title: 'सामाजिक कल्याण कार्यक्रम',
    href: `/gallery/kalyan-karikram/kalyan (${i + 1}).jpg`,
    type: 'image',
    description: 'Cultural performance highlights from the celebration.',
    date: '2025',
    category: 'samjik-kalyan-karikram'
  })),

  // Samjik Kalyan Karikram videos (1-4)
  ...Array.from({ length: 4 }, (_, i) => ({
    id: i + 17, // Starting from 17 to continue the sequence
    title: 'महाराजा अहिबरन जयंती समारोह',
    href: `/gallery/kalyan-karikram/kalyan-v (${i + 1}).mp4`,
    type: 'video',
    thumbnail: `/gallery/video${i + 1}-thumb.jpg`,
    description: 'Cultural performance highlights from the celebration.',
    date: '2024',
    category: 'maharaja-ahiban-jayanti'
  }))
];

// Helper function to get unique categories
export const getCategories = () => {
  return [...new Set(galleryItems.map(item => item.category))];
};

// Helper function to generate filter options
export const getFilterOptions = () => {
  return [
    { value: 'all', label: 'All Events', count: galleryItems.length },
    { value: 'maharaja-ahiban-jayanti', label: 'महाराजा अहिबरन जयंती', count: galleryItems.filter(item => item.category === 'maharaja-ahiban-jayanti').length },
    { value: 'holi-milan-samaroh', label: 'होली मिलन समारोह', count: galleryItems.filter(item => item.category === 'holi-milan-samaroh').length },
    { value: 'samjik-kalyan-karikram', label: 'सामाजिक कल्याण कार्यक्रम', count: galleryItems.filter(item => item.category === 'samjik-kalyan-karikram').length },
    { value: 'images', label: 'Images Only', count: galleryItems.filter(item => item.type === 'image').length },
    { value: 'videos', label: 'Videos Only', count: galleryItems.filter(item => item.type === 'video').length }
  ];
};


// Helper function to filter items
export const filterGalleryItems = (items, filterType) => {
  return items.filter(item => {
    if (filterType === 'all') return true;
    if (filterType === 'images') return item.type === 'image';
    if (filterType === 'videos') return item.type === 'video';
    return item.category === filterType;
  });
};