// Store answers
const answers = {
  length: null,
  group: null,
  mode: null
};

// Result mapping
// key format: "length-group-mode"
const results = {
  "long-large-onsite": {
    title: "SkillUp! Workshops",
    image: "assets/skillup-workshops.png"
  },
  "long-small-online": {
    title: "SkillUp! Online",
    image: "assets/skillup-online.png"
  },
  "short-small-onsite": [
    {
      title: "Coaching",
      image: "assets/coaching.png"
    },
    {
      title: "StudySnacks",
      image: "assets/studysnacks.png"
    }
  ]
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
    resultConfig = {
      title: "Kein Match gefunden",
      image: ""
    };
  }

  // Multiple possible matches -> random
  if (Array.isArray(resultConfig)) {
    const randomIndex = Math.floor(Math.random() * resultConfig.length);
    resultConfig = resultConfig[randomIndex];
  }

  const titleEl = document.getElementById("result-title");
  const imgEl = document.getElementById("result-image");

  titleEl.textContent = resultConfig.title;

  if (resultConfig.image) {
    imgEl.src = resultConfig.image;
    imgEl.style.display = "block";
  } else {
    imgEl.style.display = "none";
  }

  showScreen("screen-result");
}

// Restart quiz
document.getElementById("restart-btn").addEventListener("click", () => {
  answers.length = null;
  answers.group = null;
  answers.mode = null;
  showScreen("screen-q1");
});
