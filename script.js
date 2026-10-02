"use strict";


/* =========================================================
   CONF-001 — VITAL SIGNAL

   EDIT YOUR CLIENT / CONFERENCE INFORMATION HERE ONLY.
========================================================= */

const CONFERENCE = {

  name: "Future Health Summit 2027",

  shortName: "FHS 2027",

  tagline: "Where Medicine Meets Tomorrow",

  organizer: "Future Health Foundation",


  /* ISO 8601 date with Iraq UTC+03:00 */
  startAt: "2027-11-18T09:00:00+03:00",

  endAt: "2027-11-18T17:00:00+03:00",

  timeZone: "Asia/Baghdad",


  venue: "Nineveh International Conference Center",

  city: "Mosul",

  country: "Iraq",


  /*
    Leave mapsUrl empty to automatically generate
    a Google Maps search using venue + city + country.
  */
  mapsUrl: "",


  /*
    Replace with the real registration page.
    Leave empty "" if this conference has no registration.
  */
  registrationUrl: "https://example.com/register",


  /*
    Replace with the real conference website.
    Leave empty "" if there is no website.
  */
  websiteUrl: "https://example.com",


  /*
    Leave empty to use the current invitation URL.
  */
  shareUrl: "",


  keynote: {

    name: "Dr. Maya Rahman",

    role: "Director of Clinical AI",

    organization: "Global Health Systems",

    topic: "Medicine Beyond Prediction"

  },


  agenda: [

    {
      time: "09:00",
      type: "Opening",
      title: "The Next Clinical Era",
      description:
        "Opening remarks and the central theme of Future Health Summit 2027."
    },

    {
      time: "11:30",
      type: "Keynote",
      title: "Medicine Beyond Prediction",
      description:
        "A focused keynote on intelligent clinical systems and human-centered medicine."
    },

    {
      time: "15:30",
      type: "Closing Panel",
      title: "From Innovation to Practice",
      description:
        "A final conversation on moving healthcare innovation into real clinical environments."
    }

  ]

};



/* =========================================================
   ELEMENT REFERENCES
========================================================= */

const elements = {

  heroDate:
    document.getElementById("heroDate"),

  heroLocation:
    document.getElementById("heroLocation"),

  fullEventDate:
    document.getElementById("fullEventDate"),

  eventTime:
    document.getElementById("eventTime"),


  countdownDays:
    document.getElementById("countdownDays"),

  countdownHours:
    document.getElementById("countdownHours"),

  countdownMinutes:
    document.getElementById("countdownMinutes"),

  countdownSeconds:
    document.getElementById("countdownSeconds"),

  countdownMessage:
    document.getElementById("countdownMessage"),


  keynoteName:
    document.getElementById("keynoteName"),

  keynoteRole:
    document.getElementById("keynoteRole"),

  keynoteOrganization:
    document.getElementById("keynoteOrganization"),

  keynoteTopic:
    document.getElementById("keynoteTopic"),


  agendaList:
    document.getElementById("agendaList"),


  venueCity:
    document.getElementById("venueCity"),

  venueCountry:
    document.getElementById("venueCountry"),


  mapButton:
    document.getElementById("mapButton"),

  secondaryMapButton:
    document.getElementById("secondaryMapButton"),

  registerButton:
    document.getElementById("registerButton"),

  websiteLink:
    document.getElementById("websiteLink"),


  calendarButton:
    document.getElementById("calendarButton"),

  shareButton:
    document.getElementById("shareButton"),

  topShareButton:
    document.getElementById("topShareButton"),


  footerYear:
    document.getElementById("footerYear"),

  statusMessage:
    document.getElementById("statusMessage")

};



/* =========================================================
   DATE OBJECTS
========================================================= */

const START_DATE =
  new Date(CONFERENCE.startAt);

const END_DATE =
  new Date(CONFERENCE.endAt);



/* =========================================================
   BASIC DATA RENDERING
========================================================= */

