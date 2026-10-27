/* html helpers shared by the site content files */
export const item = (hot, title, copy, tk) =>
  `      <details class="item" data-hot="${hot}"><summary><span><b>${title}</b></span></summary><div class="inside"><p>${copy}</p><p class="tk">${tk}</p></div></details>`;

export const items = (arr) => `      <div class="rows plain" style="border-top:1px solid var(--rule)">\n${arr.join("\n")}\n      </div>`;

export const more = (title, copy, tk) =>
  `      <details class="more"><summary>${title}</summary><div class="inside"><p>${copy}</p><p class="tk">${tk}</p></div></details>`;

export const row = (n, b, t, hot) => hot
  ? `        <li><button type="button" data-hot="${hot}"><span class="n">${n}</span><span><b>${b}</b><span class="t">${t}</span></span></button></li>`
  : `        <li><div class="row"><span class="n">${n}</span><span><b>${b}</b><span class="t">${t}</span></span></div></li>`;

export const plainRow = (b, t, hot) =>
  `        <li${hot ? ` data-hot="${hot}" tabindex="0"` : ""}><div class="row"><span><b>${b}</b>${t ? `<span class="t">${t}</span>` : ""}</span></div></li>`;

export const ol = (rows) => `      <ol class="rows">\n${rows.join("\n")}\n      </ol>`;
export const ul = (rows, cls = "rows plain") => `      <ul class="${cls}">\n${rows.join("\n")}\n      </ul>`;
export const takeaway = (t) => `      <div class="takeaway"><small>Takeaway</small>${t}</div>`;
export const hint = () => "";
export const seg = (key, label, opts) =>
  `      <div class="seg" role="group" aria-label="${label}"><span class="k">${label}</span>${opts.map((o, i) => `<button type="button" data-param="${key}" data-value="${o[0]}"${i === 0 ? ' class="on" aria-pressed="true"' : ' aria-pressed="false"'}>${o[1]}</button>`).join("")}</div>`;
export const keys = (arr) => `      <ul class="keys">\n${arr.map(k => `        <li>${k}</li>`).join("\n")}\n      </ul>`;

export const pacerUI = (modes, idle0, btn0) => `      <div class="seg" role="group" aria-label="Pacer mode"><span class="k">Mode</span>${modes.map((m, i) => `<button type="button" data-pmode="${m.id}"${i === 0 ? ' class="on" aria-pressed="true"' : ' aria-pressed="false"'}>${m.label}</button>`).join("")}</div>
      <button class="btn" id="paceBtn" type="button">${btn0}</button>
      <div class="phase" id="phase" aria-live="polite">Ready</div>
      <p id="paceText" class="muted">${idle0}</p>`;
