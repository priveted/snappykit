import './app.css';

import {
  css, hasClass, addClass, removeClass, toggleClass,
  make, makeText, remove, query, queryList, queryLength,
  html, toHtml, append, prepend, before, after,
  attr, removeAttr, closest, val, appendText, toTextNode,
  mergeAdjacentTextNodes, replaceWithChildren, data, dataByPrefix,
  getChildNodes, getText, getLength, offset, outerSize,
  empty, show, hide, toggle,
  isEmptyString, isNullOrEmpty, isWhitespace,
  upperFirst, lowerFirst, upper, lower,
  replaceAll, truncate, toCamelCase, toKebabCase, toSnakeCase,
  reverse, formatBytes, randString, mask, pluralize,
  on, off, rebind,
  stripHtml, stripFragment, escapeHtml, decodeHtml, parseHtml
} from 'snappykit';

// ============================================================
// SVG Icons
// ============================================================
const ICONS = {
  passed: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#4ade80" stroke-width="1.5"/><path d="M5 8.5l2 2 4-5" stroke="#4ade80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  failed: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#f87171" stroke-width="1.5"/><path d="M5.5 5.5l5 5m-5 0l5-5" stroke="#f87171" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  star: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5l1.545 4.754h5L10.5 9.2l1.546 4.754L8 11.3l-4.046 2.654L5.5 9.2 1.455 6.254h5L8 1.5z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>`,
  code: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M5 5L2 8l3 3M11 5l3 3-3 3M9.5 2.5l-3 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  chevronRight: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5.25 3.5L8.75 7l-3.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  check: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 5" stroke="#4ade80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  x: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8m-8 0l8-8" stroke="#f87171" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  info: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><path d="M8 7.5v4M8 5v-.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  refresh: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8a6 6 0 0111.47-2M14 8a6 6 0 01-11.47 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M13.5 4.5V6H12M2.5 11.5V10H4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  eye: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 4C4.5 4 1.5 8 1.5 8s3 4 6.5 4S14.5 8 14.5 8 11.5 4 8 4z" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="8" r="2" stroke="currentColor" stroke-width="1.5"/></svg>`,
  eyeOff: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 2l12 12M8 4C4.5 4 1.5 8 1.5 8s3 4 6.5 4 6.5-4 6.5-4-1.5-2-4-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  layers: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2l6.5 3.5L8 9 1.5 5.5 8 2z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8 9l6.5-3.5v4L8 13l-6.5-3.5v-4L8 9z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  database: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><ellipse cx="8" cy="3.5" rx="6.5" ry="2.5" stroke="currentColor" stroke-width="1.5"/><path d="M1.5 3.5v4.5c0 1.38 2.91 2.5 6.5 2.5s6.5-1.12 6.5-2.5V3.5" stroke="currentColor" stroke-width="1.5"/><path d="M1.5 8v4.5c0 1.38 2.91 2.5 6.5 2.5s6.5-1.12 6.5-2.5V8" stroke="currentColor" stroke-width="1.5"/></svg>`,
  terminal: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4l3.5 4L2 12M7.5 12H14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><rect x="1" y="1.5" width="14" height="13" rx="2" stroke="currentColor" stroke-width="1.5"/></svg>`,
  text: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 4h10M3 8h8M3 12h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  monitor: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="2" width="14" height="10" rx="1.5" stroke="currentColor" stroke-width="1.5"/><path d="M5.5 14.5h5M8 12.5v2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  zap: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8.5 1.5l-4 8h3l-.5 5 5-8h-3l.5-5z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  link: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M7 9a3 3 0 003 3h1a3 3 0 000-6h-1M9 7a3 3 0 00-3-3H5a3 3 0 000 6h1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  hash: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3.5 5.5h9M3.5 10.5h9M6 2.5l-1 11M11 2.5l-1 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  box: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1.5" y="1.5" width="13" height="13" rx="2" stroke="currentColor" stroke-width="1.5"/></svg>`,
  trash: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2.5 4.5h11M5.5 4.5V3a1 1 0 011-1h3a1 1 0 011 1v1.5M3.5 4.5l.75 9.5a1 1 0 001 1h5.5a1 1 0 001-1l.75-9.5M6.5 7v5M9.5 7v5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  alert: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5l7 13H1l7-13z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8 6v3M8 11.5v.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
};

// ============================================================
// Test Runner
// ============================================================
class TestRunner {
  private container: HTMLElement;
  private passedCount: number = 0;
  private failedCount: number = 0;
  private testIdCounter: number = 0;

  constructor() {
    this.container = document.getElementById('app')!;
    this.renderHeader();
  }

  private renderHeader(): void {
    const header = make('header', (el) => {
      html(el, `
        <h1>${ICONS.monitor} SnappyKit Test Suite</h1>
        <div class="snp-stats">
          <div class="snp-stat snp-stat--passed">
            <span class="snp-stat-icon">${ICONS.check}</span>
            <span class="snp-stat-label">Passed</span>
            <span class="snp-stat-value" id="passedCount">0</span>
          </div>
          <div class="snp-stat snp-stat--failed">
            <span class="snp-stat-icon">${ICONS.x}</span>
            <span class="snp-stat-label">Failed</span>
            <span class="snp-stat-value" id="failedCount">0</span>
          </div>
          <div class="snp-stat snp-stat--total">
            <span class="snp-stat-icon">${ICONS.layers}</span>
            <span class="snp-stat-label">Total</span>
            <span class="snp-stat-value" id="totalCount">0</span>
          </div>
        </div>
      `);
    });
    append(this.container, header);
  }

  section(title: string): void {
    const cleanTitle = title.replace(/^---\s*/, '');
    const sectionEl = make('div', (el) => {
      addClass(el, 'snp-section');
      html(el, `<h2>${cleanTitle}</h2>`);
    });
    append(this.container, sectionEl);
  }

  log(message: string, passed: boolean, codeTs?: string, codeJs?: string): void {
    const sectionEls = queryList<HTMLElement>('.snp-section');
    const sectionEl = sectionEls[sectionEls.length - 1];
    if (!sectionEl) return;

    const testId = `snptest-${this.testIdCounter++}`;
    const icon = passed ? ICONS.passed : ICONS.failed;

    const testEl = make('div', (el) => {
      addClass(el, 'snp-case');
      addClass(el, passed ? 'snp-case--passed' : 'snp-case--failed');

      let toggleHtml = '';
      if (codeTs || codeJs) {
        toggleHtml = `
          <button class="snp-case__toggle" data-test-id="${testId}" aria-expanded="false">
            <span class="snp-case__toggle-icon">${ICONS.code}</span>
            <span class="snp-case__toggle-label">Code</span>
            <span class="snp-case__toggle-chevron">${ICONS.chevronRight}</span>
          </button>
        `;
      }

      let codeHtml = '';
      if (codeTs || codeJs) {
        codeHtml = `
          <div class="snp-case__code" id="${testId}-code" style="display: none;">
            <div class="snp-code-blocks">
              ${codeTs ? `<div class="snp-code-block"><div class="snp-code-block__label">TypeScript</div><pre><code>${escapeHtml(codeTs.trim())}</code></pre></div>` : ''}
              ${codeJs ? `<div class="snp-code-block"><div class="snp-code-block__label">JavaScript</div><pre><code>${escapeHtml(codeJs.trim())}</code></pre></div>` : ''}
            </div>
          </div>
        `;
      }

      html(el, `
        <div class="snp-case__header">
          <span class="snp-case__icon">${icon}</span>
          <span class="snp-case__message">${message}</span>
          ${toggleHtml}
        </div>
        ${codeHtml}
      `);
    });

    append(sectionEl, testEl);

    if (codeTs || codeJs) {
      const toggle = testEl.querySelector('.snp-case__toggle') as HTMLElement;
      const content = testEl.querySelector('.snp-case__code') as HTMLElement;
      if (toggle && content) {
        on(toggle, 'click', () => {
          const isHidden = content.style.display === 'none';
          content.style.display = isHidden ? 'block' : 'none';
          if (isHidden) {
            addClass(toggle, 'snp-case__toggle--expanded');
            toggle.setAttribute('aria-expanded', 'true');
          } else {
            removeClass(toggle, 'snp-case__toggle--expanded');
            toggle.setAttribute('aria-expanded', 'false');
          }
        });
      }
    }

    if (passed) this.passedCount++;
    else this.failedCount++;
    this.updateStats();
  }

  private updateStats(): void {
    const passedEl = document.getElementById('passedCount');
    const failedEl = document.getElementById('failedCount');
    const totalEl = document.getElementById('totalCount');
    if (passedEl) passedEl.textContent = String(this.passedCount);
    if (failedEl) failedEl.textContent = String(this.failedCount);
    if (totalEl) totalEl.textContent = String(this.passedCount + this.failedCount);
  }

  assert(condition: boolean, message: string, codeTs?: string, codeJs?: string): void {
    this.log(message, condition, codeTs, codeJs);
  }

  assertEquals<T>(actual: T, expected: T, message: string, codeTs?: string, codeJs?: string): void {
    this.log(message, actual === expected, codeTs, codeJs);
  }

  assertDeepEqual<T>(actual: T, expected: T, message: string, codeTs?: string, codeJs?: string): void {
    this.log(message, JSON.stringify(actual) === JSON.stringify(expected), codeTs, codeJs);
  }
}

const test = new TestRunner();

// ============================================================
// Helper: Demo Code Block
// ============================================================
function createDemoCodeBlock(tsCode: string, jsCode: string): string {
  return `
    <div class="snp-code-blocks">
      <div class="snp-code-block"><div class="snp-code-block__label">TypeScript</div><pre><code>${escapeHtml(tsCode.trim())}</code></pre></div>
      <div class="snp-code-block"><div class="snp-code-block__label">JavaScript</div><pre><code>${escapeHtml(jsCode.trim())}</code></pre></div>
    </div>
  `;
}

// ============================================================
// DEMO PANEL - ALL METHODS
// ============================================================
function createDemoPanel(): void {
  const app = document.getElementById('app')!;
  const demoContainer = make('div', (el) => {
    addClass(el, 'snp-demo');
    html(el, `<h2>${ICONS.monitor} Visual Demo</h2>`);
  });

  // 1. CSS & Classes
  const cssDemo = make('div', (el) => {
    addClass(el, 'snp-demo__group');
    html(el, `
      <h3>${ICONS.star} css / hasClass / addClass / removeClass / toggleClass</h3>
      <div class="snp-demo__row">
        <button id="demo-css-btn">Apply Styles</button>
        <button id="demo-css-reset-btn">${ICONS.refresh} Reset</button>
        <button id="demo-hasclass-btn">${ICONS.info} Check Class</button>
        <button id="demo-toggleclass-btn">Toggle Class (addClass / removeClass)</button>
      </div>
      <div id="demo-css-box" class="snp-demo__box">Styleable Block</div>
      <div class="snp-demo__output" id="demo-css-output"></div>
      <div class="snp-demo__code" id="demo-css-code"></div>
    `);
  });

  // 2. Show/Hide/Toggle
  const visDemo = make('div', (el) => {
    addClass(el, 'snp-demo__group');
    html(el, `
      <h3>${ICONS.eye} show / hide / toggle</h3>
      <div class="snp-demo__row">
        <button id="demo-show-btn">${ICONS.eye} Show</button>
        <button id="demo-hide-btn">${ICONS.eyeOff} Hide</button>
        <button id="demo-toggle-btn">Toggle</button>
      </div>
      <div id="demo-visibility-box" class="snp-demo__box">Visible Block</div>
      <div class="snp-demo__output" id="demo-visibility-output"></div>
      <div class="snp-demo__code" id="demo-visibility-code"></div>
    `);
  });

  // 3. make / makeText / append / prepend / before / after / remove / empty
  const domDemo = make('div', (el) => {
    addClass(el, 'snp-demo__group');
    html(el, `
      <h3>${ICONS.layers} make / makeText / append / prepend / before / after / remove / empty</h3>
      <div class="snp-demo__row">
        <button id="demo-append-btn">Append</button>
        <button id="demo-prepend-btn">Prepend</button>
        <button id="demo-add-before-btn">Add before</button>
        <button id="demo-add-after-btn">Add after</button>
        <button id="demo-get-before-btn">Get it before</button>
        <button id="demo-get-after-btn">Get it after</button>
        <button id="demo-remove-last-btn">${ICONS.trash} Remove Added</button>
        <button id="demo-empty-btn">Empty</button>
      </div>
      <div id="demo-dom-container" class="snp-demo__container">
        <div class="snp-demo__item snp-demo__item--base" id="base-element">Base Element (const baseItem = domContainer.getElementById('#base-element'))</div>
      </div>
      <div class="snp-demo__output" id="demo-dom-output"></div>
      <div class="snp-demo__code" id="demo-dom-code"></div>
    `);
  });

  // 4. attr / removeAttr / data / dataByPrefix
  const attrDemo = make('div', (el) => {
    addClass(el, 'snp-demo__group');
    html(el, `
      <h3>${ICONS.database} attr / removeAttr / data / dataByPrefix</h3>
      <div class="snp-demo__row">
        <button id="demo-attr-set-btn">Set Attribute</button>
        <button id="demo-attr-get-btn">Get Attribute</button>
        <button id="demo-attr-remove-btn">Remove Attribute</button>
        <button id="demo-data-btn">Data by Prefix</button>
      </div>
      <div id="demo-attr-element" class="snp-demo__box" data-demo-id="123" data-demo-role="admin" data-pref-name="test" data-pref-value="42">Element with Attributes</div>
      <div class="snp-demo__output" id="demo-attr-output"></div>
      <div class="snp-demo__code" id="demo-attr-code"></div>
    `);
  });

  // 5. val
  const valDemo = make('div', (el) => {
    addClass(el, 'snp-demo__group');
    html(el, `
      <h3>${ICONS.terminal} val</h3>
      <div class="snp-demo__row">
        <input type="text" id="demo-input" placeholder="Type something..." />
        <button id="demo-val-btn">Set Value</button>
        <button id="demo-val-get-btn">Get Value</button>
      </div>
      <div id="demo-val-display" class="snp-demo__display">Value will appear here</div>
      <div class="snp-demo__output" id="demo-val-output"></div>
      <div class="snp-demo__code" id="demo-val-code"></div>
    `);
  });

  // 6. html / toHtml / appendText / mergeAdjacentTextNodes / replaceWithChildren
  const htmlDemo = make('div', (el) => {
    addClass(el, 'snp-demo__group');
    html(el, `
      <h3>${ICONS.code} html / toHtml / appendText / mergeAdjacentTextNodes / replaceWithChildren</h3>
      <div class="snp-demo__row">
        <button id="demo-html-set-btn">Set HTML</button>
        <button id="demo-html-get-btn">Get HTML</button>
        <button id="demo-tohtml-btn">toHtml</button>
        <button id="demo-appendtext-btn">appendText</button>
        <button id="demo-merge-text-btn">mergeAdjacentTextNodes</button>
        <button id="demo-replacechildren-btn">replaceWithChildren</button>
      </div>
      <div id="demo-html-container" class="snp-demo__container">
        <div id="demo-html-target" class="snp-demo__item">Original content</div>
      </div>
      <div class="snp-demo__output" id="demo-html-output"></div>
      <div class="snp-demo__code" id="demo-html-code"></div>
    `);
  });

  // 7. query / queryList / queryLength / closest / getChildNodes
  const queryDemo = make('div', (el) => {
    addClass(el, 'snp-demo__group');
    html(el, `
      <h3>${ICONS.hash} query / queryList / queryLength / closest / getChildNodes</h3>
      <div class="snp-demo__row">
        <button id="demo-query-btn">query (count)</button>
        <button id="demo-querylist-btn">queryList</button>
        <button id="demo-querylength-btn">queryLength</button>
        <button id="demo-closest-btn">closest</button>
        <button id="demo-getchildnodes-btn">getChildNodes</button>
      </div>
      <div id="demo-query-container" class="snp-demo__container">
        <div class="snp-demo__item query-target">Item 1</div>
        <div class="snp-demo__item query-target">Item 2</div>
        <div class="snp-demo__item query-target">Item 3</div>
      </div>
      <div class="snp-demo__output" id="demo-query-output"></div>
      <div class="snp-demo__code" id="demo-query-code"></div>
    `);
  });

  // 8. offset / outerSize / getText / getLength
  const measureDemo = make('div', (el) => {
    addClass(el, 'snp-demo__group');
    html(el, `
      <h3>${ICONS.box} offset / outerSize / getText / getLength</h3>
      <div class="snp-demo__row">
        <button id="demo-offset-btn">offset()</button>
        <button id="demo-outersize-btn">outerSize()</button>
        <button id="demo-gettext-btn">getText()</button>
        <button id="demo-getlength-btn">getLength()</button>
      </div>
      <div id="demo-measure-box" class="snp-demo__box" style="width:200px;height:100px;margin:10px;padding:15px;">Measure me!</div>
      <div class="snp-demo__output" id="demo-measure-output"></div>
      <div class="snp-demo__code" id="demo-measure-code"></div>
    `);
  });

  // 9. on / off / rebind
  const eventsDemo = make('div', (el) => {
    addClass(el, 'snp-demo__group');
    html(el, `
      <h3>${ICONS.zap} on / off / rebind (with alert)</h3>
      <div class="snp-demo__row">
        <button id="demo-on-btn">on() click</button>
        <button id="demo-off-btn">off() click</button>
        <button id="demo-rebind-btn">rebind() click</button>
      </div>
      <div class="snp-demo__display" id="demo-events-display">Click counter: <strong>0</strong></div>
      <div class="snp-demo__output" id="demo-events-output"></div>
      <div class="snp-demo__code" id="demo-events-code"></div>
    `);
  });

  // 10. escapeHtml / decodeHtml / stripHtml / stripFragment / parseHtml
  const htmlUtilsDemo = make('div', (el) => {
    addClass(el, 'snp-demo__group');
    html(el, `
      <h3>${ICONS.code} escapeHtml / decodeHtml / stripHtml / stripFragment / parseHtml</h3>
      <div class="snp-demo__row">
        <button id="demo-escape-btn">Escape</button>
        <button id="demo-decode-btn">Decode</button>
        <button id="demo-strip-btn">Strip</button>
        <button id="demo-stripfrag-btn">Strip Fragment</button>
        <button id="demo-parse-btn">Parse</button>
      </div>
      <div class="snp-demo__input-row"><input type="text" id="demo-htmlutils-input" value="<div class='test'>Hello & World</div>" /></div>
      <div class="snp-demo__output" id="demo-htmlutils-output"></div>
      <div class="snp-demo__code" id="demo-htmlutils-code"></div>
    `);
  });

  // 11. Primitives: case/conversion methods
  const stringDemo = make('div', (el) => {
    addClass(el, 'snp-demo__group');
    html(el, `
      <h3>${ICONS.text} Primitives - Case & Conversion</h3>
      <div class="snp-demo__row">
        <button id="demo-camel-btn">toCamelCase</button>
        <button id="demo-kebab-btn">toKebabCase</button>
        <button id="demo-snake-btn">toSnakeCase</button>
        <button id="demo-upperfirst-btn">upperFirst</button>
        <button id="demo-lowerfirst-btn">lowerFirst</button>
        <button id="demo-upper-btn">upper</button>
        <button id="demo-lower-btn">lower</button>
        <button id="demo-truncate-btn">Truncate</button>
        <button id="demo-truncate-start-btn">Truncate Start</button>
        <button id="demo-mask-btn">Mask</button>
        <button id="demo-reverse-btn">Reverse</button>
        <button id="demo-replaceall-btn">replaceAll</button>
        <button id="demo-format-bytes-btn">Format Bytes</button>
        <button id="demo-random-btn">Random String</button>
        <button id="demo-random-num-btn">Random Numeric</button>
        <button id="demo-random-hex-btn">Random Hex</button>
        <button id="demo-pluralize-btn">Pluralize</button>
      </div>
      <div class="snp-demo__input-row"><input type="text" id="demo-string-input" value="hello-world-example" /></div>
      <div class="snp-demo__output" id="demo-string-output"></div>
      <div class="snp-demo__code" id="demo-string-code"></div>
    `);
  });

  // 12. Primitives: check methods
  const stringCheckDemo = make('div', (el) => {
    addClass(el, 'snp-demo__group');
    html(el, `
      <h3>${ICONS.info} isEmptyString / isNullOrEmpty / isWhitespace</h3>
      <div class="snp-demo__row">
        <button id="demo-isempty-btn">isEmptyString</button>
        <button id="demo-isnullorempty-btn">isNullOrEmpty</button>
        <button id="demo-iswhitespace-btn">isWhitespace</button>
      </div>
      <div class="snp-demo__input-row"><input type="text" id="demo-stringcheck-input" value="   " /></div>
      <div class="snp-demo__output" id="demo-stringcheck-output"></div>
      <div class="snp-demo__code" id="demo-stringcheck-code"></div>
    `);
  });

  append(demoContainer, cssDemo);
  append(demoContainer, visDemo);
  append(demoContainer, domDemo);
  append(demoContainer, attrDemo);
  append(demoContainer, valDemo);
  append(demoContainer, htmlDemo);
  append(demoContainer, queryDemo);
  append(demoContainer, measureDemo);
  append(demoContainer, eventsDemo);
  append(demoContainer, htmlUtilsDemo);
  append(demoContainer, stringDemo);
  append(demoContainer, stringCheckDemo);
  append(app, demoContainer);

  initDemoHandlers();
}

function initDemoHandlers(): void {
  // ===========================================
  // 1. CSS & Classes Demo
  // ===========================================
  const cssBox = document.getElementById('demo-css-box')!;
  const cssOutput = document.getElementById('demo-css-output')!;
  const cssCode = document.getElementById('demo-css-code')!;

  on(document.getElementById('demo-css-btn')!, 'click', () => {
    css(cssBox as HTMLElement, {
      backgroundColor: '#c084fc',
      color: 'white',
      padding: '20px',
      borderRadius: '12px',
      fontSize: '18px',
      transform: 'scale(1.05)',
      transition: 'all 0.3s ease'
    });
    html(cssOutput as HTMLElement, `${ICONS.check} css() - styles applied`);
    html(cssCode as HTMLElement, createDemoCodeBlock(
      `import { css } from 'snappykit';\n\ncss(element, {\n  backgroundColor: '#c084fc',\n  color: 'white',\n  padding: '20px',\n  borderRadius: '12px',\n  fontSize: '18px',\n  transform: 'scale(1.05)',\n  transition: 'all 0.3s ease'\n});`,
      `import { css } from 'snappykit';\n\ncss(element, {\n  backgroundColor: '#c084fc',\n  color: 'white',\n  padding: '20px',\n  borderRadius: '12px',\n  fontSize: '18px',\n  transform: 'scale(1.05)',\n  transition: 'all 0.3s ease'\n});`
    ));
  });

  on(document.getElementById('demo-css-reset-btn')!, 'click', () => {
    css(cssBox as HTMLElement, {
      backgroundColor: '',
      color: '',
      padding: '',
      borderRadius: '',
      fontSize: '',
      transform: '',
      transition: ''
    });
    html(cssOutput as HTMLElement, `${ICONS.refresh} css() - styles reset (empty string removes property)`);
    html(cssCode as HTMLElement, createDemoCodeBlock(
      `import { css } from 'snappykit';\n\ncss(element, {\n  backgroundColor: '',\n  color: '',\n  padding: '',\n  borderRadius: '',\n  fontSize: '',\n  transform: '',\n  transition: ''\n});\n// Empty string triggers removeProperty()`,
      `import { css } from 'snappykit';\n\ncss(element, {\n  backgroundColor: '',\n  color: '',\n  padding: '',\n  borderRadius: '',\n  fontSize: '',\n  transform: '',\n  transition: ''\n});\n// Empty string triggers removeProperty()`
    ));
  });

  on(document.getElementById('demo-hasclass-btn')!, 'click', () => {
    const hasDemo = hasClass(cssBox as HTMLElement, 'snp-demo__box');
    html(cssOutput as HTMLElement, `${ICONS.info} hasClass('snp-demo__box'): <strong>${hasDemo}</strong>`);
    html(cssCode as HTMLElement, createDemoCodeBlock(
      `import { hasClass } from 'snappykit';\n\nconst result: boolean = hasClass(element, 'snp-demo__box');\nconsole.log(result); // ${hasDemo}`,
      `import { hasClass } from 'snappykit';\n\nconst result = hasClass(element, 'snp-demo__box');\nconsole.log(result); // ${hasDemo}`
    ));
  });

  on(document.getElementById('demo-toggleclass-btn')!, 'click', () => {
    toggleClass(cssBox as HTMLElement, 'snp-highlighted  __empty___    ');
    const has = hasClass(cssBox as HTMLElement, 'snp-highlighted');
    html(cssOutput as HTMLElement, `toggleClass('snp-highlighted'): class <strong>${has ? 'added' : 'removed'}</strong>`);
    html(cssCode as HTMLElement, createDemoCodeBlock(
      `import { toggleClass, hasClass } from 'snappykit';\n\ntoggleClass(element, 'snp-highlighted');\nconst has: boolean = hasClass(element, 'snp-highlighted');\n// ${has}`,
      `import { toggleClass, hasClass } from 'snappykit';\n\ntoggleClass(element, 'snp-highlighted');\nconst has = hasClass(element, 'snp-highlighted');\n// ${has}`
    ));
  });

  // ===========================================
  // 2. Show/Hide/Toggle Demo
  // ===========================================
  const visBox = document.getElementById('demo-visibility-box')!;
  const visOutput = document.getElementById('demo-visibility-output')!;
  const visCode = document.getElementById('demo-visibility-code')!;

  on(document.getElementById('demo-show-btn')!, 'click', () => {
    show(visBox as any);
    html(visOutput as HTMLElement, `${ICONS.eye} show() - element is visible (restores previous display value)`);
    html(visCode as HTMLElement, createDemoCodeBlock(
      `import { show } from 'snappykit';\n\nshow(element);\n// Restores previous display value, removes style if it was empty`,
      `import { show } from 'snappykit';\n\nshow(element);\n// Restores previous display value, removes style if it was empty`
    ));
  });

  on(document.getElementById('demo-hide-btn')!, 'click', () => {
    hide(visBox as any);
    html(visOutput as HTMLElement, `${ICONS.eyeOff} hide() - element hidden (stores current display, sets display:none)`);
    html(visCode as HTMLElement, createDemoCodeBlock(
      `import { hide } from 'snappykit';\n\nhide(element);\n// Stores current display value in __visibleStatus, sets display:none`,
      `import { hide } from 'snappykit';\n\nhide(element);\n// Stores current display value in __visibleStatus, sets display:none`
    ));
  });

  on(document.getElementById('demo-toggle-btn')!, 'click', () => {
    toggle(visBox as any);
    const isHidden = css(visBox as HTMLElement, 'display') === 'none';
    html(visOutput as HTMLElement, `toggle() - element is now <strong>${isHidden ? 'hidden' : 'visible'}</strong>`);
    html(visCode as HTMLElement, createDemoCodeBlock(
      `import { toggle, css } from 'snappykit';\n\ntoggle(element);\nconst isHidden: boolean = css(element, 'display') === 'none';\n// ${isHidden}`,
      `import { toggle, css } from 'snappykit';\n\ntoggle(element);\nconst isHidden = css(element, 'display') === 'none';\n// ${isHidden}`
    ));
  });

  // ===========================================
  // 3. DOM Manipulation Demo (append/prepend inside container, before/after relative to Base Element)
  // ===========================================
  const domContainer = document.getElementById('demo-dom-container')!;
  const domOutput = document.getElementById('demo-dom-output')!;
  const domCode = document.getElementById('demo-dom-code')!;
  const baseItem = domContainer.querySelector('.snp-demo__item--base')!;
  let domCounter = 0;

  on(document.getElementById('demo-append-btn')!, 'click', () => {
    domCounter++;
    const newEl = make('div', (el) => {
      addClass(el, 'snp-demo__item');
      el.textContent = `Appended ${domCounter}`;
      css(el as HTMLElement, { background: '#4ade80', color: '#000', padding: '8px', margin: '4px', borderRadius: '6px' });
    });
    append(baseItem as HTMLElement, newEl);
    html(domOutput as HTMLElement, `${ICONS.check} append(baseItem, newEl) - added as LAST child INSIDE baseItem`);
    html(domCode as HTMLElement, createDemoCodeBlock(
      `import { make, addClass, css, append } from 'snappykit';\n\nconst newEl = make('div', (el) => {\n  addClass(el, 'snp-demo__item');\n  el.textContent = 'Appended ${domCounter}';\n  css(el, { background: '#4ade80', color: '#000' });\n});\n\nappend(baseItem, newEl);\n// newEl becomes lastChild of baseItem`,
      `import { make, addClass, css, append } from 'snappykit';\n\nconst newEl = make('div', (el) => {\n  addClass(el, 'snp-demo__item');\n  el.textContent = 'Appended ${domCounter}';\n  css(el, { background: '#4ade80', color: '#000' });\n});\n\nappend(baseItem, newEl);\n// newEl becomes lastChild of baseItem`
    ));
  });

  on(document.getElementById('demo-prepend-btn')!, 'click', () => {
    domCounter++;
    const newEl = make('div', (el) => {
      addClass(el, 'snp-demo__item');
      el.textContent = `Prepended ${domCounter}`;
      css(el as HTMLElement, { background: '#fbbf24', color: '#000', padding: '8px', margin: '4px', borderRadius: '6px' });
    });
    prepend(baseItem as HTMLElement, newEl);
    html(domOutput as HTMLElement, `${ICONS.check} prepend(baseItem, newEl) - added as FIRST child INSIDE baseItem`);
    html(domCode as HTMLElement, createDemoCodeBlock(
      `import { make, prepend } from 'snappykit';\n\nconst newEl = make('div', (el) => {\n  el.textContent = 'Prepended ${domCounter}';\n});\n\nprepend(baseItem, newEl);\n// newEl becomes firstChild of baseItem`,
      `import { make, prepend } from 'snappykit';\n\nconst newEl = make('div', (el) => {\n  el.textContent = 'Prepended ${domCounter}';\n});\n\nprepend(baseItem, newEl);\n// newEl becomes firstChild of baseItem`
    ));
  });

  on(document.getElementById('demo-add-before-btn')!, 'click', () => {
    domCounter++;
    const newEl = make('div', (el) => {
      addClass(el, 'snp-demo__item');
      el.textContent = `Before ${domCounter}`;
      css(el as HTMLElement, { background: '#f472b6', color: '#000', padding: '8px', margin: '4px', borderRadius: '6px' });
    });
    before(baseItem as HTMLElement, newEl);
    html(domOutput as HTMLElement, `${ICONS.check} before(baseElement, newEl) - inserted BEFORE Base Element (inside same container)`);
    html(domCode as HTMLElement, createDemoCodeBlock(
      `import { make, before } from 'snappykit';\n\nconst newEl = make('div', (el) => {\n  el.textContent = 'Before ${domCounter}';\n});\n\nbefore(baseElement, newEl);\n// Inserts newEl as previousSibling of baseElement`,
      `import { make, before } from 'snappykit';\n\nconst newEl = make('div', (el) => {\n  el.textContent = 'Before ${domCounter}';\n});\n\nbefore(baseElement, newEl);\n// Inserts newEl as previousSibling of baseElement`
    ));
  });

  on(document.getElementById('demo-add-after-btn')!, 'click', () => {
    domCounter++;
    const newEl = make('div', (el) => {
      addClass(el, 'snp-demo__item');
      el.textContent = `After ${domCounter}`;
      css(el as HTMLElement, { background: '#60a5fa', color: '#000', padding: '8px', margin: '4px', borderRadius: '6px' });
    });
    after(baseItem as HTMLElement, newEl);
    html(domOutput as HTMLElement, `${ICONS.check} after(baseElement, newEl) - inserted AFTER Base Element (inside same container)`);
    html(domCode as HTMLElement, createDemoCodeBlock(
      `import { make, after } from 'snappykit';\n\nconst newEl = make('div', (el) => {\n  el.textContent = 'After ${domCounter}';\n});\n\nafter(baseElement, newEl);\n// Inserts newEl as nextSibling of baseElement`,
      `import { make, after } from 'snappykit';\n\nconst newEl = make('div', (el) => {\n  el.textContent = 'After ${domCounter}';\n});\n\nafter(baseElement, newEl);\n// Inserts newEl as nextSibling of baseElement`
    ));
  });

  on(document.getElementById('demo-get-before-btn')!, 'click', () => {
    const prevEl = before(baseItem as HTMLElement);
    html(domOutput as HTMLElement, `${ICONS.info} before(baseElement) - returned: <strong>${prevEl ? prevEl.textContent : 'null (no previous sibling)'}</strong>`);
    html(domCode as HTMLElement, createDemoCodeBlock(
      `import { before } from 'snappykit';\n\nconst prevSibling = before(baseElement);\n// Returns the previous sibling element or null if none exists`,
      `import { before } from 'snappykit';\n\nconst prevSibling = before(baseElement);\n// Returns the previous sibling element or null if none exists`
    ));
  });

  on(document.getElementById('demo-get-after-btn')!, 'click', () => {
    const nextEl = after(baseItem as HTMLElement);
    html(domOutput as HTMLElement, `${ICONS.info} after(baseElement) - returned: <strong>${nextEl ? nextEl.textContent : 'null (no next sibling)'}</strong>`);
    html(domCode as HTMLElement, createDemoCodeBlock(
      `import { after } from 'snappykit';\n\nconst nextSibling = after(baseElement);\n// Returns the next sibling element or null if none exists`,
      `import { after } from 'snappykit';\n\nconst nextSibling = after(baseElement);\n// Returns the next sibling element or null if none exists`
    ));
  });

  on(document.getElementById('demo-remove-last-btn')!, 'click', () => {
    const items = queryList<HTMLElement>('.snp-demo__item:not(.snp-demo__item--base)', domContainer);

    remove(items);
    html(domOutput as HTMLElement, `${ICONS.trash} remove() - removed (${items.length})`);

    html(domCode as HTMLElement, createDemoCodeBlock(
      `import { remove } from 'snappykit';\n\nremove(elementToRemove);\n // or \nremove([elementToRemove, elementToRemove2]);\n// Removes element from its parentNode`,
`import { remove } from 'snappykit';\n\nremove(elementToRemove);\n // or \nremove([elementToRemove, elementToRemove2]);\n// Removes element from its parentNode`,
    ));
  });

  on(document.getElementById('demo-empty-btn')!, 'click', () => {
    empty(baseItem as HTMLElement);
    domCounter = 0;
    html(domOutput as HTMLElement, `${ICONS.trash} empty(baseItem) - ${escapeHtml(baseItem.outerHTML)}`);
    html(domCode as HTMLElement, createDemoCodeBlock(
      `import { empty } from 'snappykit';\n\nempty(baseItem);\n// Empty element`,
      `import { empty } from 'snappykit';\n\nempty(baseItem);\n// Empty element`
    ));
  });

  // ===========================================
  // 4. Attributes & Data Demo
  // ===========================================
  const attrElement = document.getElementById('demo-attr-element')!;
  const attrOutput = document.getElementById('demo-attr-output')!;
  const attrCode = document.getElementById('demo-attr-code')!;

  on(document.getElementById('demo-attr-set-btn')!, 'click', () => {
    attr(attrElement, 'data-custom', 'hello-world');
    addClass(attrElement as HTMLElement, 'snp-highlighted');
    html(attrOutput as HTMLElement, `${ICONS.check} attr(el, 'data-custom', 'hello-world') - attribute set`);
    html(attrCode as HTMLElement, createDemoCodeBlock(
      `import { attr, addClass } from 'snappykit';\n\nattr(element, 'data-custom', 'hello-world');\naddClass(element, 'snp-highlighted');`,
      `import { attr, addClass } from 'snappykit';\n\nattr(element, 'data-custom', 'hello-world');\naddClass(element, 'snp-highlighted');`
    ));
  });

  on(document.getElementById('demo-attr-get-btn')!, 'click', () => {
    const val = attr(attrElement, 'data-custom');
    const has = hasClass(attrElement as HTMLElement, 'snp-highlighted');
    html(attrOutput as HTMLElement, `${ICONS.info} attr(el, 'data-custom'): <strong>${val}</strong>, hasClass('snp-highlighted'): <strong>${has}</strong>`);
    html(attrCode as HTMLElement, createDemoCodeBlock(
      `import { attr, hasClass } from 'snappykit';\n\nconst value: string | null = attr(element, 'data-custom');\nconst has: boolean = hasClass(element, 'snp-highlighted');\nconsole.log(value, has); // '${val}', ${has}`,
      `import { attr, hasClass } from 'snappykit';\n\nconst value = attr(element, 'data-custom');\nconst has = hasClass(element, 'snp-highlighted');\nconsole.log(value, has); // '${val}', ${has}`
    ));
  });

  on(document.getElementById('demo-attr-remove-btn')!, 'click', () => {
    removeAttr(attrElement, 'data-custom');
    removeClass(attrElement as HTMLElement, 'snp-highlighted');
    html(attrOutput as HTMLElement, `${ICONS.trash} removeAttr(el, 'data-custom') - attribute removed`);
    html(attrCode as HTMLElement, createDemoCodeBlock(
      `import { removeAttr, removeClass } from 'snappykit';\n\nremoveAttr(element, 'data-custom');\nremoveClass(element, 'snp-highlighted');`,
      `import { removeAttr, removeClass } from 'snappykit';\n\nremoveAttr(element, 'data-custom');\nremoveClass(element, 'snp-highlighted');`
    ));
  });

  on(document.getElementById('demo-data-btn')!, 'click', () => {
    const prefixed = dataByPrefix(attrElement as HTMLElement, 'pref');
    html(attrOutput as HTMLElement, `${ICONS.database} dataByPrefix(el, 'pref'): <strong>${JSON.stringify(prefixed)}</strong>`);
    html(attrCode as HTMLElement, createDemoCodeBlock(
      `import { dataByPrefix } from 'snappykit';\n\nconst result: Record<string, string | number> = dataByPrefix(element, 'pref');\nconsole.log(result); // { name: 'test', value: 42 }`,
      `import { dataByPrefix } from 'snappykit';\n\nconst result = dataByPrefix(element, 'pref');\nconsole.log(result); // { name: 'test', value: 42 }`
    ));
  });

  // ===========================================
  // 5. Val Demo
  // ===========================================
  const valInput = document.getElementById('demo-input') as HTMLInputElement;
  const valDisplay = document.getElementById('demo-val-display')!;
  const valOutput = document.getElementById('demo-val-output')!;
  const valCode = document.getElementById('demo-val-code')!;

  on(valInput, 'input.change', () => {
    html(valDisplay as HTMLElement, `<strong>Current value:</strong> ${val(valInput) || '(empty)'}`);
  });

  on(document.getElementById('demo-val-btn')!, 'click', () => {
    val(valInput, 'Value has been set!');
    html(valOutput as HTMLElement, `${ICONS.check} val(input, 'Value has been set!') - value set, returns element (chainable)`);
    html(valCode as HTMLElement, createDemoCodeBlock(
      `import { val } from 'snappykit';\n\nval(inputElement, 'Value has been set!');\n// Sets value, returns the element for chaining`,
      `import { val } from 'snappykit';\n\nval(inputElement, 'Value has been set!');\n// Sets value, returns the element for chaining`
    ));
  });

  on(document.getElementById('demo-val-get-btn')!, 'click', () => {
    const currentVal = val(valInput);
    html(valOutput as HTMLElement, `${ICONS.info} val(input): <strong>"${currentVal}"</strong>`);
    html(valCode as HTMLElement, createDemoCodeBlock(
      `import { val } from 'snappykit';\n\nconst value: string = val(inputElement);\nconsole.log(value); // "${currentVal}"`,
      `import { val } from 'snappykit';\n\nconst value = val(inputElement);\nconsole.log(value); // "${currentVal}"`
    ));
  });

  // ===========================================
  // 6. HTML Demo (html, toHtml, appendText, mergeAdjacentTextNodes, replaceWithChildren)
  // ===========================================
  const htmlTarget = document.getElementById('demo-html-target')!;
  const htmlContainer = document.getElementById('demo-html-container')!;
  const htmlOutput = document.getElementById('demo-html-output')!;
  const htmlCodeEl = document.getElementById('demo-html-code')!;

  on(document.getElementById('demo-html-set-btn')!, 'click', () => {
    html(htmlTarget as HTMLElement, '<strong>Bold</strong> <em>Italic</em> <u>Underline</u>');
    html(htmlOutput as HTMLElement, `${ICONS.check} html(el, '...') - innerHTML set, returns element`);
    html(htmlCodeEl as HTMLElement, createDemoCodeBlock(
      `import { html } from 'snappykit';\n\nhtml(element, '<strong>Bold</strong> <em>Italic</em> <u>Underline</u>');\n// Sets innerHTML, returns HTMLElement for chaining`,
      `import { html } from 'snappykit';\n\nhtml(element, '<strong>Bold</strong> <em>Italic</em> <u>Underline</u>');\n// Sets innerHTML, returns HTMLElement for chaining`
    ));
  });

  on(document.getElementById('demo-html-get-btn')!, 'click', () => {
    const h = html(htmlTarget as HTMLElement);
    html(htmlOutput as HTMLElement, `${ICONS.info} html(el): <strong>${escapeHtml(h as string)}</strong>`);
    html(htmlCodeEl as HTMLElement, createDemoCodeBlock(
      `import { html } from 'snappykit';\n\nconst content: string = html(element);\n// Returns innerHTML as string when no value provided\nconsole.log(content);`,
      `import { html } from 'snappykit';\n\nconst content = html(element);\n// Returns innerHTML as string when no value provided\nconsole.log(content);`
    ));
  });

  on(document.getElementById('demo-tohtml-btn')!, 'click', () => {
    const result = toHtml(htmlTarget);
    html(htmlOutput as HTMLElement, `${ICONS.code} toHtml(el): <strong>${escapeHtml(result)}</strong> (uses outerHTML)`);
    html(htmlCodeEl as HTMLElement, createDemoCodeBlock(
      `import { toHtml } from 'snappykit';\n\nconst htmlStr: string = toHtml(element);\n// Uses outerHTML for HTMLElement, returns textContent for Text nodes`,
      `import { toHtml } from 'snappykit';\n\nconst htmlStr = toHtml(element);\n// Uses outerHTML for HTMLElement, returns textContent for Text nodes`
    ));
  });

  on(document.getElementById('demo-appendtext-btn')!, 'click', () => {
    appendText(htmlContainer as HTMLElement, ' [text node] ');
    html(htmlOutput as HTMLElement, `${ICONS.check} appendText(container, ' [text node] ') - Text node created and appended`);
    html(htmlCodeEl as HTMLElement, createDemoCodeBlock(
      `import { appendText } from 'snappykit';\n\nappendText(container, ' [text node] ');\n// Creates Text node via document.createTextNode(), appends to container, returns container`,
      `import { appendText } from 'snappykit';\n\nappendText(container, ' [text node] ');\n// Creates Text node via document.createTextNode(), appends to container, returns container`
    ));
  });

  on(document.getElementById('demo-merge-text-btn')!, 'click', () => {
    const beforeCount = getChildNodes(htmlContainer).length;
    mergeAdjacentTextNodes(htmlContainer as HTMLElement);
    const afterCount = getChildNodes(htmlContainer).length;
    html(htmlOutput as HTMLElement, `${ICONS.check} mergeAdjacentTextNodes(): ${beforeCount} nodes → <strong>${afterCount}</strong> nodes (merged)`);
    html(htmlCodeEl as HTMLElement, createDemoCodeBlock(
      `import { mergeAdjacentTextNodes, getChildNodes } from 'snappykit';\n\nconst before: number = getChildNodes(container).length; // ${beforeCount}\nmergeAdjacentTextNodes(container);\nconst after: number = getChildNodes(container).length; // ${afterCount}\n// Adjacent text nodes combined into one`,
      `import { mergeAdjacentTextNodes, getChildNodes } from 'snappykit';\n\nconst before = getChildNodes(container).length; // ${beforeCount}\nmergeAdjacentTextNodes(container);\nconst after = getChildNodes(container).length; // ${afterCount}\n// Adjacent text nodes combined into one`
    ));
  });

  on(document.getElementById('demo-replacechildren-btn')!, 'click', () => {
    const wrapper = htmlTarget;
    const parent = wrapper.parentNode;
    if (parent && wrapper.children.length > 0) {
      replaceWithChildren(wrapper as HTMLElement);
      html(htmlOutput as HTMLElement, `${ICONS.check} replaceWithChildren(wrapper) - wrapper removed, children remain as direct children of parent`);
    } else {
      html(htmlOutput as HTMLElement, `${ICONS.info} replaceWithChildren() - no children to preserve or wrapper already removed`);
    }
    html(htmlCodeEl as HTMLElement, createDemoCodeBlock(
      `import { replaceWithChildren } from 'snappykit';\n\nreplaceWithChildren(wrapperElement);\n// Removes wrapper element, inserts all its children in its place`,
      `import { replaceWithChildren } from 'snappykit';\n\nreplaceWithChildren(wrapperElement);\n// Removes wrapper element, inserts all its children in its place`
    ));
  });

  // ===========================================
  // 7. Query Demo
  // ===========================================
  const queryContainer = document.getElementById('demo-query-container')!;
  const queryOutput = document.getElementById('demo-query-output')!;
  const queryCode = document.getElementById('demo-query-code')!;

  on(document.getElementById('demo-query-btn')!, 'click', () => {
    let c = 0;
    query('.query-target', (el, i) => { c++; });
    html(queryOutput as HTMLElement, `${ICONS.hash} query('.query-target', callback): iterated <strong>${c}</strong> elements`);
    html(queryCode as HTMLElement, createDemoCodeBlock(
      `import { query } from 'snappykit';\n\nlet count = 0;\nquery<HTMLElement>('.query-target', (el, index) => {\n  count++;\n  console.log(el, index);\n});\nconsole.log(count); // ${c}`,
      `import { query } from 'snappykit';\n\nlet count = 0;\nquery('.query-target', (el, index) => {\n  count++;\n  console.log(el, index);\n});\nconsole.log(count); // ${c}`
    ));
  });

  on(document.getElementById('demo-querylist-btn')!, 'click', () => {
    const items = queryList('.query-target');
    html(queryOutput as HTMLElement, `${ICONS.hash} queryList('.query-target'): <strong>${items.length}</strong> items returned as array`);
    html(queryCode as HTMLElement, createDemoCodeBlock(
      `import { queryList } from 'snappykit';\n\nconst items: HTMLElement[] = queryList<HTMLElement>('.query-target');\nconsole.log(items.length); // ${items.length}\n// items is an array of matching elements`,
      `import { queryList } from 'snappykit';\n\nconst items = queryList('.query-target');\nconsole.log(items.length); // ${items.length}\n// items is an array of matching elements`
    ));
  });

  on(document.getElementById('demo-querylength-btn')!, 'click', () => {
    const len = queryLength('.query-target');
    html(queryOutput as HTMLElement, `${ICONS.hash} queryLength('.query-target'): <strong>${len}</strong> elements`);
    html(queryCode as HTMLElement, createDemoCodeBlock(
      `import { queryLength } from 'snappykit';\n\nconst count: number = queryLength('.query-target');\nconsole.log(count); // ${len}`,
      `import { queryLength } from 'snappykit';\n\nconst count = queryLength('.query-target');\nconsole.log(count); // ${len}`
    ));
  });

  on(document.getElementById('demo-closest-btn')!, 'click', () => {
    const target = queryList('.query-target')[0];
    const found = closest(target, queryContainer);
    html(queryOutput as HTMLElement, `${ICONS.link} closest(target, container): <strong>${found ? 'found! (returns the parent)' : 'not found (returns false)'}</strong>`);
    html(queryCode as HTMLElement, createDemoCodeBlock(
      `import { closest } from 'snappykit';\n\nconst target = queryList('.query-target')[0];\nconst result: HTMLElement | false = closest(target, container);\n// Returns parent if target is descendant of container, false otherwise\nconsole.log(result); // ${found ? 'HTMLElement' : 'false'}`,
      `import { closest } from 'snappykit';\n\nconst target = queryList('.query-target')[0];\nconst result = closest(target, container);\n// Returns parent if target is descendant of container, false otherwise\nconsole.log(result); // ${found ? 'HTMLElement' : 'false'}`
    ));
  });

  on(document.getElementById('demo-getchildnodes-btn')!, 'click', () => {
    const nodes = getChildNodes(queryContainer);
    html(queryOutput as HTMLElement, `${ICONS.box} getChildNodes(container): <strong>${nodes.length}</strong> child nodes (including text nodes)`);
    html(queryCode as HTMLElement, createDemoCodeBlock(
      `import { getChildNodes } from 'snappykit';\n\nconst nodes: Node[] = getChildNodes(container);\nconsole.log(nodes.length); // ${nodes.length}\n// Returns array of child nodes (elements + text nodes)`,
      `import { getChildNodes } from 'snappykit';\n\nconst nodes = getChildNodes(container);\nconsole.log(nodes.length); // ${nodes.length}\n// Returns array of child nodes (elements + text nodes)`
    ));
  });

  // ===========================================
  // 8. Measure Demo
  // ===========================================
  const measureBox = document.getElementById('demo-measure-box')!;
  const measureOutput = document.getElementById('demo-measure-output')!;
  const measureCode = document.getElementById('demo-measure-code')!;

  on(document.getElementById('demo-offset-btn')!, 'click', () => {
    const off = offset(measureBox as HTMLElement);
    html(measureOutput as HTMLElement, `${ICONS.box} offset(el): { top: <strong>${off.top}px</strong>, left: <strong>${off.left}px</strong> } - relative to document`);
    html(measureCode as HTMLElement, createDemoCodeBlock(
      `import { offset } from 'snappykit';\n\nconst pos: { top: number; left: number } = offset(element);\n// Returns position relative to document (includes scroll)\nconsole.log(pos); // { top: ${off.top}, left: ${off.left} }`,
      `import { offset } from 'snappykit';\n\nconst pos = offset(element);\n// Returns position relative to document (includes scroll)\nconsole.log(pos); // { top: ${off.top}, left: ${off.left} }`
    ));
  });

  on(document.getElementById('demo-outersize-btn')!, 'click', () => {
    const sz = outerSize(measureBox as HTMLElement);
    html(measureOutput as HTMLElement, `${ICONS.box} outerSize(el): { width: <strong>${sz.width}px</strong>, height: <strong>${sz.height}px</strong> } - includes margin`);
    html(measureCode as HTMLElement, createDemoCodeBlock(
      `import { outerSize } from 'snappykit';\n\nconst dims: { width: number; height: number } = outerSize(element);\n// offsetWidth + marginLeft + marginRight, offsetHeight + marginTop + marginBottom\nconsole.log(dims); // { width: ${sz.width}, height: ${sz.height} }`,
      `import { outerSize } from 'snappykit';\n\nconst dims = outerSize(element);\n// offsetWidth + marginLeft + marginRight, offsetHeight + marginTop + marginBottom\nconsole.log(dims); // { width: ${sz.width}, height: ${sz.height} }`
    ));
  });

  on(document.getElementById('demo-gettext-btn')!, 'click', () => {
    const txt = getText(measureBox);
    html(measureOutput as HTMLElement, `${ICONS.text} getText(el): <strong>"${txt}"</strong>`);
    html(measureCode as HTMLElement, createDemoCodeBlock(
      `import { getText } from 'snappykit';\n\nconst text: string = getText(element);\n// Returns combined textContent from node or array of nodes\nconsole.log(text); // "${txt}"`,
      `import { getText } from 'snappykit';\n\nconst text = getText(element);\n// Returns combined textContent from node or array of nodes\nconsole.log(text); // "${txt}"`
    ));
  });

  on(document.getElementById('demo-getlength-btn')!, 'click', () => {
    const len = getLength(measureBox);
    html(measureOutput as HTMLElement, `${ICONS.info} getLength(el): <strong>${len}</strong> characters`);
    html(measureCode as HTMLElement, createDemoCodeBlock(
      `import { getLength } from 'snappykit';\n\nconst len: number = getLength(element);\n// Returns total text length from node or array of nodes\nconsole.log(len); // ${len}`,
      `import { getLength } from 'snappykit';\n\nconst len = getLength(element);\n// Returns total text length from node or array of nodes\nconsole.log(len); // ${len}`
    ));
  });

  // ===========================================
  // 9. Events Demo (on/off/rebind with alert)
  // ===========================================
  const eventsDisplay = document.getElementById('demo-events-display')!;
  const eventsOutput = document.getElementById('demo-events-output')!;
  const eventsCode = document.getElementById('demo-events-code')!;
  let eventCounter = 0;

  function updateEventDisplay(): void {
    html(eventsDisplay as HTMLElement, `Click counter: <strong>${eventCounter}</strong>`);
  }

  on(document.getElementById('demo-on-btn')!, 'click.demoOn', () => {
    eventCounter++;
    updateEventDisplay();
    html(eventsOutput as HTMLElement, `${ICONS.zap} on('click.demoOn') - handler fired! Counter: ${eventCounter}`);
  });

  on(document.getElementById('demo-on-btn')!, 'click', () => {
    html(eventsCode as HTMLElement, createDemoCodeBlock(
      `import { on } from 'snappykit';\n\non(button, 'click.demoOn', (e: MouseEvent) => {\n  e.delegateTarget; // automatically set to the element\n  counter++;\n  alert('Clicked!');\n});\n// Event registered with ID 'demoOn' for later removal`,
      `import { on } from 'snappykit';\n\non(button, 'click.demoOn', (e) => {\n  e.delegateTarget; // automatically set to the element\n  counter++;\n  alert('Clicked!');\n});\n// Event registered with ID 'demoOn' for later removal`
    ));
    alert('on() demo: Event handler registered with ID "demoOn"!\nClick the "on() click" button to fire it.');
  });

  on(document.getElementById('demo-off-btn')!, 'click', () => {
    off(document.getElementById('demo-on-btn')!, 'click.demoOn');
    html(eventsOutput as HTMLElement, `${ICONS.x} off('click.demoOn') - handler removed. Click "on() click" - nothing will happen`);
    html(eventsCode as HTMLElement, createDemoCodeBlock(
      `import { off } from 'snappykit';\n\noff(button, 'click.demoOn');\n// Removes only the handler with ID 'demoOn'\n// To remove ALL click handlers: off(button, 'click')`,
      `import { off } from 'snappykit';\n\noff(button, 'click.demoOn');\n// Removes only the handler with ID 'demoOn'\n// To remove ALL click handlers: off(button, 'click')`
    ));
    alert('off() demo: Handler with ID "demoOn" removed!\nClick "on() click" button - nothing will happen.');
  });

  on(document.getElementById('demo-rebind-btn')!, 'click', () => {
    rebind(document.getElementById('demo-on-btn')!, 'click.demoOn', () => {
      eventCounter += 10;
      updateEventDisplay();
      html(eventsOutput as HTMLElement, `${ICONS.zap} rebind('click.demoOn') - NEW handler! Counter jumped by 10!`);
    });
    html(eventsOutput as HTMLElement, `${ICONS.refresh} rebind('click.demoOn', newHandler) - old handler replaced with new one`);
    html(eventsCode as HTMLElement, createDemoCodeBlock(
      `import { rebind } from 'snappykit';\n\nrebind(button, 'click.demoOn', (e: MouseEvent) => {\n  counter += 10;\n  alert('Rebound!');\n});\n// Equivalent to: off(button, 'click.demoOn') + on(button, 'click.demoOn', newHandler)`,
      `import { rebind } from 'snappykit';\n\nrebind(button, 'click.demoOn', (e) => {\n  counter += 10;\n  alert('Rebound!');\n});\n// Equivalent to: off(button, 'click.demoOn') + on(button, 'click.demoOn', newHandler)`
    ));
    alert('rebind() demo: Handler replaced!\nClick "on() click" button - counter jumps by 10 now!');
  });

  // ===========================================
  // 10. HTML Utils Demo
  // ===========================================
  const htmlUtilsInput = document.getElementById('demo-htmlutils-input') as HTMLInputElement;
  const htmlUtilsOutput = document.getElementById('demo-htmlutils-output')!;
  const htmlUtilsCode = document.getElementById('demo-htmlutils-code')!;

  on(document.getElementById('demo-escape-btn')!, 'click', () => {
    const result = escapeHtml(htmlUtilsInput.value);
    html(htmlUtilsOutput as HTMLElement, `escapeHtml(): <strong>${escapeHtml(result)}</strong>`);
    html(htmlUtilsCode as HTMLElement, createDemoCodeBlock(
      `import { escapeHtml } from 'snappykit';\n\nconst input = '${htmlUtilsInput.value}';\nconst result: string = escapeHtml(input);\n// Escapes & < > " ' to HTML entities\nconsole.log(result);`,
      `import { escapeHtml } from 'snappykit';\n\nconst input = '${htmlUtilsInput.value}';\nconst result = escapeHtml(input);\n// Escapes & < > " ' to HTML entities\nconsole.log(result);`
    ));
  });

  on(document.getElementById('demo-decode-btn')!, 'click', () => {
    const result = decodeHtml(htmlUtilsInput.value);
    html(htmlUtilsOutput as HTMLElement, `decodeHtml(): <strong>${escapeHtml(result)}</strong>`);
    html(htmlUtilsCode as HTMLElement, createDemoCodeBlock(
      `import { decodeHtml } from 'snappykit';\n\nconst input = '${htmlUtilsInput.value}';\nconst result: string = decodeHtml(input);\n// Decodes &amp; &lt; &gt; &quot; &#039; back to characters\nconsole.log(result);`,
      `import { decodeHtml } from 'snappykit';\n\nconst input = '${htmlUtilsInput.value}';\nconst result = decodeHtml(input);\n// Decodes &amp; &lt; &gt; &quot; &#039; back to characters\nconsole.log(result);`
    ));
  });

  on(document.getElementById('demo-strip-btn')!, 'click', () => {
    const result = stripHtml(htmlUtilsInput.value);
    html(htmlUtilsOutput as HTMLElement, `stripHtml(): <strong>${result}</strong>`);
    html(htmlUtilsCode as HTMLElement, createDemoCodeBlock(
      `import { stripHtml } from 'snappykit';\n\nconst input = '${htmlUtilsInput.value}';\nconst result: string = stripHtml(input);\n// Removes all HTML tags, keeps text content\nconsole.log(result);`,
      `import { stripHtml } from 'snappykit';\n\nconst input = '${htmlUtilsInput.value}';\nconst result = stripHtml(input);\n// Removes all HTML tags, keeps text content\nconsole.log(result);`
    ));
  });

  on(document.getElementById('demo-stripfrag-btn')!, 'click', () => {
    const fragInput = '<!--StartFragment--><p>Content</p><!--EndFragment-->';
    htmlUtilsInput.value = fragInput;
    const result = stripFragment(fragInput);
    html(htmlUtilsOutput as HTMLElement, `stripFragment(): <strong>${escapeHtml(result)}</strong>`);
    html(htmlUtilsCode as HTMLElement, createDemoCodeBlock(
      `import { stripFragment } from 'snappykit';\n\nconst input = '<!--StartFragment--><p>Content</p><!--EndFragment-->';\nconst result: string = stripFragment(input);\n// Removes fragment markers, keeps inner content\nconsole.log(result); // '<p>Content</p>'`,
      `import { stripFragment } from 'snappykit';\n\nconst input = '<!--StartFragment--><p>Content</p><!--EndFragment-->';\nconst result = stripFragment(input);\n// Removes fragment markers, keeps inner content\nconsole.log(result); // '<p>Content</p>'`
    ));
  });

  on(document.getElementById('demo-parse-btn')!, 'click', () => {
    const nodes = parseHtml(htmlUtilsInput.value);
    html(htmlUtilsOutput as HTMLElement, `parseHtml(): <strong>${nodes.length}</strong> nodes parsed`);
    html(htmlUtilsCode as HTMLElement, createDemoCodeBlock(
      `import { parseHtml } from 'snappykit';\n\nconst input = '${htmlUtilsInput.value}';\nconst nodes: Node[] = parseHtml(input);\n// Parses HTML string into array of DOM nodes\nconsole.log(nodes.length); // ${nodes.length}`,
      `import { parseHtml } from 'snappykit';\n\nconst input = '${htmlUtilsInput.value}';\nconst nodes = parseHtml(input);\n// Parses HTML string into array of DOM nodes\nconsole.log(nodes.length); // ${nodes.length}`
    ));
  });

  // ===========================================
  // 11. Primitives Demo (updated label)
  // ===========================================
  const stringInput = document.getElementById('demo-string-input') as HTMLInputElement;
  const stringOutput = document.getElementById('demo-string-output')!;
  const stringCode = document.getElementById('demo-string-code')!;

  on(document.getElementById('demo-camel-btn')!, 'click', () => {
    const result = toCamelCase(stringInput.value);
    html(stringOutput as HTMLElement, `toCamelCase("${stringInput.value}"): <strong>${result}</strong>`);
    html(stringCode as HTMLElement, createDemoCodeBlock(
      `import { toCamelCase } from 'snappykit';\n\nconst result: string = toCamelCase('${stringInput.value}');\n// Converts kebab-case, snake_case, space separated to camelCase\nconsole.log(result); // "${result}"`,
      `import { toCamelCase } from 'snappykit';\n\nconst result = toCamelCase('${stringInput.value}');\n// Converts kebab-case, snake_case, space separated to camelCase\nconsole.log(result); // "${result}"`
    ));
  });

  on(document.getElementById('demo-kebab-btn')!, 'click', () => {
    const result = toKebabCase(stringInput.value);
    html(stringOutput as HTMLElement, `toKebabCase("${stringInput.value}"): <strong>${result}</strong>`);
    html(stringCode as HTMLElement, createDemoCodeBlock(
      `import { toKebabCase } from 'snappykit';\n\nconst result: string = toKebabCase('${stringInput.value}');\n// Converts camelCase, PascalCase, snake_case to kebab-case\nconsole.log(result); // "${result}"`,
      `import { toKebabCase } from 'snappykit';\n\nconst result = toKebabCase('${stringInput.value}');\n// Converts camelCase, PascalCase, snake_case to kebab-case\nconsole.log(result); // "${result}"`
    ));
  });

  on(document.getElementById('demo-snake-btn')!, 'click', () => {
    const result = toSnakeCase(stringInput.value);
    html(stringOutput as HTMLElement, `toSnakeCase("${stringInput.value}"): <strong>${result}</strong>`);
    html(stringCode as HTMLElement, createDemoCodeBlock(
      `import { toSnakeCase } from 'snappykit';\n\nconst result: string = toSnakeCase('${stringInput.value}');\n// Converts camelCase, PascalCase, kebab-case to snake_case\nconsole.log(result); // "${result}"`,
      `import { toSnakeCase } from 'snappykit';\n\nconst result = toSnakeCase('${stringInput.value}');\n// Converts camelCase, PascalCase, kebab-case to snake_case\nconsole.log(result); // "${result}"`
    ));
  });

  on(document.getElementById('demo-upperfirst-btn')!, 'click', () => {
    const result = upperFirst(stringInput.value);
    html(stringOutput as HTMLElement, `upperFirst("${stringInput.value}"): <strong>${result}</strong>`);
    html(stringCode as HTMLElement, createDemoCodeBlock(
      `import { upperFirst } from 'snappykit';\n\nconst result: string = upperFirst('${stringInput.value}');\n// Capitalizes first character\nconsole.log(result); // "${result}"`,
      `import { upperFirst } from 'snappykit';\n\nconst result = upperFirst('${stringInput.value}');\n// Capitalizes first character\nconsole.log(result); // "${result}"`
    ));
  });

  on(document.getElementById('demo-lowerfirst-btn')!, 'click', () => {
    const result = lowerFirst(stringInput.value);
    html(stringOutput as HTMLElement, `lowerFirst("${stringInput.value}"): <strong>${result}</strong>`);
    html(stringCode as HTMLElement, createDemoCodeBlock(
      `import { lowerFirst } from 'snappykit';\n\nconst result: string = lowerFirst('${stringInput.value}');\n// Lowercases first character\nconsole.log(result); // "${result}"`,
      `import { lowerFirst } from 'snappykit';\n\nconst result = lowerFirst('${stringInput.value}');\n// Lowercases first character\nconsole.log(result); // "${result}"`
    ));
  });

  on(document.getElementById('demo-upper-btn')!, 'click', () => {
    const result = upper(stringInput.value);
    html(stringOutput as HTMLElement, `upper("${stringInput.value}"): <strong>${result}</strong>`);
    html(stringCode as HTMLElement, createDemoCodeBlock(
      `import { upper } from 'snappykit';\n\nconst result: string = upper('${stringInput.value}');\n// Converts entire string to uppercase\nconsole.log(result); // "${result}"`,
      `import { upper } from 'snappykit';\n\nconst result = upper('${stringInput.value}');\n// Converts entire string to uppercase\nconsole.log(result); // "${result}"`
    ));
  });

  on(document.getElementById('demo-lower-btn')!, 'click', () => {
    const result = lower(stringInput.value);
    html(stringOutput as HTMLElement, `lower("${stringInput.value}"): <strong>${result}</strong>`);
    html(stringCode as HTMLElement, createDemoCodeBlock(
      `import { lower } from 'snappykit';\n\nconst result: string = lower('${stringInput.value}');\n// Converts entire string to lowercase\nconsole.log(result); // "${result}"`,
      `import { lower } from 'snappykit';\n\nconst result = lower('${stringInput.value}');\n// Converts entire string to lowercase\nconsole.log(result); // "${result}"`
    ));
  });

  on(document.getElementById('demo-truncate-btn')!, 'click', () => {
    const result = truncate(stringInput.value, 8);
    html(stringOutput as HTMLElement, `truncate("${stringInput.value}", 8): <strong>${result}</strong>`);
    html(stringCode as HTMLElement, createDemoCodeBlock(
      `import { truncate } from 'snappykit';\n\nconst result: string = truncate('${stringInput.value}', 8);\n// Truncates from end, appends "..." if truncated\nconsole.log(result); // "${result}"`,
      `import { truncate } from 'snappykit';\n\nconst result = truncate('${stringInput.value}', 8);\n// Truncates from end, appends "..." if truncated\nconsole.log(result); // "${result}"`
    ));
  });

  on(document.getElementById('demo-truncate-start-btn')!, 'click', () => {
    const result = truncate(stringInput.value, 8, '...', true);
    html(stringOutput as HTMLElement, `truncate("${stringInput.value}", 8, '...', true): <strong>${result}</strong>`);
    html(stringCode as HTMLElement, createDemoCodeBlock(
      `import { truncate } from 'snappykit';\n\nconst result: string = truncate('${stringInput.value}', 8, '...', true);\n// Truncates from start (cutFromStart=true)\nconsole.log(result); // "${result}"`,
      `import { truncate } from 'snappykit';\n\nconst result = truncate('${stringInput.value}', 8, '...', true);\n// Truncates from start (cutFromStart=true)\nconsole.log(result); // "${result}"`
    ));
  });

  on(document.getElementById('demo-mask-btn')!, 'click', () => {
    const result = mask(stringInput.value, 4, 4);
    html(stringOutput as HTMLElement, `mask("${stringInput.value}", 4, 4): <strong>${result}</strong>`);
    html(stringCode as HTMLElement, createDemoCodeBlock(
      `import { mask } from 'snappykit';\n\nconst result: string = mask('${stringInput.value}', 4, 4);\n// Shows 4 chars at start, 4 at end, masks middle with '*'\nconsole.log(result); // "${result}"`,
      `import { mask } from 'snappykit';\n\nconst result = mask('${stringInput.value}', 4, 4);\n// Shows 4 chars at start, 4 at end, masks middle with '*'\nconsole.log(result); // "${result}"`
    ));
  });

  on(document.getElementById('demo-reverse-btn')!, 'click', () => {
    const result = reverse(stringInput.value);
    html(stringOutput as HTMLElement, `reverse("${stringInput.value}"): <strong>${result}</strong>`);
    html(stringCode as HTMLElement, createDemoCodeBlock(
      `import { reverse } from 'snappykit';\n\nconst result: string = reverse('${stringInput.value}');\n// Reverses the string\nconsole.log(result); // "${result}"`,
      `import { reverse } from 'snappykit';\n\nconst result = reverse('${stringInput.value}');\n// Reverses the string\nconsole.log(result); // "${result}"`
    ));
  });

  on(document.getElementById('demo-replaceall-btn')!, 'click', () => {
    const result = replaceAll('-', '_', stringInput.value);
    html(stringOutput as HTMLElement, `replaceAll('-', '_', "${stringInput.value}"): <strong>${result}</strong>`);
    html(stringCode as HTMLElement, createDemoCodeBlock(
      `import { replaceAll } from 'snappykit';\n\nconst result: string = replaceAll('-', '_', '${stringInput.value}');\n// Replaces all occurrences of '-' with '_'\nconsole.log(result); // "${result}"`,
      `import { replaceAll } from 'snappykit';\n\nconst result = replaceAll('-', '_', '${stringInput.value}');\n// Replaces all occurrences of '-' with '_'\nconsole.log(result); // "${result}"`
    ));
  });

  on(document.getElementById('demo-format-bytes-btn')!, 'click', () => {
    const result = formatBytes(1024000);
    html(stringOutput as HTMLElement, `formatBytes(1024000): <strong>${result}</strong>`);
    html(stringCode as HTMLElement, createDemoCodeBlock(
      `import { formatBytes } from 'snappykit';\n\nconst result: string = formatBytes(1024000);\n// Formats bytes to human-readable with browser locale\nconsole.log(result); // "${result}"`,
      `import { formatBytes } from 'snappykit';\n\nconst result = formatBytes(1024000);\n// Formats bytes to human-readable with browser locale\nconsole.log(result); // "${result}"`
    ));
  });

  on(document.getElementById('demo-random-btn')!, 'click', () => {
    const result = randString(12);
    html(stringOutput as HTMLElement, `randString(12): <strong>${result}</strong> (alphanumeric)`);
    html(stringCode as HTMLElement, createDemoCodeBlock(
      `import { randString } from 'snappykit';\n\nconst result: string = randString(12);\n// Default charset: alphanumeric (A-Z, a-z, 0-9)\nconsole.log(result); // "${result}"`,
      `import { randString } from 'snappykit';\n\nconst result = randString(12);\n// Default charset: alphanumeric (A-Z, a-z, 0-9)\nconsole.log(result); // "${result}"`
    ));
  });

  on(document.getElementById('demo-random-num-btn')!, 'click', () => {
    const result = randString(8, 'numeric');
    html(stringOutput as HTMLElement, `randString(8, 'numeric'): <strong>${result}</strong>`);
    html(stringCode as HTMLElement, createDemoCodeBlock(
      `import { randString } from 'snappykit';\n\nconst result: string = randString(8, 'numeric');\n// Charset: 0-9 only\nconsole.log(result); // "${result}"`,
      `import { randString } from 'snappykit';\n\nconst result = randString(8, 'numeric');\n// Charset: 0-9 only\nconsole.log(result); // "${result}"`
    ));
  });

  on(document.getElementById('demo-random-hex-btn')!, 'click', () => {
    const result = randString(6, 'hex');
    html(stringOutput as HTMLElement, `randString(6, 'hex'): <strong>${result}</strong>`);
    html(stringCode as HTMLElement, createDemoCodeBlock(
      `import { randString } from 'snappykit';\n\nconst result: string = randString(6, 'hex');\n// Charset: 0-9, a-f\nconsole.log(result); // "${result}"`,
      `import { randString } from 'snappykit';\n\nconst result = randString(6, 'hex');\n// Charset: 0-9, a-f\nconsole.log(result); // "${result}"`
    ));
  });

  on(document.getElementById('demo-pluralize-btn')!, 'click', () => {
    const forms: [string, string, string] = ['яблоко', 'яблока', 'яблок'];
    const result = pluralize(5, forms);
    html(stringOutput as HTMLElement, `pluralize(5, ['яблоко', 'яблока', 'яблок']): <strong>${result}</strong>`);
    html(stringCode as HTMLElement, createDemoCodeBlock(
      `import { pluralize } from 'snappykit';\n\nconst result = pluralize(5, ['яблоко', 'яблока', 'яблок']);\n// Returns correct plural form with number`,
      `import { pluralize } from 'snappykit';\n\nconst result = pluralize(5, ['яблоко', 'яблока', 'яблок']);\n// Returns correct plural form with number`
    ));
  });

  // ===========================================
  // 12. Primitives Check Demo
  // ===========================================
  const stringCheckInput = document.getElementById('demo-stringcheck-input') as HTMLInputElement;
  const stringCheckOutput = document.getElementById('demo-stringcheck-output')!;
  const stringCheckCode = document.getElementById('demo-stringcheck-code')!;

  on(document.getElementById('demo-isempty-btn')!, 'click', () => {
    const result = isEmptyString(stringCheckInput.value);
    html(stringCheckOutput as HTMLElement, `isEmptyString("${stringCheckInput.value}"): <strong>${result}</strong>`);
    html(stringCheckCode as HTMLElement, createDemoCodeBlock(
      `import { isEmptyString } from 'snappykit';\n\nconst input = '${stringCheckInput.value}';\nconst result: boolean = isEmptyString(input);\n// Checks for whitespace, zero-width spaces, BOM, etc.\nconsole.log(result); // ${result}`,
      `import { isEmptyString } from 'snappykit';\n\nconst input = '${stringCheckInput.value}';\nconst result = isEmptyString(input);\n// Checks for whitespace, zero-width spaces, BOM, etc.\nconsole.log(result); // ${result}`
    ));
  });

  on(document.getElementById('demo-isnullorempty-btn')!, 'click', () => {
    const result = isNullOrEmpty(stringCheckInput.value);
    html(stringCheckOutput as HTMLElement, `isNullOrEmpty("${stringCheckInput.value}"): <strong>${result}</strong>`);
    html(stringCheckCode as HTMLElement, createDemoCodeBlock(
      `import { isNullOrEmpty } from 'snappykit';\n\nconst input = '${stringCheckInput.value}';\nconst result: boolean = isNullOrEmpty(input);\n// Returns true for null, undefined, or empty string\nconsole.log(result); // ${result}`,
      `import { isNullOrEmpty } from 'snappykit';\n\nconst input = '${stringCheckInput.value}';\nconst result = isNullOrEmpty(input);\n// Returns true for null, undefined, or empty string\nconsole.log(result); // ${result}`
    ));
  });

  on(document.getElementById('demo-iswhitespace-btn')!, 'click', () => {
    const result = isWhitespace(stringCheckInput.value);
    html(stringCheckOutput as HTMLElement, `isWhitespace("${stringCheckInput.value}"): <strong>${result}</strong>`);
    html(stringCheckCode as HTMLElement, createDemoCodeBlock(
      `import { isWhitespace } from 'snappykit';\n\nconst input = '${stringCheckInput.value}';\nconst result: boolean = isWhitespace(input);\n// Returns true if non-empty but only whitespace\nconsole.log(result); // ${result}`,
      `import { isWhitespace } from 'snappykit';\n\nconst input = '${stringCheckInput.value}';\nconst result = isWhitespace(input);\n// Returns true if non-empty but only whitespace\nconsole.log(result); // ${result}`
    ));
  });
}