function populateConferenceInformation() {

  /* ------------------------------------------
     Generic fields
  ------------------------------------------ */

  document
    .querySelectorAll("[data-field]")
    .forEach((element) => {

      const field =
        element.dataset.field;

      if (
        Object.prototype.hasOwnProperty.call(
          CONFERENCE,
          field
        )
      ) {
        element.textContent =
          CONFERENCE[field];
      }

    });


  /* ------------------------------------------
     Dates
  ------------------------------------------ */

  elements.heroDate.textContent =
    formatDate(
      START_DATE,
      {
        month: "long",
        day: "numeric",
        year: "numeric"
      }
    );


  elements.heroLocation.textContent =
    `${CONFERENCE.city}, ${CONFERENCE.country}`;


  elements.fullEventDate.textContent =
    formatDate(
      START_DATE,
      {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
      }
    );


  elements.eventTime.textContent =
    `${formatTime(START_DATE)} — ${formatTime(END_DATE)}`;


  /* ------------------------------------------
     Keynote
  ------------------------------------------ */

  elements.keynoteName.textContent =
    CONFERENCE.keynote.name;

  elements.keynoteRole.textContent =
    CONFERENCE.keynote.role;

  elements.keynoteOrganization.textContent =
    CONFERENCE.keynote.organization;

  elements.keynoteTopic.textContent =
    CONFERENCE.keynote.topic;


  /* ------------------------------------------
     Venue
  ------------------------------------------ */

  elements.venueCity.textContent =
    CONFERENCE.city;

  elements.venueCountry.textContent =
    CONFERENCE.country;


  /* ------------------------------------------
     Footer
  ------------------------------------------ */

  elements.footerYear.textContent =
    START_DATE.getFullYear();


  /* ------------------------------------------
     Links
  ------------------------------------------ */

  const mapUrl =
    getMapsUrl();

  elements.mapButton.href =
    mapUrl;

  elements.secondaryMapButton.href =
    mapUrl;


  configureRegistrationButton();

  configureWebsiteLink();


  /* ------------------------------------------
     Metadata
  ------------------------------------------ */

  updateMetadata();

  createEventStructuredData();

}



/* =========================================================
   DATE FORMATTING
========================================================= */

function formatDate(
  date,
  options = {}
) {

  return new Intl.DateTimeFormat(
    "en-US",
    {
      timeZone: CONFERENCE.timeZone,
      ...options
    }
  ).format(date);

}



function formatTime(date) {

  return new Intl.DateTimeFormat(
    "en-US",
    {
      timeZone: CONFERENCE.timeZone,
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    }
  ).format(date);

}



/* =========================================================
   MAPS
========================================================= */

function getMapsUrl() {

  if (
    typeof CONFERENCE.mapsUrl === "string" &&
    CONFERENCE.mapsUrl.trim()
  ) {
    return CONFERENCE.mapsUrl.trim();
  }


  const query =
    [
      CONFERENCE.venue,
      CONFERENCE.city,
      CONFERENCE.country
    ]
      .filter(Boolean)
      .join(", ");


  return (
    "https://www.google.com/maps/search/" +
    "?api=1&query=" +
    encodeURIComponent(query)
  );

}



/* =========================================================
   REGISTRATION
========================================================= */

function configureRegistrationButton() {

  const url =
    CONFERENCE.registrationUrl?.trim();


  if (!url) {

    elements.registerButton.hidden = true;

    return;

  }


  elements.registerButton.hidden = false;

  elements.registerButton.href = url;

}



/* =========================================================
   WEBSITE
========================================================= */

function configureWebsiteLink() {

  const url =
    CONFERENCE.websiteUrl?.trim();


  if (!url) {

    elements.websiteLink.hidden = true;

    return;

  }


  elements.websiteLink.hidden = false;

  elements.websiteLink.href = url;

}



/* =========================================================
   AGENDA
========================================================= */

function renderAgenda() {

  elements.agendaList.innerHTML = "";


  CONFERENCE.agenda.forEach(
    (item, index) => {

      const article =
        document.createElement("article");

      article.className =
        "agenda-item reveal";


      article.innerHTML = `

        <time class="agenda-item__time">
          ${escapeHTML(item.time)}
        </time>


        <div class="agenda-item__content">

          <p class="agenda-item__type">
            ${escapeHTML(item.type)}
          </p>

          <h3>
            ${escapeHTML(item.title)}
          </h3>

          <p>
            ${escapeHTML(item.description)}
          </p>

        </div>

      `;


      article.style.transitionDelay =
        `${index * 90}ms`;


      elements.agendaList.appendChild(
        article
      );

    }
  );

}



