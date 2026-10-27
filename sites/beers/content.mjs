import { more, row, ol, ul, takeaway, plainRow } from "../../lib.mjs";

const q = (text, cite) => `      <blockquote class="quote">${text}<cite>${cite}</cite></blockquote>`;
const stat = (hot, v, t) => `        <li data-hot="${hot}" tabindex="0"><div class="row"><span class="stat"><span class="v">${v}</span><span class="t">${t}</span></span></div></li>`;

const chapters = [
  {
    id: "c0", nav: "Title", label: "Clifford Whittingham Beers, 1908",
    html: `      <h1>A Mind That Found Itself.</h1>
      <p class="lead">An autobiography of the years 1900 to 1903, most of them spent in psychiatric institutions, written by the man who lived them and then set out to reform how people with mental illness are treated.</p>
      <p class="muted">Chapter I is the author’s statement of why the book exists. It was first published on March 16, 1908.</p>
${q("“It is fit to remain in literature as a classic account ‘from within’ of an insane person’s psychology.”", "William James, letter to Beers, November 10, 1907")}
      <p class="fine">Beers wrote in the clinical language of 1908. Words such as “insane” and “insanity” are his, quoted as written.</p>`
  },
  {
    id: "c1", nav: "Civil war", label: "Chapter I, A mental civil war",
    html: `      <h2>Another self.</h2>
      <p>Beers frames the book as more than an autobiography. In part it is a biography of a different self, one that ruled him from his twenty-fourth to his twenty-sixth year, unlike who he had been before or became after.</p>
${q("“The history of a mental civil war, which I fought single-handed on a battle-field that lay within the compass of my skull.”", "Chapter I, page 1")}
      <ul class="tags hot">
        <li data-hot="war:unreason" tabindex="0">The Army of Unreason</li><li data-hot="war:reason" tabindex="0">A triumphant Reason</li>
      </ul>
      <p>He describes the illness as an Army of Unreason, made of “cunning and treacherous thoughts,” attacking a bewildered mind until Reason “interposed a superior strategy.”</p>`
  },
  {
    id: "c2", nav: "Purpose", label: "Chapter I, Why tell it",
    html: `      <h2>For what purpose was my life spared?</h2>
      <p>Beers survived what looked like a fatal illness and asked what his life had been spared for. The book is part of his answer: he tells the story because it seems his “plain duty” to do so.</p>
${q("“Until some one tells just such a story as mine and tells it sanely, needless abuse of helpless thousands will continue.”", "Chapter I, page 2")}
      <p>He grants that most patients of his day were treated with real consideration. His target is the minority, thousands of people, still subjected to brutal abuse, and the lack of direct proof that it was happening. As a former patient, he claims the right to expose those methods and offers a remedy: a campaign for reform.</p>`
  },
  {
    id: "c3", nav: "Scale", label: "Chapter I, The scale in 1908",
    html: `      <h2>A million people in this country.</h2>
      <p>Beers argues that the subject is economic as well as humanitarian. These are his own estimates, as he gave them in 1908.</p>
      <ul class="rows plain">
${stat("scale:0", "200,000", "People in asylums, hospitals, sanatoriums, and homes in the United States.")}
${stat("scale:1", "5", "Relatives and friends he assumed each person had who cared about their welfare.")}
${stat("scale:2", "1 in 80", "Together, about a million people in the country directly or indirectly affected.")}
${stat("scale:3", "150,000", "Mental incompetents he counted in Great Britain, with a like number in France and Germany.")}
      </ul>
      <p>He adds that anyone among the remaining seventy-nine million might one day be forced to join this “army of distress.” Few subjects, he writes, are so misunderstood or so willingly ignored.</p>`
  },
  {
    id: "c4", nav: "Curable", label: "Chapter I, A question of research",
    html: `      <h2>Why should it remain incurable?</h2>
      <p>Beers places mental illness beside the great infectious diseases of his time, each at a different stage of being beaten:</p>
      <ul class="rows plain">
${stat("dis:0", "Small-pox", "Conquered.")}
${stat("dis:1", "Diphtheria", "Doomed.")}
${stat("dis:2", "Yellow fever", "Confined within limits.")}
${stat("dis:3", "Tuberculosis", "Partially controlled and not infrequently cured.")}
${stat("dis:4", "Insanity", "Still on the list of incurable diseases. Why?")}
      </ul>
      <p>Recognized authorities, he notes, predicted most forms would in time prove curable, but only after years of systematic scientific research that had barely begun. He hoped the twentieth century would be remembered as the one in which the cause and cure of most mental diseases were found.</p>`
  },
  {
    id: "c5", nav: "Aims", label: "Chapter I, Three purposes",
    html: `      <h2>What the book is for.</h2>
${ol([
      row(1, "Rob insanity of its terrors", "Children fear the dark until they learn its monsters are imaginary. Much of the dread of mental illness is like that. Much of the unhappiness of patients comes from how they are treated, and can be removed through Non-Restraint: “doing to the insane as the sane would be done by.”", "aim:0"),
      row(2, "Found a society", "Books alone cannot produce reform. A society founded and endowed for the purpose, running a campaign of education under a National Society, could make even petty abuses appear heinous.", "aim:1"),
      row(3, "Fund model institutions", "Hospitals and sanatoriums to treat mental and nervous diseases in their early, curable stages, so people could recover without the stigma of legal incompetence and patients could receive individual treatment.", "aim:2")
    ])}
${takeaway("Doing to the insane as the sane would be done by is the essence of Non-Restraint.")}`
  },
  {
    id: "c6", nav: "After", label: "What followed",
    html: `      <h2>The campaign he proposed.</h2>
      <ol class="rows">
        <li data-hot="after:0" tabindex="0"><div class="row"><span class="n">1</span><span><b>March 16, 1908</b><span class="t">The first edition is published, proposing a permanent National Committee modeled on the work against tuberculosis.</span></span></div></li>
        <li data-hot="after:1" tabindex="0"><div class="row"><span class="n">2</span><span><b>May 6, 1908</b><span class="t">The Connecticut Society for Mental Hygiene is formally founded, the first state society, to work the problem out in one state first.</span></span></div></li>
        <li data-hot="after:2" tabindex="0"><div class="row"><span class="n">3</span><span><b>By May 1, 1910</b><span class="t">The National Committee for Mental Hygiene is organized, with the aim of helping found an allied Society for Mental Hygiene in each state.</span></span></div></li>
      </ol>
${more("The National Committee’s chief objects, as listed in 1910", "(a) to work for the protection of the mental health of the public; (b) to help raise the standards of care for those threatened with nervous or mental disorder or actually ill; (c) to promote the study of mental disorders in all their forms and relations and to disseminate knowledge concerning their causes, treatment and prevention; (d) to obtain from every source reliable data regarding conditions and methods of dealing with mental disorders; (e) to enlist the aid of the Federal Government so far as may seem desirable; (f) to co-ordinate the work of existing agencies and to help organize in each State in the Union an allied but independent Society for Mental Hygiene.", "From the Postscript, dated May 1, 1910.")}
      <p class="fine">Source: Clifford Whittingham Beers, A Mind That Found Itself, second edition, Longmans, Green, and Co., 1912 impression, digitized by the Internet Archive. Chapter I, pages 1 to 5; Introduction; Postscript.</p>`
  }
];
chapters.forEach((c, i) => (c.index = i));

