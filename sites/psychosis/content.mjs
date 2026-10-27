import { item, items, more, row, ol, ul, takeaway, hint, seg, keys, pacerUI } from "../../lib.mjs";

const pacers = {
  modes: [
    {
      id: "grounding", label: "5-4-3-2-1 sensory grounding", button: "Start grounding pacer",
      idle: "Grounding mode: 5 sights, 4 touches, 3 sounds, 2 breaths, 1 truth.",
      phases: [
        { name: "Look around, 5 items", text: "Name 5 distinct physical objects in your immediate vision. Notice their true shape and color.", scale: 1.08, ms: 5000, f: 520 },
        { name: "Physical touch, 4 textures", text: "Feel 4 physical textures: your clothes, the smooth table, cold metal, or the solid chair.", scale: 1.05, ms: 4500, f: 580 },
        { name: "Ambient sound, 3 noises", text: "Identify 3 real ambient room sounds: traffic outside, a clock ticking, air flowing.", scale: 1.02, ms: 4000, f: 640 },
        { name: "Two breaths", text: "Take 2 deep breaths through your nose. Notice the temperature of the air entering your lungs.", scale: .96, ms: 4000, f: 440 },
        { name: "One core fact", text: "State one fact you know with certainty: your name, today's date, and that you are here right now.", scale: 1, ms: 5000, f: 380 }
      ]
    },
    {
      id: "vagus", label: "Vagus de-escalation", button: "Start grounding pacer",
      idle: "Vagus mode: inhale 4s, hold 4s, exhale 7s, rest 3s.",
      phases: [
        { name: "Steady inhale, 4s", text: "Inhale smoothly through the nose. Fill the lungs without rushing.", scale: 1.1, ms: 4000, f: 520 },
        { name: "Stillness pause, 4s", text: "Hold softly with relaxed shoulders. Notice internal stillness.", scale: 1.1, ms: 4000, f: 580 },
        { name: "Long grounded exhale, 7s", text: "Release the breath very slowly through parted lips. Engages the calming vagus nerve.", scale: .88, ms: 7000, f: 360 },
        { name: "Baseline rest, 3s", text: "Rest in quiet, grounded equilibrium. The storm outside cannot alter the floor beneath you.", scale: 1, ms: 3000, f: 440 }
      ]
    }
  ]
};

