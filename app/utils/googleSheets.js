// Google Sheets API integration for Baranwal Ekta Sanstha Members
// Sheet: https://docs.google.com/spreadsheets/d/19ik7N-s8en58srHCQ1BO5GG_a7SKPNoCMtBB7pxx8dc/edit

const GOOGLE_SHEETS_CONFIG = {
  SHEET_ID: '19ik7N-s8en58srHCQ1BO5GG_a7SKPNoCMtBB7pxx8dc',
  SHEET_NAME: 'Baranwal Response',
  API_KEY: '', // Optional: for higher rate limits
};

/**
 * Fetch members data from Google Sheets
 * @returns {Promise<Array>} Array of member objects
 */
export const fetchMembersFromGoogleSheets = async () => {
  try {
    console.log('🔄 Fetching data from Google Sheets...');
    
    // Multiple URL formats to try for CSV export
    const csvUrls = [
      // Standard CSV export URL
      `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEETS_CONFIG.SHEET_ID}/export?format=csv&gid=0`,
      // Alternative with explicit sheet name
      `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEETS_CONFIG.SHEET_ID}/export?format=csv&sheet=${encodeURIComponent(GOOGLE_SHEETS_CONFIG.SHEET_NAME)}`,
      // Alternative format
      `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEETS_CONFIG.SHEET_ID}/export?format=csv`,
      // Yet another format
      `https://docs.google.com/spreadsheets/u/0/d/${GOOGLE_SHEETS_CONFIG.SHEET_ID}/export?format=csv&gid=0`,
    ];
    
    let lastError = null;
    
    // Try each URL format
    for (let i = 0; i < csvUrls.length; i++) {
      const csvUrl = csvUrls[i];
      console.log(`🔄 Trying URL format ${i + 1}/${csvUrls.length}: ${csvUrl}`);
      
      try {
        const response = await fetch(csvUrl, {
          method: 'GET',
          headers: {
            'Accept': 'text/csv, application/csv, text/plain',
            'User-Agent': 'Mozilla/5.0 (compatible; NextJS-App)',
          },
          mode: 'cors',
          cache: 'no-cache',
        });
        
        console.log(`Response status: ${response.status} ${response.statusText}`);
        
        if (response.ok) {
          const csvText = await response.text();
          console.log(`Received CSV data length: ${csvText.length} characters`);
          
          if (csvText && csvText.trim() !== '' && !csvText.includes('<!DOCTYPE html>')) {
            // Log first few lines for debugging
            const firstLines = csvText.split('\n').slice(0, 3).join('\n');
            console.log('📄 First few lines of CSV:', firstLines);
            
            const members = parseCSVToMembers(csvText);
            console.log(`✅ Successfully fetched ${members.length} members via CSV export`);
            return members;
          } else {
            console.warn(`⚠️ Empty or invalid CSV response from URL ${i + 1}`);
          }
        } else {
          console.warn(`⚠️ HTTP ${response.status} from URL ${i + 1}: ${response.statusText}`);
        }
        
      } catch (error) {
        console.warn(`⚠️ Error with URL ${i + 1}:`, error.message);
        lastError = error;
      }
    }
    
    // If CSV methods fail, try Google Sheets API if available
    if (GOOGLE_SHEETS_CONFIG.API_KEY && GOOGLE_SHEETS_CONFIG.API_KEY !== '') {
      console.log('🔄 Trying Google Sheets API as fallback...');
      try {
        return await fetchUsingGoogleSheetsAPI();
      } catch (apiError) {
        console.error('❌ Google Sheets API also failed:', apiError);
      }
    }
    
    // If all methods fail, throw the last error
    throw new Error(`All CSV export methods failed. Last error: ${lastError?.message || 'Unknown error'}. Please ensure your Google Sheet is publicly accessible and the Sheet ID is correct.`);
    
  } catch (error) {
    console.error('❌ Error fetching data from Google Sheets:', error);
    throw error;
  }
};

/**
 * Parse CSV text to member objects
 * @param {string} csvText - Raw CSV text from Google Sheets
 * @returns {Array} Array of member objects
 */
