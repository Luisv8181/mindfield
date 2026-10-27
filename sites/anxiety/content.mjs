import { more, row, ol, ul, takeaway, keys, plainRow, pacerUI } from "../../lib.mjs";

const pacers = {
  modes: [{
    id: "breath", label: "Guided breath", button: "Start guided breath",
    idle: "Inhale 4, hold 4, exhale 6, rest 2.",
    phases: [
      { name: "Inhale, 4", text: "Breathe in gently for 4. Let the breath be easy, not forced.", scale: 1.22, ms: 4000, f: 540 },
      { name: "Hold, 4", text: "Hold softly for 4. Keep your shoulders loose.", scale: 1.22, ms: 4000, f: 620 },
      { name: "Exhale, 6", text: "Exhale slowly for 6. Let the body soften on the way out.", scale: .86, ms: 6000, f: 420 },
      { name: "Rest, 2", text: "Rest for 2. Notice what changed, even if it is small.", scale: .96, ms: 2000, f: 480 }
    ]
  }]
};

const chapters = [
  {
    id: "c0", nav: "Signal", label: "Chapter 1 of 5, Signal",
    html: `      <h1>When the alarm gets loud.</h1>
      <p class="lead">Anxiety often starts as future-focused prediction: the mind scans, the body prepares, and behavior begins shifting toward safety, control, avoidance, or reassurance.</p>
      <p class="muted">Anxiety is a protective signal. It is the mind and body trying to predict and prepare for possible danger. That system can be useful, but when it becomes too sensitive it can feel loud, repetitive, and hard to switch off.</p>
      <ul class="tags hot">
        <li data-hot="sig:0" tabindex="0">Future alarm</li><li data-hot="sig:1" tabindex="0">Mind + body</li><li data-hot="sig:2" tabindex="0">Loop, not flaw</li><li data-hot="sig:3" tabindex="0">Skills help</li>
      </ul>
${takeaway("Anxiety is an alarm system.")}
      <div class="jump"><a href="#c1">See the cycle</a><a href="#c2">Feel the body response</a><a href="#c3">Learn what helps</a></div>`
  },
  {
    id: "c1", nav: "Loop", label: "Chapter 2 of 5, Loop",
    html: `      <h2>The anxiety cycle.</h2>
      <p>Triggers do not always look dramatic. They can be sensations, thoughts, reminders, social situations, uncertainty, or pressure. Once something is tagged as possible danger, the body often follows immediately.</p>
${ol([
      row(1, "Trigger", "Something grabs attention.", "loop:0"),
      row(2, "Threat thought", "The mind predicts what might go wrong.", "loop:1"),
      row(3, "Body alarm", "The nervous system prepares for danger.", "loop:2"),
      row(4, "Avoid or escape", "Relief can reinforce the loop.", "loop:3")
    ])}
${takeaway("Relief can feel good and still keep anxiety stuck.")}
      <div class="block">
        <h3>What keeps it going.</h3>
        <p>Short-term relief is powerful. Leaving, checking, or seeking reassurance may calm anxiety immediately. The problem is that the brain may learn: I escaped, so the danger must have been real.</p>
${ul([
      plainRow("Mind", "Scanning, forecasting, overestimating threat."),
      plainRow("Body", "Tension, urgency, activation, arousal."),
      plainRow("Behavior", "Avoiding, checking, withdrawing, reassuring."),
      plainRow("Goal", "Break the cycle gently and repeatedly.")
    ])}
${takeaway("Short-term relief can train long-term fear.")}
      </div>`
  },
  {
    id: "c2", nav: "Body", label: "Chapter 3 of 5, Body",
    html: `      <h2>Mind and body signals.</h2>
      <p>Anxiety can feel physical: racing thoughts, a tight throat, a tight chest, a racing heart, a stomach knot, tense muscles, jittery legs, and restless feet.</p>
      <p class="muted">Anxiety is not only a thought pattern. It can feel like pressure, constriction, urgency, vibration, agitation, or restlessness moving through the body.</p>
${ul([
      plainRow("Racing thoughts", "", "body:0"), plainRow("Tight throat", "", "body:1"), plainRow("Tight chest", "", "body:2"), plainRow("Racing heart", "", "body:3"),
      plainRow("Stomach knot", "", "body:4"), plainRow("Tense muscles", "", "body:5"), plainRow("Jittery legs", "", "body:6"), plainRow("Restless feet", "", "body:7")
    ], "rows plain cols")}
${takeaway("Body sensations are part of the alarm response.")}
      <div class="block">
        <h3>Common signs.</h3>
        <p>Different people experience different symptoms. Some feel more chest tightness, some more stomach distress, some more racing thoughts, and some more restlessness or muscle tension.</p>
${ul([
      plainRow("Notice", "Name the sensation without judging it."),
      plainRow("Normalize", "These are real nervous-system responses."),
      plainRow("Slow down", "Less panic about the sensation can reduce the spiral."),
      plainRow("Track patterns", "Different triggers often create different sensations.")
    ])}
${takeaway("There is no single correct anxiety pattern.")}
      </div>`
  },
  {
    id: "c3", nav: "Tools", label: "Chapter 4 of 5, Tools",
    html: `      <h2>What can help.</h2>
      <p>Anxiety becomes easier to work with when the body is calmer, the fear is named clearly, and the next step is small enough to be doable.</p>
      <p class="muted">Helpful anxiety skills often work in layers: regulate the body, name the fear, question the prediction, and take one small step toward life instead of away from it.</p>
${ul([
      plainRow("Ground", "Use the senses to reconnect to the present moment."),
      plainRow("Breathe", "Lengthen the exhale and lower physiological intensity."),
      plainRow("Check the thought", "Ask what the fear is predicting and what evidence exists."),
      plainRow("Approach gently", "Take a manageable step instead of avoiding everything.")
    ])}
${takeaway("The goal is not zero anxiety. The goal is more freedom while it is present.")}
      <div class="block">
        <h3>A practical sequence.</h3>
        <p>When anxiety is high, do not try to solve everything at once. First reduce intensity. Then clarify the fear. Then choose one next step.</p>
${ol([
      row(1, "Slow the body", "Enough to regain flexibility.", "seq:0"),
      row(2, "Name the fear", "As clearly as possible.", "seq:1"),
      row(3, "Ask what it predicts", "What is the mind forecasting?", "seq:2"),
      row(4, "Choose one small step", "Toward what matters.", "seq:3")
    ])}
${takeaway("Sequence matters: regulate first, then think, then act.")}
      </div>`
  },
  {
    id: "c4", nav: "Reset", label: "Chapter 5 of 5, Reset",
    html: `      <h2>Slow the alarm first.</h2>
      <p>Slower breathing does not erase anxiety instantly, but it can reduce the intensity enough to help the nervous system shift. Try: inhale 4, hold 4, exhale 6, rest 2.</p>
${pacerUI(pacers.modes, pacers.modes[0].idle, "Start guided breath")}
      <div class="block" style="margin-top:12vh">
        <h3>When support may help.</h3>
        <p>Support can help when anxiety is intense, frequent, hard to control, or shrinking daily life. Therapy can help with panic, worry, reassurance-seeking, avoidance, perfectionism, and intolerance of uncertainty.</p>
${ul([
      plainRow("Anxiety is frequent, intense, or hard to control."),
      plainRow("Avoidance keeps narrowing work, school, or social life."),
      plainRow("Sleep, concentration, appetite, or energy are suffering."),
      plainRow("The body symptoms themselves are becoming scary.")
    ])}
${takeaway("Support is a tool, not a failure.")}
        <span class="label" style="margin-top:3rem">Key ideas</span>
${keys(["Anxiety is an alarm system.", "Possibility is not certainty.", "Body, thoughts, and behavior all connect.", "Avoidance can strengthen the loop.", "Practice can retrain the response.", "Support is valid."])}
        <p class="fine">Educational content. It is not a substitute for care from a qualified professional.</p>
      </div>`
  }
];
chapters.forEach((c, i) => (c.index = i));

export default {
  title: "Anxiety: When the Alarm Gets Loud",
  brand: "Anxiety",
  scheme: "light", signature: "", restraint: "",
  fontsHref: "https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Hanken+Grotesk:wght@400;600&family=IBM+Plex+Mono:wght@400;500&display=swap",
  fontLoad: '400 100px "Instrument Serif"',
  displayFont: '"Instrument Serif", Georgia, serif',
  vars: {
    ink: "#eef0f1", paper: "#15181c", muted: "#545b63", a: "#d9431c", b: "#b8361a", rule: "rgba(21,24,28,.18)",
    display: '"Instrument Serif",Georgia,"Times New Roman",serif', dw: "400", lh: ".95", ls: "-.01em", tt: "none",
    h1: "clamp(3.6rem,10vw,8.6rem)", h2: "clamp(2.8rem,6vw,5.2rem)", h3: "clamp(2rem,3.6vw,3rem)", tk: "1.6rem", rb: "1.6rem"
  },
  palette: { ramp: ["#d9431c", "#5d646c", "#15181c"], hot: "#d9431c", line: "#15181c" },
  count: 11000, size: 2.2, seed: 5,
  pacers,
  chapters
};
