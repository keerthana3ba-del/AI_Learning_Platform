# Day 4 Notes: Generative AI for Everyone – Building Software Applications with LLMs

Source: [DeepLearning.AI – Generative AI for Everyone (Andrew Ng), Generative AI Projects](https://learn.deeplearning.ai/courses/generative-ai-for-everyone/) · [Course page](https://www.deeplearning.ai/courses/generative-ai-for-everyone/) · [Coursera](https://www.coursera.org/learn/generative-ai-for-everyone)

> This is about **building real software
> with it** — how prompting collapses months of ML work into days, the lifecycle of
> a GenAI project, what it costs, and the four big "make the model smarter about *my*
> problem" levers: **RAG, fine-tuning, pre-training, and choosing the right model.**
> We finish with how LLMs learn to *follow instructions* (instruction tuning + RLHF)
> and the frontier of **tool use and agents.**

---

# 1. Using Generative AI in Software Applications

The headline shift: **prompt-based development replaces a lot of traditional
supervised machine learning.**

**Old way — supervised learning** (think: a restaurant review sentiment classifier):

```text
1. Collect ~1,000 reviews, each hand-labeled positive / negative   (weeks)
2. Find / hire an AI team to train a model on that data            (weeks–months)
3. Find a cloud machine, deploy on AWS / GCP / Azure, run inference (weeks)
   ───────────────────────────────────────────────────────────────
   Total: 6–12 months before you classify your first new review.
```

**New way — prompt-based development:**

```text
1. Write a few lines of code with a prompt                         (minutes)
2. Deploy it                                                       (hours–days)
```

Months → days/weeks. You skip the labeled dataset and the model-training step
entirely because a pretrained LLM already "knows" what sentiment is.

**Important caveat:** Generative AI shines on **unstructured data** — text,
images, audio. For **structured/tabular data** (rows and columns of numbers, e.g.
predicting house prices from square footage), classic supervised learning and
gradient-boosted trees are usually still the better tool. Don't reach for an LLM
just because it's new.

---

# 2. Trying the Code Yourself

**Cell 1 — Setup and a reusable helper.** `temperature=0` makes the model as
deterministic/predictable as possible (good for classification, where we want one
consistent answer, not creative variety).

```python
import openai
import os

openai.api_key = os.getenv("OPENAI_API_KEY")

def llm_response(prompt):
    response = openai.ChatCompletion.create(
        model='gpt-3.5-turbo',
        messages=[{'role': 'user', 'content': prompt}],
        temperature=0
    )
    return response.choices[0].message['content']
```

**Cell 2 — Classify a single review.** No training, no labeled data — just a clear
instruction in plain English.

```python
prompt = '''
    Classify the following review
    as having either a positive or
    negative sentiment:

    The banana pudding was really tasty!
'''
response = llm_response(prompt)
print(response)
# → Positive
```

That's the whole "model." A task that used to need a dataset and an ML team is now
a string.

> Note: This is the course-era OpenAI Python SDK (`openai.ChatCompletion.create`).
> In the current SDK the equivalent is `client.chat.completions.create(...)` and
> `response.choices[0].message.content`. The *idea* is identical.

---

# 3. A Reputation-Monitoring System

Now scale the single example into something a restaurant could actually use:
read many reviews and report the positive/negative split.

**Cell 1 — Setup** (same `llm_response` helper as above).

**Cell 2 — The reviews to monitor:**

```python
all_reviews = [
    'The mochi is excellent!',
    'Best soup dumplings I have ever eaten.',
    'Not worth the 3 month wait for a reservation.',
    'The colorful tablecloths made me smile!',
    'The pasta was cold.'
]
```

**Cell 3 — Classify each one in a loop.** Note the tighter prompt: we *force* a
single-word answer so the output is easy to count.

```python
all_sentiments = []
for review in all_reviews:
    prompt = f'''
        Classify the following review
        as having either a positive or
        negative sentiment. State your answer
        as a single word, either "positive" or
        "negative":

        {review}
        '''
    response = llm_response(prompt)
    all_sentiments.append(response)
```

**Cell 4 — Tally the results:**

```python
num_positive = 0
num_negative = 0
for sentiment in all_sentiments:
    if sentiment == 'positive':
        num_positive += 1
    elif sentiment == 'negative':
        num_negative += 1
print(f"There are {num_positive} positive and {num_negative} negative reviews.")
# → There are 3 positive and 2 negative reviews.
```

**Lesson hidden in Cell 3/4:** controlling the *output format* matters. If the model
replies "Positive." (capital P, trailing period) the `== 'positive'` check fails
silently. This is why we instruct it to answer as a single lowercase word — a tiny
preview of real-world prompt engineering.

---

# 4. The Lifecycle of a Generative AI Project

GenAI projects are **iterative and empirical** — you don't get it right on paper,
you build a quick version and improve it from what you observe.

```text
Scope project  →  Build/improve system  →  Internal evaluation  →  Deploy & monitor
      ▲                                                                    │
      └──────────────── iterate based on real-world feedback ─────────────┘
```

1. **Scope the project.** Decide what you're building (e.g. a food-order chatbot
   for a restaurant).
