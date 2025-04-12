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
        api_paste_code: 'Session', // You can change this to something dynamic
        api_paste_private: 1, // 0=public, 1=unlisted, 2=private
        api_paste_expire_date: '1W', // 1 week
        api_paste_data: data
      }
    });

    const url = response.data; // Format: https://pastebin.com/XXXXXX
    const key = url.split('/').pop();
    return { id: key };
  } catch (error) {
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