const parseCSVToMembers = (csvText) => {
  try {
    // Remove BOM if present and normalize line endings
    let cleanedCsv = csvText.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    
    // Split into lines and filter out empty lines
    const lines = cleanedCsv.split('\n').filter(line => line.trim() !== '');
    
    if (lines.length < 2) {
      throw new Error('CSV must have at least a header row and one data row');
    }
    
    // Parse header row
    const headers = parseCSVLine(lines[0]);
    console.log('📊 CSV Headers found:', headers);
    
    // Expected column mapping based on your sheet structure
    // Timestamp, Your Name, Father's Name, Current Address, Correspondence Address, Occupation, Blood Group, Matrimony Status, Phone No.
    const getColumnIndex = (searchTerms) => {
      for (const term of searchTerms) {
        const index = headers.findIndex(header => 
          header.toLowerCase().includes(term.toLowerCase())
        );
        if (index !== -1) return index;
      }
      return -1;
    };
    
    const columnMapping = {
      timestamp: getColumnIndex(['timestamp', 'time']),
      name: getColumnIndex(['your name', 'name']) !== -1 ? getColumnIndex(['your name', 'name']) : 1,
      fatherName: getColumnIndex(['father', 'father\'s name']) !== -1 ? getColumnIndex(['father', 'father\'s name']) : 2,
      currentAddress: getColumnIndex(['current address', 'current']) !== -1 ? getColumnIndex(['current address', 'current']) : 3,
      correspondenceAddress: getColumnIndex(['correspondence', 'correspondence address']) !== -1 ? getColumnIndex(['correspondence', 'correspondence address']) : 4,
      occupation: getColumnIndex(['occupation', 'job']) !== -1 ? getColumnIndex(['occupation', 'job']) : 5,
      bloodGroup: getColumnIndex(['blood group', 'blood']) !== -1 ? getColumnIndex(['blood group', 'blood']) : 6,
      matrimonyStatus: getColumnIndex(['matrimony status', 'matrimony', 'status']) !== -1 ? getColumnIndex(['matrimony status', 'matrimony', 'status']) : 7,
      phoneNo: getColumnIndex(['phone no', 'phone', 'mobile']) !== -1 ? getColumnIndex(['phone no', 'phone', 'mobile']) : 8,
    };
    
    console.log('🗺️ Column mapping:', columnMapping);
    
    const members = [];
    
    // Process each data row
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      try {
        const values = parseCSVLine(line);
        
        // Skip if this looks like a header row that might appear in the middle
        const firstValue = values[0] || '';
        if (firstValue.toLowerCase().includes('timestamp') || 
            firstValue.toLowerCase().includes('your name')) {
          continue;
        }
        
        // Extract member data using column mapping
        const member = {
          id: i,
          timestamp: cleanValue(values[columnMapping.timestamp] || ''),
          name: cleanValue(values[columnMapping.name] || ''),
          fatherName: cleanValue(values[columnMapping.fatherName] || ''),
          currentAddress: cleanValue(values[columnMapping.currentAddress] || ''),
          correspondenceAddress: cleanValue(values[columnMapping.correspondenceAddress] || ''),
          occupation: cleanValue(values[columnMapping.occupation] || ''),
          bloodGroup: cleanValue(values[columnMapping.bloodGroup] || ''),
          matrimonyStatus: cleanValue(values[columnMapping.matrimonyStatus] || ''),
          phoneNo: cleanValue(values[columnMapping.phoneNo] || '')
        };
        
        // Validate required fields
        if (member.name && member.name.trim() !== '' && 
            member.fatherName && member.fatherName.trim() !== '') {
          members.push(member);
          console.log(`✓ Added member: ${member.name}`);
        } else {
          console.warn(`⚠️ Skipped row ${i} - missing required fields:`, values);
        }
        
      } catch (rowError) {
        console.warn(`⚠️ Error parsing row ${i}:`, rowError.message, 'Raw line:', line);
      }
    }
    
    console.log(`📝 Successfully parsed ${members.length} valid member records`);
    
    if (members.length === 0) {
      throw new Error('No valid member records found in the CSV data');
    }
    
    return members;
    
  } catch (error) {
    console.error('❌ Error parsing CSV:', error);
    throw new Error(`Failed to parse CSV data: ${error.message}`);
  }
};

/**
 * Parse a CSV line handling quoted values and commas properly
 * @param {string} line - CSV line
 * @returns {Array} Array of values
 */
const parseCSVLine = (line) => {
  const values = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Handle escaped quotes ("")
        current += '"';
        i++; // Skip the next quote
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // End of field
      values.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  
  // Add the last field
  values.push(current);
  
  return values;
};

/**
 * Clean and format cell values
 * @param {string} value - Raw cell value
 * @returns {string} Cleaned value
 */
const cleanValue = (value) => {
  if (!value) return '';
  return value.replace(/^["']|["']$/g, '').trim();
};

/**
 * Alternative method using Google Sheets API (requires API key)
 * @returns {Promise<Array>} Array of member objects
 */
const fetchUsingGoogleSheetsAPI = async () => {
  if (!GOOGLE_SHEETS_CONFIG.API_KEY) {
    throw new Error('Google Sheets API key not configured');
  }
  
  try {
    const range = `${GOOGLE_SHEETS_CONFIG.SHEET_NAME}!A:I`; // Columns A to I
    const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_CONFIG.SHEET_ID}/values/${range}?key=${GOOGLE_SHEETS_CONFIG.API_KEY}`;
    
    console.log('🔄 Making API request to:', apiUrl);
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Google Sheets API error! status: ${response.status}. ${errorData.error?.message || 'Unknown API error'}`);
    }
    
    const data = await response.json();
    const rows = data.values || [];
    
    if (rows.length < 2) {
      throw new Error('No data found in the sheet');
    }
    
    console.log(`📊 API returned ${rows.length} rows`);
    
    // Skip header row (index 0), process data rows
    const members = rows.slice(1)
      .filter(row => row.length >= 2 && row[1] && row[2]) // Must have name and father's name
      .map((row, index) => ({
        id: index + 1,
        timestamp: row[0] || '',
        name: row[1] || '',
        fatherName: row[2] || '',
        currentAddress: row[3] || '',
        correspondenceAddress: row[4] || '',
        occupation: row[5] || '',
        bloodGroup: row[6] || '',
        matrimonyStatus: row[7] || '',
        phoneNo: row[8] || ''
      }));
    
    console.log(`✅ Successfully fetched ${members.length} members using Google Sheets API`);
    return members;
    
  } catch (error) {
    console.error('❌ Google Sheets API error:', error);
    throw error;
  }
};