// Initialize demo panel
createDemoPanel();

// ============================================================
// ============================================================
//                     ALL TESTS
// ============================================================
// ============================================================

// ============================================================
// DOM: CSS
// ============================================================
test.section('DOM: CSS');

{
  const el = make('div');
  append(document.body, el);

  css(el, 'color', 'red');
  test.assertEquals(el.style.color, 'red', 'css() sets single property (string)',
    `css(el, 'color', 'red');\n// Sets color to red`,
    `css(el, 'color', 'red');\n// Sets color to red`
  );

  css(el, 'width', 200);
  test.assertEquals(el.style.width, '200px', 'css() adds "px" to numeric values',
    `css(el, 'width', 200);\n// 200 becomes "200px" automatically`,
    `css(el, 'width', 200);\n// 200 becomes "200px" automatically`
  );

  css(el, { height: '100px', backgroundColor: 'blue', margin: 10 });
  test.assertEquals(el.style.height, '100px', 'css() sets multiple properties via object',
    `css(el, {\n  height: '100px',\n  backgroundColor: 'blue',\n  margin: 10\n});`,
    `css(el, {\n  height: '100px',\n  backgroundColor: 'blue',\n  margin: 10\n});`
  );

  const color = css(el, 'color');
  test.assertEquals(color, 'red', 'css() returns computed style value (getter)',
    `const color: string = css(el, 'color');\n// Uses getComputedStyle() when no value provided`,
    `const color = css(el, 'color');\n// Uses getComputedStyle() when no value provided`
  );

  css(el, 'color', '');
  test.assert(!el.style.color, 'css() removes property with empty string',
    `css(el, 'color', '');\n// Empty string triggers removeProperty()`,
    `css(el, 'color', '');\n// Empty string triggers removeProperty()`
  );

  css(el, 'width', null);
  test.assert(!el.style.width, 'css() removes property with null value',
    `css(el, 'width', null);\n// null also triggers removeProperty()`,
    `css(el, 'width', null);\n// null also triggers removeProperty()`
  );

  css(el, 'background-color', 'green');
  test.assertEquals(el.style.backgroundColor, 'green', 'css() accepts kebab-case property names',
    `css(el, 'background-color', 'green');\n// Converts kebab-case to camelCase internally`,
    `css(el, 'background-color', 'green');\n// Converts kebab-case to camelCase internally`
  );

  remove(el);
}

