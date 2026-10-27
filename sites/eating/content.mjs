import { more, row, ol, ul, takeaway, hint, keys, plainRow } from "../../lib.mjs";

const chapters = [
  {
    id: "c0", nav: "Home", label: "Understanding eating disorders",
    html: `      <h1>More than food.</h1>
      <p class="lead">Eating disorders can affect thoughts, emotions, routines, relationships, identity, and physical health.</p>
      <p class="muted">They are serious illnesses, not choices, phases, or failures of willpower.</p>
      <ul class="tags hot">
        <li data-hot="home:0" tabindex="0">Thoughts</li><li data-hot="home:1" tabindex="0">Feelings</li><li data-hot="home:2" tabindex="0">Control</li><li data-hot="home:3" tabindex="0">Identity</li><li data-hot="home:4" tabindex="0">Recovery</li>
      </ul>
${hint("Five parts of a life, held in one field. Hover a word to find it.")}`
  },
  {
    id: "c1", nav: "Types", label: "Chapter 1 of 5, Types",
    html: `      <span class="label" style="margin-top:-.4rem;color:var(--b)">What they are</span>
      <h2>Not one single picture.</h2>
      <p>Eating disorders can reshape how a person thinks, feels, behaves, and relates to their body, food, other people, and everyday life. The struggle may be visible, or almost completely hidden.</p>
${ul([
      plainRow("Appearance is not a diagnosis.", "", "types:0"),
      plainRow("They are not choices or failures of willpower.", "", "types:1"),
      plainRow("They can occur at any body size.", "", "types:2"),
      plainRow("Medical risk is not always visible from the outside.", "", "types:3"),
      plainRow("Earlier recognition and treatment can support recovery.", "", "types:4")
    ])}
${hint("Every form in the field is different. Every one carries the same weight.")}
${takeaway("Different experiences can share the same seriousness.")}
${more("Not one single picture", "Eating disorders do not look only one way. People may struggle with restriction, binge eating, compensatory behaviors, sensory or fear-based avoidance, or symptoms that shift over time. Seriousness is not determined by appearance.", "Different experiences can share the same seriousness.")}
${more("More than food", "Eating disorders are serious mental health conditions involving disturbances in eating behavior and often intense thoughts, emotions, fears, or rules around food, body image, safety, or control. They can affect people of any gender, age, race, ethnicity, or body size.", "You cannot tell whether someone has an eating disorder by appearance alone.")}`
  },
  {
    id: "c2", nav: "Cycle", label: "Chapter 2 of 5, The cycle",
    html: `      <span class="label" style="margin-top:-.4rem;color:var(--b)">Reading the loop</span>
      <h2>What keeps it going?</h2>
${ol([
      row(1, "Distress", "", "loop:0"),
      row(2, "Rules", "", "loop:1"),
      row(3, "Behavior", "", "loop:2"),
      row(4, "Relief", "", "loop:3"),
      row(5, "Shame", "", "loop:4")
    ])}
${hint("Hover a step to follow it around the loop.")}
      <p>Recovery work often involves slowing the loop down enough to notice what the behavior is trying to solve, then building safer and more flexible responses over time.</p>
${ul([
      plainRow("Mind", "Rigid thoughts, fear, comparison, self-criticism."),
      plainRow("Body", "Tension, exhaustion, hunger cues, overwhelm."),
      plainRow("Behavior", "Avoiding, checking, restricting, bingeing, compensating."),
      plainRow("Goal", "Interrupt the loop without replacing it with more shame.", "loop:goal")
    ])}
${takeaway("Short-term relief can strengthen the long-term loop.")}
${more("The cycle can feel automatic", "A trigger such as distress, shame, conflict, or body-image pain may activate rules or urges. A behavior can then briefly reduce tension or create a feeling of control. That short-term relief can reinforce the loop, even when the pattern causes harm later.", "Short-term relief can strengthen the long-term loop.")}
${more("Why the cycle is hard to break", "The behavior often does something in the short term: numbs emotion, creates predictability, lowers anxiety, or restores a sense of control. Understanding that function helps explain why recovery needs support, alternatives, and flexibility rather than shame.", "Understanding function helps make room for better support.")}`
  },
  {
    id: "c3", nav: "Notice", label: "Chapter 3 of 5, Warning signs",
    html: `      <span class="label" style="margin-top:-.4rem;color:var(--b)">Notice without minimizing</span>
      <h2>What matters most?</h2>
      <p>The most useful question is not “Does this look severe enough?” but rather: “Is this starting to take over?”</p>
      <p class="muted">You do not have to wait for “bad enough” to ask for help.</p>
${ul([
      plainRow("Has eating become ruled by fear, guilt, or rigid rules?", "", "q:0"),
      plainRow("Is food or body image taking over mental space?", "", "q:1"),
      plainRow("Are social, school, work, or family routines narrowing?", "", "q:2"),
      plainRow("Do physical symptoms or distress keep increasing?", "", "q:3")
    ])}
${hint("Hover a question. The dense mass is what is taking over. The rest is the life around it.")}
${takeaway("Concern can be valid before things look extreme.")}
${more("What to notice", "Possible warning signs can include preoccupation with food or body image, rigid rules, avoiding meals, secretive patterns, mood or concentration changes, fatigue, dizziness, and increasing interference with daily life. A person does not need every sign for concern to be valid.", "Warning signs are clues, not a complete definition.")}
${more("Reading the warning signs carefully", "These signs are not a self-diagnosis quiz. They are a way to notice when food, body image, rules, or distress are taking up more mental space and interfering with life, relationships, energy, or well-being.", "Concern can be valid before things look extreme.")}`
  },
  {
    id: "c4", nav: "Recovery", label: "Chapter 4 of 5, Recovery",
    html: `      <span class="label" style="margin-top:-.4rem;color:var(--b)">Support paths</span>
      <h2>What can help?</h2>
${ol([
      row(1, "Therapy", "Helps address fear, rigidity, shame, and emotional pain.", "path:0"),
      row(2, "Medical care", "Monitors and treats physical complications and health risk.", "path:1"),
      row(3, "Nutrition support", "Builds safer, more flexible patterns around nourishment.", "path:2"),
      row(4, "Community", "Reduces isolation and supports long-term change.", "path:3")
    ])}
${hint("Four strands twist into one rope. Hover one to see it carry the others.")}
      <p>If eating, body image, or compensatory patterns are taking over daily life, professional support is worth seeking earlier rather than later.</p>
${takeaway("Recovery is supported, not forced.")}
${more("Support and treatment", "Support can include psychotherapy, medical monitoring, nutrition support from qualified professionals, family or community support, and higher levels of care when needed. Different people need different mixes of support.", "Recovery is supported, not forced.")}`
  },
  {
    id: "c5", nav: "Beyond", label: "Recovery",
    html: `      <h2>A life larger than the disorder.</h2>
      <p class="lead">Recovery is often uneven: progress, difficult days, relearning, support, and growth can all exist at once.</p>
      <p>Treatment can help people rebuild flexibility, nourishment, safety, connection, and trust over time.</p>
${takeaway("You are more than the disorder.")}
${more("Recovery is a journey, not a straight line", "Recovery may include therapy, medical care, nutrition support, community, and self-compassion. Progress is often uneven. The goal is not perfection but a life that becomes larger than the disorder.", "Recovery can be hopeful even when it is nonlinear.")}
${more("Recovery changes the story", "Eating disorders are serious illnesses, but recovery is possible. Recovery can involve rebuilding trust in the body, increasing flexibility around food, reducing shame and isolation, addressing medical needs, and creating a life that is larger than the disorder.", "You are more than the disorder, and recovery does not have to be perfectly linear.")}
      <div class="block" style="margin-top:12vh">
        <span class="label">Key ideas</span>
${keys(["Eating disorders are serious illnesses.", "Appearance is not a diagnosis.", "Different experiences can share the same seriousness.", "The cycle often serves a short-term function.", "Recovery is possible.", "You do not have to wait to seek support."])}
        <p class="fine">Educational content. It is not a substitute for care from a qualified professional.</p>
      </div>`
  }
];
chapters.forEach((c, i) => (c.index = i));