/**
 * Real-time sync: Check for updates in Google Sheets
 * @param {Function} onUpdate - Callback function when data updates
 * @param {number} intervalMs - Check interval in milliseconds (default: 5 minutes)
 */
export const setupRealTimeSync = (onUpdate, intervalMs = 300000) => {
  let lastMemberCount = 0;
  let lastUpdateTime = Date.now();
  
  const checkForUpdates = async () => {
    try {
      console.log('🔄 Checking for updates...');
      const members = await fetchMembersFromGoogleSheets();
      const currentTime = Date.now();
      
      // Check if data changed
      const dataChanged = members.length !== lastMemberCount;
      
      if (dataChanged) {
        console.log(`🔄 Data changed: ${lastMemberCount} → ${members.length} members`);
      }
      
      // Call update callback with new data
      onUpdate(members, {
        lastSync: new Date(currentTime).toLocaleString(),
        memberCount: members.length,
        syncStatus: 'success',
        changed: dataChanged,
        error: null
      });
      
      lastMemberCount = members.length;
      lastUpdateTime = currentTime;
      
    } catch (error) {
      console.error('❌ Sync error:', error);
      onUpdate(null, {
        lastSync: new Date().toLocaleString(),
        memberCount: 0,
        syncStatus: 'error',
        error: error.message,
        changed: false
      });
    }
  };
  
  // Initial fetch
  checkForUpdates();
  
  // Set up periodic sync
  const intervalId = setInterval(checkForUpdates, intervalMs);
  
  console.log(`🔄 Real-time sync started (every ${intervalMs/1000/60} minutes)`);
  
  // Return cleanup function
  return () => {
    clearInterval(intervalId);
    console.log('🛑 Real-time sync stopped');
  };
};

/**
 * Get sync status and metadata
 * @returns {Promise<Object>} Sync status information
 */
export const getSyncStatus = async () => {
  try {
    const startTime = Date.now();
    const members = await fetchMembersFromGoogleSheets();
    const endTime = Date.now();
    
    return {
      status: 'connected',
      memberCount: members.length,
      lastSync: new Date().toLocaleString(),
      responseTime: `${endTime - startTime}ms`,
      sheetId: GOOGLE_SHEETS_CONFIG.SHEET_ID,
      sheetName: GOOGLE_SHEETS_CONFIG.SHEET_NAME,
      success: true,
      error: null
    };
    
  } catch (error) {
    return {
      status: 'error',
      memberCount: 0,
      lastSync: new Date().toLocaleString(),
      error: error.message,
      sheetId: GOOGLE_SHEETS_CONFIG.SHEET_ID,
      sheetName: GOOGLE_SHEETS_CONFIG.SHEET_NAME,
      success: false
    };
  }
};

/**
 * Test connection to Google Sheets
 * @returns {Promise<Object>} Test result
 */
export const testConnection = async () => {
  try {
    console.log('🧪 Testing Google Sheets connection...');
    
    const startTime = Date.now();
    const members = await fetchMembersFromGoogleSheets();
    const endTime = Date.now();
    
    return {
      success: true,
      message: `✅ Connection successful! Found ${members.length} members in your sheet.`,
      responseTime: endTime - startTime,
      memberCount: members.length,
      timestamp: new Date().toLocaleString(),
      method: GOOGLE_SHEETS_CONFIG.API_KEY ? 'Google Sheets API' : 'CSV Export',
      suggestions: []
    };
    
  } catch (error) {
    return {
      success: false,
      message: `❌ Connection failed: ${error.message}`,
      timestamp: new Date().toLocaleString(),
      suggestions: [
        '1. Verify your Google Sheet is publicly accessible (Share → Anyone with the link → Viewer)',
        '2. Check that the Sheet ID in the URL is correct',
        '3. Ensure your sheet contains the expected column headers',
        '4. Try refreshing the page and testing again',
        '5. Consider adding a Google Sheets API key for better reliability'
      ]
    };
  }
};

// Export configuration for easy access
export { GOOGLE_SHEETS_CONFIG };

// Default export for easier importing
export default {
  fetchMembersFromGoogleSheets,
  setupRealTimeSync,
  getSyncStatus,
  testConnection,
  GOOGLE_SHEETS_CONFIG
};