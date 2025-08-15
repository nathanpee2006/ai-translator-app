import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});


export const translateText = async (text, language) => {
  try {
    const response = await client.post("/api/translate", { text, language });
    return { data: response.data.translatedText, error: null };
  } catch (error) {
    console.log(error)
    const msg =
      error.response?.data?.error || 
      error.message || 
      "Unknown error";
    return { data: null, error: msg };
  }
};