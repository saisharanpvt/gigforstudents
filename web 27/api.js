// --- api.js (CENTRAL API CONNECTOR) ---

// ⚠️ PASTE YOUR DEPLOYED WEB APP URL HERE:
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwePnRTfie04Aegkv3i13uLQEVAyHKo2MGVaTx1KtPf0DmXpJmBbzNbDsfnm_zFSTIQ/exec";

const GIG_API = {
    // 1. Fetch Colleges for Login Dropdown
    getCollegeData: async function() {
        try {
            let res = await fetch(`${GOOGLE_SCRIPT_URL}?action=getCollegeData`);
            return await res.json();
        } catch (err) {
            console.error("API Fetch Error:", err);
            return null; 
        }
    },

    // 2. Register a new user
    registerUser: async function(formData) {
        try {
            await fetch(`${GOOGLE_SCRIPT_URL}?action=registerUser`, {
                method: "POST",
                body: formData,
                mode: 'no-cors' 
            });
            return { status: "success" };
        } catch (err) { 
            console.error("API Post Error:", err);
            return { error: "POST failed" }; 
        }
    },

    // 3. Fetch user details to login
    getUserProfile: async function(pin) {
        try {
            let res = await fetch(`${GOOGLE_SCRIPT_URL}?action=getUserProfile&pin=${pin}`);
            return await res.json();
        } catch (err) { 
            console.error("API Login Error:", err);
            return null; 
        }
    },

    // 4. Update Semester
    updateSemester: async function(pin, newSem) {
        try {
            let formData = new FormData();
            formData.append("pin", pin);
            formData.append("newSem", newSem);
            
            await fetch(`${GOOGLE_SCRIPT_URL}?action=updateSemester`, {
                method: "POST",
                body: formData,
                mode: 'no-cors'
            });
            return { status: "success" };
        } catch (err) { 
            console.error("API Update Error:", err);
            return { error: "POST failed" }; 
        }
    },

    // 5. Fetch Resources (Exam Saviour & Tracker)
    getResources: async function(sheetName) {
        try {
            // FIX: Added encodeURIComponent to safely pass the "&" symbol in "Branches & Subjects"
            let res = await fetch(`${GOOGLE_SCRIPT_URL}?action=getResources&sheetName=${encodeURIComponent(sheetName)}`);
            return await res.json();
        } catch (err) {
            console.error("API Resource Error:", err);
            return null;
        }
    }
};

// ==========================================
// GLOBAL STUDENT SESSION UTILITIES
// ==========================================

function getGIGSession() {
    const userJson = localStorage.getItem('gigUser');
    return userJson ? JSON.parse(userJson) : null;
}

function storeProfilePhoto(dataUrl) {
    localStorage.setItem('gigUserPhoto', dataUrl);
}

function getProfilePhoto() {
    return localStorage.getItem('gigUserPhoto');
}