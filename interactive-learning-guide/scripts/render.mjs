import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { validate } from "./lib/schema.mjs";
import { escapeAttr, escapeHtml, stripUnsafeSvg } from "./lib/html.mjs";
import { renderMarkdown } from "./lib/markdown.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SKILL_ROOT = resolve(__dirname, "..");
const CATALOG_PATH = resolve(SKILL_ROOT, "spec", "catalog.json");
const CSS_PATH = resolve(SKILL_ROOT, "assets", "base.css");
const JS_PATH = resolve(SKILL_ROOT, "assets", "interactive.js");

const REGISTRY = {
  "ilg/Chapter": Chapter,
  "ilg/ConceptCard": ConceptCard,
  "ilg/Prose": Prose,
  "ilg/Analogy": Analogy,
  "ilg/Supplement": Supplement,
  "ilg/Highlight": Highlight,
  "ilg/CodeBlock": CodeBlock,
  "ilg/AnnotatedCode": AnnotatedCode,
  "ilg/DataTable": DataTable,
  "ilg/Diagram": Diagram,
  "ilg/FlowChart": FlowChart,
  "ilg/Quiz": Quiz
};

export async function render(doc, options = {}) {
  const catalog = options.catalog || loadCatalog();
  const errors = validate(doc, catalog);
  if (errors.length > 0) {
    const error = new Error("Schema validation failed");
    error.code = "SCHEMA";
    error.errors = errors;
    throw error;
  }

  const root = doc.parts[0];
  return renderGuide(root);
}

function renderGuide(root) {
  const props = root.props || {};
  const chapters = root.children || [];
  const language = props.language || "en";
  const title = escapeHtml(props.title);
  const subtitle = props.subtitle ? `<p class="sub">${escapeHtml(props.subtitle)}</p>` : "";
  const guideFrame = renderGuideFrame(props, language);
  const initialProgress = chapters.length > 0 ? 100 / chapters.length : 0;
  const nav = chapters.map((chapter, index) => {
    const active = index === 0 ? " active" : "";
    const chapterTitle = normalizeChapterTitle(chapter.props?.title || `Chapter ${index + 1}`);
    const sections = chapterSections(chapter, chapter.props?.id).map(section => {
      return `<a class="side-sublink" href="#${escapeAttr(section.id)}">${escapeHtml(section.title)}</a>`;
    }).join("");
    return `<div class="side-chapter${active}"><button class="side-link${active}" type="button" onclick="go(${index})"><span>${index + 1}</span>${escapeHtml(chapterTitle)}</button><div class="side-subnav">${sections}</div></div>`;
  }).join("");
  const body = chapters.map((chapter, index) => {
    const chapterId = chapter.props?.id || `chapter-${index + 1}`;
    return renderTree(chapter, { language, chapterId, chapterIndex: index, totalChapters: chapters.length });
  }).join("");

  return buildDocument({
    language,
    title: props.title,
    body: `<div class="wiki-shell"><aside class="wiki-sidebar"><div class="sidebar-title">${title}</div><nav class="sidebar-nav" aria-label="Chapters">${nav}</nav></aside><main class="wiki-main"><div class="accent-progress"><div class="accent-progress-fill" id="progress" style="width:${initialProgress}%"></div></div><header class="wiki-header"><h1>${title}</h1>${subtitle}${guideFrame}</header>${body}</main></div>`
  });
}

function renderGuideFrame(props, language) {
  const blocks = [];
  if (props.audience) {
    blocks.push(renderFrameBlock(label(language, "Audience", "대상"), `<p>${escapeHtml(props.audience)}</p>`));
  }
  if (Array.isArray(props.objectives) && props.objectives.length > 0) {
    blocks.push(renderFrameBlock(label(language, "Objectives", "목표"), renderList(props.objectives)));
  }
  if (Array.isArray(props.prerequisites) && props.prerequisites.length > 0) {
    blocks.push(renderFrameBlock(label(language, "Prerequisites", "선수 지식"), renderList(props.prerequisites)));
  }
  if (blocks.length === 0) return "";
  return `<section class="guide-frame" aria-label="${escapeAttr(label(language, "Guide frame", "학습 범위"))}">${blocks.join("")}</section>`;
}

function renderFrameBlock(title, body) {
  return `<div class="frame-block"><span class="frame-label">${escapeHtml(title)}</span>${body}</div>`;
}

function renderList(items) {
  const listItems = items.map(item => `<li>${escapeHtml(item)}</li>`).join("");
  return `<ul>${listItems}</ul>`;
}