2. **Build / improve the system.** Start with a prompt. If it's not good enough,
   layer on RAG, then maybe fine-tuning, etc.
3. **Internal evaluation.** Test it yourself before users see it. Find failure
   cases — e.g. a customer types *"my pasta was cold"* and the bot mishandles it,
   or *"the miso ramen tasted like tonkotsu ramen"* confuses it. These edge cases
   tell you what to fix next.
4. **Deploy and monitor.** Ship it, watch real usage, catch problems you never
   imagined, and **loop back** to improve.

The key mindset: **measure, don't guess.** You'll cycle through this loop several
times, and the tools you reach for as you go are exactly the next sections — **RAG,
fine-tuning, and (rarely) pre-training.**

---

# 5. Cost Intuition

A natural worry: "If every user request hits an LLM, won't this bankrupt me?"
Usually **no** — and here's the napkin math. *(All conversions use a rate of
**1 USD = ₹83**, a reasonable 2024-era rate; the live rate will differ.)*

### Token pricing (course-era list prices)

| Model       | Price per 1,000 tokens | In USD     | In INR (₹83/USD) |
|-------------|------------------------|------------|------------------|
| GPT-3.5     | 0.2 cents              | $0.002     | ₹0.17            |
| GPT-4       | 6 cents                | $0.06      | ₹4.98            |
| PaLM 2      | (Google)               | varies     | varies           |
| Titan Lite  | (Amazon)               | varies     | varies           |

> These are recording-era numbers (GPT-3.5, GPT-4, PaLM 2, Amazon Titan Lite).
> Today's models (GPT-4o, Claude, Gemini, Llama, etc.) and prices are very
> different — usually **much cheaper per token** — but the *intuition* below still
> holds, and it's the intuition that matters.

### What is a token?

A **token** is a chunk of text the model reads/writes — roughly **¾ of a word** on
average. Flip it around and:

```text
tokens ≈ 1.33 × words
```

So 1,000 words ≈ 1,333 tokens.

### The "keep a person busy for an hour" calculation

A person reads at roughly **250 words per minute**:

```text
Output read in 1 hour:  250 wpm × 60 min      = 15,000 words
Plus the prompt text feeding the model        = 15,000 words
                                              ───────────────
Total processed                                = 30,000 words
Convert to tokens:      30,000 × 1.33          ≈ 40,000 tokens
```

Now price it with **GPT-3.5 at 0.2 cents / 1,000 tokens**:

```text
40,000 tokens ÷ 1,000 = 40 units
40 × 0.2 cents        = 8 cents   = $0.08   ≈ ₹6.64
```

**So ~8 cents (≈ ₹6.64) of GPT-3.5 can keep one person occupied for a whole hour.**

Same workload on **GPT-4 at 6 cents / 1,000 tokens**:

```text
40 × 6 cents = 240 cents = $2.40  ≈ ₹199.20
```

### Why this is cheap: the minimum-wage comparison

US minimum wage is on the order of **$7–$15 per hour (≈ ₹580–₹1,245/hour)**. Paying
a human to read/produce that content costs *dollars*; the GPT-3.5 equivalent is
**8 cents (₹6.64)**. The model is **dramatically cheaper than human labor** for the
same volume of text.

### The honest caveat

The math breaks if you have **millions of free users** each generating lots of
tokens — then "8 cents per user-hour" multiplied by millions becomes a real bill.
Cost is rarely the blocker for an internal tool or a paid product, but you **do**
need to plan capacity for huge free-tier consumer apps.

---

# 6. RAG – Retrieval Augmented Generation

**Problem:** the LLM doesn't know *your* private/company-specific information (your
HR handbook, product docs, internal wiki). **RAG** feeds that knowledge in at
question time instead of baking it into the model.

**Three steps:**