const chapters = [
  {
    id: "c0", nav: "Breach", label: "Chapter 1 of 7, Perception and rupture",
    html: `      <p class="hint" style="margin-top:0">REALITY_ERR_001 // the filter shatters</p>
      <h1>When reality breaches.</h1>
      <p class="lead">The mind does not choose psychosis. A flood of dysregulated dopamine blows open the perceptual gates: geometric patterns crack, background noise turns into urgent language, and neutral reality vibrates with uncanny significance.</p>
      <ul class="tags hot">
        <li data-hot="breach:0" tabindex="0">Perceptual breach</li><li data-hot="breach:1" tabindex="0">Aberrant salience</li><li data-hot="breach:2" tabindex="0">Acoustic overdrive</li><li data-hot="breach:3" tabindex="0">The reality anchor</li>
      </ul>
${hint("The field behind this text is the filter. Hover a tag above to change it.")}
${takeaway("Psychosis is a temporary breakdown of sensory gating and reality calibration, not a moral failure or personal choice.")}
${more("The rupture of reality filters", "Psychosis is an episodic neurobiological syndrome characterized by a disruption in the brain's ability to distinguish internal mental events from external physical reality. Every millisecond, the human thalamus filters out billions of pieces of sensory noise. In psychosis, that protective filter fractures: internal thoughts echo as audible voices, everyday objects blaze with urgent cosmic meaning, and the boundary between the self and the universe dissolves.", "Psychosis is a temporary breakdown of sensory gating and reality calibration, not a moral failure or personal choice.")}
      <div class="jump"><a href="#c1">Explore the core domains</a><a href="#c2">The dopamine salience engine</a><a href="#c3">Somatic acoustic overload</a><a href="#c6">Activate the 5-4-3-2-1 anchor</a></div>`
  },
  {
    id: "c1", nav: "Domains", label: "Chapter 2 of 7, Core domains",
    html: `      <h2>The psychotic spectrum.</h2>
      <p>Psychosis spans hallucinations, delusions, thought disorganization, and negative symptoms across multiple clinical conditions.</p>
${seg("domain", "Show", [["all", "All domains"], ["positive", "Positive symptoms"], ["negative", "Negative and cognitive"]])}
      <div class="block" style="margin-top:6vh" data-hot="domain:positive">
        <span class="label">Domain 1, Positive symptoms</span>
        <h3>Perceptual additions.</h3>
        <p>Phenomena that invade consciousness with vivid, undeniable reality. The brain's auditory cortex lights up identically to actual spoken sound waves.</p>
${ul([
      `        <li><div class="row"><span><b>Auditory hallucinations</b><span class="t">Hearing voices, whispering frequencies, or ambient music with total acoustic presence.</span></span></div></li>`,
      `        <li><div class="row"><span><b>Delusions of reference</b><span class="t">Neutral events (a passing car, a bird landing) feel cosmically intentional and targeted.</span></span></div></li>`,
      `        <li><div class="row"><span><b>Persecutory conviction</b><span class="t">The terrifying belief of being watched, tracked, or threatened by unseen external agencies.</span></span></div></li>`,
      `        <li><div class="row"><span><b>Thought insertion and broadcasting</b><span class="t">The subjective experience that private thoughts are being placed in the head or broadcast aloud.</span></span></div></li>`
    ])}
${takeaway("Real to the senses.")}
${more("Positive symptoms: additions to experience", "'Positive' symptoms refer to excess sensory or cognitive phenomena added to consciousness: auditory hallucinations (hearing voices that sound 100% external and real), visual distortions, delusions of reference (believing headlights, radio lyrics, or billboards contain personal coded instructions), and persecutory delusions (the conviction that external forces are monitoring or targeting you).", "Hallucinations sound completely physical to the person experiencing them; arguing does not change sensory perception.")}
      </div>
      <div class="block" style="margin-top:16vh" data-hot="domain:negative">
        <span class="label">Domain 2, Negative and cognitive</span>
        <h3>Cognitive disorganization.</h3>
        <p>The fragmentation of working memory, motivation, and conceptual bridges, leaving the person feeling marooned in internal silence.</p>
${ul([
      `        <li><div class="row"><span><b>Thought blocking</b><span class="t">A sudden, inexplicable erasure of conscious thought mid-sentence; the mental bridge dissolves.</span></span></div></li>`,
      `        <li><div class="row"><span><b>Avolition and lethargy</b><span class="t">Severe depletion of motivational dopamine; basic tasks feel like moving through heavy concrete.</span></span></div></li>`,
      `        <li><div class="row"><span><b>Conceptual slippage</b><span class="t">Associations drift off topic through loose metaphors that make intuitive sense only to the speaker.</span></span></div></li>`,
      `        <li><div class="row"><span><b>Affective masking</b><span class="t">Expressive flattening where facial cues freeze, even while intense terror or confusion churns inside.</span></span></div></li>`
    ])}
${takeaway("The quiet depletion.")}
${more("Negative and cognitive symptoms: losses and disorganization", "'Negative' symptoms represent the draining of normal psychological function: avolition (inability to initiate goal-directed action), alogia (poverty of speech), affective flattening (diminished emotional expression despite internal distress), and social withdrawal. Cognitive symptoms include thought blocking (where a train of thought abruptly vanishes into a void) and conceptual loosening.", "Negative symptoms are often the most functionally impairing long-term aspects and require compassionate structure, not blame.")}
      </div>`
  },
  {
    id: "c2", nav: "Salience", label: "Chapter 3 of 7, Neurocomputation",
    html: `      <h2>The salience engine.</h2>
      <p>Understanding why delusions feel so undeniably persuasive:</p>
${ol([
      row(1, "The salience spike", "Striatal dopamine bursts fire without an external cause, tagging random stimuli as matters of life and death.", "sal:spike"),
      row(2, "The cognitive explanation", "The frontal cortex cannot tolerate unexplained significance; it constructs a persecutory or grandiose theory to resolve the cognitive dissonance.", "sal:theory"),
      row(3, "The feedback loop", "Once a delusion forms, confirmation bias locks it in place. Every passing coincidence is gathered as additional evidence.", "sal:loop"),
      row(4, "Turning down the voltage", "D2 receptor antagonists reduce the chemical charge, allowing the person to say: 'It still looks unusual, but it no longer feels important.'", "sal:volt")
    ])}
${hint("Hover a step. Meaning gathers in the noise, and you can watch it settle or lock.")}
      <p><b>Dopamine hyper-drive.</b> <span class="muted">Mesolimbic excess creates hyper-meaning; mesocortical deficit drives negative symptoms.</span></p>
      <p><b>Coordinated care.</b> <span class="muted">Early intervention in the first episode reduces hospitalization recurrence by 50%+.</span></p>
${takeaway("Biology behind the belief.")}
${more("The neurocomputational engine: aberrant salience", "Hyper-dopaminergic firing in the mesolimbic tract causes neutral stimuli to radiate with intense, unearned emotional importance ('aberrant salience'). When a mundane street sign or a random word triggers the brain's internal alarm bell, the conscious mind is forced to invent a narrative, a delusion, to justify why that object feels so earth-shatteringly vital.", "Delusions are the mind's rational attempt to explain an irrational, hyper-salient neurochemical signal.")}
${more("Kapur's salience model", "Dopamine mediates the conversion of neutral neural representations into attractive or aversive targets of attention. In psychosis, dopamine neurons fire randomly and out of synchrony with reality. This creates a state of pervasive hyper-meaning: every coincidence feels like prophecy, every glance feels like surveillance. Antipsychotics work by dampening this excessive salience, turning down the volume of the signal so reality can re-stabilize.", "Antipsychotics do not erase beliefs overnight; they extinguish the emotional voltage that makes the belief feel so desperately important.")}`
  },
  {
    id: "c3", nav: "Signals", label: "Chapter 4 of 7, Somatic waves",
    html: `      <h2>Decode the signal storm.</h2>
      <p>Open any symptom to inspect its underlying neurological mechanism:</p>
${items([
      item("storm:0", "Auditory perceptions", "Internal speech loops (the phonological buffer) fire spontaneously without efference copy tags, causing your own thoughts to sound like an external voice speaking in the room.", "Loss of self-monitoring efference copy causes internal thoughts to sound external."),
      item("storm:1", "Ideas of reference", "Street signs, car license plates, or radio songs feel intentionally coded specifically for you. The brain's pattern-recognition software operates in overdrive.", "Hyperactive pattern recognition makes neutral coincidences feel intentional."),
      item("storm:2", "Thought broadcasting", "The boundary between internal subjective thought and external space dissolves. You feel convinced that people on the subway or in the room can overhear your mind.", "Ego-boundary dissolution creates the sensation of transparent cognition."),
      item("storm:3", "Sensory gating deficit", "The thalamic reticular nucleus fails to filter background sensory inputs. Fluorescent lights flicker deafeningly, refrigerator hums roar, and multiple conversations bleed together.", "Sensory gating failure overwhelms working memory with raw stimuli."),
      item("storm:4", "Paranoid hyper-vigilance", "The amygdala is locked in chronic emergency overdrive. Heart rate climbs, pupils dilate, and every shadow looks like a potential ambush.", "Extreme threat detection is an involuntary neurochemical panic state."),
      item("storm:5", "Cognitive fragmentation", "Associations break apart (loosening of associations). Thoughts derail into unexpected tangents, making sustained conversation difficult.", "Prefrontal cortical disconnect disrupts semantic continuity."),
      item("storm:6", "Affective masking", "Facial muscles and vocal pitch become flat and impassive (flat affect) even while the person is experiencing intense terror or confusion inside.", "Flat affect is motor-expressive, not an absence of internal emotion."),
      item("storm:7", "Catatonic freezing", "Motor cortex pathways freeze or fluctuate into repetitive purposeless motor pacing. Sudden paralysis where the body cannot initiate the next step.", "Catatonia responds rapidly to GABAergic intervention and medical care.")
    ])}
${hint("Each symptom lights its own band: the electric top, the fractured clock, the heavy pool.")}
${takeaway("Real brain chemistry.")}
${more("Somatic acoustic overload and fractured filters", "The upper frequency band erupts in supersonic pink and lime shockwaves and crisscrossing electrical arcs (racing thoughts, echoing voices, sensory static). In the center, the delicate circadian thalamic clock fractures under excess voltage. In the lower band, dense dark gravity curtains pool downward into an immovable void (paralysis and exhaustion).", "Sensory gating failure turns ordinary environments into overwhelming acoustic and visual storms.")}
${more("Decoding the perceptual overdrive", "Explore the specific sensory and cognitive symptoms: the acoustic static of auditory hallucinations, ideas of reference, the terror of thought broadcasting, sensory gating failure, persecutory hyper-vigilance, and affective blunting.", "Understanding these mechanisms strips away stigma and replaces fear with clinical precision.")}`
  },
  {
    id: "c4", nav: "Support", label: "Chapter 5 of 7, Supportive care",
    html: `      <h2>Communication protocol.</h2>
      <p>How to create safety when someone's reality has fractured:</p>
      <span class="label" style="margin-top:1.8rem">Critical: the three rules of psychosis support</span>
${ol([
      row(1, "Never argue the facts", "Do not say 'That makes no sense.' It forces them to defend their reality.", "rule:argue"),
      row(2, "Never validate the delusion", "Do not pretend you see it too. It reinforces false danger.", "rule:valid"),
      row(3, "Validate the feeling", "'That sounds terrifying. I am right here with you, and I will keep you safe.'", "rule:feel")
    ])}
${ul([
      `        <li data-hot="rule:stim" tabindex="0"><div class="row"><span><b>Reduce stimuli</b><span class="t">Turn down bright lights, lower noise, and speak in slow, calm sentences.</span></span></div></li>`,
      `        <li data-hot="rule:emerg" tabindex="0"><div class="row"><span><b>Emergency protocol</b><span class="t">If safety is at risk, contact a mobile crisis team or dial 988.</span></span></div></li>`
    ])}
${hint("Hover each rule. The calm core is the person; the cloud is the storm around them.")}
${takeaway("Connect to the feeling, ensure physical safety, and avoid argumentative confrontation.")}
${more("How to support someone in psychosis", "Directly confronting or mocking a delusion never works: to them, the threat is as real as gravity. Denying their perception creates isolation and fear. Conversely, agreeing with the delusion confirms false danger. The gold standard: validate the emotion, not the delusion. Say: 'I don't hear the voices, but I can see how terrified you are right now. You are safe here with me, and we are going to get through this together.'", "Connect to the feeling, ensure physical safety, and avoid argumentative confrontation.")}`
  },
  {
    id: "c5", nav: "Recovery", label: "Chapter 6 of 7, Recovery science",
    html: `      <h2>The recovery trajectory.</h2>
      <p>Evidence-based pillars that restore cognitive clarity and stability:</p>
${ol([
      row(1, "D2 receptor modulation", "Atypical antipsychotics quiet the dopamine noise, reducing the intensity of aberrant salience.", "pillar:0"),
      row(2, "CBT for psychosis (CBTp)", "Teaches reality-testing, cognitive flexibility, and reduction of distress caused by voices.", "pillar:1"),
      row(3, "Sleep architecture sync", "Severe insomnia is the primary trigger of psychotic relapses; circadian protection is vital.", "pillar:2"),
      row(4, "Social scaffolding", "Reconnecting with supportive community neutralizes the profound isolation of paranoia.", "pillar:3")
    ])}
${hint("Four rings, four pillars. Hover one to bring it forward.")}
${takeaway("Recovery is attainable.")}
${more("The critical window: early psychosis intervention", "The first episode of psychosis (FEP) is a pivotal neurodevelopmental junction. Coordinated Specialty Care (CSC) programs, combining low-dose antipsychotic pharmacotherapy, Cognitive Behavioral Therapy for Psychosis (CBTp), family education, and supported education and employment, produce extraordinary long-term recovery rates. The shorter the Duration of Untreated Psychosis (DUP), the better the cognitive preservation.", "Psychosis is treatable. Early specialized intervention restores independence, relationships, and meaningful life paths.")}`
  },
  {
    id: "c6", nav: "Anchor", label: "Chapter 7 of 7, The anchor",
    html: `      <h2>The grounding anchor.</h2>
      <p>Tether your awareness back to tangible, physical reality. Use this interactive pacer to anchor sensory gating and down-regulate internal noise.</p>
${pacerUI(pacers.modes, pacers.modes[0].idle, pacers.modes[0].phases.length ? "Start grounding pacer" : "")}
      <div class="block" style="margin-top:12vh">
${ol([
      row(1, "Physical contact", "Press your feet flat on the floor. Grip a cold stone, a glass of ice water, or the arms of your chair."),
      row(2, "Environmental calibration", "Step out of bright or chaotic rooms into cool, quiet, simple spaces with low visual clutter."),
      row(3, "Speak external facts aloud", "State: 'Today is Tuesday. The room is quiet. The floor is solid under my feet.'"),
      row(4, "Medical partnership", "Consistent psychiatric medication prevents aberrant salience from reigniting. Never adjust doses unassisted.")
    ])}
${takeaway("Tangible reality anchors.")}
${more("The grounded anchor: sensory stabilization", "When perceptual filters fail, tactile, physical sensory anchors are the most reliable tool to tether the mind back to consensual reality. The 5-4-3-2-1 technique anchors the sensory gates to undeniable physical objects: 5 things you can see right now, 4 textures you can touch, 3 ambient room sounds, 2 physical breaths, and 1 core undeniable truth. Use this interactive tool to recalibrate.", "Physical touch, solid weight, and steady breath provide the anchor when internal perception feels unmoored.")}
      </div>`
  },
  {
    id: "c7", nav: "Lifelines", short: true, label: "Support and lifelines",
    html: `      <h2>Reality can be restored.</h2>
      <ul class="lifelines">
        <li data-hot="life:0" tabindex="0"><b>988</b> USA and Canada, Suicide and Crisis Lifeline. Dial.</li>
        <li data-hot="life:1" tabindex="0"><b>741741</b> Crisis Text Line. Text HOME.</li>
        <li data-hot="life:2" tabindex="0"><b>111</b> UK. Dial.</li>
        <li data-hot="life:3" tabindex="0"><b>13 11 14</b> Australia. Dial.</li>
      </ul>
${keys(["Psychosis is treatable.", "Early intervention transforms outcomes.", "You are safe.", "Coordinated specialty care works.", "Reality can be restored."])}
      <p class="fine">Educational content. It is not a substitute for care from a qualified professional.</p>`
  }
];
chapters.forEach((c, i) => (c.index = i));

