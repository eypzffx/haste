const axios = require("axios");

const token = "75bb676b5ed3fc45f11ba1092b1d99c5a71510ef876ff77226f9a2cf043625b0b9d97fb7432c0297ea507ace74fc0425bd2415dfc02b5d2b0547f90f3e8d8552";

// Function to create paste on Hastebin
async function create(data) {
  try {
    const config = {
      method: 'post',
      url: 'https://hastebin.com/documents',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({ content: data })
    };

    const response = await axios(config);
    return { id: response.data.key };  // Returns the paste key
  } catch (error) {
    console.error('Error in create:', error.message);
    throw error;  // Rethrow the error to be handled by the caller
  }
}

// Function to get paste by key
async function get(key) {
  try {
    const config = {
      method: 'get',
      url: `https://hastebin.com/raw/${key}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    const response = await axios(config);
    return response.data;  // Returns the paste content
  } catch (error) {
    console.error('Error in get:', error.message);
    throw error;  // Rethrow the error to be handled by the caller
  }
}

// Global handler for unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

module.exports = { create, get };
