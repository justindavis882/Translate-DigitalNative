document.addEventListener("DOMContentLoaded", () => {
  // A curated list of common languages to avoid overwhelming a tiny screen
  const languages = {
    "en": "English",
    "es": "Spanish",
    "fr": "French",
    "de": "German",
    "it": "Italian",
    "pt": "Portuguese",
    "ja": "Japanese",
    "ko": "Korean",
    "zh": "Chinese",
    "ru": "Russian",
    "ar": "Arabic",
    "hi": "Hindi"
  };

  const langFrom = document.getElementById("lang-from");
  const langTo = document.getElementById("lang-to");
  const textInput = document.getElementById("text-input");
  const textOutput = document.getElementById("text-output");
  const translateBtn = document.getElementById("translate-btn");
  const swapBtn = document.getElementById("swap-btn");
  const copyBtn = document.getElementById("copy-btn");

  // Populate Dropdowns
  for (let code in languages) {
    let option1 = new Option(languages[code], code);
    let option2 = new Option(languages[code], code);
    langFrom.add(option1);
    langTo.add(option2);
  }
  
  // Set Defaults
  langFrom.value = "en";
  langTo.value = "es";

  // Swap Languages Button
  swapBtn.addEventListener("click", () => {
    let tempLang = langFrom.value;
    langFrom.value = langTo.value;
    langTo.value = tempLang;
    
    let tempText = textInput.value;
    textInput.value = textOutput.innerText !== "Translation will appear here..." ? textOutput.innerText : "";
    textOutput.innerText = tempText || "Translation will appear here...";
  });

  // Translation Logic
  translateBtn.addEventListener("click", async () => {
    let text = textInput.value.trim();
    if (!text) return;

    textOutput.innerText = "Translating...";
    let translateFrom = langFrom.value;
    let translateTo = langTo.value;

    // MyMemory Free API endpoint
    let apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${translateFrom}|${translateTo}`;

    try {
      let response = await fetch(apiUrl);
      let data = await response.json();
      
      if (data.responseData.translatedText) {
        textOutput.innerText = data.responseData.translatedText;
        textOutput.style.color = "#ffffff"; // Make output bright
      } else {
        textOutput.innerText = "Error parsing translation.";
      }
    } catch (error) {
      textOutput.innerText = "Network Error. Are you offline?";
    }
  });

  // Copy to Clipboard
  copyBtn.addEventListener("click", () => {
    if (textOutput.innerText && textOutput.innerText !== "Translation will appear here...") {
      navigator.clipboard.writeText(textOutput.innerText);
      let originalText = copyBtn.innerText;
      copyBtn.innerText = "Copied!";
      setTimeout(() => { copyBtn.innerText = originalText; }, 2000);
    }
  });

  // Modal Logic
  const aboutTrigger = document.getElementById('about-trigger');
  const aboutModal = document.getElementById('about-modal');
  
  aboutTrigger.addEventListener('click', () => aboutModal.classList.remove('hidden'));
  document.getElementById('close-modal').addEventListener('click', () => aboutModal.classList.add('hidden'));
  aboutModal.addEventListener('click', (e) => {
    if (e.target === aboutModal) aboutModal.classList.add('hidden');
  });
});
