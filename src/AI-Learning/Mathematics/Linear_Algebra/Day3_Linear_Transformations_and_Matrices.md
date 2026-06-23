# Day 3 Notes: Linear Transformations & Matrices – Matrices Are Just Moving Space Around

Source: https://www.3blue1brown.com/lessons/linear-transformations

> Quick recap from Day 2: any vector is a **linear combination** of the basis vectors `î` and `ĵ` — a coordinate like `[3, 2]` literally means `3·î + 2·ĵ`. Today we ask a new question: what happens to *every vector at once* when we **move the whole space**? The astonishing answer is that the entire motion is captured by just **two columns of numbers** — and that's exactly what a matrix is.

---

# 1. What Is a Transformation?

A **transformation** is just a fancy word for a **function**: it takes in a vector and spits out another vector.

```text
T( [x, y] )  →  [new x, new y]
```

The word *transformation* (instead of *function*) is a deliberate hint: don't think of it as plugging numbers into a formula — think of it as **movement**. Every input vector slides over to where its output vector lives. Picture the input arrow physically gliding across the plane to its new home.

Better still, don't track one vector — imagine **every point in space moving simultaneously**, like the whole plane is a sheet of stretchy graph paper being warped.

**Memory trick:** Transformation = "press play" on space.

---

# 2. What Makes a Transformation *Linear*?

Out of all the wild ways you could warp space (bend it, curl it, fold it), linear transformations are a special, well-behaved family. Visually, a transformation is **linear** if it keeps two promises:

```text
1. All grid lines stay PARALLEL and EVENLY SPACED.
2. The ORIGIN stays fixed (does not move).
```

If lines start curving, or the spacing between them changes, or the origin drifts — it's **not** linear.

```text
   LINEAR (allowed)              NOT LINEAR (forbidden)
   grid stays straight           grid curves / bends
   . . . . .                     .  .   .    .
   . . . . .   → tilted/         .   .    .                origin
   . . . . .     stretched       .  curved & uneven        moved!
   origin fixed                  spacing
```

Formally, "linear" means the transformation respects the two operations from Day 1:

```text
Additivity:   T(v⃗ + w⃗)  =  T(v⃗) + T(w⃗)
Scaling:      T(c·v⃗)     =  c·T(v⃗)
```

In plain words: it doesn't matter whether you add/scale vectors *first and then transform*, or *transform first and then add/scale* — you get the same answer. That "niceness" is the whole reason the trick in the next section works.

**Memory trick:** Linear = straight, evenly spaced, pinned at the origin.

---

# 3. The Big Idea: Only Track Where î and ĵ Land

Here's the move that makes linear algebra click.

Because a linear transformation keeps grid lines parallel and evenly spaced, you **do not** need to track where all infinitely many vectors go. You only need to know **where the two basis vectors land**:

- Where does `î = [1, 0]` end up? Call it the **transformed î**.
- Where does `ĵ = [0, 1]` end up? Call it the **transformed ĵ**.

Everything else follows for free. Why? Take any vector, say:

```text
v⃗ = [-1, 2]  =  (-1)·î  +  2·ĵ
```

Before the transformation, `v⃗` is "−1 of î plus 2 of ĵ." Because the transformation is linear, **that same recipe survives the move**. After transforming:

```text
T(v⃗)  =  (-1)·(transformed î)  +  2·(transformed ĵ)
```

The *scalars stay the same* — only the building blocks (`î`, `ĵ`) get relocated. So if you tell me where `î` and `ĵ` land, I can compute where **any** vector lands.

```text
Worked example:
  Suppose  transformed î = [1, -2]   and   transformed ĵ = [3, 0].
  Then for v⃗ = [-1, 2]:

  T(v⃗) = (-1)·[1, -2] + 2·[3, 0]
        = [-1,  2]     + [6, 0]
        = [5,  2]
```

That's it. The fate of the entire plane is decided by **4 numbers**: the two coordinates of where `î` goes and the two of where `ĵ` goes.

**Memory trick:** Know the corners (î and ĵ), and you know the whole room.

---

# 4. Packaging Those 4 Numbers → A Matrix

A **matrix** is just a tidy box that stores where the basis vectors land:

