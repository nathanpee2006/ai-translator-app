import { useState, useEffect } from "react";
import axios from "axios";
import { Textarea } from "./components/ui/textarea";
import { Button } from "./components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function App() {
  const [englishText, setEnglishText] = useState("");
  const [language, setLanguage] = useState("");

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:3000/api");
    console.log(response.data.message);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  function handleTranslate(e) {
    e.preventDefault();
    console.log(englishText);
    console.log(language);
  }

  return (
    <form onSubmit={handleTranslate}>
      <h1>AI Translator App</h1>
      <Textarea
        placeholder="Enter text to translate"
        value={englishText}
        onChange={(e) => setEnglishText(e.target.value)}
      ></Textarea>
      <Select value={language} onValueChange={setLanguage}>
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
      <Button onClick={handleTranslate}>Translate</Button>
      <Textarea placeholder="Translated text"></Textarea>
    </form>
  );
}

export default App;
