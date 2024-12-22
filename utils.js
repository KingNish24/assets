// utils.js

const sessionCache = {};

function getSessionCache() {
  return sessionCache;
}

function clearSessionCache() {
  for (let key in sessionCache) {
    delete sessionCache[key];
  }
}

// Function to update URL params
function updateURLParams(params) {
  const url = new URL(window.location.href);

  // Clear all existing search parameters
  url.search = '';

  // Add only the specified parameters
  for (const key in params) {
    if (params[key]) {
      url.searchParams.set(key, params[key]);
    }
  }

  // Update the URL without reloading the page
  window.history.pushState({}, '', url);
  // Custom event for URL change (optional)
  window.dispatchEvent(new CustomEvent('urlchanged'));
}

// Function to initialize from URL params
function initFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const subject = urlParams.get('subject') || '';
  const chapter = urlParams.get('chapter') || '';
  const topic = urlParams.get('topic') || '';
  const questionNumber = parseInt(urlParams.get('question-number')) || 1;

  // Return all extracted params
  return {
    subject: subject,
    chapter: chapter,
    topic: topic,
    questionNumber: questionNumber,
  };
}

// Function to save data in local storage for quiz progress
function savelocalStorageData(subject, chapter, topic, questionProgress) {
    const key = `${subject}-${chapter}-${topic}`;
    const data = JSON.stringify(questionProgress);
    localStorage.setItem(key, data);
}

// Function to get data from local storage for quiz progress
function getlocalStorageData(subject, chapter, topic) {
    const key = `${subject}-${chapter}-${topic}`;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

// Function to save bookmarked question
function saveBookmarkedQuestion(subject, chapter, topic, questionIndex, questionData, questionProgress) {
    const mainKey = 'bookmarks'; // Single key for all bookmarks
    const bookmarkKey = `${subject}-${chapter}-${topic}-${questionIndex}`; // Key for this specific bookmark
    const data = JSON.stringify({ questionData, questionProgress });

    // Get existing bookmarks
    let bookmarks = localStorage.getItem(mainKey);
    bookmarks = bookmarks ? JSON.parse(bookmarks) : {};

    // Add new bookmark
    bookmarks[bookmarkKey] = data;

    // Save updated bookmarks
    localStorage.setItem(mainKey, JSON.stringify(bookmarks));
}

// Function to remove bookmark question
function removeBookmarkedQuestion(subject, chapter, topic, questionIndex) {
    const mainKey = 'bookmarks';
    const bookmarkKey = `${subject}-${chapter}-${topic}-${questionIndex}`;

    // Get existing bookmarks
    let bookmarks = localStorage.getItem(mainKey);
    bookmarks = bookmarks ? JSON.parse(bookmarks) : {};

    // Remove bookmark if it exists
    if (bookmarks[bookmarkKey]) {
        delete bookmarks[bookmarkKey];
    }

    // Save updated bookmarks
    localStorage.setItem(mainKey, JSON.stringify(bookmarks));
}

// Function to get all bookmarked questions
function getAllBookmarkedQuestions() {
    const mainKey = 'bookmarks';

    // Get existing bookmarks
    let bookmarks = localStorage.getItem(mainKey);
    bookmarks = bookmarks ? JSON.parse(bookmarks) : {};

    // Convert to array of bookmark data
    const bookmarkArray = [];
    for (const key in bookmarks) {
        bookmarkArray.push(JSON.parse(bookmarks[key]));
    }

    return bookmarkArray;
}

export {
  updateURLParams,
  initFromURL,
  savelocalStorageData,
  getlocalStorageData,
  sessionCache,
  getSessionCache,
  clearSessionCache,
  saveBookmarkedQuestion,
  removeBookmarkedQuestion,
  getAllBookmarkedQuestions
};