export default {
  title: "Eating Disorders: Beyond the Noise",
  brand: "Beyond the noise",
  signature: "One Three.js particle field of abstract forms, with no bodies and no food, because the subject does not show on the outside. It becomes five parts of a life, eight different shapes of equal weight, the loop of distress to shame, a mass that crowds out the life around it, four strands twisting into one rope, and a loop that opens into a widening spiral. It comes from the brief: appearance is not a diagnosis, and recovery is a life larger than the disorder.",
  restraint: "Clay means strain, sage means ease. Nothing depicts a body, a plate, or a number. No gradients, no glass, no cards.",
  fontsHref: "https://fonts.googleapis.com/css2?family=Newsreader:wght@500&family=Hanken+Grotesk:wght@400;600&family=IBM+Plex+Mono:wght@400;500&display=swap",
  fontLoad: '500 100px "Newsreader"',
  displayFont: '"Newsreader", Georgia, serif',
  vars: {
    ink: "#eff1ef", paper: "#15181c", muted: "#545b63", a: "#c4643c", b: "#3f7351", rule: "rgba(21,24,28,.18)",
    display: '"Newsreader",Georgia,"Times New Roman",serif', dw: "500", lh: "1", ls: "-.015em", tt: "none",
    h1: "clamp(3.6rem,10vw,8.4rem)", h2: "clamp(2.7rem,5.6vw,4.8rem)", h3: "clamp(2rem,3.6vw,3rem)", tk: "1.6rem", rb: "1.5rem"
  },
  palette: { ramp: ["#c4643c", "#5d646c", "#3f7351"], hot: "#15181c", line: "#15181c" },
  scheme: "light",
  count: 11000, size: 2.2, seed: 99,
  chapters
};