function label(language, en, ko) {
  return language === "ko" ? ko : en;
}

function renderTree(node, ctx = {}) {
  const renderer = REGISTRY[node.component];
  if (!renderer) {
    throw new Error(`No renderer for component: ${node.component}`);
  }
  const children = Array.isArray(node.children) ? node.children : [];
  const renderChildren = () => children.map((child, index) => {
    return renderTree(child, { ...ctx, childIndex: index });
  }).join("");
  return renderer(node.props || {}, renderChildren, ctx);
}

function Chapter(props, renderChildren, ctx) {
  const active = ctx.chapterIndex === 0 ? " active" : "";
  const lead = props.lead ? `<p>${escapeHtml(props.lead)}</p>` : "";
  return `<section class="chapter${active}" id="${escapeAttr(props.id)}"><div class="chapter-heading"><h2>${escapeHtml(normalizeChapterTitle(props.title))}</h2>${lead}</div>${renderChildren()}${chapterNav(ctx)}</section>`;
}

function chapterNav(ctx) {
  const previous = ctx.chapterIndex > 0
    ? `<button class="chapter-nav-btn" type="button" onclick="go(${ctx.chapterIndex - 1})">Previous</button>`
    : `<button class="chapter-nav-btn" type="button" disabled>Previous</button>`;
  const next = ctx.chapterIndex < ctx.totalChapters - 1
    ? `<button class="chapter-nav-btn" type="button" onclick="go(${ctx.chapterIndex + 1})">Next</button>`
    : `<button class="chapter-nav-btn" type="button" disabled>Next</button>`;
  return `<nav class="chapter-nav" aria-label="Chapter navigation">${previous}${next}</nav>`;
}

function ConceptCard(props, renderChildren, ctx) {
  const brief = props.brief ? `<p class="section-brief">${escapeHtml(props.brief)}</p>` : "";
  const sectionId = sectionAnchor(ctx.chapterId, props.number);
  return `<section class="wiki-section" id="${escapeAttr(sectionId)}"><div class="section-number">${escapeHtml(props.number)}</div><div class="section-copy"><h3>${escapeHtml(props.title)}</h3>${brief}<div class="wiki-section-body">${renderChildren()}</div></div></section>`;
}

function chapterSections(chapter, chapterId) {
  const id = chapterId || "chapter";
  const children = Array.isArray(chapter.children) ? chapter.children : [];
  return children
    .filter(child => child?.component === "ilg/ConceptCard")
    .map(child => ({
      id: sectionAnchor(id, child.props?.number),
      title: child.props?.title || `Section ${child.props?.number || ""}`.trim()
    }));
}

function sectionAnchor(chapterId, number) {
  return `${chapterId}-section-${number || 1}`;
}

function normalizeChapterTitle(value) {
  const raw = String(value ?? "").trim();
  const cleaned = raw
    .replace(/^\s*chapter\s+\d+\s*(?:of\s+\d+)?\s*[:.\-–—]?\s*/i, "")
    .trim();
  return cleaned || raw;
}

function Prose(props) {
  return `<div class="prose">${renderMarkdown(props.markdown)}</div>`;
}

function Analogy(props) {
  const title = props.title || "Analogy";
  return `<div class="analogy"><span class="box-label">${escapeHtml(title)}</span>${renderMarkdown(props.body)}</div>`;
}

function Supplement(props, _renderChildren, ctx) {
  const label = ctx.language === "ko" ? "보충" : "Supplement";
  return `<div class="supplement"><span class="box-label">${escapeHtml(label)}</span>${renderMarkdown(props.body)}</div>`;
}

function Highlight(props) {
  const tone = props.tone || "primary";
  const title = props.title || "Key insight";
  return `<div class="highlight highlight-${escapeAttr(tone)}"><span class="box-label">${escapeHtml(title)}</span>${renderMarkdown(props.body)}</div>`;
}

function CodeBlock(props) {
  const highlighted = new Set(props.highlight || []);
  const filename = props.filename ? `<span>${escapeHtml(props.filename)}</span>` : "<span></span>";
  const lines = String(props.code ?? "").split("\n").map((line, index) => {
    const lineNo = index + 1;
    const cls = highlighted.has(lineNo) ? "code-line code-line-hl" : "code-line";
    return `<span class="${cls}"><span class="code-line-no">${lineNo}</span><span class="code-line-content">${escapeHtml(line) || "&nbsp;"}</span></span>`;
  }).join("");
  return `<div class="codeblock"><div class="code-meta">${filename}<span>${escapeHtml(props.lang)}</span></div><pre><code>${lines}</code></pre></div>`;
}