// ============================================================
// DOM: Classes
// ============================================================
test.section('DOM: Classes');

{
  const el = make('div');
  append(document.body, el);

  addClass(el, 'test-class');
  test.assert(hasClass(el, 'test-class'), 'addClass() adds a single class',
    `addClass(el, 'test-class');\nhasClass(el, 'test-class'); // true`,
    `addClass(el, 'test-class');\nhasClass(el, 'test-class'); // true`
  );

  addClass(el, 'class1 class2');
  test.assert(hasClass(el, 'class1') && hasClass(el, 'class2'), 'addClass() adds multiple classes via space-separated string',
    `addClass(el, 'class1 class2');\n// Splits by space automatically`,
    `addClass(el, 'class1 class2');\n// Splits by space automatically`
  );

  addClass(el, ['class3', 'class4']);
  test.assert(hasClass(el, 'class3') && hasClass(el, 'class4'), 'addClass() adds multiple classes via array',
    `addClass(el, ['class3', 'class4']);`,
    `addClass(el, ['class3', 'class4']);`
  );

  removeClass(el, 'class1');
  test.assert(!hasClass(el, 'class1'), 'removeClass() removes a single class',
    `removeClass(el, 'class1');`,
    `removeClass(el, 'class1');`
  );

  removeClass(el, 'class2 class3');
  test.assert(!hasClass(el, 'class2') && !hasClass(el, 'class3'), 'removeClass() removes multiple via string',
    `removeClass(el, 'class2 class3');`,
    `removeClass(el, 'class2 class3');`
  );

  removeClass(el, ['class4']);
  test.assert(!hasClass(el, 'class4'), 'removeClass() removes via array',
    `removeClass(el, ['class4']);`,
    `removeClass(el, ['class4']);`
  );

  toggleClass(el, 'toggle-me');
  test.assert(hasClass(el, 'toggle-me'), 'toggleClass() adds class when absent',
    `toggleClass(el, 'toggle-me');\n// Class added (was not present)`,
    `toggleClass(el, 'toggle-me');\n// Class added (was not present)`
  );

  toggleClass(el, 'toggle-me');
  test.assert(!hasClass(el, 'toggle-me'), 'toggleClass() removes class when present',
    `toggleClass(el, 'toggle-me');\n// Class removed (was present)`,
    `toggleClass(el, 'toggle-me');\n// Class removed (was present)`
  );

  toggleClass(el, ['a', 'b']);
  test.assert(hasClass(el, 'a') && hasClass(el, 'b'), 'toggleClass() toggles multiple via array',
    `toggleClass(el, ['a', 'b']);\n// Toggles each class independently`,
    `toggleClass(el, ['a', 'b']);\n// Toggles each class independently`
  );

  test.assert(!hasClass(null, 'any'), 'hasClass() returns false for null element',
    `hasClass(null, 'any'); // false (null-safe guard)`,
    `hasClass(null, 'any'); // false (null-safe guard)`
  );

  remove(el);
}