export default {
  title: "Psychosis: The Shattered Filter",
  brand: "Psychosis",
  signature: "One Three.js particle field is the perceptual filter itself. It starts as a sphere that fractures into shards, becomes additions and losses, noise that coalesces into false meaning, three bands of signal storm, a calm core inside a cloud, four recovery rings, a 5-4-3-2-1 triangle you pace through, and finally the digits 988. Hover and the pacer drive it. It comes from the brief: psychosis as a failing filter that can be re-grounded.",
  restraint: "Hot pink means signal and static, lime means grounded. No gradients, no glass, no cards.",
  fontsHref: "https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@800&family=Hanken+Grotesk:wght@400;600&family=IBM+Plex+Mono:wght@400;500&display=swap",
  fontLoad: '800 100px "Big Shoulders Display"',
  displayFont: '"Big Shoulders Display", Impact, sans-serif',
  vars: {
    ink: "#eceef0", paper: "#15181c", muted: "#545b63", a: "#d6246e", b: "#b81d5c", rule: "rgba(21,24,28,.18)",
    display: '"Big Shoulders Display",Impact,"Arial Narrow",sans-serif', dw: "800", lh: ".88", ls: ".005em", tt: "uppercase",
    h1: "clamp(3.8rem,11vw,9.5rem)", h2: "clamp(3rem,6.6vw,5.8rem)", h3: "clamp(2rem,3.8vw,3.2rem)", tk: "1.7rem", rb: "1.55rem"
  },
  palette: { ramp: ["#d6246e", "#5d646c", "#15181c"], hot: "#d6246e", line: "#15181c" },
  scheme: "light",
  count: 11000, size: 2.2, seed: 7,
  pacers,
  chapters
};
