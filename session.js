const axios = require("axios");

const token = "1U8gVeBOkVK58JZ724cdbXcFaty3R1SM"; // Replace this with your actual Pastebin API dev key

/**
 * Creates a new paste on Pastebin.
 * @param {string} data - The content to be pasted.
 * @returns {Promise<{id: string}>} - The paste ID.
 */
async function create(data) {
  try {
    const response = await axios.post('https://pastebin.com/api/api_post.php', null, {
      params: {
        api_dev_key: token,
        api_option: 'paste',
        api_paste_name: 'Session', // Title of the paste
        api_paste_private: 1, // 1 = unlisted paste, 2 = private
        api_paste_expire_date: '1W', // Expire in 1 week
        api_paste_format: 'txt', // Format type (can be txt, js, etc.)
        api_paste_data: data // Content of the paste
      }
    });

    // Extracting the paste key from the URL returned
    const url = response.data; // Example: https://pastebin.com/XXXXXX
    const key = url.split('/').pop();
    return { id: key }; // Return the paste ID (key)
  } catch (error) {
    console.error('Detailed Error:', error.response ? error.response.data : error.message);
    throw new Error(`Error creating paste: ${error.message}`);
  }
}

/**
 * Fetches content from a Pastebin paste using its key.
 * @param {string} key - The paste key.
 * @returns {Promise<string>} - The raw content of the paste.
 */
async function get(key) {
  try {
    const response = await axios.get(`https://pastebin.com/raw/${key}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error getting paste: ${error.message}`);
  }
}

module.exports = { create, get };
