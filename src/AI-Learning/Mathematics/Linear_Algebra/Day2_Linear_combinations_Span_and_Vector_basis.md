# Day 2 Notes: Linear Combinations, Span & Basis Vectors – Building Everything From a Few Arrows

Source: https://www.3blue1brown.com/lessons/span

> Quick recap from Day 1: a vector has magnitude and direction, and we can do two things with vectors — **add them** and **scale them** with a number (scalar). Today we discover that those two simple operations are powerful enough to build *every* vector in a space. That single idea is the heart of linear algebra.

---

# 1. Basis Vectors → The Building Blocks

Think of basis vectors as the **fundamental directions** of a space.

In 2D, the **standard basis vectors** are:

```text
î = [1, 0]   → unit step to the right (X direction)
ĵ = [0, 1]   → unit step up          (Y direction)
```

They're called *basis* vectors because we can build **every other vector** by scaling and adding them.

Example — what does `[3, 2]` really mean?

```text
[3, 2]  =  3·î  +  2·ĵ
        =  3·[1, 0]  +  2·[0, 1]
        =  "3 steps right" + "2 steps up"
```

So a coordinate pair is really an instruction: *how much to stretch each basis vector*.

**Memory trick:** Basis vectors = LEGO pieces.

---

# 2. Linear Combination → Scaling + Adding

This is the precise definition of "combining" vectors.

Take any two vectors, scale each by a number, then add the results:

```text
a·v⃗ + b·w⃗

where  a, b   → scalars (just numbers)
       v⃗, w⃗  → vectors
```

Worked example:

```text
3·[1, 0]  +  2·[0, 1]  =  [3, 0] + [0, 2]  =  [3, 2]
```

That `[3, 2]` is a **linear combination** of `î` and `ĵ`.

Two things to be careful about:

- **Addition alone** (`v⃗ + w⃗`) is just a *special case* where both scalars are 1.
- The general pattern is **scalar × vector + scalar × vector** — that's what makes it *linear*.

**Memory trick:** Linear combination = combine LEGO pieces using *quantities* (how many of each).

---

# 3. Span → All the Places You Can Reach

Stand at the origin `(0, 0)`. Now allow yourself to move using `î` (right) and `ĵ` (up), by **any amount, positive or negative**:

```text
1·î + 2·ĵ  =  (1,  2)
5·î + 3·ĵ  =  (5,  3)
-2·î + 7·ĵ =  (-2, 7)
```

By choosing the scalars freely, you can land on **every point in the plane**. That entire reachable set is the **span**.

> **Definition:** The *span* of a set of vectors is the collection of **all vectors you can reach** as linear combinations of them.

### Analogy: a city grid
- One road runs **East**, another runs **North**.
- A linear combination = "go 3 streets East, 2 streets North."
- The **span** = every location you can reach using only those two roads.

### Important counter-example — when span shrinks

What if the two vectors point the **same way**?

```text
v⃗ = [1, 0],   w⃗ = [2, 0]

a·[1, 0] + b·[2, 0]  =  [a + 2b, 0]
```

The second coordinate is **always 0**. No matter what scalars you pick, you can only move left and right. The span is **just the X-axis**, *not* the whole plane.

The lesson: more vectors don't automatically mean a bigger span. It depends on whether they point in genuinely **new directions** (Section 5).

**Memory trick:** Span = everything you can *build* from your LEGO pieces.

---

# 4. Stepping Up to 3D

In 3D, think in **directions of movement**, not equations.

```text
Basis vectors      → which directions are available
Linear combination → how far you move in each direction
Span               → all the places you can reach
```

The 3D standard basis:

```text
î = [1, 0, 0]  → Right   (X)
ĵ = [0, 1, 0]  → Forward (Y)
k̂ = [0, 0, 1]  → Up      (Z)
```

A linear combination in 3D uses three scalars:

```text
2·î + 3·ĵ + 4·k̂  =  [2, 3, 4]
   = "2 right, 3 forward, 4 up"

General form:  a·v⃗ + b·w⃗ + c·u⃗
```

