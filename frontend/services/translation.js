import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const translateText = async (text, language) => {
  try {
    const response = await client.post("/api/translate", {
      text,
      language,
    });
    return response.data.translatedText; // return translated text from English
  } catch (error) {
    console.error("Translation error:", error);
    return null;
  }
};