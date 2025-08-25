import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyBgXK3UxOBGOvkJtbOQcf7Vp96bKZ9Bago",
  authDomain: "savinnah-a2654.firebaseapp.com",
  projectId: "savinnah-a2654",
  storageBucket: "savinnah-a2654.firebasestorage.app",
  messagingSenderId: "715474109601",
  appId: "1:715474109601:web:6c89a65c33aa8a612e5ce0",
  measurementId: "G-0D21S2DN7Q"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// 🔹 Utility function: Show popup notification
function showPopup(message, type = "success") {
  const popup = document.createElement("div");
  popup.className = `custom-popup ${type}`;
  popup.innerHTML = `
    <p>${message}</p>
  `;

  document.body.appendChild(popup);

  // Animate in
  setTimeout(() => popup.classList.add("show"), 50);

  // Auto remove after 4s
  setTimeout(() => {
    popup.classList.remove("show");
    setTimeout(() => popup.remove(), 300);
  }, 4000);
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".footer-signup form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const emailInput = form.querySelector("input[type='email']");
    const email = emailInput.value.trim().toLowerCase();

    if (!email) {
      showPopup("⚠️ Hold up superstar! Drop your email first.", "error");
      return;
    }

    try {
      // Check if the email already exists
      const q = query(collection(db, "email"), where("email", "==", email));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        showPopup("❌ Oops… looks like you’re already on the VIP list! 🎤", "error");
        return;
      }

      // Add the new email (Firestore will generate unique ID)
      await addDoc(collection(db, "email"), {
        email: email,
        subscribedAt: new Date()
      });

      showPopup("✅ Boom! You’re in the groove — thanks for subscribing! 🎶", "success");
      form.reset();
    } catch (error) {
      console.error("Error saving email: ", error);
      showPopup("⚠️ Oof! Tech gremlins at play. Try again later 🙃", "error");
    }
  });
});