### Analogy: a drone
- Joystick 1 → left / right
- Joystick 2 → forward / backward
- Joystick 3 → up / down

A linear combination is a single flight instruction ("2 right, 5 forward, 3 up"), and the **span** is *every position the drone can fly to*.

### How span depends on the vectors (3D)

```text
Example 1 — Full space:
  [1,0,0], [0,1,0], [0,0,1]   → reach any [x, y, z]   → span = ALL of 3D space

Example 2 — A flat plane:
  [1,0,0], [0,1,0]            → a·[1,0,0] + b·[0,1,0] = [a, b, 0]
                                z is always 0          → span = the XY-plane

Example 3 — A single line:
  [1,1,1] only               → a·[1,1,1] gives (2,2,2), (5,5,5), (-1,-1,-1)…
                                → span = one line through the origin
```

**Memory trick (the big pattern):**

```text
1 independent vector  → span is a LINE
2 independent vectors → span is a PLANE
3 independent vectors → span is all of 3D SPACE
```

The key word there is **independent** — which we define next.

---

# 5. Linear Independence vs Dependence

This is, genuinely, one of the most important ideas in all of linear algebra.

### Linearly Independent
Vectors are **independent** if **none of them can be built from the others**. Each one adds a brand-new direction.

```text
[1, 0] and [0, 1]
→ no scalar turns one into the other; they point different ways
→ INDEPENDENT
```

Real life: a road going East and a road going North — two genuinely different directions.

### Linearly Dependent
Vectors are **dependent** if **at least one is already a linear combination of the others** — it's redundant and adds no new direction.

```text
[1, 0] and [2, 0]
→ (2, 0) = 2·(1, 0)
→ the second one points the SAME way → DEPENDENT
```

Real life: road A goes East, road B goes East but longer — no new direction unlocked.

### The quick test
"Can I get one vector by scaling another?"

```text
v⃗1 = (1, 2),  v⃗2 = (2, 4)
   2·(1, 2) = (2, 4)  ✔  → DEPENDENT

v⃗1 = (1, 0),  v⃗2 = (0, 1)
   no scalar works     ✘  → INDEPENDENT
```

> A more general way to say it: a set is **dependent** if one of the vectors lies *in the span of the others*. If you can remove a vector without shrinking the span, it was dependent.

**Memory trick:**

```text
Independent → adds a NEW direction → GROWS the span
Dependent   → same old direction   → does NOT grow the span
```

---

# 6. Symbols You'll Keep Seeing

### v⃗ (v with an arrow)
The little arrow signals "this is a **vector**."

```text
v⃗ = [2, 3]   → v is the vector (2, 3)
v  = 5        → no arrow, usually a scalar
```

### î, ĵ, k̂ (i-hat, j-hat, k-hat)
The **hat** (`^`) conventionally means a **unit vector** — length exactly 1.

```text
î = [1, 0]      → unit vector in X
ĵ = [0, 1]      → unit vector in Y
k̂ = [0, 0, 1]   → unit vector in Z (3D)
```

Example: `3·î + 2·ĵ = (3, 2)` → "3 right, 2 up."

```text
v⃗  → it's a vector
^   → it's a unit vector (length 1)
```

---

# 7. What Actually *Is* a Basis?

### Name vs value
`î` is the **name/label**; `[1, 0, 0]` is its **actual value (coordinates)**.

```text
î = [1, 0, 0]   means  "the basis vector called i-hat has coordinates (1,0,0)"
```

Like a person's *name* (Rahul) versus the actual *person*.

A basis is usually written as a **set**:

```text
{ [1,0,0], [0,1,0], [0,0,1] }     ≡     { î, ĵ, k̂ }
```

Both notations mean the same thing.

### Does a basis always look like [1,0,0]? No!
Basis vectors are **not fixed**. Many different sets can serve as a basis. The standard one is just convenient.

```text
{ [1, 0], [0, 1] }     → a basis (the standard one)
{ [1, 1], [1, -1] }    → ALSO a basis!
```

