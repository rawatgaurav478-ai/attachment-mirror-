const questions = [
  {
    text: "Someone you love becomes quieter for a day. What does your body do first?",
    low: "I stay steady",
    high: "I scan for abandonment",
    weights: { secure: -0.8, anxious: 1.3, avoidant: 0.1, fearful: 0.8 },
  },
  {
    text: "A partner asks for more closeness than you expected.",
    low: "I can receive it",
    high: "I feel pressure and pull back",
    weights: { secure: -0.5, anxious: 0.2, avoidant: 1.2, fearful: 0.9 },
  },
  {
    text: "After conflict, how quickly do you need reassurance?",
    low: "I can wait and repair",
    high: "I need proof immediately",
    weights: { secure: -0.7, anxious: 1.4, avoidant: -0.1, fearful: 0.7 },
  },
  {
    text: "When you feel hurt, what is the most automatic move?",
    low: "Name it directly",
    high: "Hide it or test them",
    weights: { secure: -1, anxious: 0.7, avoidant: 0.7, fearful: 1.2 },
  },
  {
    text: "How safe does emotional dependence feel to you?",
    low: "Human and workable",
    high: "Risky or consuming",
    weights: { secure: -0.8, anxious: 0.5, avoidant: 0.9, fearful: 1.1 },
  },
  {
    text: "If a text goes unanswered, your mind tends to...",
    low: "Hold multiple explanations",
    high: "Build a painful story",
    weights: { secure: -0.9, anxious: 1.2, avoidant: 0.2, fearful: 0.8 },
  },
  {
    text: "When love gets very intimate, you usually...",
    low: "Let it deepen",
    high: "Find distance or doubt",
    weights: { secure: -0.6, anxious: 0.1, avoidant: 1.3, fearful: 1 },
  },
  {
    text: "During repair, how easy is it to own your impact without collapsing?",
    low: "Mostly possible",
    high: "I defend, panic, or disappear",
    weights: { secure: -1.2, anxious: 0.7, avoidant: 0.6, fearful: 1 },
  },
];

const styleProfiles = {
  secure: {
    name: "Secure",
    summary: "Your system can stay connected without losing itself. You tend to repair, clarify, and let love be both close and breathable.",
    traits: ["Direct emotional language", "Capacity for repair", "Comfort with interdependence"],
    triggers: "Mixed signals, chronic inconsistency, or partners who punish vulnerability.",
    behavior: "You usually ask instead of accuse and can pause before building a story.",
    fear: "Losing mutual respect or being pulled into unstable dynamics.",
    healing: "Keep practicing clarity, embodied boundaries, and choosing people who meet repair with repair.",
  },
  anxious: {
    name: "Anxious",
    summary: "Your system reaches for closeness when uncertainty appears. Reassurance can feel like oxygen when silence turns into threat.",
    traits: ["Fast threat detection", "Reassurance seeking", "High emotional attunement"],
    triggers: "Delayed replies, ambiguity, inconsistent affection, emotional distance.",
    behavior: "You may over-explain, protest, test, or escalate to restore contact.",
    fear: "Being abandoned after becoming emotionally invested.",
    healing: "Build self-soothing before reaching, ask directly, and let secure pacing replace urgency.",
  },
  avoidant: {
    name: "Avoidant",
    summary: "Your system protects autonomy when intimacy starts to feel demanding. Distance can feel safer than needing.",
    traits: ["Strong independence", "Deactivation under pressure", "Privacy as regulation"],
    triggers: "High emotional demand, perceived control, criticism, rapid dependency.",
    behavior: "You may delay replies, intellectualize feelings, minimize needs, or retreat.",
    fear: "Being engulfed, trapped, or responsible for someone else's emotional state.",
    healing: "Practice staying present in small doses, naming needs early, and letting closeness be negotiated rather than escaped.",
  },
  fearful: {
    name: "Fearful Avoidant",
    summary: "Your system may crave closeness and fear it at the same time. The push-pull is a protection strategy, not a character flaw.",
    traits: ["Approach-withdraw cycles", "High sensitivity to betrayal", "Intense chemistry with danger cues"],
    triggers: "Inconsistency, vulnerability, conflict, sudden intimacy, perceived rejection.",
    behavior: "You may pursue, freeze, test, disappear, then miss the person deeply.",
    fear: "Being abandoned if you need too much, or harmed if you let someone close.",
    healing: "Prioritize nervous-system regulation, slow relational pacing, trauma-informed support, and repair rituals that prove consistency over time.",
  },
};