// ============================================================
// DOM: Create & Remove (make, makeText, append, remove)
// ============================================================
test.section('DOM: Create & Remove');

{
  const div = make('div', (el) => {
    el.id = 'test-div';
    el.textContent = 'Hello';
  });
  test.assertEquals(div.tagName.toLowerCase(), 'div', 'make() creates element with correct tag',
    `const el: HTMLDivElement = make<HTMLDivElement>('div', (el) => { el.id = 'test-div'; });`,
    `const el = make('div', (el) => { el.id = 'test-div'; });`
  );
  test.assertEquals(div.id, 'test-div', 'make() callback receives created element',
    `make('div', (el) => {\n  el.id = 'test-div';\n  el.textContent = 'Hello';\n});`,
    `make('div', (el) => {\n  el.id = 'test-div';\n  el.textContent = 'Hello';\n});`
  );

  const textNode = makeText('Sample text');
  test.assertEquals(textNode.nodeType, Node.TEXT_NODE, 'makeText() creates a text node',
    `const node: Text = makeText('Sample text');\n// Returns Text node`,
    `const node = makeText('Sample text');\n// Returns Text node`
  );
  test.assertEquals(textNode.textContent, 'Sample text', 'makeText() sets text content',
    `makeText('Sample text');\n// node.textContent === 'Sample text'`,
    `makeText('Sample text');\n// node.textContent === 'Sample text'`
  );

  append(document.body, div);
  test.assert(document.body.contains(div), 'append() adds element to DOM',
    `append(document.body, el);\n// Appends as last child`,
    `append(document.body, el);\n// Appends as last child`
  );

  remove(div);
  test.assert(!document.body.contains(div), 'remove() removes element from DOM',
    `remove(el);\n// Removes from parentNode`,
    `remove(el);\n// Removes from parentNode`
  );
}