Why does `{ [1,1], [1,-1] }` work? Because those two vectors are **independent** *and* they **span the whole plane**:

```text
2·[1, 1] + 1·[1, -1] = [2, 2] + [1, -1] = [3, 1]
```

…and by choosing scalars you can reach any point.

### The technical definition

> **A basis is a set of linearly independent vectors that spans the space.**

Two requirements, both needed:
1. **Independent** → no redundancy (no wasted vectors).
2. **Spans the space** → enough vectors to reach everything.

Why the standard basis `[1,0,0], [0,1,0], [0,0,1]` is the default: it lines up perfectly with the X / Y / Z axes — no scaling or rotation to reason about.

**Memory trick:**

```text
î          → a NAME
[1, 0, 0]  → one basis VECTOR (the value)
basis      → a COLLECTION of independent vectors that span the space
```

So `î` by itself is *not* "the basis" — it's one named vector inside the basis set.

---

# 8. Why Span & Basis Matter (Downstream in ML)

These ideas quietly power almost everything later:

- **Dimensionality** — the size of a basis is the *dimension* of a space. This is exactly what "rank" measures and why **PCA** works: it finds a smaller basis that still captures most of the data's span.
- **Feature spaces** — a dataset's features are basis directions; redundant (dependent) features add no new information, which connects to *multicollinearity* in regression.
- **Neural networks** — each layer takes linear combinations of inputs (`Wx + b`) before applying a nonlinearity. The weights decide how basis directions get mixed.
- **Embeddings** — word/image embeddings live in a high-dimensional space whose meaningful directions form a kind of learned basis.

If you understand span and basis, "what space does this data live in, and what's the smallest set of directions that describes it?" becomes a natural question — and that's the mindset behind a huge amount of ML.

---

# Key Takeaways (Must Remember)

✅ **Basis vectors** are the building-block directions of a space (standard 2D: î, ĵ).

✅ A **linear combination** is `a·v⃗ + b·w⃗` — scale each vector, then add.

✅ **Span** = the set of *all* vectors reachable by linear combinations.

✅ Span depends on direction, not count: `1 → line`, `2 → plane`, `3 → 3D space` (when independent).

✅ **Independent** vectors add new directions and grow the span; **dependent** vectors are redundant.

✅ Quick dependence test: can one vector be made by scaling/combining the others? If yes → dependent.

✅ A **basis** = a set of linearly independent vectors that spans the space.

✅ A basis is **not unique** — `{[1,1], [1,-1]}` is just as valid as `{[1,0], [0,1]}`.

✅ Notation: `v⃗` = vector, `^` (hat) = unit vector.

---

# Revision Questions

1. In your own words, what is the difference between a linear combination and ordinary vector addition?
2. What does the **span** of two vectors mean geometrically?
3. The vectors `[1, 0]` and `[2, 0]` are given. What is their span, and why isn't it the whole plane?
4. State the pattern linking the number of *independent* vectors to whether the span is a line, plane, or space.
5. How can you tell if `(1, 2)` and `(3, 6)` are linearly independent or dependent?
6. Give the full technical definition of a basis. What two conditions must it satisfy?
7. Is `{ [1, 1], [1, -1] }` a valid basis for the 2D plane? Justify your answer.
8. What is the difference between the symbol `î` and the value `[1, 0, 0]`?

---

# References

- 3Blue1Brown — *Linear combinations, span, and basis vectors* (Essence of Linear Algebra, Chapter 2): https://www.3blue1brown.com/lessons/span
- 3Blue1Brown — *Vectors* (Chapter 1, prerequisite recap): https://www.3blue1brown.com/lessons/vectors

---

# Next Lesson

Chapter 3: Linear Transformations and Matrices

---

> Tip: drop any hand-drawn or screenshot diagrams (e.g. a span-as-a-plane sketch) into this same folder. Name them descriptively — for example `Day2_Span_Plane.png` — and reference them inline like
> `![Span of two vectors covering the plane](Day2_Span_Plane.png)`.
> Any image placed in this folder also automatically appears in the note's gallery.
