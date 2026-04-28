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
          language: "en"
        },
        children: [
          {
            component: "ilg/Chapter",
            props: {
              id: "foundation",
              title: "Foundation",
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

test("render produces a chaptered interactive HTML guide", async () => {
  const html = await render(sampleGuide(), { catalog });

  assert.match(html, /<html lang="en">/);
  assert.match(html, /class="chapter active" id="foundation"/);
  assert.match(html, /class="concept"/);
  assert.match(html, /class="quiz"/);
  assert.match(html, /function explain\(\)/);
  assert.match(html, /function go\(idx\)/);
  assert.match(html, /function checkQuiz\(btn, result, id\)/);
});