const analysisTerms = {
  dependency: ["need", "can't", "without you", "please", "beg", "reassure", "promise"],
  fear: ["afraid", "scared", "abandon", "leave", "replace", "lose", "panic"],
  withdrawal: ["space", "busy", "later", "overwhelmed", "leave me", "can't talk", "shut down"],
  validation: ["do you care", "love me", "matter", "enough", "important", "chosen"],
  repair: ["sorry", "understand", "repair", "can we", "i feel", "i need", "listen"],
  mixed: ["but", "maybe", "i don't know", "confused", "sometimes", "hot and cold"],
};

const quotes = [
  "The pattern is not the enemy. It is a map back to safety.",
  "A trigger is a memory asking for a different ending.",
  "Secure love does not require you to abandon yourself.",
  "Distance can be protection. Closeness can be practice.",
];

const timelineSets = [
  [
    ["Week 1", "High chemistry, fast disclosure, nervous-system brightness."],
    ["Week 3", "First ambiguity. Reassurance seeking rises."],
    ["Week 5", "Withdrawal response. Messages become inconsistent."],
    ["Week 7", "Conflict peaks, both people protect instead of reveal."],
    ["Week 8", "Repair attempt creates calmer contact."],
  ],
  [
    ["Month 1", "Safe pacing and curiosity create emotional steadiness."],
    ["Month 2", "Old abandonment wound activates after a delay."],
    ["Month 3", "Boundary conversation reduces protest behavior."],
    ["Month 4", "Space is reinterpreted as regulation, not rejection."],
    ["Month 5", "Secure communication becomes more automatic."],
  ],
];

const compatibilityMatrix = {
  secure: { secure: 460, anxious: 392, avoidant: 382, fearful: 358 },
  anxious: { secure: 392, anxious: 318, avoidant: 246, fearful: 286 },
  avoidant: { secure: 382, anxious: 246, avoidant: 304, fearful: 264 },
  fearful: { secure: 358, anxious: 286, avoidant: 264, fearful: 238 },
};

const styleNeeds = {
  secure: "clarity, mutual respect, and honest repair",
  anxious: "reassurance, consistency, and direct affection",
  avoidant: "space, autonomy, and low-pressure emotional pacing",
  fearful: "safety, predictability, and slow trust-building",
};

let currentQuestion = 0;
const answers = new Array(questions.length).fill(50);
let timelineIndex = 0;
let audioContext;
let audioNodes = [];

const $ = (selector) => document.querySelector(selector);

function updateQuestion() {
  const question = questions[currentQuestion];
  $("#questionNumber").textContent = String(currentQuestion + 1);
  $("#questionTotal").textContent = String(questions.length);
  $("#questionText").textContent = question.text;
  $("#lowLabel").textContent = question.low;
  $("#highLabel").textContent = question.high;
  $("#answerSlider").value = answers[currentQuestion];
  const progress = Math.round(((currentQuestion + 1) / questions.length) * 100);
  $(".progress-ring").style.setProperty("--progress", `${progress}%`);
  $("#progressLabel").textContent = `${progress}%`;
  $("#prevQuestion").disabled = currentQuestion === 0;
  $("#nextQuestion").textContent = currentQuestion === questions.length - 1 ? "Reveal Mirror" : "Next Scene";
  updateSliderState();
}

function updateSliderState() {
  const value = Number($("#answerSlider").value);
  const state = value < 32 ? "Regulated and available" : value < 68 ? "Protective but reachable" : "Activated attachment response";
  $("#sliderState").textContent = state;
}

function scoreAttachment() {
  const scores = { secure: 65, anxious: 35, avoidant: 35, fearful: 30 };
  answers.forEach((answer, index) => {
    const intensity = (answer - 50) / 50;
    Object.entries(questions[index].weights).forEach(([style, weight]) => {
      scores[style] += intensity * weight * 18;
    });
  });
  return scores;
}

function revealStyle() {
  const scores = scoreAttachment();
  const topStyle = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  const profile = styleProfiles[topStyle];
  const result = $("#styleResult");
  result.hidden = false;
  result.innerHTML = `
    <p class="eyebrow">Primary mirror</p>
    <h3>${profile.name} Attachment</h3>
    <p>${profile.summary}</p>
    <ul>
      <li><strong>Traits:</strong> ${profile.traits.join(", ")}</li>
      <li><strong>Triggers:</strong> ${profile.triggers}</li>
      <li><strong>Relationship behavior:</strong> ${profile.behavior}</li>
      <li><strong>Deep fear:</strong> ${profile.fear}</li>
      <li><strong>Healing path:</strong> ${profile.healing}</li>
    </ul>
  `;
}