// ============================================================
// DOM: Query (query, queryList, queryLength)
// ============================================================
test.section('DOM: Query');

{
  const container = make('div');
  for (let i = 0; i < 3; i++) {
    const item = make('div');
    addClass(item, 'query-item');
    append(container, item);
  }
  append(document.body, container);

  let count = 0;
  query('.query-item', (el, index) => { count++; });
  test.assertEquals(count, 3, 'query() calls callback for each element',
    `query<HTMLElement>('.query-item', (el, index) => {\n  console.log(el, index);\n});\n// Calls callback 3 times`,
    `query('.query-item', (el, index) => {\n  console.log(el, index);\n});\n// Calls callback 3 times`
  );

  const items = queryList('.query-item');
  test.assertEquals(items.length, 3, 'queryList() returns array of elements',
    `const items: HTMLElement[] = queryList<HTMLElement>('.query-item');\nconsole.log(items.length); // 3`,
    `const items = queryList('.query-item');\nconsole.log(items.length); // 3`
  );

  test.assertEquals(queryLength('.query-item'), 3, 'queryLength() returns element count',
    `const count: number = queryLength('.query-item');\nconsole.log(count); // 3`,
    `const count = queryLength('.query-item');\nconsole.log(count); // 3`
  );

  const nested = make('div');
  const nestedItem = make('div');
  addClass(nestedItem, 'nested');
  append(nested, nestedItem);
  append(container, nested);
  test.assertEquals(queryLength('.nested', nested), 1, 'query() supports context parameter',
    `queryLength('.nested', nestedContainer);\n// Searches only within nestedContainer`,
    `queryLength('.nested', nestedContainer);\n// Searches only within nestedContainer`
  );

  remove(container);
}