```text
1. RETRIEVE  – Given the user's question, search your documents and pull back
               the most relevant passages.
2. AUGMENT   – Insert those passages into the prompt as context.
3. GENERATE  – Ask the LLM to answer the question USING that supplied context.
```

**Worked example — "How many days of parking are visitors allowed?"**

1. Search the company docs → find the **parking policy** page.
2. Build a prompt like:
   *"Use the following parking policy to answer the question. [policy text] …
   Question: How many days of parking are visitors allowed?"*
3. The LLM reads the policy and answers correctly — even though it never saw your
   policy during training.

**Practical notes:**

- **Prompt-length limits matter.** You can't paste an entire 500-page manual into
  the prompt — that's why step 1 *retrieves only the relevant chunks*. (Under the
  hood this is usually done with **embeddings + a vector database** — the
  Embeddings/Vector DB topics later in the roadmap.)
- **Cite the source.** Good RAG apps show a **link to the document** the answer came
  from, so users can verify and trust it (and so you reduce hallucination risk).

**Real products built on RAG:** PandaChat, AskYourPDF, ChatPDF, Coursera Coach,
Snapchat's My AI, HubSpot, Microsoft Bing Chat, Google's generative search, and
You.com (founded by Richard Socher).

> **Big idea:** RAG reframes the LLM **as a *reasoning engine*, not a *knowledge
> store*.** Don't rely on what it memorized — give it the facts and let it reason
> over them. This single shift powers a huge fraction of enterprise GenAI apps.

---

# 7. Fine-Tuning

**What it is:** continue training a pretrained model on a smaller, curated set of
examples so it adapts its **behavior** — not just what it knows, but *how* it
responds.

**Example:** fine-tune a model on text that's consistently **positive and
optimistic** in tone, and its outputs take on that upbeat voice.

**Three things fine-tuning is good for:**

1. **Tasks that are hard to specify in a prompt** — when "just describe it" doesn't
   capture what you want:
   - Mimicking a specific **writing style or voice** (a brand, an author, a persona).
   - Producing **customer-call summaries** in your exact preferred format.
2. **Gaining domain knowledge / vocabulary** — letting the model absorb the patterns
   of a specialized field:
   - **Medical** notes, **legalese**, **financial** documents.
3. **Shrinking the model** — fine-tuning a small model on your task can let it match
   a much bigger one *for that task*:
   - Run a **1B-parameter** model that performs like a **100B-parameter** model on
     your narrow problem → cheaper, faster, deployable on smaller hardware.

**Cost & data:**

- **Cost:** **tens to hundreds of dollars** — far cheaper than people expect (orders
  of magnitude below pre-training).
- **Data needed:** roughly **10,000 – 1,000,000 words**, or on the order of
  **hundreds to ~1,000 example pairs**. Much less than training from scratch.

**Rule of thumb:** try **prompting** first, then **RAG**, and only reach for
**fine-tuning** when those don't get you there.

---

# 8. Pre-Training an LLM (Option of Last Resort)

**What it is:** training a large model **from scratch** on a massive corpus.

**The reality:**

- **Very expensive** — **tens of millions of dollars** in compute.
- Requires a **large specialized team**, **months** of work, and an **enormous
  dataset**.
- For almost everyone, this is an **option of last resort.**

**Example — BloombergGPT:** Bloomberg pre-trained a **50-billion-parameter** model
on a huge corpus of financial data to deeply understand finance. This made sense for
a company of Bloomberg's scale and data assets — but it's not what a typical team
should attempt.

**The pragmatic alternative:** **fine-tune an existing open-source pretrained
model** (Llama, Mistral, etc.) instead of pre-training your own. You get most of the
benefit at a tiny fraction of the cost.

> Even BloombergGPT's pure-compute cost has been reported in the **millions** of
> dollars and **~53 days** of training on hundreds of GPUs — concrete proof of why
> "just pre-train your own" is rarely the right call.

---

# 9. Choosing a Model

Two big dials: **size** and **open vs. closed source.**

### Model size (rough capability tiers)

```text
~1B  parameters  → pattern matching + basic world knowledge
                   (sentiment, simple classification, restaurant-review tasks)
~10B parameters  → greater world knowledge + better instruction following
                   (a decent food-order chatbot)
100B+ parameters → rich world knowledge + complex reasoning
                   (brainstorming, multi-step reasoning, nuanced help)
```

These are guidelines, not laws. The real approach is **empirical: test a few models**
on *your* task and see which is good enough at the lowest cost.

### Closed-source (API) vs. open-source (weights you control)

