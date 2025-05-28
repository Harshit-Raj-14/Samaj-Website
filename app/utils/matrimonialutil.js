// matrimonialutil.js
// Utility functions to fetch and process matrimonial data from Google Sheets

const SHEET_ID = '1ilf0F5xr0nsgGTMBtDwvUfDAdgw_MKBnS4hG3TpYzmU';
const SHEET_NAME = 'Baranwal Matrimony Data Response';

// Add cache to prevent multiple requests
let cachedData = null;
let lastFetchTime = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Convert Google Sheets to CSV format URL
const getSheetURL = () => {
  return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(SHEET_NAME)}`;
};

// Parse CSV data into JSON with proper handling of quoted, multi-part headers
const parseCSVToJSON = (csvText) => {
  const lines = csvText.split('\n').filter(line => line.trim() !== '');

  const headers = [];
  const headerLine = lines[0];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < headerLine.length; i++) {
    const char = headerLine[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      headers.push(current.trim().replace(/^"|"$/g, ''));
      current = '';
    } else {
      current += char;
    }
  }
  headers.push(current.trim().replace(/^"|"$/g, ''));

  const data = [];

  for (let i = 1; i < lines.length; i++) {
    let values = [];
    let currentVal = '';
    let insideQuotes = false;

    const line = lines[i];
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '"') {
        insideQuotes = !insideQuotes;
      } else if (char === ',' && !insideQuotes) {
        values.push(currentVal.trim().replace(/^"|"$/g, ''));
        currentVal = '';
      } else {
        currentVal += char;
      }
    }
    values.push(currentVal.trim().replace(/^"|"$/g, ''));

    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    data.push(row);
  }

  return data;
};

// Helper to convert Google Drive URLs to direct view/download
const convertGoogleDriveUrl = (url, type = 'view') => {
  if (!url || !url.includes('drive.google.com')) return url;

  try {
    let fileId = '';
    if (url.includes('/open?id=')) {
      fileId = url.split('/open?id=')[1].split('&')[0];
    } else if (url.includes('/file/d/')) {
      fileId = url.split('/file/d/')[1].split('/')[0];
    } else if (url.includes('id=')) {
      fileId = url.split('id=')[1].split('&')[0];
    }

    if (fileId) {
      // For images, use the direct image URL that works better
      return type === 'download'
        ? `https://drive.google.com/uc?export=download&id=${fileId}`
        : `https://drive.google.com/uc?export=view&id=${fileId}`;
    }

    return url;
  } catch (error) {
    console.error('Error converting Google Drive URL:', error);
    return url;
  }
};

const isGoogleDriveUrl = (str) =>
  str && (str.includes('drive.google.com') || str.includes('docs.google.com'));

const calculateAge = (dob) => {
  if (!dob) return 'N/A';
  try {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age > 0 ? age : 'N/A';
  } catch {
    return 'N/A';
  }
};

const convertCmToFeet = (cmVal) => {
  if (!cmVal || isNaN(cmVal)) return 'N/A';
  const cm = parseInt(cmVal);
  const feet = Math.floor(cm / 30.48);
  const inches = Math.round((cm % 30.48) / 2.54);
  return `${feet}'${inches}"`;
};

// Main fetch function with caching
export const fetchMatrimonialData = async () => {
  // Check if we have cached data that's still fresh
  const now = new Date().getTime();
  if (cachedData && lastFetchTime && (now - lastFetchTime) < CACHE_DURATION) {
    console.log('Returning cached matrimonial data');
    return cachedData;
  }

  try {
    console.log('Fetching fresh matrimonial data...');
    const response = await fetch(getSheetURL());
    const csvText = await response.text();
    const data = parseCSVToJSON(csvText);

    console.log('Raw CSV headers:', Object.keys(data[0]));
    console.log('Sample raw data:', data[0]);

    const processedData = data.map((person, index) => {
      const photoURL = isGoogleDriveUrl(person['Upload Your Photograph (jpg, jpeg, png only)'])
        ? convertGoogleDriveUrl(person['Upload Your Photograph (jpg, jpeg, png only)'], 'view')
        : person['Upload Your Photograph (jpg, jpeg, png only)'] || '';

      const biodataURL = isGoogleDriveUrl(person['Upload Your Biodata (PDF only)'])
        ? convertGoogleDriveUrl(person['Upload Your Biodata (PDF only)'], 'download')
        : person['Upload Your Biodata (PDF only)'] || '';

      return {
        id: index + 1,
        timestamp: person['Timestamp'] || '',
        name: person['Name'] || 'N/A',
        dateOfBirth: person['Date of Birth'] || '',
        gender: person['Gender'] || '',
        height: person['Height(in cm)'] || '',
        fatherName: person["Father's Name"] || '',
        currentAddress: person['Current Address'] || '',
        nativeAddress: person['Native Address'] || '',
        phoneNo: person['Phone No.'] || '',
        alternatePhone: person['Alternate Phone No. (Parent/Guardian)'] || '',
        socialMedia: person['Social Media Profile (Facebook, Instagram, etc.)'] || '',
        education: person['Highest Education Qualification'] || 'Not specified',
        occupation: person['Occupation'] || 'Not specified',
        photograph: photoURL,
        biodata: biodataURL,
        age: calculateAge(person['Date of Birth']),
        heightInFeet: convertCmToFeet(person['Height(in cm)'])
      };
    });

    // Cache the processed data
    cachedData = processedData;
    lastFetchTime = now;
    
    console.log(`Fetched and cached ${processedData.length} profiles`);
    return processedData;
  } catch (error) {
    console.error('Error fetching matrimonial data:', error);
    // Return cached data if available, otherwise empty array
    return cachedData || [];
  }
};

// Filters
export const filterByGender = (data, gender) => {
  if (!gender || gender === 'all') return data;
  return data.filter((p) => p.gender.toLowerCase() === gender.toLowerCase());
};

export const filterByAgeRange = (data, minAge, maxAge) => {
  return data.filter((p) => {
    const age = parseInt(p.age);
    if (isNaN(age)) return false;
    if (minAge && age < minAge) return false;
    if (maxAge && age > maxAge) return false;
    return true;
  });
};

export const searchByName = (data, term) => {
  if (!term) return data;
  return data.filter((p) =>
    p.name.toLowerCase().includes(term.toLowerCase())
  );
};

export const getUniqueGenders = (data) => {
  return [...new Set(data.map((p) => p.gender).filter(Boolean))];
};

// Function to clear cache manually if needed
export const clearCache = () => {
  cachedData = null;
  lastFetchTime = null;
  console.log('Matrimonial data cache cleared');
};

// Default export
const matrimonialUtils = {
  fetchMatrimonialData,
  filterByGender,
  filterByAgeRange,
  searchByName,
  getUniqueGenders,
  clearCache
};

export default matrimonialUtils;