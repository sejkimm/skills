import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { render } from "../scripts/render.mjs";
import { validate } from "../scripts/lib/schema.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const catalog = JSON.parse(
  readFileSync(resolve(__dirname, "../spec/catalog.json"), "utf8")
);

function sampleGuide() {
  return {
    a2ui_version: "0.9",
    catalog: "interactive-learning-guide/v1",
    is_task_complete: true,
    parts: [
      {
        component: "ilg/LearningGuide",
        props: {
          title: "Renderer Guide",
          subtitle: "A semantic guide envelope",
          language: "en",
          audience: "Engineers learning the renderer contract",
          objectives: ["Understand semantic envelopes", "Render self-contained HTML"],
          prerequisites: ["Basic JSON", "Basic HTML"]
        },
        children: [
          {
            component: "ilg/Chapter",
            props: {
              id: "foundation",
              title: "Chapter 1: Foundation",
              lead: "Start with the problem before the mechanism."
            },
            children: [
              {
                component: "ilg/ConceptCard",
                props: {
                  number: 1,
                  title: "Semantic output",
                  brief: "JSON first"
                },
                children: [
                  {
                    component: "ilg/Prose",
                    props: {
                      markdown: "The model writes **meaning**, not HTML."
                    }
                  },
                  {
                    component: "ilg/CodeBlock",
                    props: {
                      lang: "js",
                      filename: "example.js",
                      code: "function explain() {\n  return \"clear\";\n}"
                    }
                  }
                ]
              },
              {
                component: "ilg/Quiz",
                props: {
                  id: "q1",
                  question: "What does the renderer own?",
                  options: [
                    { label: "Presentation details", correct: true },
                    { label: "The source code analysis", correct: false }
                  ],
                  explanation: "The renderer owns HTML, CSS, and interaction details."
                }
              }
            ]
          },
          {
            component: "ilg/Chapter",
            props: {
              id: "renderer-contract",
              title: "Renderer Contract",
              lead: "Separate semantic content from presentation."
            },
            children: [
              {
                component: "ilg/ConceptCard",
                props: {
                  number: 2,
                  title: "Presentation ownership",
                  brief: "Renderer first"
                },
                children: [
                  {
                    component: "ilg/Prose",
                    props: {
                      markdown: "The JSON envelope should not contain layout instructions."
                    }
                  }
                ]
              },
              {
                component: "ilg/Quiz",
                props: {
                  id: "q2",
                  question: "Where should layout logic live?",
                  options: [
                    { label: "The renderer", correct: true },
                    { label: "The envelope props", correct: false }
                  ],
                  explanation: "The renderer owns presentation behavior."
                }
              }
            ]
          }
        ]
      }
    ]
  };
}

test("validate accepts a semantic learning guide envelope", () => {
  assert.deepEqual(validate(sampleGuide(), catalog), []);
});

test("validate rejects presentation props", () => {
  const doc = sampleGuide();
  doc.parts[0].props.className = "custom";

  const errors = validate(doc, catalog);

  assert.ok(errors.some(error => error.path === "parts[0].props.className"));
});

test("validate accepts free-form data table rows", () => {
  const doc = sampleGuide();
  doc.parts[0].children[0].children[0].children.push({
    component: "ilg/DataTable",
    props: {
      columns: [
        { key: "component", label: "Component" },
        { key: "role", label: "Role" }
      ],
      rows: [
        { component: "Renderer", role: "Owns HTML" },
        { component: "Envelope", role: "Owns meaning" }
      ]
    }
  });

  assert.deepEqual(validate(doc, catalog), []);
});

test("render produces a wiki sidebar HTML guide", async () => {
  const html = await render(sampleGuide(), { catalog });

  assert.match(html, /<html lang="en">/);
  assert.match(html, /Engineers learning the renderer contract/);
  assert.match(html, /Understand semantic envelopes/);
  assert.match(html, /Basic JSON/);
  assert.match(html, /class="wiki-shell"/);
  assert.match(html, /class="wiki-sidebar"/);
  assert.match(html, /class="accent-progress"/);
  assert.match(html, /class="side-link active"/);
  assert.match(html, /class="side-chapter active"/);
  assert.match(html, /class="side-subnav"/);
  assert.match(html, /href="#foundation-section-1"/);
  assert.match(html, /Semantic output/);
  assert.match(html, /class="chapter active" id="foundation"/);
  assert.match(html, /id="renderer-contract"/);
  assert.match(html, /class="wiki-section" id="foundation-section-1"/);
  assert.match(html, /class="chapter-nav"/);
  assert.match(html, />Previous</);
  assert.match(html, />Next</);
  assert.match(html, /class="chapter-nav-btn" type="button" disabled/);
  const radii = [...html.matchAll(/border-radius:\s*([^;]+);/g)].map(match => match[1].trim());
  assert.ok(radii.length > 0);
  assert.ok(radii.every(radius => radius === "0"));
  assert.doesNotMatch(html, /rx="(?!0")/);
  assert.doesNotMatch(html, />Chapter 1: Foundation</);
  assert.doesNotMatch(html, /Chapter 1 of 2/);
  assert.doesNotMatch(html, /next-ch/);
  assert.doesNotMatch(html, /class="ch-btn/);
  assert.doesNotMatch(html, /class="concept/);
  assert.match(html, /class="quiz"/);
  assert.match(html, /function explain\(\)/);
  assert.match(html, /function go\(idx\)/);
  assert.doesNotMatch(html, /function toggleConcept/);
  assert.match(html, /function checkQuiz\(btn, result, id\)/);
});

test("render wraps long flow chart labels inside renderer-owned SVG text", async () => {
  const doc = sampleGuide();
  doc.parts[0].children[0].children[0].children.push({
    component: "ilg/FlowChart",
    props: {
      nodes: [
        {
          id: "semantic",
          label: "Renderer owned semantic diagram constraints",
          tag: "safe label wrapping"
        },
        {
          id: "html",
          label: "Bounded HTML output",
          tag: "article width"
        }
      ],
      edges: [
        {
          from: "semantic",
          to: "html",
          label: "structured data only"
        }
      ]
    }
  });

  const html = await render(doc, { catalog });

  assert.match(html, /class="flow-label"/);
  assert.match(html, /<tspan x="/);
  assert.match(html, /Renderer owned/);
  assert.doesNotMatch(html, />Renderer owned semantic diagram constraints<\/text>/);
});