function analyzeMessage() {
  const text = $("#messageInput").value.toLowerCase();
  const words = text.split(/\s+/).filter(Boolean);
  const scores = Object.fromEntries(Object.keys(analysisTerms).map((key) => [key, 0]));
  Object.entries(analysisTerms).forEach(([key, terms]) => {
    terms.forEach((term) => {
      const matches = text.match(new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"));
      scores[key] += matches ? matches.length : 0;
    });
  });

  const maturity = Math.max(12, Math.min(96, 72 + scores.repair * 8 - scores.fear * 5 - scores.dependency * 4));
  const heatValues = Array.from({ length: 36 }, (_, index) => {
    const base = Math.sin(index * 0.8 + words.length * 0.13) * 28 + 48;
    return Math.max(12, Math.min(100, base + scores.fear * 8 + scores.dependency * 5 - scores.repair * 4));
  });
  $("#heatmap").innerHTML = heatValues
    .map((value, index) => {
      const color = value > 72 ? "rgba(255, 107, 134, .82)" : value > 48 ? "rgba(255, 211, 111, .72)" : "rgba(131, 247, 196, .66)";
      return `<span class="heat-cell" style="height:${Math.max(30, value)}px;background:${color};animation-delay:${index * 16}ms"></span>`;
    })
    .join("");

  const anxiousLoad = scores.dependency + scores.fear + scores.validation;
  const avoidantLoad = scores.withdrawal + scores.mixed;
  const attachment = anxiousLoad > avoidantLoad + 1 ? "anxious activation" : avoidantLoad > anxiousLoad + 1 ? "avoidant deactivation" : "mixed attachment signaling";
  const riskLevel = anxiousLoad + avoidantLoad > 6 ? "red" : anxiousLoad + avoidantLoad > 2 ? "yellow" : "green";

  $("#analysisInsights").innerHTML = `
    <div class="indicator"><span class="dot ${riskLevel}"></span><strong>Attachment behavior</strong><span>${attachment}</span></div>
    <div class="indicator"><span class="dot ${scores.validation > 1 ? "yellow" : "green"}"></span><strong>Validation seeking</strong><span>${scores.validation > 1 ? "visible" : "low"}</span></div>
    <div class="indicator"><span class="dot ${scores.withdrawal > 1 ? "yellow" : "green"}"></span><strong>Withdrawal behavior</strong><span>${scores.withdrawal > 1 ? "present" : "minimal"}</span></div>
    <div class="indicator"><span class="dot ${maturity > 68 ? "green" : maturity > 42 ? "yellow" : "red"}"></span><strong>Emotional maturity</strong><span>${Math.round(maturity)}%</span></div>
    <ul>
      <li><strong>Psychological insight:</strong> This message appears to be organized around ${attachment}, with ${scores.repair ? "some repair language available" : "limited repair language present"}.</li>
      <li><strong>Secure rewrite cue:</strong> Lead with one feeling, one need, and one concrete request.</li>
    </ul>
  `;
}

function drawTimeline() {
  const values = timelineIndex === 0 ? [130, 45, 188, 220, 75, 155, 98] : [155, 120, 175, 105, 128, 92, 118];
  const points = values.map((y, index) => `${60 + index * 92},${y}`).join(" ");
  const area = `60,240 ${points} ${60 + (values.length - 1) * 92},240`;
  $("#emotionGraph").innerHTML = `
    <defs>
      <linearGradient id="graphGradient" x1="0" x2="1">
        <stop offset="0%" stop-color="#61d4ff" />
        <stop offset="55%" stop-color="#9b7cff" />
        <stop offset="100%" stop-color="#ff7fb8" />
      </linearGradient>
      <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#61d4ff" stop-opacity=".42" />
        <stop offset="100%" stop-color="#030407" stop-opacity="0" />
      </linearGradient>
    </defs>
    <polyline class="graph-area" points="${area}" />
    <polyline class="graph-line" points="${points}" />
    ${values.map((y, index) => `<circle cx="${60 + index * 92}" cy="${y}" r="7" fill="#f5f7ff" opacity=".9"></circle>`).join("")}
  `;
  $("#timelineEvents").innerHTML = timelineSets[timelineIndex]
    .map(([time, label]) => `<div class="timeline-event"><strong>${time}</strong><span>${label}</span></div>`)
    .join("");
}

function scanWounds(event) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const values = [...data.values()];
  const wounds = [];
  if (values.includes("neglect") || values.includes("quiet")) wounds.push("Emotional neglect wound");
  if (values.includes("criticism") || values.includes("achieve")) wounds.push("Conditional worth wound");
  if (values.includes("inconsistent") || values.includes("chasing")) wounds.push("Abandonment unpredictability");
  if (values.includes("leave")) wounds.push("Deactivation defense");
  if (values.includes("pursue")) wounds.push("Protest response");
  if (values.includes("freeze")) wounds.push("Hypervigilant freeze");
  if (!wounds.length) wounds.push("Secure base imprint");
  $("#woundOutput").innerHTML = `
    <p class="eyebrow">Origin map</p>
    <h3>${wounds[0]}</h3>
    <p>Your attachment system likely learned to protect connection through ${wounds.includes("Deactivation defense") ? "distance and self-containment" : wounds.includes("Protest response") ? "urgency and pursuit" : "careful scanning and adaptation"}.</p>
    <div>${wounds.map((wound) => `<span class="wound-tag">${wound}</span>`).join("")}</div>
    <ul>
      <li><strong>Defense mechanism:</strong> ${values.includes("leave") ? "emotional distancing" : values.includes("pursue") ? "reassurance pursuit" : "threat scanning"}.</li>
      <li><strong>Coping pattern:</strong> trying to earn, predict, or avoid emotional pain before it arrives.</li>
      <li><strong>Healing recommendation:</strong> pair body regulation with slow, direct relational requests.</li>
    </ul>
  `;
}