```text
        ┌            ┐
        │  a    b    │      Column 1 = where î lands  = [a, c]
   A =  │            │      Column 2 = where ĵ lands  = [b, d]
        │  c    d    │
        └            ┘
```

> **The single most important sentence today:** the **columns** of a matrix are the **landing spots of the basis vectors**.

So a 2×2 matrix is literally a *recorded transformation*. Reading a matrix means asking: "Where did î go? (first column) Where did ĵ go? (second column)" — and you can instantly picture how space gets warped.

**Memory trick:** Columns of a matrix = the new homes of î and ĵ.

---

# 5. Matrix–Vector Multiplication = Applying the Transformation

To find where a vector `[x, y]` lands, you reuse the recipe from Section 3: scale the new î-landing by `x`, scale the new ĵ-landing by `y`, and add.

```text
┌        ┐ ┌   ┐         ┌   ┐       ┌   ┐     ┌            ┐
│  a  b  │ │ x │  =   x· │ a │  + y· │ b │  =  │  a·x + b·y │
│  c  d  │ │ y │         │ c │       │ d │     │  c·x + d·y │
└        ┘ └   ┘         └   ┘       └   ┘     └            ┘
     ↑       ↑            ↑            ↑
   matrix  vector     x · (col 1)   y · (col 2)
```

**The formula to memorize (or better, to *understand*):**

```text
[ a  b ] [ x ]     [ a·x + b·y ]
[ c  d ] [ y ]  =  [ c·x + d·y ]
```

But don't just memorize the cross-multiply pattern. The *meaning* is: "take `x` copies of where î landed, plus `y` copies of where ĵ landed." Matrix-vector multiplication is **nothing more than computing a linear combination of the matrix's columns.**

```text
Quick check with v⃗ = [-1, 2] and the matrix from Section 3 ( î→[1,-2], ĵ→[3,0] ):

[ 1  3 ] [ -1 ]   [ 1·(-1) + 3·(2) ]   [ -1 + 6 ]   [ 5 ]
[ -2 0 ] [  2 ] = [ -2·(-1)+ 0·(2) ] = [  2 + 0 ] = [ 2 ]     ✔ matches!
```

---

# 6. Example A — 90° Counterclockwise Rotation

Rotate everything 90° counterclockwise. Track the basis vectors:

```text
î = [1, 0]   rotates to →  [0, 1]   (points up now)
ĵ = [0, 1]   rotates to →  [-1, 0]  (points left now)
```

```text
   before              after (90° CCW)
   ĵ                          î'  (was ĵ → now [-1,0])
   │                    ←─────┘
   │                    ĵ'
   └────→ î             │  (was î → now [0,1])
                        └────→
```

Drop those landings into the columns:

```text
Rotation matrix:   [ 0  -1 ]
                   [ 1   0 ]
```

Test it on `[2, 3]`:

```text
[ 0  -1 ] [ 2 ]   [ 0·2 + (-1)·3 ]   [ -3 ]
[ 1   0 ] [ 3 ] = [ 1·2 +  0·3   ] = [  2 ]
```

So `[2, 3]` rotates to `[-3, 2]` — exactly a quarter-turn counterclockwise. 

---

# 7. Example B — A Shear

A **shear** keeps `î` pinned but slides `ĵ` over to the right:

```text
î = [1, 0]   stays at  →  [1, 0]
ĵ = [0, 1]   slides to →  [1, 1]
```

```text
   before            after (shear)
   ┌───┐               ╱───╱
   │   │     →        ╱   ╱      squares become
   └───┘             ╱___╱       slanted parallelograms
```

Matrix:

```text
Shear matrix:   [ 1  1 ]
                [ 0  1 ]
```

The unit square gets pushed into a leaning parallelogram, but — true to linearity — grid lines stay parallel and evenly spaced.

---

# 8. When Columns Are Linearly Dependent → Space Gets Squished

What if both columns point in the **same direction** (one is a scalar multiple of the other)? Then `î` and `ĵ` land on the **same line**.

```text
[ 1  2 ]      column 1 = [1, 2]
[ 2  4 ]      column 2 = [2, 4] = 2·[1, 2]   ← dependent!
```