| | **Closed-source (API)** | **Open-source** |
|---|---|---|
| **Access** | Call an API — easiest to start | Download weights, host yourself |
| **Effort** | Low; vendor handles infra | Higher; you run the infrastructure |
| **Control** | Limited; subject to vendor changes | Full control over the model |
| **Risk** | **Vendor lock-in** | More work, but you own it |
| **Deployment** | Vendor's cloud | **On-prem / your cloud / air-gapped** |
| **Data privacy** | Data leaves your walls | **Data never leaves your environment** |

**When open-source / on-prem wins:** sensitive data you legally can't send to a
third party — e.g. **electronic health records (EHR)**. Full control and on-premises
deployment can be a hard requirement, not just a preference.

---

# 10. How LLMs Follow Instructions: Instruction Tuning & RLHF

A raw pretrained LLM only does **next-word prediction.** Ask it *"What is the capital
of France?"* and a *pure* predictor might continue with **more questions** ("What is
the capital of Germany? What is the population of Paris?") because that's a plausible
text continuation — it isn't *trying to answer you.* Two extra training stages fix
this.

### Stage A — Instruction tuning (a.k.a. supervised fine-tuning)

Fine-tune the model on many **(question → good answer)** pairs so it learns to
*respond to instructions* rather than merely continue text.

```text
"What is the capital of France?"  →  "The capital of France is Paris."
```

These pairs also teach **safety**: include examples where the *good* answer is a
**refusal**, e.g.

```text
"How do I break into Fort Knox?"  →  "I'm sorry, I can't help with that."
```

### Stage B — RLHF (Reinforcement Learning from Human Feedback)

Instruction tuning gets you decent answers; RLHF makes them **better** by optimizing
for what humans actually prefer.

1. **Generate** several candidate answers to the same prompt.
2. **Humans rate** them on the **"triple-H"** criteria — **Helpful, Honest,
   Harmless.**
3. Train a **reward model** that learns to predict those human scores
   (answer → quality score).
4. **Tune the LLM** to produce responses the reward model scores **higher.**

```text
Prompt ─► LLM ─► several answers ─► Reward model scores them
                                          │
                                          ▼
                 nudge the LLM toward higher-scoring (more H/H/H) answers
```

This is the same recipe (instruction tuning → RLHF) that turned base GPT-3 into the
helpful **InstructGPT/ChatGPT**-style assistants we use today.

---

# 11. Tool Use and Agents (The Frontier)

### Tool use

By itself an LLM only generates text. **Tool use** lets it **trigger actions** in the
outside world.

**Example — food-order chatbot.** When the customer confirms an order, the LLM emits
a structured action that the surrounding software executes (place the order). Crucially:

- **Show the user only the user-facing line** — hide the internal "ORDER: …" action
  string from the chat.
- For **safety-critical actions** (charging money, placing the order), add a
  **confirmation dialog**: *"You're ordering 2 burgers for $18 — confirm?"*

**Example — calculator tool.** LLMs are unreliable at arithmetic, so let them call a
calculator instead of "doing math in their head":

```text
Q: If I invest $100 at 5% annual interest for 8 years, how much do I have?
Tool call: 100 * (1.05 ** 8)
Result:   $147.74
```

The LLM recognizes it needs math, hands the computation to a reliable tool, and
reports the exact answer.

### Agents

**Agents** push tool use further: the **LLM acts as a reasoning engine** that
**chooses a multi-step sequence of tool calls** to accomplish a goal it wasn't given
step-by-step.

**Example:** *"Research BetterBurger's competitors."* An agent might decide on its own
to: search the web → visit competitor sites → pull their menus/prices → summarize
findings — chaining several tools without being told each step.

> **Status check:** Agents are the **cutting edge** and very exciting, but **not yet
> mature** — "not ready for primetime" for most production use as of the course's
> recording. Worth understanding and experimenting with; be cautious deploying them
> for anything critical. *(This field has moved fast since; treat it as a fast-moving
> frontier.)*

---

# 12. Why This Matters

This week is the **practical playbook** for turning GenAI from a demo into a product:

- Prompting makes building **fast and cheap** — weeks, not years.
- The **lifecycle loop** keeps you honest: build small, evaluate, deploy, iterate.
- **RAG → fine-tuning → pre-training** is a ladder of increasing cost/effort; climb it
  only as far as you must.
- **Instruction tuning + RLHF** are *why* modern LLMs are helpful at all.
- **Tools and agents** are where the field is heading next.

---

# Key Takeaways (Must Remember)