function scoreNote(note) {
  const text = note.toLowerCase();
  const intensityTerms = ["always", "never", "panic", "beg", "leave", "ignored", "abandon", "shut down", "too much", "cold"];
  const repairTerms = ["i feel", "i need", "can we", "sorry", "understand", "repair", "listen", "boundary", "space"];
  const intensity = intensityTerms.reduce((sum, term) => sum + (text.includes(term) ? 1 : 0), 0);
  const repair = repairTerms.reduce((sum, term) => sum + (text.includes(term) ? 1 : 0), 0);
  return { intensity, repair, length: text.trim().length };
}

function analyzeRelationshipMatch() {
  const aStyle = $("#personAStyle").value;
  const bStyle = $("#personBStyle").value;
  const aNote = $("#personANote").value;
  const bNote = $("#personBNote").value;
  const a = scoreNote(aNote);
  const b = scoreNote(bNote);
  const base = compatibilityMatrix[aStyle][bStyle];
  const repairBonus = Math.min(42, (a.repair + b.repair) * 7);
  const intensityPenalty = Math.min(70, (a.intensity + b.intensity) * 9);
  const vulnerabilityBonus = a.length > 35 && b.length > 35 ? 24 : a.length > 35 || b.length > 35 ? 10 : 0;
  const finalScore = Math.max(80, Math.min(500, Math.round(base + repairBonus + vulnerabilityBonus - intensityPenalty)));
  const percent = Math.round((finalScore / 500) * 100);
  const anxiousAvoidant = [aStyle, bStyle].includes("anxious") && [aStyle, bStyle].includes("avoidant");
  const fearfulPresent = [aStyle, bStyle].includes("fearful");
  const securePresent = [aStyle, bStyle].includes("secure");
  const conflictRisk = anxiousAvoidant ? "high push-pull risk" : fearfulPresent ? "high sensitivity to rupture" : finalScore > 380 ? "manageable conflict risk" : "moderate conflict risk";
  const repairPotential = securePresent || a.repair + b.repair > 2 ? "strong repair potential" : "repair needs more structure";
  const dynamic = anxiousAvoidant
    ? "One system may pursue closeness while the other protects through distance. This can create a painful loop unless space and reassurance are both scheduled clearly."
    : fearfulPresent
      ? "This bond may feel emotionally intense because closeness and fear can activate together. Slow pacing and predictable repair matter more than chemistry."
      : "This pairing has room for emotional steadiness when both people name needs before they become tests or withdrawals.";

  $("#relationshipScore").textContent = finalScore;
  $("#relationshipScoreOrb").style.setProperty("--score", `${percent}%`);
  $("#matchBars").innerHTML = [
    ["Emotional fit", Math.max(18, percent)],
    ["Communication safety", Math.max(12, Math.min(96, percent + (a.repair + b.repair) * 8 - (a.intensity + b.intensity) * 5))],
    ["Conflict stability", Math.max(10, Math.min(94, percent - (anxiousAvoidant ? 24 : fearfulPresent ? 16 : 2)))],
    ["Repair potential", Math.max(18, Math.min(98, percent + repairBonus))],
  ].map(([label, value]) => `
    <div class="match-bar">
      <header><span>${label}</span><strong>${Math.round(value)}%</strong></header>
      <div class="match-track"><div class="match-fill" style="--fill:${Math.round(value)}%"></div></div>
    </div>
  `).join("");
  $("#matchInsights").innerHTML = `
    <div class="match-insight"><strong>Attachment match:</strong> ${styleProfiles[aStyle].name} with ${styleProfiles[bStyle].name}. Person A may need ${styleNeeds[aStyle]}; Person B may need ${styleNeeds[bStyle]}.</div>
    <div class="match-insight"><strong>AI relationship read:</strong> ${dynamic}</div>
    <div class="match-insight"><strong>Risk indicator:</strong> ${conflictRisk}. <strong>Repair indicator:</strong> ${repairPotential}.</div>
    <div class="match-insight"><strong>Secure next step:</strong> Each person should make one request in this format: "When this happens, I feel __. What I need is __. Can we try __?"</div>
  `;
}