/* =========================================================
   COUNTDOWN
========================================================= */

let countdownInterval = null;

let lastAnnouncedMinute = null;



function startCountdown() {

  updateCountdown();


  countdownInterval =
    window.setInterval(
      updateCountdown,
      1000
    );

}



function updateCountdown() {

  const now =
    new Date();

  const difference =
    START_DATE.getTime() -
    now.getTime();


  if (difference <= 0) {

    handleConferenceStarted();

    return;

  }


  const totalSeconds =
    Math.floor(
      difference / 1000
    );


  const days =
    Math.floor(
      totalSeconds / 86400
    );


  const hours =
    Math.floor(
      (totalSeconds % 86400) /
      3600
    );


  const minutes =
    Math.floor(
      (totalSeconds % 3600) /
      60
    );


  const seconds =
    totalSeconds % 60;


  elements.countdownDays.textContent =
    padNumber(days);

  elements.countdownHours.textContent =
    padNumber(hours);

  elements.countdownMinutes.textContent =
    padNumber(minutes);

  elements.countdownSeconds.textContent =
    padNumber(seconds);


  /*
    We avoid announcing the countdown
    to screen readers every second.
  */

  if (
    minutes !== lastAnnouncedMinute
  ) {

    lastAnnouncedMinute = minutes;

    elements.statusMessage.textContent =
      `${days} days, ${hours} hours and ${minutes} minutes until ${CONFERENCE.name}.`;

  }

}



function handleConferenceStarted() {

  if (countdownInterval) {

    clearInterval(
      countdownInterval
    );

    countdownInterval = null;

  }


  elements.countdownDays.textContent =
    "00";

  elements.countdownHours.textContent =
    "00";

  elements.countdownMinutes.textContent =
    "00";

  elements.countdownSeconds.textContent =
    "00";


  const now =
    new Date();


  if (
    now.getTime() <=
    END_DATE.getTime()
  ) {

    elements.countdownMessage.textContent =
      "The conference is now in session.";

    elements.statusMessage.textContent =
      `${CONFERENCE.name} is now in session.`;

  } else {

    elements.countdownMessage.textContent =
      "This conference has concluded.";

    elements.statusMessage.textContent =
      `${CONFERENCE.name} has concluded.`;

  }

}



/* =========================================================
   CALENDAR / ICS
========================================================= */