✅ **Prompting replaces a lot of supervised ML** — months of label-train-deploy
collapse into days. Best for **unstructured** data (text/image/audio), not tabular.

✅ GenAI projects are **iterative & empirical**: Scope → Build → Evaluate → Deploy →
Monitor → loop.

✅ **Cost intuition:** ~40,000 tokens ≈ an hour of a person's reading; on GPT-3.5
that's ~**8 cents (≈ ₹6.64 at ₹83/USD)** — far cheaper than human labor. Watch out
for **millions of free users.**

✅ **RAG** = Retrieve → Augment → Generate. Use the LLM as a **reasoning engine, not a
knowledge store**; cite your sources.

✅ **Fine-tuning** (tens–hundreds of $, ~hundreds–1,000 examples) for **hard-to-prompt
tasks, domain knowledge, or shrinking model size.**

✅ **Pre-training** = tens of millions of $, last resort (BloombergGPT). Prefer
fine-tuning an **open-source** model.

✅ **Choosing a model:** ~1B = pattern matching, ~10B = better instruction following,
**100B+ = complex reasoning.** Closed = easy API but lock-in; open = control,
on-prem, **data privacy** (e.g. health records).

✅ **Instruction tuning** (Q→good-answer pairs, incl. safe refusals) + **RLHF**
(reward model from **Helpful/Honest/Harmless** ratings) make LLMs *follow
instructions.*

✅ **Tool use** = LLM triggers actions (orders, calculator) — hide internals, confirm
risky actions. **Agents** chain multi-step tool calls; powerful but **not yet mature.**

---

# Revision Questions

1. Describe how prompt-based development shortens the sentiment-classifier project
   compared to the traditional supervised-learning pipeline. What data type is GenAI
   *not* ideal for?
2. In the reputation-monitoring code, why does Cell 3's prompt insist on a *single
   lowercase word*? What bug does that prevent in Cell 4?
3. Draw the GenAI project lifecycle loop and explain why it's called *empirical.*
4. A model processes ~40,000 tokens for one user-hour. Compute the GPT-3.5 cost in
   cents, USD, and INR (state your rate). When does this cheap-per-user math become a
   real problem?
5. Explain RAG's three steps using the parking-policy example. What does "LLM as a
   reasoning engine, not a knowledge store" mean?
6. Give three distinct reasons to fine-tune a model, with an example of each. Roughly
   how much data and money does it take?
7. Why is pre-training a "last resort"? What should most teams do instead, and what's
   the BloombergGPT lesson?
8. Compare ~1B vs ~10B vs 100B+ models. Give one scenario where you'd insist on an
   open-source, on-prem model and say why.
9. Why won't a *purely* pretrained LLM answer "What is the capital of France?"
   properly, and how do instruction tuning and RLHF fix it? What does "triple-H"
   stand for?
10. Differentiate **tool use** from **agents** using the calculator example and the
    "research BetterBurger's competitors" example. What's the maturity caveat?

---

# References

- [DeepLearning.AI – Generative AI for Everyone (course)](https://learn.deeplearning.ai/courses/generative-ai-for-everyone/) · [Course page](https://www.deeplearning.ai/courses/generative-ai-for-everyone/) · [Coursera](https://www.coursera.org/learn/generative-ai-for-everyone)
- [Bloomberg – Introducing BloombergGPT, a 50-billion parameter LLM for finance](https://www.bloomberg.com/company/press/bloomberggpt-50-billion-parameter-llm-tuned-finance/)
- [OpenAI – InstructGPT: Training language models to follow instructions with human feedback](https://openai.com/index/instruction-following/) · [arXiv:2203.02155](https://arxiv.org/abs/2203.02155)
- [IntuitionLabs – Reinforcement Learning from Human Feedback (RLHF) Explained](https://intuitionlabs.ai/articles/reinforcement-learning-human-feedback)
- [You.com](https://you.com/) (Richard Socher) · [ChatPDF](https://www.chatpdf.com/) · [AskYourPDF](https://askyourpdf.com/) — example RAG products
- USD→INR conversion used throughout the cost section: **1 USD = ₹83** (approximate; live rate varies).

---

# Next Lesson

**Generative AI and Business / Society:** how to find and prioritize GenAI use
cases, build a team and roadmap, and the broader impact on jobs, fairness, and society.
In the roadmap this continues the **Generative AI** phase toward **Prompt Engineering**
(Zero-Shot, Few-Shot, Chain-of-Thought), **Embeddings**, **Vector Databases**, and a
deeper **RAG** build.
