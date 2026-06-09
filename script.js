const WEDDING_DATE = new Date("2026-07-20T16:00:00+05:00");

const translations = {
  uz: {
    bismillah: "Mehribon va rahmli Alloh nomi bilan",
    inviteHeading: "SIZNI MAMNUNIYAT BILAN TAKLIF QILAMIZ",
    inviteSub: "nikohimiz guvohi bo'lish va ushbu muborak kunning barakasini biz bilan baham ko'rish uchun",
    verse: "\"Va sizlarga sokinlik topishingiz uchun o'zingizdan juftlar yaratgani va oralaringizda mehru muhabbat va marhamatni solib qo'ygani Uning oyat(belgi)laridandir. Albatta, bunda tafakkur qiladigan qavmlar uchun oyat(belgi)lar bordir.\"",
    verseRef: "— RUM SURASI 30:21",
    saveDate: "TO'Y KUNINI SAQLAB QO'YING",
    yearLabel: "YIL",
    dateTagline: "Alhamdulillah, muborak kun yetib keldi",
    countdownLabel: "TO'YGA QOLGAN VAQT",
    days: "KUN",
    hours: "SOAT",
    minutes: "DAQIQA",
    seconds: "SONIYA",
    scheduleLabel: "KUN TADBIRLARI",
    ceremonyTitle: "Nikoh marosimi",
    ceremony1: "11:00 — Mehmonlar kelishi va kutib olish",
    ceremony2: "11:30 — Imom tomonidan nikoh xutbasi",
    receptionTitle: "To'y ziyofati",
    reception1: "16:00 — Ziyofat boshlanishi",
    locationLabel: "Manzil:",
    locationHint: "Mehmonlar manzilni quyidagi ilovalar orqali ham topishlari mumkin.",
    footer: "Sizni kutamiz!",
  },
  en: {
    bismillah: "In the name of Allah, the Most Gracious, the Most Merciful",
    inviteHeading: "WE JOYFULLY INVITE YOU",
    inviteSub: "to witness our nikah and share the blessings of this sacred day with us",
    verse: "\"And of His signs is that He created for you mates from among yourselves, that you may find tranquility in them, and He placed between you affection and mercy. Indeed in that are signs for people who give thought.\"",
    verseRef: "— SURAH AR-RUM 30:21",
    saveDate: "SAVE THE DATE",
    yearLabel: "YEAR",
    dateTagline: "Alhamdulillah, the blessed day has arrived",
    countdownLabel: "TIME UNTIL THE WEDDING",
    days: "DAYS",
    hours: "HOURS",
    minutes: "MINS",
    seconds: "SECS",
    scheduleLabel: "DAY'S EVENTS",
    ceremonyTitle: "Nikah Ceremony",
    ceremony1: "11:00 — Guest arrival and welcome",
    ceremony2: "11:30 — Nikah sermon by the Imam",
    receptionTitle: "Wedding Reception",
    reception1: "16:00 — Reception begins",
    locationLabel: "Venue:",
    locationHint: "Guests can also find the venue using the apps below.",
    footer: "We look forward to seeing you!",
  },
};

function pad(n) {
  return String(n).padStart(2, "0");
}

function updateCountdown() {
  const now = Date.now();
  const diff = WEDDING_DATE.getTime() - now;

  const els = {
    days: document.getElementById("cd-days"),
    hours: document.getElementById("cd-hours"),
    minutes: document.getElementById("cd-minutes"),
    seconds: document.getElementById("cd-seconds"),
  };

  if (diff <= 0) {
    Object.values(els).forEach((el) => (el.textContent = "00"));
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  els.days.textContent = pad(days);
  els.hours.textContent = pad(hours);
  els.minutes.textContent = pad(minutes);
  els.seconds.textContent = pad(seconds);
}

function setLanguage(lang) {
  const strings = translations[lang];
  if (!strings) return;

  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (strings[key]) el.textContent = strings[key];
  });

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
}

document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
});

updateCountdown();
setInterval(updateCountdown, 1000);
