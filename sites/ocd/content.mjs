import { more, row, ol, ul, takeaway, keys, plainRow } from "../../lib.mjs";

const myth = (k, m, r) => `        <li data-hot="myth:${k}" tabindex="0"><div class="row"><span><span class="label" style="margin:0 0 .3rem">Myth</span><b>${m}</b><span class="label" style="margin:.9rem 0 .3rem">Reality</span><span class="t" style="color:var(--paper)">${r}</span></span></div></li>`;

const chapters = [
  {
    id: "c0", nav: "Home", label: "Understanding OCD",
    html: `      <h1>OCD is more than neatness.</h1>
      <p class="lead">Obsessions are intrusive, unwanted thoughts, images, or urges. Compulsions are behaviors or mental rituals done to reduce distress, get certainty, or prevent something feared.</p>
      <ul class="tags hot">
        <li data-hot="home:0" tabindex="0">Obsessions</li><li data-hot="home:1" tabindex="0">Compulsions</li><li data-hot="home:2" tabindex="0">Uncertainty</li><li data-hot="home:3" tabindex="0">Anxiety</li><li data-hot="home:4" tabindex="0">ERP</li>
      </ul>
${takeaway("Compulsions can happen in the mind as well as in outward behavior.")}
${more("What OCD is", "Obsessive-compulsive disorder involves obsessions and compulsions. Obsessions are intrusive, unwanted experiences that create distress or doubt. Compulsions can be visible actions, avoidance, reassurance seeking, or mental rituals such as reviewing, neutralizing, or silently repeating phrases.", "Compulsions can happen in the mind as well as in outward behavior.")}`
  },
  {
    id: "c1", nav: "Themes", label: "Chapter 1 of 5, Themes",
    html: `      <span class="label" style="margin-top:-.4rem;color:var(--b)">What it is</span>
      <h2>Not just habits.</h2>
      <p>OCD is not simply liking things clean, organized, or "a certain way." It is a distressing pattern in which intrusive experiences trigger urges to check, avoid, repeat, neutralize, confess, or seek certainty.</p>
${ul([
      plainRow("An intrusive thought does not equal intent.", "", "themes:0"),
      plainRow("Obsessions are unwanted and often ego-dystonic.", "", "themes:1"),
      plainRow("Compulsions bring short-term relief, not long-term freedom.", "", "themes:2"),
      plainRow("Mental rituals can be just as important as visible rituals.", "", "themes:3"),
      plainRow("The theme can change, but the loop stays similar.", "", "themes:4")
    ])}
${takeaway("OCD is not only about being neat or clean.")}
${more("OCD themes", "OCD can center on many different themes: contamination, checking, harm, symmetry and order, relationship OCD, scrupulosity, and mental rituals are only some examples. The core problem is not the topic itself, but the sticky doubt and compulsive attempts to get certainty or reduce distress.", "OCD is not only about being neat or clean.")}`
  },
  {
    id: "c2", nav: "Cycle", label: "Chapter 2 of 5, The cycle",
    html: `      <span class="label" style="margin-top:-.4rem;color:var(--b)">Reading the loop</span>
      <h2>What keeps it going?</h2>
${ol([
      row(1, "Intrusion", "", "cycle:0"),
      row(2, "Doubt", "", "cycle:1"),
      row(3, "Anxiety", "", "cycle:2"),
      row(4, "Compulsion", "", "cycle:3"),
      row(5, "Relief", "", "cycle:4")
    ])}
      <p>Examples of compulsions can include checking, washing, repeating, asking for reassurance, avoiding triggers, confessing, mentally reviewing, counting, or trying to cancel out a thought with another thought.</p>
${ul([
      plainRow("Mind", "Sticky doubt, fear of uncertainty, mental reviewing, catastrophic interpretations.", "cycle:mind"),
      plainRow("Behavior", "Checking, avoidance, reassurance, repeating, neutralizing, confession.", "cycle:behavior"),
      plainRow("Relief", "Distress drops for a moment, which makes the ritual feel necessary.", "cycle:4"),
      plainRow("Cost", "Time loss, narrowed routines, more fear, and more dependence on rituals.", "cycle:cost")
    ])}
${takeaway("Short-term relief can reinforce the cycle.")}
${more("The OCD cycle", "A trigger or intrusive thought can spark doubt and anxiety. A compulsion, avoidance strategy, or reassurance-seeking response may then lower distress for a moment. That temporary relief teaches the brain that the ritual was necessary, which helps keep the cycle going.", "Short-term relief can reinforce the cycle.")}
${more("Why the cycle feels convincing", "Compulsions can feel logical because they reduce discomfort right away. But they also keep uncertainty feeling dangerous. Over time, rituals, avoidance, and reassurance seeking can spread into more parts of life and become more time-consuming.", "OCD often grows through reinforcement, not because the feared thought was true.")}`
  },
  {
    id: "c3", nav: "Signs", label: "Chapter 3 of 5, Common signs",
    html: `      <span class="label" style="margin-top:-.4rem;color:var(--b)">What to notice</span>
      <h2>More than visible rituals.</h2>
      <p class="lead">Some of the loudest compulsions happen silently.</p>
${ul([
      plainRow("Time-consuming rituals or mental review.", "", "signs:0"),
      plainRow("Asking others repeatedly for certainty or reassurance.", "", "signs:1"),
      plainRow("Avoiding people, places, topics, or objects that trigger obsessional fear.", "", "signs:2"),
      plainRow("Repeating actions until they feel complete or “just right.”", "", "signs:3"),
      plainRow("Difficulty tolerating uncertainty, doubt, or “maybe.”", "", "signs:4")
    ])}
${takeaway("Distress plus repetitive attempts to get certainty are important clues.")}
${more("Common signs of OCD", "OCD can become time-consuming and mentally exhausting. Common signs can include mental checking, repeating or redoing, reassurance seeking, avoidance, distress, and chronic uncertainty. The exact content of the obsession may vary, but the pattern is what matters most.", "OCD is often about the process, not just the topic.")}
${more("How OCD may show up", "People with OCD may spend significant time on rituals or on mentally reviewing and neutralizing thoughts. They may avoid situations that trigger uncertainty, ask others for reassurance, or redo actions until they feel ‘just right.’ OCD often creates distress out of proportion to the person’s goals or values.", "Distress plus repetitive attempts to get certainty are important clues.")}`
  },
  {
    id: "c4", nav: "ERP", label: "Chapter 4 of 5, ERP and recovery",
    html: `      <span class="label" style="margin-top:-.4rem;color:var(--b)">Support and treatment</span>
      <h2>Building recovery.</h2>
${ol([
      row(1, "Exposure", "Approach feared uncertainty gradually and intentionally.", "erp:0"),
      row(2, "Response prevention", "Reduce or delay rituals instead of obeying the urge.", "erp:1"),
      row(3, "Uncertainty tolerance", "Practice making room for “maybe” without fixing it.", "erp:2"),
      row(4, "Support", "Therapy, education, medication when appropriate, and trusted people can help.", "erp:3")
    ])}
      <p>If OCD symptoms are consuming time, causing major distress, or narrowing daily life, professional support is worth considering. If someone is in immediate danger or unable to stay safe, emergency support should come first.</p>
${takeaway("Recovery is often about building tolerance for uncertainty while reducing rituals.")}
${more("ERP and recovery", "Exposure and Response Prevention, often called ERP, is a core treatment approach for OCD. It helps people practice facing uncertainty and reducing rituals so the brain can learn that feared outcomes are not made safer by compulsions. Recovery is usually gradual and imperfect, but it is possible.", "Recovery is often about building tolerance for uncertainty while reducing rituals.")}
${more("What helps", "Treatment can include ERP, other forms of therapy, medication for some people, psychoeducation, and support from trusted others. The goal is not perfect certainty or never having intrusive thoughts; it is learning to respond differently so OCD takes up less space in life.", "Progress, not perfection, is a useful recovery mindset.")}`
  },
  {
    id: "c5", nav: "Myths", label: "Chapter 5 of 5, Myths and realities",
    html: `      <span class="label" style="margin-top:-.4rem;color:var(--b)">Myths and realities</span>
      <h2>Beyond stereotypes.</h2>
      <ul class="rows plain">
${myth(0, "“OCD just means being clean or organized.”", "OCD can involve contamination fears, harm themes, checking, mental rituals, scrupulosity, relationship OCD, symmetry concerns, and more.")}
${myth(1, "“If the thought is upsetting, it must mean something important.”", "Intrusive thoughts are not the same as intent, desire, or character.")}
${myth(2, "“Reassurance helps solve OCD.”", "Reassurance often lowers distress briefly but can strengthen the cycle over time.")}
${myth(3, "“Recovery means never feeling uncertainty.”", "Recovery often means learning to live with uncertainty without obeying rituals.")}
      </ul>
${takeaway("OCD is more than stereotypes, and effective treatment is available.")}
${more("OCD myths and realities", "OCD is often misunderstood. It is not only about neatness, and it is not solved by reassurance or by waiting to feel certain. Many people also benefit from Exposure and Response Prevention (ERP), support, and sometimes medication.", "OCD is more than stereotypes, and effective treatment is available.")}
${more("Correcting common myths", "Common myths can make OCD harder to recognize. OCD is not just liking order. Compulsions can be mental, invisible, or based around reassurance and avoidance. Treatment usually focuses on changing the response to obsessional fear, not proving perfect certainty.", "Correct language and accurate teaching can reduce shame and improve recognition.")}`
  },
  {
    id: "c6", nav: "Onward", label: "Final note",
    html: `      <h2>A life larger than OCD.</h2>
      <p class="lead">Intrusive thoughts can be loud. Doubt can feel convincing. Recovery does not mean never feeling uncertainty again. It means building a different response so OCD is no longer in charge of the day.</p>
${takeaway("Progress, not perfection.")}
${more("Closing idea", "OCD often tries to promise certainty, relief, or safety through rituals. Recovery usually involves learning that certainty is not the real solution. A larger life becomes possible when intrusive experiences no longer control the response.", "You do not need perfect certainty to move forward.")}
      <div class="block" style="margin-top:12vh">
        <span class="label">Key ideas</span>
${keys(["OCD is more than neatness.", "Obsessions are intrusive and unwanted.", "Compulsions can be behavioral or mental.", "Short-term relief can reinforce the loop.", "ERP helps people face uncertainty and reduce rituals.", "OCD is more than stereotypes.", "Progress, not perfection."])}
        <p class="fine">This page is educational and not a diagnosis tool. OCD assessment should consider obsessions, compulsions, distress, time consumed, avoidance, and impairment together. Effective treatment may include ERP, other therapy, and medication for some people.</p>
      </div>`
  }
];
chapters.forEach((c, i) => (c.index = i));

export default {
  title: "OCD: More Than Neatness",
  brand: "OCD",
  scheme: "light",
  signature: "", restraint: "",
  fontsHref: "https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@800&family=Hanken+Grotesk:wght@400;600&family=IBM+Plex+Mono:wght@400;500&display=swap",
  fontLoad: '800 100px "Schibsted Grotesk"',
  displayFont: '"Schibsted Grotesk", "Helvetica Neue", Arial, sans-serif',
  vars: {
    ink: "#edf0f1", paper: "#15181c", muted: "#545b63", a: "#e5482e", b: "#c23a22", rule: "rgba(21,24,28,.18)",
    display: '"Schibsted Grotesk","Helvetica Neue",Arial,sans-serif', dw: "800", lh: ".95", ls: "-.035em", tt: "none",
    h1: "clamp(3.4rem,9vw,7.4rem)", h2: "clamp(2.6rem,5.4vw,4.6rem)", h3: "clamp(1.9rem,3.4vw,2.8rem)", tk: "1.5rem", rb: "1.4rem"
  },
  palette: { ramp: ["#e5482e", "#5d646c", "#15181c"], hot: "#e5482e", line: "#15181c" },
  count: 12000, size: 2.2, seed: 41,
  chapters
};