export default {
  title: "A Mind That Found Itself: Chapter I",
  brand: "A Mind That Found Itself",
  scheme: "light", signature: "", restraint: "",
  fontsHref: "https://fonts.googleapis.com/css2?family=Libre+Caslon+Display&family=Libre+Caslon+Text:wght@400&family=Hanken+Grotesk:wght@400;600&family=IBM+Plex+Mono:wght@400;500&display=swap",
  fontLoad: '400 100px "Libre Caslon Display"',
  displayFont: '"Libre Caslon Display", Georgia, serif',
  vars: {
    ink: "#eef0f1", paper: "#15181c", muted: "#545b63", a: "#c23c1a", b: "#1f3a8a", rule: "rgba(21,24,28,.18)",
    display: '"Libre Caslon Display",Georgia,"Times New Roman",serif', qfont: '"Libre Caslon Text",Georgia,serif', dw: "400", lh: ".98", ls: "-.01em", tt: "none",
    h1: "clamp(3.4rem,8.6vw,7.4rem)", h2: "clamp(2.5rem,5vw,4.4rem)", h3: "clamp(1.9rem,3.4vw,2.8rem)", tk: "1.55rem", rb: "1.45rem"
  },
  palette: { ramp: ["#c23c1a", "#5d646c", "#15181c"], hot: "#1f3a8a", line: "#15181c" },
  count: 11000, size: 2.2, seed: 1908,
  chapters
};