Since every output is a combination of two vectors that lie on one line, **every vector in the plane gets crushed onto that single line**. The 2D plane collapses into 1D.

```text
   before                 after (dependent columns)
   full 2D grid     →     everything flattened
   . . . . .              ─────●─────────  onto one line
   . . . . .
   . . . . .
```

This connects straight back to Day 2: dependent columns = the columns **don't span the plane**, so the transformed space loses a dimension. (Later we'll learn this means the **determinant is 0** and the matrix has **no inverse**.)

**Memory trick:** Dependent columns → the plane gets squished onto a line.

---

# 9. Why Linear Transformations Matter (The Punchline)

> **A matrix is not a grid of random numbers. A matrix *is* a transformation of space — a verb, not a noun.**

Once you see matrices this way, a huge amount of linear algebra stops being memorization and becomes geometry:

- **Matrix multiplication** = doing one transformation, then another (composition of motions).
- **The determinant** = how much the transformation stretches or squishes area (and 0 means "squished flat," like Section 8).
- **Eigenvectors** = the special vectors that don't change direction when space is transformed.
- **Solving `Ax = b`** = "which input vector `x` lands on `b` after transformation `A`?"
- **Neural networks** = every dense layer is `Wx + b`: a matrix `W` transforms the input space, then a nonlinearity bends it. Stacking layers = stacking transformations.

If you remember just one thing: **reading a matrix = picturing where î and ĵ go, and therefore how all of space moves.**

---

# Key Takeaways (Must Remember)

✅ A **transformation** is a function on vectors — think *movement of the whole plane*, not a formula.

✅ A transformation is **linear** if grid lines stay parallel & evenly spaced and the **origin is fixed**.

✅ Equivalently, linear means `T(v⃗+w⃗)=T(v⃗)+T(w⃗)` and `T(c·v⃗)=c·T(v⃗)`.

✅ A linear transformation is **fully determined by where î and ĵ land** — just 4 numbers in 2D.

✅ Any vector's landing = the **same linear combination** of the transformed basis vectors.

✅ A **matrix stores those landings as its columns** (col 1 = î's home, col 2 = ĵ's home).

✅ **Matrix × vector** `= x·(col 1) + y·(col 2) = [ax+by, cx+dy]` — a linear combination of the columns.

✅ Rotation `[[0,-1],[1,0]]`, Shear `[[1,1],[0,1]]` — read each matrix as "where do î and ĵ go?"

✅ **Linearly dependent columns** squish 2D space onto a line (loses a dimension).

✅ Big idea: **a matrix IS a transformation of space.**

---

# Revision Questions

1. What two visual properties must hold for a transformation to be linear?
2. Why is it enough to know only where `î` and `ĵ` land in order to know where *every* vector lands?
3. Given a matrix `[[a, b], [c, d]]`, what do the two columns represent geometrically?
4. Multiply `[[0, -1], [1, 0]] · [2, 3]` and describe the geometric effect on the vector.
5. Build the matrix for a transformation where `î → [1, 0]` and `ĵ → [1, 1]`. What is this transformation called?
6. Explain, in terms of columns, why `[[1, 2], [2, 4]]` collapses the plane onto a line.
7. In your own words, why is it said that "a matrix is a transformation of space, not just a table of numbers"?
8. How does matrix–vector multiplication connect back to the idea of a *linear combination* from Day 2?

---

# References

- 3Blue1Brown — *Linear transformations and matrices* (Essence of Linear Algebra, Chapter 3): https://www.3blue1brown.com/lessons/linear-transformations
- 3Blue1Brown — *Linear combinations, span, and basis vectors* (Chapter 2, prerequisite): https://www.3blue1brown.com/lessons/span

---

# Next Lesson

Chapter 4: Matrix Multiplication as Composition (doing one transformation after another)

---

> Tip: drop any screenshots or hand-drawn sketches into this same folder and reference them inline, e.g.
> `![î and ĵ landing after a rotation](Day3_Rotation.png)`.
> Good ones to capture from the video: the grid before/after a **shear**, the **90° rotation** of î and ĵ, and the plane being **squished onto a line** by dependent columns. Any image placed in this folder also appears automatically in the note's gallery.