// ============================================================
// DOM: HTML (html, toHtml)
// ============================================================
test.section('DOM: HTML');

{
  const el = make('div');
  append(document.body, el);

  html(el, '<span>Test</span>');
  test.assertEquals(html(el), '<span>Test</span>', 'html() sets innerHTML',
    `html(el, '<span>Test</span>');\n// Returns the element (chaining)`,
    `html(el, '<span>Test</span>');\n// Returns the element (chaining)`
  );

  test.assertEquals(html(el), '<span>Test</span>', 'html() gets innerHTML',
    `const content: string = html(el);\n// Returns innerHTML as string`,
    `const content = html(el);\n// Returns innerHTML as string`
  );

  html(el, null);
  test.assertEquals(html(el), '<span>Test</span>', 'html() with null does not change content',
    `html(el, null);\n// Content unchanged`,
    `html(el, null);\n// Content unchanged`
  );

  test.assertEquals(toHtml('plain text'), 'plain text', 'toHtml() returns string as-is',
    `toHtml('plain text');\n// Returns input unchanged if string`,
    `toHtml('plain text');\n// Returns input unchanged if string`
  );

  const span = make('span');
  span.textContent = 'Hello';
  test.assertEquals(toHtml(span), '<span>Hello</span>', 'toHtml() converts element to HTML string',
    `toHtml(spanElement);\n// Uses outerHTML for elements`,
    `toHtml(spanElement);\n// Uses outerHTML for elements`
  );

  test.assertEquals(toHtml([make('div'), make('span')]), '<div></div><span></span>', 'toHtml() converts array to HTML',
    `toHtml([divEl, spanEl]);\n// Joins outerHTML of each element`,
    `toHtml([divEl, spanEl]);\n// Joins outerHTML of each element`
  );

  const tn = document.createTextNode('text');
  test.assertEquals(toHtml(tn), 'text', 'toHtml() handles Text nodes',
    `toHtml(textNode);\n// Returns textContent for Text nodes`,
    `toHtml(textNode);\n// Returns textContent for Text nodes`
  );

  remove(el);
}

// ============================================================
// DOM: Append, Prepend, Before, After
// ============================================================
test.section('DOM: Append, Prepend, Before, After');

