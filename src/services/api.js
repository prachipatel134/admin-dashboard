import axios from 'axios';

const API_BASE_URL = 'https://api.twitter.com/2'
const BEARER_TOKEN = 'AAAAAAAAAAAAAAAAAAAAAJSjvgEAAAAA%2B7yEiBqqdPRdzbQMdU6X4ir2w9Q%3D2Hb98ZcLKTSRRDQvVrtme87kyBO4Mw45ghuBt6xBU5hb0gqMOX';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${BEARER_TOKEN}`,
    'Content-Type': 'application/json'
  }
});

export const fetchTweetVolume = async () => {
  try {
    const response = await api.get('/tweets/counts/recent', {
        params: {} // No query parameter is needed
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tweet volume", error);
    throw error;
  }
};


