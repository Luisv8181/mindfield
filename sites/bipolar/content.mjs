import { item, items, more, row, ol, ul, takeaway, hint, seg, keys, pacerUI, plainRow } from "../../lib.mjs";

const pacers = {
  modes: [
    {
      id: "circadian", label: "Circadian 24h rhythm", button: "Start rhythm pacer",
      idle: "Circadian mode: morning light, midday pacing, evening twilight, sleep sanctuary.",
      phases: [
        { name: "Morning light anchor", text: "Seek bright morning light within 30 min of waking. Calibrates the suprachiasmatic master clock.", scale: 1.08, ms: 4500, f: 580 },
        { name: "Midday rhythmic pacing", text: "Maintain scheduled meals and balanced physical movement. Protects against manic over-acceleration.", scale: 1.04, ms: 4500, f: 660 },
        { name: "Evening twilight protection", text: "Dim overhead lights. Eliminate blue screens to allow endogenous melatonin secretion.", scale: .96, ms: 5500, f: 440 },
        { name: "Sleep sanctuary sync", text: "Enter cool, quiet darkness. The suprachiasmatic nucleus enters regenerative restoration.", scale: 1, ms: 4000, f: 380 }
      ]
    },
    {
      id: "surge", label: "Acute down-shift", button: "Start rhythm pacer",
      idle: "Surge mode: inhale 4s, hold 4s, exhale 7s, rest 3s.",
      phases: [
        { name: "Inhale and ground, 4s", text: "Inhale smoothly through the nose. Feel your feet firmly grounded on the floor.", scale: 1.1, ms: 4000, f: 520 },
        { name: "Stillness pause, 4s", text: "Hold softly with relaxed shoulders. Notice internal sensations without judgment.", scale: 1.1, ms: 4000, f: 580 },
        { name: "Lengthened exhale, 7s", text: "Release the breath very slowly. Engages the vagus nerve and down-shifts heart rate.", scale: .88, ms: 7000, f: 360 },
        { name: "Euthymic rest, 3s", text: "Rest in quiet equilibrium. Re-centering between the highs and the lows.", scale: 1, ms: 3000, f: 440 }
      ]
    }
  ]
};

const lifelines = `      <ul class="lifelines">
        <li data-hot="life:0" tabindex="0"><b>988</b> USA and Canada, Suicide and Crisis Lifeline. Dial.</li>
        <li data-hot="life:1" tabindex="0"><b>741741</b> Crisis Text Line. Text HOME.</li>
        <li data-hot="life:2" tabindex="0"><b>111</b> UK. Dial.</li>
        <li data-hot="life:3" tabindex="0"><b>13 11 14</b> Australia. Dial.</li>
      </ul>`;