function AnnotatedCode(props) {
  const code = CodeBlock(props);
  const annotations = props.annotations.map(annotation => {
    return `<div class="annotation"><div class="annotation-line">Line ${escapeHtml(annotation.line)}</div><div class="annotation-title">${escapeHtml(annotation.title)}</div><div class="annotation-body">${escapeHtml(annotation.body)}</div></div>`;
  }).join("");
  return `<div class="annotated">${code}<aside class="annotations">${annotations}</aside></div>`;
}

function DataTable(props) {
  const caption = props.caption ? `<caption>${escapeHtml(props.caption)}</caption>` : "";
  const head = props.columns.map(column => {
    return `<th style="text-align:${align(column.align)}">${escapeHtml(column.label)}</th>`;
  }).join("");
  const rows = props.rows.map(row => {
    const cells = props.columns.map(column => {
      return `<td style="text-align:${align(column.align)}">${escapeHtml(row[column.key] ?? "")}</td>`;
    }).join("");
    return `<tr>${cells}</tr>`;
  }).join("");
  return `<div class="tbl-wrap"><table class="tbl">${caption}<thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div>`;
}

function Diagram(props) {
  const caption = props.caption ? `<div class="dia-caption">${escapeHtml(props.caption)}</div>` : "";
  return `<div class="dia">${stripUnsafeSvg(props.svg)}${caption}</div>`;
}

function FlowChart(props) {
  const nodeWidth = 132;
  const width = Math.max(560, props.nodes.length * 210);
  const height = 220;
  const positions = new Map();
  const gap = width / (props.nodes.length + 1);
  props.nodes.forEach((node, index) => {
    const labelLines = wrapText(node.label, 18, 3);
    const tagLines = node.tag ? wrapText(node.tag, 22, 2) : [];
    const nodeHeight = Math.max(62, 24 + (labelLines.length * 14) + (tagLines.length * 12));
    positions.set(node.id, { x: gap * (index + 1), y: 104, node, labelLines, tagLines, nodeHeight });
  });
  const edges = props.edges.map(edge => {
    const from = positions.get(edge.from);
    const to = positions.get(edge.to);
    if (!from || !to) return "";
    const midX = (from.x + to.x) / 2;
    const label = edge.label
      ? renderSvgText(wrapText(edge.label, 20, 2), {
        x: midX,
        y: 52,
        className: "flow-edge-label",
        fill: "#787878",
        fontSize: 11,
        lineHeight: 13
      })
      : "";
    return `<path d="M ${from.x + (nodeWidth / 2)} ${from.y} L ${to.x - (nodeWidth / 2)} ${to.y}" stroke="#787878" stroke-width="1.5" marker-end="url(#arrow)" fill="none"/>${label}`;
  }).join("");
  const nodes = props.nodes.map(node => {
    const pos = positions.get(node.id);
    const label = renderSvgText(pos.labelLines, {
      x: pos.x,
      y: pos.y - ((pos.labelLines.length - 1) * 7),
      className: "flow-label",
      fill: "#e8e8e8",
      fontSize: 12,
      fontWeight: 700,
      lineHeight: 14
    });
    const tag = pos.tagLines.length > 0
      ? renderSvgText(pos.tagLines, {
        x: pos.x,
        y: pos.y + 25,
        className: "flow-tag",
        fill: "#787878",
        fontSize: 10,
        lineHeight: 12
      })
      : "";
    return `<g><rect x="${pos.x - (nodeWidth / 2)}" y="${pos.y - (pos.nodeHeight / 2)}" width="${nodeWidth}" height="${pos.nodeHeight}" rx="0" fill="#141414" stroke="#333333"/>${label}${tag}</g>`;
  }).join("");
  return `<div class="dia"><svg class="flow-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Flow chart"><defs><marker id="arrow" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#787878"/></marker></defs>${edges}${nodes}</svg></div>`;
}

function renderSvgText(lines, options) {
  const attrs = [
    `class="${escapeAttr(options.className)}"`,
    `x="${options.x}"`,
    `y="${options.y}"`,
    "text-anchor=\"middle\"",
    `fill="${escapeAttr(options.fill)}"`,
    `font-size="${options.fontSize}"`
  ];
  if (options.fontWeight) attrs.push(`font-weight="${options.fontWeight}"`);
  const tspans = lines.map((line, index) => {
    const dy = index === 0 ? 0 : options.lineHeight;
    return `<tspan x="${options.x}" dy="${dy}">${escapeHtml(line)}</tspan>`;
  }).join("");
  return `<text ${attrs.join(" ")}>${tspans}</text>`;
}

