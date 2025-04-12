const axios = require("axios");

const devKey = "1U8gVeBOkVK58JZ724cdbXcFaty3R1SM"; // your api_dev_key

async function create(data) {
  try {
    const params = new URLSearchParams();
    params.append("api_dev_key", devKey);
    params.append("api_option", "paste");
    params.append("api_paste_code", data); // JSON string
    params.append("api_paste_private", "1"); // 0=public, 1=unlisted, 2=private
    params.append("api_paste_name", "SessionData");
    params.append("api_paste_expire_date", "1M"); // 10 minutes
    params.append("api_paste_format", "json");

    const response = await axios.post("https://pastebin.com/api/api_post.php", params);
    const pasteUrl = response.data;

    if (!pasteUrl.startsWith("http")) {
      console.error("Detailed Error:", pasteUrl);
      throw new Error("Pastebin API error");
    }

    const key = pasteUrl.split("/").pop(); // extract the paste key
    return { id: key };
  } catch (error) {
    console.error("Detailed Error:", error.response?.data || error.message);
    throw new Error(`Error creating paste: ${error.message}`);
  }
}

async function get(key) {
  try {
    const url = `https://pastebin.com/raw/${key}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching paste: ${error.message}`);
  }
}

module.exports = { create, get };
