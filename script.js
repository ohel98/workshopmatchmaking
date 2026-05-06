// Store answers
const answers = {
  length: null,
  group: null,
  mode: null
};

// Result mapping
const results = {
  "long-large-onsite": {
    title: "SkillUp! Workshops"
  },
  "long-small-online": {
    title: "SkillUp! Online"
  },
  "short-small-onsite": [
    { title: "Coaching" },
    { title: "StudySnacks" }
  ],

  // new ones you requested:
  "short-small-online": {
    title: "Coaching"
  },
  "short-large-online": {
    title: "StudySnacks"
  },
  "short-large-onsite": {
    title: "StudySnacks"
  },
  "long-small-onsite": {
    title: "Coaching"
  },
  "long-large-online": {
    title: "SkillUp! Workshop II"
  }
};

// Helper: show one screen, hide others
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");
}

// Start button on title screen
document.getElementById("start-btn").addEventListener("click", () => {
  showScreen("screen-q1");
});

// Handle answer clicks
document.querySelectorAll(".btn.option").forEach(btn => {
  btn.addEventListener("click", () => {
    const question = btn.dataset.question;
    const value = btn.dataset.value;

    answers[question] = value;

    if (question === "length") {
      showScreen("screen-q2");
    } else if (question === "group") {
      showScreen("screen-q3");
    } else if (question === "mode") {
      showResult();
    }
  });
});

// Compute and show result
function showResult() {
  const key = `${answers.length}-${answers.group}-${answers.mode}`;
  let resultConfig = results[key];

  if (!resultConfig) {
    resultConfig = { title: "Kein Match gefunden" };
  }

  if (Array.isArray(resultConfig)) {
    const randomIndex = Math.floor(Math.random() * resultConfig.length);
    resultConfig = resultConfig[randomIndex];
  }

  const titleEl = document.getElementById("result-title");
  titleEl.textContent = resultConfig.title;

  showScreen("screen-result");
}

// Restart -> back to title
document.getElementById("restart-btn").addEventListener("click", () => {
  answers.length = null;
  answers.group = null;
  answers.mode = null;
  showScreen("screen-title");
});
