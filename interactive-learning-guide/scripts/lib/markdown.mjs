import { escapeHtml } from "./html.mjs";

export function renderMarkdown(markdown) {
  const blocks = String(markdown ?? "").trim().split(/\n{2,}/).filter(Boolean);
  if (blocks.length === 0) return "";
  return blocks.map(renderBlock).join("");
}

function renderBlock(block) {
  const lines = block.split("\n");
  if (lines.every(line => /^[-*]\s+/.test(line))) {
    const items = lines
      .map(line => `<li>${renderInline(line.replace(/^[-*]\s+/, ""))}</li>`)
      .join("");
    return `<ul>${items}</ul>`;
  }
  if (lines.every(line => /^\d+\.\s+/.test(line))) {
    const items = lines
      .map(line => `<li>${renderInline(line.replace(/^\d+\.\s+/, ""))}</li>`)
      .join("");
    return `<ol>${items}</ol>`;
  }
  return `<p>${renderInline(lines.join(" "))}</p>`;
}

function renderInline(value) {
  const tokens = [];
  let text = escapeHtml(value).replace(/`([^`]+)`/g, (_, code) => {
    const id = tokens.push(`<code>${code}</code>`) - 1;
    return token(id);
  });

  text = text
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");

  return restoreTokens(text, tokens);
}

function token(index) {
  return `\u0000${index}\u0000`;
}

function restoreTokens(text, tokens) {
  return text.replace(/\u0000(\d+)\u0000/g, (_, index) => tokens[Number(index)] ?? "");
}
