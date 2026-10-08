# English Humanizer Rules

Patterns from Wikipedia's "Signs of AI writing" (WikiProject AI Cleanup). LLMs pick the most statistically likely wording for the widest range of cases, so specific facts blur into generic, inflated claims. Patterns marked (strong) justify an edit on one sighting.

## Voice

Blog posts, essays, opinions, and personal writing keep the writer's opinions, uncertainty, mixed feelings, humor, asides, and uneven rhythm. Reference, technical, legal, and factual text stays neutral and plain. Keep details that carry the writer's voice: an unusual specific, an unresolved tension, a genuine aside. Vary sentence length.

## Content

1. **Inflated significance.** Watch: stands/serves as, a testament to, pivotal/crucial/key role or moment, underscores its importance, reflects broader, setting the stage for, evolving landscape, indelible mark; "Despite these challenges... continues to thrive", Future Outlook sections; "the future looks bright", "exciting times ahead". Keep the fact, drop the significance, end on the last concrete fact.
   - "established in 1989, marking a pivotal moment in the evolution of regional statistics" → "established in 1989"
2. **Borrowed authority.** Watch: experts argue, observers have cited, industry reports, several sources (when few are cited), lists of outlets, "active social media presence". Name the real source if the text gives one; otherwise cut the claim.
   - "Experts believe it plays a crucial role in the ecosystem." → cut, or attribute to the named source
3. **Shallow -ing riders.** Watch: highlighting, underscoring, reflecting, symbolizing, contributing to, fostering, showcasing. Keep the fact; keep the rider only if the source supports it.
   - "blue, green, and gold, symbolizing bluebonnets and reflecting the community's deep connection to the land" → "blue, green, and gold, meant to evoke bluebonnets"
4. **Sales language.** Watch: boasts, vibrant, rich (figurative), nestled, in the heart of, groundbreaking, renowned, breathtaking, must-visit, stunning. State what the thing is.
   - "Nestled within the breathtaking region of Gonder, it stands as a vibrant town" → "It is a town in the Gonder region"

## Language

5. **AI vocabulary.** Watch: additionally, align with, crucial, delve, enduring, enhance, fostering, garner, highlight (verb), interplay, intricate, key (adjective), landscape (abstract), pivotal, showcase, tapestry (abstract), testament, underscore (verb), valuable, vibrant. The list drifts with model releases; treat a word as a flag, not an error, and act when several co-occur.
6. **Copula avoidance.** Watch: serves as, stands as, functions as, boasts, features, offers. Use is, are, has.
   - "serves as the exhibition space and boasts 3,000 square feet" → "is the exhibition space and has 3,000 square feet"
7. **Negative parallelism (strong).** Watch: not X but Y; not just/only/merely X, but Y; it's not X, it's Y; X rather than Y; the contrast split across sentences ("This does not mean X. It means Y."); a clipped tail ("..., no guessing"). State the point directly. Keep a contrast only when it corrects a belief the reader actually holds.
   - "It's not just about the beat; it's part of the aggression." → "The heavy beat adds to the aggressive tone."
8. **Forced triads.** Ideas grouped in threes to sound complete. Use the number of items the meaning needs.
   - "keynote sessions, panel discussions, and networking opportunities" → "talks and panels, with time to network between sessions"
9. **Synonym cycling.** The same subject renamed each sentence (protagonist, main character, hero). Use one name.
10. **False ranges.** "From X to Y" where X and Y are not on a scale. List the items.
    - "from the Big Bang to the enigmatic dance of dark matter" → "the Big Bang and dark matter"
11. **One-line closers and fragments (strong).** Watch: a one-sentence paragraph restating the last one; "That is the real win."; "Let that sink in."; rows of fragments ("No prior. No nostalgia."). Cut a closer that repeats; merge fragments into one specific sentence.
12. **Staged run-ups (strong).** Watch: Let's dive in, here's what you need to know, Here's the thing, Honestly?, Let's be honest. Start with the point.
    - "Is it worth it? Honestly? It depends on use." → "Whether it is worth it depends on how often you use it."

## Style

13. **Em dashes.** Replace with a comma, period, colon, or parentheses.
    - "promoted by institutions—not by the people—even in official documents" → "promoted by institutions, not by the people, even in official documents"
14. **Emojis** on headings or bullets. Remove.

## Chat residue

15. **Chatbot artifacts and sycophancy (strong).** Watch: I hope this helps, Certainly!, Of course!, Great question!, You're absolutely right, Would you like..., let me know, here is a... Remove the wrapper, keep the content.
16. **Knowledge-cutoff disclaimers.** Watch: as of my last update, while specific details are limited, based on available information. State what the source does not show, or cut. Do not fill the gap with a guess.

## Filler

17. **Filler phrases.** "in order to" → "to"; "due to the fact that" → "because"; "has the ability to" → "can"; "it is important to note that" → cut.
18. **Stacked hedges.** "could potentially possibly be argued that it might" → "may". Keep hedges the source needs.

## Output

Return the rewritten text, then a brief summary of changes if helpful.