const chapters = [
  {
    id: "c0", nav: "Poles", label: "Chapter 1 of 7, Polarity and energy",
    html: `      <p class="hint" style="margin-top:0">The solar surge // the gravitational abyss</p>
      <h1>When the frequency shifts.</h1>
      <p class="lead">The bipolar spectrum alters the fundamental velocity of consciousness. On one side, electric lightning and undulating psychedelic rainbow ribbons erupt into the stratosphere; on the other, heavy indigo sludge drags perception into a dense, silent vortex.</p>
      <ul class="tags hot">
        <li data-hot="pole:0" tabindex="0">Lightning ascent</li><li data-hot="pole:1" tabindex="0">Indigo gravity</li><li data-hot="pole:2" tabindex="0">Colliding frequencies</li><li data-hot="pole:3" tabindex="0">The stabilizing orbit</li>
      </ul>
${hint("The ribbon behind this text is a mood over time. Hover a tag to bend it.")}
${takeaway("It is an organic, raw energetic polarity: neurobiological physics, not character flaw.")}
${more("The dual poles of bipolar emotion", "Bipolar disorder is an episodic, biological oscillation between two extreme physical and psychological dimensions: the solar, electrified stratosphere of mania and hypomania, and the heavy, lightless gravitational abyss of major depression. In the manic surge, rainbow energy bands accelerate across the mind and ascending stairways climb toward blinding light; in depression, the color drains away and dense indigo rainfall pulls every thought toward the floor.", "It is an organic, raw energetic polarity: neurobiological physics, not character flaw.")}
      <div class="jump"><a href="#c1">Compare Type I and Type II</a><a href="#c2">Inspect the three-tier metamorphosis</a><a href="#c3">Explore somatic waves</a><a href="#c6">Activate the circadian anchor</a></div>`
  },
  {
    id: "c1", nav: "I vs II", label: "Chapter 2 of 7, Diagnostic divergence",
    html: `      <h2>Bipolar I and bipolar II.</h2>
      <p>The critical distinction lies in the altitude of the ceiling (mania versus hypomania) and the depth of the depressive ocean.</p>
${seg("type", "Show", [["all", "Compare both"], ["type1", "Type I focus"], ["type2", "Type II focus"]])}
      <div class="block" style="margin-top:6vh" data-hot="type:type1">
        <span class="label">Condition 1, Bipolar I</span>
        <h3>The full manic peak.</h3>
        <p>A high-voltage state where neural velocity outpaces reality. Speech turns into a pressured torrent, sleep requirements evaporate, and the ego expands into cosmic dimensions.</p>
${ul([
      plainRow("Defining diagnostic anchor", "At least 1 full manic episode lasting 7 days or more, or requiring acute hospital care."),
      plainRow("Psychosis risk", "Common during peak mania: delusions of grandeur, paranoia, and auditory voices."),
      plainRow("Sleepless voltage", "The sleepless dynamo: feeling fully recharged on 0 to 2 hours of sleep night after night."),
      plainRow("Behavioral fallout", "Impulsive ventures, spending sprees, hypersexuality, severe relational and financial crisis.")
    ])}
${takeaway("Threshold: acute hospitalization.")}
${more("Bipolar I disorder: the manic stratosphere", "Bipolar I requires at least one full manic episode (lasting 7 days or more, or requiring hospitalization). During mania, energy shatters biological guardrails: flight of ideas, extreme grandiosity, vanishing sleep drive, and frequent psychotic breaks (grandiose delusions, auditory phenomena). While major depression is nearly universal (about 90%+), the presence of a single full manic episode defines Type I.", "Diagnostic anchor: full mania (hospitalization or psychosis threshold). Pure expansive acceleration.")}
      </div>
      <div class="block" style="margin-top:16vh" data-hot="type:type2">
        <span class="label">Condition 2, Bipolar II</span>
        <h3>The depressive burden.</h3>
        <p>A deceptive illness where hypomania feels like your most brilliant self, but the overwhelming lived reality is months spent in a heavy, leaden depressive void.</p>
${ul([
      plainRow("Defining diagnostic anchor", "At least 1 hypomanic episode (4 days or more) and at least 1 major depressive episode. Never full mania."),
      plainRow("No psychosis in highs", "Hypomania does not include psychotic delusions and does not cause severe social collapse."),
      plainRow("The depressive weight", "Patients spend about 75% of symptomatic life in major depression versus only 1 to 2% in hypomania."),
      plainRow("The misdiagnosis trap", "Commonly misdiagnosed as standard depression; prescribing antidepressants alone can trigger rapid cycling.")
    ])}
${takeaway("The hidden depressive ocean.")}
${more("Bipolar II disorder: the depressive gravity and hypomanic lift", "Bipolar II is defined by at least one hypomanic episode (lasting 4 days or more) and at least one major depressive episode. There is never a full manic episode. Hypomania is less severe than full mania (no psychosis, no hospitalization), often appearing as charismatic overdrive, hyper-focus, and creative flow. But Bipolar II is not mild: sufferers spend up to 30 to 40 times longer in refractory, agonizing major depression, leading to devastating suicide risk and frequent misdiagnosis.", "Diagnostic anchor: hypomania and major depression. Heaviest lived burden is long, crushing depression.")}
      </div>`
  },
  {
    id: "c2", nav: "Shift", label: "Chapter 3 of 7, The spectrum",
    html: `      <h2>Trajectory of the shift.</h2>
      <p>The abstract three-tiered flow illustrates the raw emotional physics of the condition without distraction.</p>
${ul([
      plainRow("The manic eruption", "High-velocity expansion of dopamine and adrenaline. The nervous system acts as if connected to an infinite external power grid. Sleep requirements drop to 2 to 3 hours.", "tier:0"),
      plainRow("The agonizing collision", "When high motor acceleration collides with depressive despair. Restless pacing, weeping spells, explosive irritability, and extreme suicide vulnerability.", "tier:1"),
      plainRow("The depressive drainage", "Complete neurochemical exhaustion. Dopamine receptor downregulation leaves the brain incapable of experiencing pleasure or interest.", "tier:2"),
      plainRow("The kindling effect", "Each untreated episode sensitizes the brain, making future episodes trigger more easily and last longer.", "tier:3")
    ])}
${hint("Read the ribbon left to right as time. Hover a tier to find it.")}
      <p><b>Circadian trigger.</b> <span class="muted">Losing 2 hours of sleep can ignite the manic ascent within 48 hours.</span></p>
      <p><b>Kindling protection.</b> <span class="muted">Continuous mood stabilization protects brain volume and cognitive memory.</span></p>
${takeaway("Catch the ascent early.")}
${more("Abstract mood spectrum: ascent, collision and crash", "A three-tiered visual breakdown of emotional physics. Top: the manic ascent, glowing neon lime and scarlet fluid bursting upward with shooting stars and electric sparks. Middle: the mixed state collision, jagged lightning and dense indigo storm smoke crashing together in violent kinetic friction. Bottom: the depressive crash, melting, dripping rainbow ribbons draining downward into a silent, rippling pool of black ink.", "Visualizing the energy flow helps anticipate and intercept the descent.")}
${more("Deconstructing the mood wave", "Bipolar episodes evolve through distinct neurochemical shifts: circadian desynchronization (often starting with a single night of lost sleep or jet lag) primes dopamine hypersensitivity. The mind enters hypomanic flight. If left unchecked, dopamine burnout and glutamate toxicity trigger either an agitated mixed state or a precipitous drop into major depression. Recovery requires stabilizing cellular rhythms.", "Sleep disruption is the primary biological fuse that ignites the manic ascent.")}`
  },
  {
    id: "c3", nav: "Body", label: "Chapter 4 of 7, Somatic waves",
    html: `      <h2>Decode the body signals.</h2>
      <p>Open any somatic symptom to inspect its neurological mechanism:</p>
${items([
      item("soma:0", "Racing thoughts", "Thoughts leap at supersonic speed across loose associations. Creative connections feel cosmic and urgent, but working memory quickly becomes overwhelmed and fragmented.", "Flight of ideas outpaces verbal speech."),
      item("soma:1", "Sleepless dynamo", "Unlike insomnia (where you want to sleep but toss and turn), manic sleeplessness feels effortless: waking at 3:30 AM with full adrenaline, ready to remodel the house or start a business.", "Zero fatigue despite zero sleep is the number one manic red flag."),
      item("soma:2", "Pressured speech", "Speech turns loud, fast, and unstoppable. Thoughts race so fast that words tumble over one another, interrupting others with an internal motor pressure that feels impossible to brake.", "Pressured speech reflects runaway motor-verbal cortex excitation."),
      item("soma:3", "Shattered clock", "The suprachiasmatic nucleus (the master circadian pacemaker) loses cellular synchronization. Melatonin and cortisol cycles invert, destabilizing mood.", "Circadian desynchronization is the core engine of the illness."),
      item("soma:4", "Leaden limbs", "During depression, the body suffers psychomotor retardation. Arms and legs feel heavy like lead weights, and walking to the kitchen feels like climbing Mount Everest.", "Depression is a physical gravitational slowdown."),
      item("soma:5", "Empty anhedonia", "The brain's reward feedback loop shuts down completely. Music sounds like flat noise, food tastes like cardboard, and accomplishments evoke no emotional resonance.", "Anhedonia is dopamine receptor downregulation, not lack of gratitude."),
      item("soma:6", "Agitated tremor", "An agonizing internal motor vibration that makes sitting still impossible. Common in mixed states when the motor system is wired while the mind is in despair.", "Akathisia warrants immediate clinical attention and medication check."),
      item("soma:7", "Sensory acuity", "In hypomania and early mania, colors look hyper-vivid, music feels transcendentally deep, and fluorescent lights can feel searingly loud and piercing.", "Sensory gates blow wide open, leading to eventual cognitive overload.")
    ])}
${hint("Each symptom bends the ribbon or the clock in its own way.")}
${takeaway("Listen to the body first.")}
${more("Internal somatic waves and fractured mechanism", "This abstract emotion diagram captures the internal physical experience of bipolar disorder. The upper frequency band erupts in supersonic pink and lime acoustic shockwaves and crisscrossing lightning (racing thoughts, pressured speech, sleepless electricity). In the center, a delicate circadian clockwork mechanism fractures under excessive voltage. In the lower band, heavy melting indigo and black gravity curtains drain downward into an immovable void (leaden paralysis, empty anhedonia).", "The somatic body registers the episode through sleep, pulse, and motor velocity before the mind admits it.")}
${more("Decoding the somatic forces", "Explore each bodily force: supersonic racing thoughts; the sleepless electrical charge where biological sleep drive is shut off; pressured acoustic speech; shattered circadian clockwork; and the leaden paralysis where gravity pulls the limbs into the earth like heavy iron.", "Track somatic signs as your early warning dashboard.")}`
  },
  {
    id: "c4", nav: "Mixed", label: "Chapter 5 of 7, Critical state",
    html: `      <h2>The mixed collision.</h2>
      <p>When the engine revs at 8,000 RPM while the emergency brake of depression is fully jammed.</p>
      <span class="label" style="margin-top:1.8rem">Critical: the wired and despairing emergency</span>
      <p style="margin-top:0">Depression alone often leaves someone too exhausted to move. Mania alone brings euphoria or grandiosity. But a mixed state combines intense physical agitation with dark hopelessness. This is the period of highest clinical risk across the bipolar spectrum.</p>
${ul([
      plainRow("Agitated despair", "Crying spells accompanied by pacing and racing thoughts.", "mix:0"),
      plainRow("Safety protocol", "Contact your psychiatrist or dial 988 immediately if agitation spikes.", "mix:1")
    ])}
${hint("Two waves cross in the same body. Hover a row to see agitation, and what steadies it.")}
${takeaway("A mixed state is an urgent clinical crisis requiring immediate medical intervention, not self-isolation.")}
${more("The mixed state: the wired and suicidal paradox", "A mixed episode (or mixed features) is one of the most dangerous states in clinical psychiatry. When manic cognitive acceleration, high physical energy, and racing thoughts collide simultaneously with depressive despair, worthlessness, and suicidal ideation, the person possesses both the intense emotional agony and the motor energy to act on it.", "A mixed state is an urgent clinical crisis requiring immediate medical intervention, not self-isolation.")}`
  },
  {
    id: "c5", nav: "Biology", label: "Chapter 6 of 7, Neurobiology",
    html: `      <h2>The biological engine.</h2>
      <p>Why psychological willpower alone cannot stop a bipolar episode:</p>
${ol([
      row(1, "Suprachiasmatic master clock", "The hypothalamic clock is fragile; light exposure and sleep timing dictate episode switches.", "bio:0"),
      row(2, "Dopamine receptor priming", "Hyper-sensitized dopamine pathways ignite manic reward pursuit; their sudden drop plunges into depression.", "bio:1"),
      row(3, "Ion channels and lithium", "Lithium stabilizes intracellular signaling (GSK-3b, inositol monophosphatase) and preserves grey matter.", "bio:2"),
      row(4, "Mitochondrial metabolism", "Cellular energy output fluctuates wildly between hyper-metabolic mania and hypo-metabolic depression.", "bio:3")
    ])}
${hint("Four systems, four motifs. Hover one to bring it forward.")}
${takeaway("Biology, not character.")}
${more("The biological and genetic architecture", "Bipolar disorder is rooted in cellular neurobiology. Twin studies show heritability rates around 70 to 80%, the highest of any major mood disorder. Genome-wide association studies (GWAS) pinpoint calcium channel regulation (CACNA1C), circadian clock genes (CLOCK, ARNTL), and glutamate-GABA neurotransmitter balance. Lithium provides neuroprotection by inhibiting GSK-3b and upregulating neurotrophic factors.", "Because the roots are genetic and cellular, mood stabilizers are the indispensable biological foundation of recovery.")}`
  },
  {
    id: "c6", nav: "Anchor", label: "Chapter 7 of 7, The anchor",
    html: `      <h2>The anchor of euthymia.</h2>
      <p>From chaos, a rhythm is restored. The bipolar mind finds balance here, in the stabilizing circadian cycle.</p>
${pacerUI(pacers.modes, pacers.modes[0].idle, "Start rhythm pacer")}
      <div class="block" style="margin-top:12vh">
${ol([
      row(1, "Lock the morning wake time", "Waking up at the exact same hour every day sets the suprachiasmatic clock better than any single habit."),
      row(2, "Medical foundation", "Mood stabilizers (lithium, lamotrigine, valproate) prevent episode kindling. Never discontinue abruptly without supervision."),
      row(3, "Catch the 48-hour prodrome", "Notice when sleep drops by 1 hour or when you feel an urge to send 20 emails at 2 AM. Intervene immediately with your action plan."),
      row(4, "Trusted social anchors", "Have 2 people who have permission to tell you: 'Your speech is speeding up, let us check in with your doctor.'")
    ])}
${takeaway("Routine is neuroprotection.")}
${more("Stabilization and the recovery triad", "Living well with Bipolar I and II is founded upon the Recovery Triad: 1) medical maintenance (mood stabilizers like lithium, lamotrigine, or atypical antipsychotics, which protect brain health and prevent kindling); 2) IPSRT (Interpersonal and Social Rhythm Therapy) maintaining rigid wake times and dark therapy; 3) 48-hour prodrome radar (identifying subtle early signs before an episode takes flight).", "Euthymia is not emotional numbness; it is the freedom to live an authentic, rich life anchored in biological stability.")}
      </div>`
  },
  {
    id: "c7", nav: "Lifelines", short: true, label: "Support and lifelines",
    html: `      <h2>Euthymia is achievable.</h2>
${lifelines}
${keys(["Bipolar disorder is treatable.", "You are not alone on the spectrum.", "Protect your sleep.", "Euthymia is achievable.", "Reach out for clinical support."])}
      <p class="fine">Educational content. It is not a substitute for care from a qualified professional.</p>`
  }
];
chapters.forEach((c, i) => (c.index = i));