{
  const parent = make('div');
  append(document.body, parent);

  const child1 = make('span'); child1.textContent = 'first';
  const child2 = make('span'); child2.textContent = 'second';

  append(parent, child1);
  append(parent, child2);
  test.assertEquals(parent.children.length, 2, 'append() adds to end',
    `append(parent, child1);\nappend(parent, child2);\n// child2 is lastChild`,
    `append(parent, child1);\nappend(parent, child2);\n// child2 is lastChild`
  );
  test.assertEquals(parent.lastChild, child2, 'append() adds element as last child',
    `// parent.lastChild === child2`,
    `// parent.lastChild === child2`
  );

  const child0 = make('span'); child0.textContent = 'zero';
  prepend(parent, child0);
  test.assertEquals(parent.firstChild, child0, 'prepend() adds to beginning',
    `prepend(parent, child0);\n// child0 is now firstChild`,
    `prepend(parent, child0);\n// child0 is now firstChild`
  );

  const beforeEl = make('span'); beforeEl.textContent = 'before';
  before(child1, beforeEl);
  test.assertEquals(child1.previousSibling, beforeEl, 'before() inserts before target (with second arg)',
    `before(child1, beforeEl);\n// Inserts beforeEl right before child1`,
    `before(child1, beforeEl);\n// Inserts beforeEl right before child1`
  );

  // New test: before() as getter (without second argument)
  test.assertEquals(before(child1 as HTMLElement), beforeEl, 'before() returns previous sibling when no second argument',
    `const prevSibling = before(child1);\n// Returns the element immediately before child1`,
    `const prevSibling = before(child1);\n// Returns the element immediately before child1`
  );
  test.assertEquals(before(child0 as HTMLElement), null, 'before() returns null when no previous sibling exists',
    `before(child0); // null (no previous sibling)`,
    `before(child0); // null (no previous sibling)`
  );

  const afterEl = make('span'); afterEl.textContent = 'after';
  after(child1, afterEl);
  test.assertEquals(child1.nextSibling, afterEl, 'after() inserts after target (with second arg)',
    `after(child1, afterEl);\n// Inserts afterEl right after child1`,
    `after(child1, afterEl);\n// Inserts afterEl right after child1`
  );

  // New test: after() as getter (without second argument)
  test.assertEquals(after(child1 as HTMLElement), afterEl, 'after() returns next sibling when no second argument',
    `const nextSibling = after(child1);\n// Returns the element immediately after child1`,
    `const nextSibling = after(child1);\n// Returns the element immediately after child1`
  );
  test.assertEquals(after(child2 as HTMLElement), null, 'after() returns null when no next sibling exists',
    `after(child2); // null (no next sibling)`,
    `after(child2); // null (no next sibling)`
  );

  const arr = [make('div'), make('div')];
  append(parent, arr);
  test.assertEquals(parent.children.length, 7, 'append() accepts array of nodes',
    `append(parent, [el1, el2]);\n// Appends each element in order`,
    `append(parent, [el1, el2]);\n// Appends each element in order`
  );

  remove(parent);
}

// ============================================================
// DOM: Attributes (attr, removeAttr)
// ============================================================
test.section('DOM: Attributes');

{
  const el = make('div');
  append(document.body, el);

  attr(el, 'data-test', 'value');
  test.assertEquals(attr(el, 'data-test'), 'value', 'attr() sets and gets attribute',
    `attr(el, 'data-test', 'value');\nconst val: string | null = attr(el, 'data-test'); // 'value'`,
    `attr(el, 'data-test', 'value');\nconst val = attr(el, 'data-test'); // 'value'`
  );

  attr(el, { 'data-x': '1', 'data-y': '2' });
  test.assertEquals(attr(el, 'data-x'), '1', 'attr() sets multiple attributes via object',
    `attr(el, { 'data-x': '1', 'data-y': '2' });`,
    `attr(el, { 'data-x': '1', 'data-y': '2' });`
  );
  test.assertEquals(attr(el, 'data-y'), '2', 'attr() sets multiple attributes via object (2)',
    `// All attributes set at once`,
    `// All attributes set at once`
  );

  removeAttr(el, 'data-x');
  test.assert(!el.hasAttribute('data-x'), 'removeAttr() removes single attribute',
    `removeAttr(el, 'data-x');`,
    `removeAttr(el, 'data-x');`
  );

  removeAttr(el, ['data-y', 'data-test']);
  test.assert(!el.hasAttribute('data-y') && !el.hasAttribute('data-test'), 'removeAttr() removes multiple attributes',
    `removeAttr(el, ['data-y', 'data-test']);`,
    `removeAttr(el, ['data-y', 'data-test']);`
  );

  remove(el);
}

// ============================================================
// DOM: Data (data, dataByPrefix)
// ============================================================
test.section('DOM: Data');

{
  const el = make('div');
  append(document.body, el);

  data(el, 'userId', '123');
  test.assertEquals(el.dataset.userId, '123', 'data() sets single data attribute',
    `data(el, 'userId', '123');\n// Sets data-user-id="123"`,
    `data(el, 'userId', '123');\n// Sets data-user-id="123"`
  );

  test.assertEquals(data(el, 'userId'), '123', 'data() gets data attribute',
    `const id: string | undefined = data(el, 'userId');\nconsole.log(id); // '123'`,
    `const id = data(el, 'userId');\nconsole.log(id); // '123'`
  );

  data(el, { role: 'admin', score: '100' });
  test.assertEquals(el.dataset.role, 'admin', 'data() sets multiple data attributes',
    `data(el, { role: 'admin', score: '100' });`,
    `data(el, { role: 'admin', score: '100' });`
  );

  attr(el, 'data-pref-xx', '33');
  attr(el, 'data-pref-ok', 'ok');
  const prefixed = dataByPrefix(el, 'pref');
  test.assertDeepEqual(prefixed, { xx: 33, ok: 'ok' }, 'dataByPrefix() collects prefixed data attrs',
    `const result: Record<string, string | number> = dataByPrefix(el, 'pref');\n// { xx: 33, ok: 'ok' }`,
    `const result = dataByPrefix(el, 'pref');\n// { xx: 33, ok: 'ok' }`
  );

  remove(el);
}

// ============================================================
// DOM: Closest
// ============================================================
test.section('DOM: Closest');

{
  const parent = make('div'); addClass(parent, 'parent');
  const child = make('div'); addClass(child, 'child');
  const grandchild = make('span');
  append(child, grandchild);
  append(parent, child);
  append(document.body, parent);

  test.assert(closest(grandchild, parent) === parent, 'closest() finds ancestor',
    `const found: HTMLElement | false = closest(grandchild, parent);\n// Returns parent element`,
    `const found = closest(grandchild, parent);\n// Returns parent element`
  );

  test.assert(closest(grandchild, child) === child, 'closest() finds direct parent',
    `// Works with any ancestor level`,
    `// Works with any ancestor level`
  );

  test.assert(!closest(grandchild, make('div')), 'closest() returns false if not found',
    `closest(grandchild, unrelatedElement); // false`,
    `closest(grandchild, unrelatedElement); // false`
  );

  test.assert(!closest(null, parent), 'closest() returns false for null child',
    `closest(null, parent); // false`,
    `closest(null, parent); // false`
  );

  remove(parent);
}

// ============================================================
// DOM: Val
// ============================================================
test.section('DOM: Val');

{
  const input = make('input') as HTMLInputElement;
  input.type = 'text';
  append(document.body, input);

  val(input, 'test value');
  test.assertEquals(input.value, 'test value', 'val() sets input value',
    `val(inputElement, 'test value');\n// Returns the element (chaining)`,
    `val(inputElement, 'test value');\n// Returns the element (chaining)`
  );

  test.assertEquals(val(input), 'test value', 'val() gets input value',
    `const value: string = val(inputElement);\nconsole.log(value); // 'test value'`,
    `const value = val(inputElement);\nconsole.log(value); // 'test value'`
  );

  const emptyInput = make('input') as HTMLInputElement;
  test.assertEquals(val(emptyInput), '', 'val() returns empty string for empty input',
    `val(emptyInput); // ''`,
    `val(emptyInput); // ''`
  );

  remove(input);
  remove(emptyInput);
}

// ============================================================
// DOM: Text Nodes (appendText, toTextNode, mergeAdjacentTextNodes)
// ============================================================
test.section('DOM: Text Nodes');

{
  const el = make('div');
  appendText(el, 'Hello');
  appendText(el, ' World');
  append(document.body, el);
  test.assertEquals(el.textContent, 'Hello World', 'appendText() adds text to element',
    `appendText(el, 'Hello');\nappendText(el, ' World');\n// Creates and appends text nodes`,
    `appendText(el, 'Hello');\nappendText(el, ' World');\n// Creates and appends text nodes`
  );

  const tn = toTextNode('Sample');
  test.assertEquals(tn.nodeType, Node.TEXT_NODE, 'toTextNode() creates text node',
    `const node: Node = toTextNode('Sample');\n// Returns Text node`,
    `const node = toTextNode('Sample');\n// Returns Text node`
  );

  const mergeEl = make('div');
  appendText(mergeEl, 'A'); appendText(mergeEl, 'B'); appendText(mergeEl, 'C');
  test.assertEquals(mergeEl.childNodes.length, 3, 'Multiple text nodes exist before merge');
  mergeAdjacentTextNodes(mergeEl);
  test.assert(mergeEl.childNodes.length < 3, 'mergeAdjacentTextNodes() combines adjacent text nodes',
    `mergeAdjacentTextNodes(el);\n// Merges consecutive text nodes into one`,
    `mergeAdjacentTextNodes(el);\n// Merges consecutive text nodes into one`
  );

  remove(el);
}

// ============================================================
// DOM: Replace With Children
// ============================================================
test.section('DOM: Replace With Children');

{
  const parent = make('div');
  const wrapper = make('div');
  const child1 = make('span'); child1.textContent = 'one';
  const child2 = make('span'); child2.textContent = 'two';
  append(wrapper, child1);
  append(wrapper, child2);
  append(parent, wrapper);
  append(document.body, parent);

  replaceWithChildren(wrapper);
  test.assert(!parent.contains(wrapper), 'replaceWithChildren() removes wrapper',
    `replaceWithChildren(wrapperElement);\n// Wrapper removed, children remain`,
    `replaceWithChildren(wrapperElement);\n// Wrapper removed, children remain`
  );
  test.assert(parent.contains(child1) && parent.contains(child2), 'replaceWithChildren() keeps children',
    `// Children are now direct children of parent`,
    `// Children are now direct children of parent`
  );

  remove(parent);
}

// ============================================================
// DOM: Show, Hide, Toggle
// ============================================================
test.section('DOM: Show, Hide, Toggle');

{
  const el = make('div');
  el.textContent = 'visible';
  append(document.body, el);

  hide(el);
  test.assertEquals(css(el, 'display'), 'none', 'hide() sets display:none',
    `hide(el);\n// Sets display to 'none', stores previous value`,
    `hide(el);\n// Sets display to 'none', stores previous value`
  );

  show(el);
  test.assert(css(el, 'display') !== 'none', 'show() restores display',
    `show(el);\n// Restores previous display value`,
    `show(el);\n// Restores previous display value`
  );

  toggle(el);
  test.assertEquals(css(el, 'display'), 'none', 'toggle() hides visible element',
    `toggle(el);\n// Element becomes hidden`,
    `toggle(el);\n// Element becomes hidden`
  );

  toggle(el);
  test.assert(css(el, 'display') !== 'none', 'toggle() shows hidden element',
    `toggle(el);\n// Element becomes visible again`,
    `toggle(el);\n// Element becomes visible again`
  );

  remove(el);
}

// ============================================================
// DOM: Empty
// ============================================================
test.section('DOM: Empty');

{
  const el = make('div');
  for (let i = 0; i < 3; i++) append(el, make('span'));
  test.assertEquals(el.children.length, 3, 'Element has 3 children before empty()');

  empty(el);
  test.assertEquals(el.children.length, 0, 'empty() removes all children',
    `empty(el);\n// Removes all child nodes, returns element`,
    `empty(el);\n// Removes all child nodes, returns element`
  );

  remove(el);
}

// ============================================================
// DOM: Offset & OuterSize
// ============================================================
test.section('DOM: Offset & OuterSize');

{
  const el = make('div');
  css(el, { width: '100px', height: '50px', margin: '10px', padding: '5px' });
  append(document.body, el);

  const elOffset = offset(el);
  test.assert(typeof elOffset.top === 'number' && typeof elOffset.left === 'number', 'offset() returns coordinates',
    `const pos: { top: number; left: number } = offset(el);\n// { top: ..., left: ... }`,
    `const pos = offset(el);\n// { top: ..., left: ... }`
  );

  const size = outerSize(el);
  test.assert(size.width >= 100 && size.height >= 50, 'outerSize() includes margin',
    `const dims: { width: number; height: number } = outerSize(el);\n// Width and height including margin`,
    `const dims = outerSize(el);\n// Width and height including margin`
  );

  remove(el);
}

// ============================================================
// DOM: Get Text & Length & ChildNodes
// ============================================================
test.section('DOM: Get Text, Length, ChildNodes');

{
  const el = make('div');
  el.textContent = 'Hello World';
  append(document.body, el);

  test.assertEquals(getText(el), 'Hello World', 'getText() returns text content',
    `getText(el); // 'Hello World'`,
    `getText(el); // 'Hello World'`
  );

  test.assertEquals(getLength(el), 11, 'getLength() returns text length',
    `getLength(el); // 11`,
    `getLength(el); // 11`
  );

  const parent = make('div');
  append(parent, make('span'));
  append(parent, make('span'));
  const nodes = getChildNodes(parent);
  test.assertEquals(nodes.length, 2, 'getChildNodes() returns child nodes array',
    `const nodes: Node[] = getChildNodes(parent);\nconsole.log(nodes.length); // 2`,
    `const nodes = getChildNodes(parent);\nconsole.log(nodes.length); // 2`
  );

  remove(el);
  remove(parent);
}

// ============================================================
// EVENTS: On, Off, Rebind
// ============================================================
test.section('EVENTS: On, Off, Rebind');

{
  const button = make('button');
  button.textContent = 'Test';
  append(document.body, button);

  let clicks = 0;
  on(button, 'click.test', () => { clicks++; });
  button.click();
  test.assertEquals(clicks, 1, 'on() registers event handler',
    `on<MouseEvent>(button, 'click.test', (e) => {\n  e.delegateTarget; // points to button\n  clicks++;\n});`,
    `on(button, 'click.test', (e) => {\n  e.delegateTarget; // points to button\n  clicks++;\n});`
  );

  button.click();
  test.assertEquals(clicks, 2, 'on() handler fires multiple times',
    `// Same handler called on each click`,
    `// Same handler called on each click`
  );

  off(button, 'click.test');
  button.click();
  test.assertEquals(clicks, 2, 'off() removes handler by event.id',
    `off(button, 'click.test');\n// Removes only the handler with id 'test'`,
    `off(button, 'click.test');\n// Removes only the handler with id 'test'`
  );

  on(button, 'mouseenter', () => { clicks++; });
  button.dispatchEvent(new MouseEvent('mouseenter'));
  test.assertEquals(clicks, 3, 'on() works without dot-id',
    `on(button, 'mouseenter', handler);\n// Auto-generates random id`,
    `on(button, 'mouseenter', handler);\n// Auto-generates random id`
  );

  off(button, 'mouseenter');
  button.dispatchEvent(new MouseEvent('mouseenter'));
  test.assertEquals(clicks, 3, 'off() without id removes all handlers for event type',
    `off(button, 'mouseenter');\n// Removes ALL mouseenter handlers`,
    `off(button, 'mouseenter');\n// Removes ALL mouseenter handlers`
  );

  let rebindCount = 0;
  on(button, 'click.rebind', () => { rebindCount = 1; });
  button.click();
  test.assertEquals(rebindCount, 1, 'on() before rebind');
  rebind(button, 'click.rebind', () => { rebindCount = 2; });
  button.click();
  test.assertEquals(rebindCount, 2, 'rebind() replaces old handler',
    `rebind(button, 'click.rebind', newHandler);\n// Off old, on new in one call`,
    `rebind(button, 'click.rebind', newHandler);\n// Off old, on new in one call`
  );

  off(button, 'click.rebind');
  remove(button);
}