function setupCanvas() {
  const canvas = $("#neuralCanvas");
  const context = canvas.getContext("2d");
  let particles = [];

  function resize() {
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    particles = Array.from({ length: Math.min(95, Math.floor(window.innerWidth / 13)) }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.5,
    }));
  }

  function draw() {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    particles.forEach((particle, index) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1;
      if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1;
      context.beginPath();
      context.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
      context.fillStyle = "rgba(149, 205, 255, .72)";
      context.fill();
      for (let j = index + 1; j < particles.length; j += 1) {
        const other = particles[j];
        const distance = Math.hypot(particle.x - other.x, particle.y - other.y);
        if (distance < 132) {
          context.strokeStyle = `rgba(97, 212, 255, ${0.11 * (1 - distance / 132)})`;
          context.lineWidth = 1;
          context.beginPath();
          context.moveTo(particle.x, particle.y);
          context.lineTo(other.x, other.y);
          context.stroke();
        }
      }
    });
    requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener("resize", resize);
}

function setupAudio() {
  const button = $("#soundToggle");
  button.addEventListener("click", async () => {
    if (audioContext) {
      audioNodes.forEach((node) => node.stop && node.stop());
      audioNodes = [];
      await audioContext.close();
      audioContext = null;
      button.setAttribute("aria-pressed", "false");
      button.querySelector("span:last-child").textContent = "Ambient off";
      return;
    }
    audioContext = new AudioContext();
    const master = audioContext.createGain();
    master.gain.value = 0.035;
    master.connect(audioContext.destination);
    [146.83, 220, 329.63].forEach((freq, index) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.type = index === 0 ? "sine" : "triangle";
      osc.frequency.value = freq;
      gain.gain.value = index === 0 ? 0.55 : 0.18;
      osc.connect(gain).connect(master);
      osc.start();
      audioNodes.push(osc);
    });
    button.setAttribute("aria-pressed", "true");
    button.querySelector("span:last-child").textContent = "Ambient on";
  });
}

function setupChat() {
  $("#chatToggle").addEventListener("click", () => {
    $("#chatWindow").hidden = !$("#chatWindow").hidden;
  });
  $("#chatForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const input = $("#chatInput");
    const text = input.value.trim();
    if (!text) return;
    addChat(text, "user");
    input.value = "";
    const lower = text.toLowerCase();
    const response = lower.includes("left") || lower.includes("ignore") || lower.includes("abandon")
      ? "That sounds like an abandonment alarm. Before responding, place one hand on your chest and ask: what exact reassurance do I need, and can I request it without protest?"
      : lower.includes("space") || lower.includes("overwhelmed")
        ? "Your system may be asking for distance as regulation. Secure distance includes a return point: name when you will reconnect."
        : "I hear a lot of emotional meaning in that. Try separating the fact, the story your nervous system added, and the request secure-you would make.";
    window.setTimeout(() => addChat(response, "ai"), 420);
  });
}