export default {
  title: "Bipolar I and II: Abstract Emotional Dynamics",
  brand: "Bipolar",
  signature: "One Three.js particle field is mood plotted over time. Height maps to color, amber at the ceiling and indigo at the floor, so the same ribbon becomes the two poles, Type I against Type II, a three-tier episode, a body signal board, a mixed collision, four biological motifs, a 24-hour ring, and the digits 988. Hover and the pacer drive it. It comes from the brief: bipolar as oscillating energy that rhythm can steady.",
  restraint: "Amber means up, indigo means down, coral means alert. Color encodes height, not decoration. No gradients, no glass, no cards.",
  fontsHref: "https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Hanken+Grotesk:wght@400;600&family=IBM+Plex+Mono:wght@400;500&display=swap",
  fontLoad: '400 100px "DM Serif Display"',
  displayFont: '"DM Serif Display", Georgia, serif',
  vars: {
    ink: "#eef0f2", paper: "#15181c", muted: "#545b63", a: "#c97d00", b: "#2f3fb8", rule: "rgba(21,24,28,.18)",
    display: '"DM Serif Display",Georgia,"Times New Roman",serif', dw: "400", lh: ".98", ls: "-.012em", tt: "none",
    h1: "clamp(3.4rem,9vw,7.6rem)", h2: "clamp(2.8rem,5.6vw,4.8rem)", h3: "clamp(2rem,3.6vw,3rem)", tk: "1.6rem", rb: "1.55rem"
  },
  palette: { ramp: ["#2f3fb8", "#3a3f46", "#e09a12"], hot: "#e0442f", line: "#15181c" },
  scheme: "light",
  count: 11000, size: 2.2, seed: 21,
  pacers,
  chapters
};