// ============================================================
// HTML: Strip & Escape
// ============================================================
test.section('HTML: Strip & Escape');

{
  test.assertEquals(stripHtml('<p>Hello <b>World</b></p>'), 'Hello World', 'stripHtml() removes all HTML tags',
    `stripHtml('<p>Hello <b>World</b></p>');\n// 'Hello World'`,
    `stripHtml('<p>Hello <b>World</b></p>');\n// 'Hello World'`
  );

  test.assertEquals(escapeHtml('<div class="test">'), '&lt;div class=&quot;test&quot;&gt;', 'escapeHtml() escapes < > " \' &',
    `escapeHtml('<div class="test">');\n// &lt;div class=&quot;test&quot;&gt;`,
    `escapeHtml('<div class="test">');\n// &lt;div class=&quot;test&quot;&gt;`
  );

  test.assertEquals(decodeHtml('&lt;div&gt;Hello&lt;/div&gt;'), '<div>Hello</div>', 'decodeHtml() decodes entities',
    `decodeHtml('&lt;div&gt;Hello&lt;/div&gt;');\n// '<div>Hello</div>'`,
    `decodeHtml('&lt;div&gt;Hello&lt;/div&gt;');\n// '<div>Hello</div>'`
  );

  test.assertEquals(stripFragment('<!--StartFragment--><p>Content</p><!--EndFragment-->'), '<p>Content</p>', 'stripFragment() removes fragment comments',
    `stripFragment('<!--StartFragment--><p>Content</p><!--EndFragment-->');`,
    `stripFragment('<!--StartFragment--><p>Content</p><!--EndFragment-->');`
  );
}

// ============================================================
// HTML: Parse HTML
// ============================================================
test.section('HTML: Parse HTML');

{
  const nodes = parseHtml('<span>Test</span><div>Content</div>');
  test.assert(nodes.length >= 2, 'parseHtml() parses HTML string into nodes',
    `const nodes: Node[] = parseHtml('<span>Test</span><div>Content</div>');\nconsole.log(nodes.length);`,
    `const nodes = parseHtml('<span>Test</span><div>Content</div>');\nconsole.log(nodes.length);`
  );

  const fragNodes = parseHtml('<!--StartFragment--><p>Frag</p><!--EndFragment-->', true);
  test.assert(fragNodes.length > 0, 'parseHtml() strips fragment with isStripFragment=true',
    `parseHtml(htmlWithFragment, true);\n// Strips fragment markers before parsing`,
    `parseHtml(htmlWithFragment, true);\n// Strips fragment markers before parsing`
  );
}

// ============================================================
// PRIMITIVES: Check Methods
// ============================================================
test.section('PRIMITIVES: Check Methods');

{
  test.assert(isEmptyString('   '), 'isEmptyString(): true for whitespace',
    `isEmptyString('   '); // true`,
    `isEmptyString('   '); // true`
  );
  test.assert(isEmptyString(''), 'isEmptyString(): true for empty',
    `isEmptyString(''); // true`,
    `isEmptyString(''); // true`
  );
  test.assert(isEmptyString(null), 'isEmptyString(): true for null',
    `isEmptyString(null); // true`,
    `isEmptyString(null); // true`
  );
  test.assert(!isEmptyString('text'), 'isEmptyString(): false for non-empty',
    `isEmptyString('text'); // false`,
    `isEmptyString('text'); // false`
  );

  test.assert(isNullOrEmpty(''), 'isNullOrEmpty(): true for empty string',
    `isNullOrEmpty(''); // true`,
    `isNullOrEmpty(''); // true`
  );
  test.assert(isNullOrEmpty(null), 'isNullOrEmpty(): true for null',
    `isNullOrEmpty(null); // true`,
    `isNullOrEmpty(null); // true`
  );
  test.assert(!isNullOrEmpty('x'), 'isNullOrEmpty(): false for non-empty',
    `isNullOrEmpty('x'); // false`,
    `isNullOrEmpty('x'); // false`
  );

  test.assert(isWhitespace('   '), 'isWhitespace(): true for spaces',
    `isWhitespace('   '); // true (non-empty, only whitespace)`,
    `isWhitespace('   '); // true (non-empty, only whitespace)`
  );
  test.assert(!isWhitespace('  a  '), 'isWhitespace(): false with chars',
    `isWhitespace('  a  '); // false`,
    `isWhitespace('  a  '); // false`
  );
}

// ============================================================
// PRIMITIVES: Case Methods
// ============================================================
test.section('PRIMITIVES: Case Methods');

{
  test.assertEquals(upperFirst('hello'), 'Hello', 'upperFirst() capitalizes first letter',
    `upperFirst('hello'); // 'Hello'`,
    `upperFirst('hello'); // 'Hello'`
  );
  test.assertEquals(upperFirst(''), '', 'upperFirst() handles empty string',
    `upperFirst(''); // ''`,
    `upperFirst(''); // ''`
  );

  test.assertEquals(lowerFirst('Hello'), 'hello', 'lowerFirst() lowercases first letter',
    `lowerFirst('Hello'); // 'hello'`,
    `lowerFirst('Hello'); // 'hello'`
  );
  test.assertEquals(lowerFirst(''), '', 'lowerFirst() handles empty string',
    `lowerFirst(''); // ''`,
    `lowerFirst(''); // ''`
  );

  test.assertEquals(upper('hello'), 'HELLO', 'upper() converts to uppercase',
    `upper('hello'); // 'HELLO'`,
    `upper('hello'); // 'HELLO'`
  );

  test.assertEquals(lower('HELLO'), 'hello', 'lower() converts to lowercase',
    `lower('HELLO'); // 'hello'`,
    `lower('HELLO'); // 'hello'`
  );
}

// ============================================================
// PRIMITIVES: Replace & Truncate
// ============================================================
test.section('PRIMITIVES: Replace & Truncate');

{
  test.assertEquals(replaceAll('cat', 'dog', 'cat and cat'), 'dog and dog', 'replaceAll() replaces all occurrences',
    `replaceAll('cat', 'dog', 'cat and cat');\n// 'dog and dog'`,
    `replaceAll('cat', 'dog', 'cat and cat');\n// 'dog and dog'`
  );

  test.assertEquals(truncate('Hello World', 5), 'Hello...', 'truncate() truncates from end',
    `truncate('Hello World', 5);\n// 'Hello...'`,
    `truncate('Hello World', 5);\n// 'Hello...'`
  );
  test.assertEquals(truncate('Hello World', 5, '...', true), '...World', 'truncate() truncates from start',
    `truncate('Hello World', 5, '...', true);\n// '...World'`,
    `truncate('Hello World', 5, '...', true);\n// '...World'`
  );
  test.assertEquals(truncate('Short', 10), 'Short', 'truncate() does not truncate short strings',
    `truncate('Short', 10);\n// 'Short' (no change)`,
    `truncate('Short', 10);\n// 'Short' (no change)`
  );
}

// ============================================================
// PRIMITIVES: Case Conversion
// ============================================================
test.section('PRIMITIVES: Case Conversion');

{
  test.assertEquals(toCamelCase('hello-world'), 'helloWorld', 'toCamelCase(): kebab-case',
    `toCamelCase('hello-world'); // 'helloWorld'`,
    `toCamelCase('hello-world'); // 'helloWorld'`
  );
  test.assertEquals(toCamelCase('hello_world'), 'helloWorld', 'toCamelCase(): snake_case',
    `toCamelCase('hello_world'); // 'helloWorld'`,
    `toCamelCase('hello_world'); // 'helloWorld'`
  );

  test.assertEquals(toKebabCase('helloWorld'), 'hello-world', 'toKebabCase(): camelCase',
    `toKebabCase('helloWorld'); // 'hello-world'`,
    `toKebabCase('helloWorld'); // 'hello-world'`
  );
  test.assertEquals(toKebabCase('HelloWorld'), 'hello-world', 'toKebabCase(): PascalCase',
    `toKebabCase('HelloWorld'); // 'hello-world'`,
    `toKebabCase('HelloWorld'); // 'hello-world'`
  );

  test.assertEquals(toSnakeCase('helloWorld'), 'hello_world', 'toSnakeCase(): camelCase',
    `toSnakeCase('helloWorld'); // 'hello_world'`,
    `toSnakeCase('helloWorld'); // 'hello_world'`
  );
  test.assertEquals(toSnakeCase('hello-world'), 'hello_world', 'toSnakeCase(): kebab-case',
    `toSnakeCase('hello-world'); // 'hello_world'`,
    `toSnakeCase('hello-world'); // 'hello_world'`
  );
}

// ============================================================
// PRIMITIVES: Reverse & Format Bytes
// ============================================================
test.section('PRIMITIVES: Reverse & Format Bytes');

{
  test.assertEquals(reverse('hello'), 'olleh', 'reverse(): reverses string',
    `reverse('hello'); // 'olleh'`,
    `reverse('hello'); // 'olleh'`
  );
  test.assertEquals(reverse('a'), 'a', 'reverse(): single char',
    `reverse('a'); // 'a'`,
    `reverse('a'); // 'a'`
  );

  test.assertEquals(formatBytes(0, 2, 'en'), '0 B', 'formatBytes(): 0 bytes',
    `formatBytes(0); // '0 B'`,
    `formatBytes(0); // '0 B'`
  );
  test.assert(formatBytes(1024, 2, 'en').includes('KB'), 'formatBytes(): 1024 => KB',
    `formatBytes(1024);\n// '1 KB' (localized)`,
    `formatBytes(1024);\n// '1 KB' (localized)`
  );
  test.assert(formatBytes(1048576, 2, 'en').includes('MB'), 'formatBytes(): 1048576 => MB',
    `formatBytes(1048576);\n// '1 MB' (localized)`,
    `formatBytes(1048576);\n// '1 MB' (localized)`
  );
  test.assert(formatBytes(1073741824, 2, 'en').includes('GB'), 'formatBytes(): 1073741824 => GB',
    `formatBytes(1073741824);\n// '1 GB' (localized)`,
    `formatBytes(1073741824);\n// '1 GB' (localized)`
  );
}

// ============================================================
// PRIMITIVES: Random, Mask & Pluralize
// ============================================================
test.section('PRIMITIVES: Random, Mask & Pluralize');

{
  const r1 = randString(8);
  test.assertEquals(r1.length, 8, 'randString(): correct length (alphanumeric)',
    `const str: string = randString(8);\nconsole.log(str.length); // 8`,
    `const str = randString(8);\nconsole.log(str.length); // 8`
  );

  const rAlpha = randString(10, 'alpha');
  test.assertEquals(rAlpha.length, 10, 'randString(): alpha charset',
    `randString(10, 'alpha');\n// Only letters A-Z, a-z`,
    `randString(10, 'alpha');\n// Only letters A-Z, a-z`
  );

  const rNum = randString(6, 'numeric');
  test.assert(/^\d+$/.test(rNum), 'randString(): numeric charset',
    `randString(6, 'numeric');\n// Only digits 0-9`,
    `randString(6, 'numeric');\n// Only digits 0-9`
  );

  const rHex = randString(4, 'hex');
  test.assert(/^[0-9a-f]+$/.test(rHex), 'randString(): hex charset',
    `randString(4, 'hex');\n// Only hex chars 0-9 a-f`,
    `randString(4, 'hex');\n// Only hex chars 0-9 a-f`
  );

  test.assertEquals(mask('1234567890', 3, 2), '123*****90', 'mask(): default masking',
    `mask('1234567890', 3, 2);\n// '123*****90'`,
    `mask('1234567890', 3, 2);\n// '123*****90'`
  );
  test.assertEquals(mask('12345', 4, 4), '*****', 'mask(): fully masks short string',
    `mask('12345', 4, 4);\n// '*****'`,
    `mask('12345', 4, 4);\n// '*****'`
  );
  test.assertEquals(mask('12345', 4, 4, '#'), '#####', 'mask(): custom mask character',
    `mask('12345', 4, 4, '#');\n// '#####'`,
    `mask('12345', 4, 4, '#');\n// '#####'`
  );

  test.assertEquals(pluralize(1, ['год', 'года', 'лет']), '1 год', 'pluralize(): singular (1)',
    `pluralize(1, ['год', 'года', 'лет']); // '1 год'`,
    `pluralize(1, ['год', 'года', 'лет']); // '1 год'`
  );
  test.assertEquals(pluralize(3, ['год', 'года', 'лет']), '3 года', 'pluralize(): few (3)',
    `pluralize(3, ['год', 'года', 'лет']); // '3 года'`,
    `pluralize(3, ['год', 'года', 'лет']); // '3 года'`
  );
  test.assertEquals(pluralize(5, ['год', 'года', 'лет']), '5 лет', 'pluralize(): many (5)',
    `pluralize(5, ['год', 'года', 'лет']); // '5 лет'`,
    `pluralize(5, ['год', 'года', 'лет']); // '5 лет'`
  );
  test.assertEquals(pluralize(11, ['год', 'года', 'лет']), '11 лет', 'pluralize(): exception (11)',
    `pluralize(11, ['год', 'года', 'лет']); // '11 лет'`,
    `pluralize(11, ['год', 'года', 'лет']); // '11 лет'`
  );
  test.assertEquals(pluralize(21, ['год', 'года', 'лет']), '21 год', 'pluralize(): compound (21)',
    `pluralize(21, ['год', 'года', 'лет']); // '21 год'`,
    `pluralize(21, ['год', 'года', 'лет']); // '21 год'`
  );
  test.assertEquals(pluralize(2, ['яблоко', 'яблока', 'яблок'], false), 'яблока', 'pluralize(): hide number',
    `pluralize(2, ['яблоко', 'яблока', 'яблок'], false); // 'яблока'`,
    `pluralize(2, ['яблоко', 'яблока', 'яблок'], false); // 'яблока'`
  );
}

console.log('All tests completed!');