function setupLogin() {
  const gate = $("#loginGate");
  const form = $("#loginForm");
  const guest = $("#guestButton");
  document.body.classList.add("locked");

  function enterApp(name = "you") {
    gate.classList.add("hidden");
    document.body.classList.remove("locked");
    const cleanName = name.trim() || "you";
    $("#quoteText").textContent = `Welcome, ${cleanName}. Your patterns are information, not a verdict.`;
    window.setTimeout(() => gate.remove(), 700);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    enterApp($("#loginName").value);
  });

  guest.addEventListener("click", () => {
    enterApp("you");
  });
}

function addChat(text, type) {
  const message = document.createElement("div");
  message.className = `chat-message ${type}`;
  message.textContent = text;
  $("#chatLog").appendChild(message);
  $("#chatLog").scrollTop = $("#chatLog").scrollHeight;
}

function setupMotion() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.16 });
  document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));

  let quoteIndex = 0;
  setInterval(() => {
    quoteIndex = (quoteIndex + 1) % quotes.length;
    $("#quoteText").animate([{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 700 });
    $("#quoteText").textContent = quotes[quoteIndex];
  }, 5200);

  const lines = ["Scanning emotional language", "Mapping hidden protest", "Finding the wound beneath the words", "Practicing secure repair"];
  let lineIndex = 0;
  setInterval(() => {
    lineIndex = (lineIndex + 1) % lines.length;
    $("#typingLine").textContent = lines[lineIndex];
  }, 2600);

  document.querySelectorAll(".tilt-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${y * -7}deg) rotateY(${x * 8}deg) translateY(-4px)`;
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });

  const heroOrbit = $(".parallax-zone");
  window.addEventListener("pointermove", (event) => {
    if (!heroOrbit) return;
    const x = event.clientX / window.innerWidth - 0.5;
    const y = event.clientY / window.innerHeight - 0.5;
    heroOrbit.style.transform = `rotateX(${y * -4}deg) rotateY(${x * 5}deg)`;
  });
}

function setupInteractions() {
  updateQuestion();
  drawTimeline();
  $("#answerSlider").addEventListener("input", (event) => {
    answers[currentQuestion] = Number(event.target.value);
    updateSliderState();
  });
  $("#prevQuestion").addEventListener("click", () => {
    if (currentQuestion > 0) {
      currentQuestion -= 1;
      updateQuestion();
    }
  });
  $("#nextQuestion").addEventListener("click", () => {
    if (currentQuestion < questions.length - 1) {
      currentQuestion += 1;
      updateQuestion();
    } else {
      revealStyle();
    }
  });
  $("#analyzeButton").addEventListener("click", analyzeMessage);
  $("#messageInput").value = "I know you said you are busy, but when you disappear I feel scared that I do not matter. I need clarity, not a perfect answer. Can we talk tonight?";
  analyzeMessage();
  $("#shuffleTimeline").addEventListener("click", () => {
    timelineIndex = (timelineIndex + 1) % timelineSets.length;
    drawTimeline();
  });
  $("#woundForm").addEventListener("submit", scanWounds);
  $("#personAStyle").value = "anxious";
  $("#personBStyle").value = "avoidant";
  $("#personANote").value = "I panic when replies are late and I feel ignored. I need reassurance but I do not want to beg for it.";
  $("#personBNote").value = "I care about them, but when emotions get intense I shut down and need space before I can listen.";
  $("#matchButton").addEventListener("click", analyzeRelationshipMatch);
  analyzeRelationshipMatch();
  $("#breathOrb").addEventListener("click", () => {
    $("#breathOrb").classList.toggle("active");
    $("#breathText").textContent = $("#breathOrb").classList.contains("active") ? "Inhale... exhale..." : "Breathe";
  });
  $("#exerciseList").addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") event.target.closest("li").classList.toggle("done");
  });
  $("#journalInput").addEventListener("input", (event) => {
    const hasFear = /fear|scared|afraid|panic|abandon/i.test(event.target.value);
    $("#journalPrompt").textContent = hasFear
      ? "Prompt: What reassurance can you give yourself before asking for reassurance from them?"
      : "Prompt: What would secure-you ask for with warmth and clarity?";
  });
}

setupCanvas();
setupLogin();
setupMotion();
setupInteractions();
setupAudio();
setupChat();