function downloadCalendarFile() {

  const location =
    [
      CONFERENCE.venue,
      CONFERENCE.city,
      CONFERENCE.country
    ]
      .filter(Boolean)
      .join(", ");


  const invitationUrl =
    getShareUrl();


  const descriptionParts = [

    CONFERENCE.tagline,

    CONFERENCE.websiteUrl
      ? `Website: ${CONFERENCE.websiteUrl}`
      : "",

    invitationUrl
      ? `Invitation: ${invitationUrl}`
      : ""

  ]
    .filter(Boolean)
    .join("\\n");


  const icsContent =
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Vital Signal Conference Invitation//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${generateEventUID()}
DTSTAMP:${formatICSDate(new Date())}
DTSTART:${formatICSDate(START_DATE)}
DTEND:${formatICSDate(END_DATE)}
SUMMARY:${escapeICS(CONFERENCE.name)}
DESCRIPTION:${escapeICS(descriptionParts)}
LOCATION:${escapeICS(location)}
URL:${escapeICS(CONFERENCE.websiteUrl || invitationUrl)}
END:VEVENT
END:VCALENDAR`;


  const blob =
    new Blob(
      [icsContent],
      {
        type:
          "text/calendar;charset=utf-8"
      }
    );


  const downloadUrl =
    URL.createObjectURL(blob);


  const link =
    document.createElement("a");


  link.href =
    downloadUrl;

  link.download =
    `${slugify(CONFERENCE.shortName)}.ics`;


  document.body.appendChild(link);

  link.click();

  link.remove();


  URL.revokeObjectURL(
    downloadUrl
  );


  showStatus(
    "Calendar file downloaded."
  );

}



function formatICSDate(date) {

  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");

}



function generateEventUID() {

  return (
    `${slugify(CONFERENCE.shortName)}` +
    `-${START_DATE.getTime()}` +
    "@vital-signal"
  );

}



function escapeICS(value = "") {

  return String(value)

    .replace(/\\/g, "\\\\")

    .replace(/\n/g, "\\n")

    .replace(/,/g, "\\,")

    .replace(/;/g, "\\;");

}



/* =========================================================
   SHARE
========================================================= */

async function shareInvitation() {

  const shareData = {

    title:
      CONFERENCE.name,

    text:
      `${CONFERENCE.name} — ${CONFERENCE.tagline}`,

    url:
      getShareUrl()

  };


  if (
    navigator.share
  ) {

    try {

      await navigator.share(
        shareData
      );

      showStatus(
        "Invitation shared."
      );

      return;

    } catch (error) {

      /*
        AbortError means the user simply closed
        the native share sheet.
      */

      if (
        error.name === "AbortError"
      ) {
        return;
      }

    }

  }


  await copyInvitationLink();

}



function getShareUrl() {

  if (
    typeof CONFERENCE.shareUrl === "string" &&
    CONFERENCE.shareUrl.trim()
  ) {

    return CONFERENCE.shareUrl.trim();

  }


  return window.location.href;

}



async function copyInvitationLink() {

  const url =
    getShareUrl();


  try {

    await navigator.clipboard.writeText(
      url
    );

    showStatus(
      "Invitation link copied."
    );

  } catch (error) {

    legacyCopyToClipboard(
      url
    );

  }

}



function legacyCopyToClipboard(text) {

  const input =
    document.createElement("textarea");


  input.value =
    text;

  input.setAttribute(
    "readonly",
    ""
  );


  input.style.position =
    "fixed";

  input.style.opacity =
    "0";

  input.style.pointerEvents =
    "none";


  document.body.appendChild(
    input
  );


  input.select();


  try {

    document.execCommand(
      "copy"
    );

    showStatus(
      "Invitation link copied."
    );

  } catch (error) {

    showStatus(
      "Unable to copy the link automatically."
    );

  }


  input.remove();

}



/* =========================================================
   SHARE / CALENDAR EVENTS
========================================================= */

function setupActionEvents() {

  elements.calendarButton.addEventListener(
    "click",
    downloadCalendarFile
  );


  elements.shareButton.addEventListener(
    "click",
    shareInvitation
  );


  elements.topShareButton.addEventListener(
    "click",
    shareInvitation
  );

}



/* =========================================================
   SCROLL REVEALS
========================================================= */

function setupRevealObserver() {

  const revealItems =
    document.querySelectorAll(
      ".reveal"
    );


  if (
    prefersReducedMotion()
  ) {

    revealItems.forEach(
      (item) => {

        item.classList.add(
          "is-visible"
        );

      }
    );

    return;

  }


  const observer =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(
          (entry) => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "is-visible"
              );


              observer.unobserve(
                entry.target
              );

            }

          }
        );

      },
      {
        threshold: 0.14,
        rootMargin:
          "0px 0px -8% 0px"
      }
    );


  revealItems.forEach(
    (item) => {

      observer.observe(
        item
      );

    }
  );

}



/* =========================================================
   VITAL SIGNAL SCROLL SYSTEM
========================================================= */

function setupSignalSections() {

  const sections =
    Array.from(
      document.querySelectorAll(
        ".signal-section"
      )
    );


  if (!sections.length) {
    return;
  }


  /*
    This observer decides which section is
    the current active signal stage.
  */

  const observer =
    new IntersectionObserver(
      (entries) => {

        const visibleEntries =
          entries
            .filter(
              (entry) =>
                entry.isIntersecting
            )
            .sort(
              (a, b) =>
                b.intersectionRatio -
                a.intersectionRatio
            );


        if (!visibleEntries.length) {
          return;
        }


        const activeSection =
          visibleEntries[0].target;


        const index =
          sections.indexOf(
            activeSection
          );


        setSignalProgress(
          index,
          sections.length
        );

      },
      {
        threshold:
          [
            0.18,
            0.35,
            0.5,
            0.7
          ],

        rootMargin:
          "-18% 0px -30% 0px"
      }
    );


  sections.forEach(
    (section) => {

      observer.observe(
        section
      );

    }
  );

}



/* =========================================================
   SIGNAL PROGRESS
========================================================= */

function setSignalProgress(
  index,
  total
) {

  const denominator =
    Math.max(
      total - 1,
      1
    );


  const percentage =
    Math.max(
      0,
      Math.min(
        100,
        (index / denominator) * 100
      )
    );


  document.documentElement.style.setProperty(
    "--signal-progress",
    `${percentage}%`
  );

}



/* =========================================================
   DYNAMIC PAGE METADATA
========================================================= */

function updateMetadata() {

  document.title =
    CONFERENCE.name;


  updateMeta(
    'meta[name="description"]',
    `${CONFERENCE.name} — ${CONFERENCE.tagline}`
  );


  updateMeta(
    'meta[property="og:title"]',
    CONFERENCE.name
  );


  updateMeta(
    'meta[property="og:description"]',
    CONFERENCE.tagline
  );


  updateMeta(
    'meta[property="og:url"]',
    getShareUrl()
  );


  updateMeta(
    'meta[name="twitter:title"]',
    CONFERENCE.name
  );


  updateMeta(
    'meta[name="twitter:description"]',
    CONFERENCE.tagline
  );

}



function updateMeta(
  selector,
  content
) {

  const element =
    document.querySelector(
      selector
    );


  if (element) {

    element.setAttribute(
      "content",
      content
    );

  }

}



/* =========================================================
   STRUCTURED DATA
========================================================= */

function createEventStructuredData() {

  const structuredData = {

    "@context":
      "https://schema.org",

    "@type":
      "Event",

    name:
      CONFERENCE.name,

    description:
      CONFERENCE.tagline,

    startDate:
      CONFERENCE.startAt,

    endDate:
      CONFERENCE.endAt,

    eventStatus:
      "https://schema.org/EventScheduled",

    eventAttendanceMode:
      "https://schema.org/OfflineEventAttendanceMode",

    location: {

      "@type":
        "Place",

      name:
        CONFERENCE.venue,

      address: {

        "@type":
          "PostalAddress",

        addressLocality:
          CONFERENCE.city,

        addressCountry:
          CONFERENCE.country

      }

    },

    organizer: {

      "@type":
        "Organization",

      name:
        CONFERENCE.organizer,

      url:
        CONFERENCE.websiteUrl || undefined

    },

    url:
      getShareUrl()

  };


  const script =
    document.createElement(
      "script"
    );


  script.type =
    "application/ld+json";


  script.textContent =
    JSON.stringify(
      structuredData
    );


  document.head.appendChild(
    script
  );

}



/* =========================================================
   UTILITY FUNCTIONS
========================================================= */

function padNumber(value) {

  return String(value)
    .padStart(2, "0");

}



function slugify(value = "") {

  return value

    .toLowerCase()

    .trim()

    .replace(
      /[^a-z0-9]+/g,
      "-"
    )

    .replace(
      /^-+|-+$/g,
      ""
    );

}



function escapeHTML(value = "") {

  return String(value)

    .replace(
      /&/g,
      "&amp;"
    )

    .replace(
      /</g,
      "&lt;"
    )

    .replace(
      />/g,
      "&gt;"
    )

    .replace(
      /"/g,
      "&quot;"
    )

    .replace(
      /'/g,
      "&#039;"
    );

}



function showStatus(message) {

  elements.statusMessage.textContent =
    "";


  window.setTimeout(
    () => {

      elements.statusMessage.textContent =
        message;

    },
    40
  );

}



function prefersReducedMotion() {

  return window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

}



/* =========================================================
   INITIALIZATION
========================================================= */

function init() {

  populateConferenceInformation();

  renderAgenda();

  startCountdown();

  setupActionEvents();

  setupRevealObserver();

  setupSignalSections();

}



document.addEventListener(
  "DOMContentLoaded",
  init
);