function wrapText(value, maxChars, maxLines) {
  const words = String(value ?? "").trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [""];

  const lines = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length <= maxChars) {
      current = next;
      continue;
    }
    if (current) lines.push(current);
    current = word.length > maxChars ? `${word.slice(0, maxChars - 3)}...` : word;
  }
  if (current) lines.push(current);

  if (lines.length <= maxLines) return lines;
  const limited = lines.slice(0, maxLines);
  const last = limited[limited.length - 1];
  limited[limited.length - 1] = last.length > maxChars - 3
    ? `${last.slice(0, maxChars - 3)}...`
    : `${last}...`;
  return limited;
}

function Quiz(props, _renderChildren, ctx) {
  const correctCount = props.options.filter(option => option.correct).length;
  if (correctCount !== 1) {
    throw new Error(`Quiz ${props.id} must have exactly one correct option`);
  }
  const label = ctx.language === "ko" ? "이해 확인" : "Check Your Understanding";
  const options = props.options.map((option, index) => {
    const result = option.correct ? "correct" : "wrong";
    const prefix = String.fromCharCode(65 + index);
    return `<button class="quiz-opt" type="button" data-result="${result}" onclick="checkQuiz(this,'${result}','${escapeAttr(props.id)}')">${prefix}. ${escapeHtml(option.label)}</button>`;
  }).join("");
  return `<div class="quiz"><h4>${escapeHtml(label)}</h4><p>${escapeHtml(props.question)}</p>${options}<div class="quiz-explain" id="${escapeAttr(props.id)}">${escapeHtml(props.explanation)}</div></div>`;
}

function align(value) {
  return ["left", "center", "right"].includes(value) ? value : "left";
}

function buildDocument({ language, title, body }) {
  const css = readFileSync(CSS_PATH, "utf8");
  const js = readFileSync(JS_PATH, "utf8");
  return `<!DOCTYPE html>
<html lang="${escapeAttr(language)}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(title)}</title>
<style>
${css}
</style>
</head>
<body>
${body}
<script>
${js}
</script>
</body>
</html>
`;
}

function loadCatalog() {
  return JSON.parse(readFileSync(CATALOG_PATH, "utf8"));
}

function parseArgs(argv) {
  const args = { in: null, out: null, validateOnly: false };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--in") args.in = argv[++i];
    else if (arg === "--out") args.out = argv[++i];
    else if (arg === "--validate-only") args.validateOnly = true;
    else if (arg === "--help") {
      printHelp();
      process.exit(0);
    }
  }
  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/render.mjs --out <path> [--in <path>|<stdin>]

Options:
  --in <path>       JSON envelope input file. Omit to read stdin.
  --out <path>      Output HTML file. Required unless --validate-only is set.
  --validate-only   Validate the envelope without rendering.
  --help            Print this help.
`);
}

async function readStdin() {
  return new Promise((resolveRead, rejectRead) => {
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", chunk => {
      data += chunk;
    });
    process.stdin.on("end", () => resolveRead(data));
    process.stdin.on("error", rejectRead);
  });
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const input = args.in ? readFileSync(args.in, "utf8") : await readStdin();
  const doc = JSON.parse(input);
  const catalog = loadCatalog();
  const errors = validate(doc, catalog);

  if (errors.length > 0) {
    console.error("Schema validation failed:");
    for (const error of errors) {
      console.error(`  ${error.path}: ${error.message}`);
    }
    process.exit(2);
  }

  if (args.validateOnly) {
    console.log("OK");
    return;
  }
  if (!args.out) {
    console.error("Missing --out <path>");
    process.exit(3);
  }

  const html = await render(doc, { catalog });
  const outAbs = resolve(args.out);
  mkdirSync(dirname(outAbs), { recursive: true });
  writeFileSync(outAbs, html, "utf8");

  const envelopePath = outAbs.replace(/\.html?$/i, "") + ".json";
  if (!existsSync(envelopePath)) {
    writeFileSync(envelopePath, JSON.stringify(doc, null, 2) + "\n", "utf8");
  }
  console.log(outAbs);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error(error.stack || error.message);
    process.exit(4);
  });
}
