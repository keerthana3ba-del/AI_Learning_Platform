---
description: Generate a detailed study note from your raw learning + links and file it in the right AI-Learning folder
argument-hint: <topic> (then paste your notes & links)
---

The user is documenting something they learned. Topic: **$ARGUMENTS**

Their raw learning content (notes, links, anything) follows in this same message
below the command. If there is no content after the topic, ask them to paste
their notes and links before doing anything else.

Use the **note-builder** subagent to do the work. Hand it:
- the topic (`$ARGUMENTS`),
- the full raw content the user pasted,
- any folder hint they gave.

The note-builder will research the links, verify and enrich the content, write a
polished natural-style markdown note, and save it to the correct
`src/AI-Learning/<folder>/DayN_<Topic>.md` path (it figures out the folder from
`src/data/roadmapData.js`).

When it finishes, relay to the user:
- the file path it created,
- what it enriched or corrected beyond what they wrote,
- the sources it used,
- any image files they still need to drop into the folder.

Then tell them they can view it on the site at `/note/<path-without-extension>`
and offer to commit the new note. Do not commit unless they confirm.
