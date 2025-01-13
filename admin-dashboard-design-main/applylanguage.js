// Global variable to store the Google Translate Element
let googleTranslateElementInstance = null;

// Initialize Google Translate
function googleTranslateElementInit() {
    googleTranslateElementInstance = new google.translate.TranslateElement({
        pageLanguage: 'en',  // Default language of the page
        includedLanguages: 'en,fr,ar',  // Available languages (English, French, Arabic)
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
}

// Change language based on the dropdown selection
function changeLanguage(languageCode) {
    if (googleTranslateElementInstance) {
        googleTranslateElementInstance.showBanner(false);  // Hide the banner
        const iframe = document.querySelector('iframe.goog-te-menu-frame');
        if (iframe) {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            const selectLanguage = iframeDoc.querySelector('.goog-te-combo');
            if (selectLanguage) {
                selectLanguage.value = languageCode;  // Set the selected language
                selectLanguage.dispatchEvent(new Event('change'));  // Trigger the change event
            }
        }
    }
}

// Apply Google Translate on page load and set up the language change listener
window.addEventListener('DOMContentLoaded', (event) => {
    // Dynamically load the Google Translate script
    const googleTranslateScript = document.createElement('script');
    googleTranslateScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    googleTranslateScript.type = 'text/javascript';
    document.body.appendChild(googleTranslateScript);

    // Listen for language selection change
    const languageSelect = document.getElementById('language-select');
    languageSelect.addEventListener('change', (e) => {
        const selectedLanguage = e.target.value;
        changeLanguage(selectedLanguage);  // Update Google Translate language
    });
});
