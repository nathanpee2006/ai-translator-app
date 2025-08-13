import { useState } from "react";
import { Textarea } from "./components/ui/textarea";
import { Button } from "./components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { translateText } from "../services/translation";

function App() {
  const [englishText, setEnglishText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleTranslate(e) {
    e.preventDefault();
    setError("");

    if (!englishText.trim()) {
      setError("Please enter text to translate.");
      return;
    }
    if (!selectedLanguage) {
      setError("Please select a language.");
      return;
    }

    try {
      setLoading(true);
      const data = await translateText(englishText, selectedLanguage);
      if (data == null) {
        setError("Translation failed. Please try again.");
        return;
      }
      setTranslatedText(data);
    } catch {
      setError("Unexpected error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleTranslate}>
      <h1>AI Translator App</h1>
      <Textarea
        placeholder="Enter text to translate"
        value={englishText}
        onChange={(e) => setEnglishText(e.target.value)}
      ></Textarea>
      <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
        <SelectTrigger>
          <SelectValue placeholder="Select a language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="French">French</SelectItem>
          <SelectItem value="Spanish">Spanish</SelectItem>
          <SelectItem value="Japanese">Japanese</SelectItem>
          <SelectItem value="German">German</SelectItem>
          <SelectItem value="Italian">Italian</SelectItem>
        </SelectContent>
      </Select>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Button type="submit" disabled={loading}>
        {loading ? "Translating..." : "Translate"}
      </Button>
      <Textarea
        placeholder="Translated text"
        value={translatedText}
        readOnly
      ></Textarea>
    </form>
  );
}

export default App;
