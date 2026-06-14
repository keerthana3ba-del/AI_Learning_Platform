# Day 1 Notes: Vectors – What Even Are They?

Source: https://www.3blue1brown.com/lessons/vectors

---

# 1. What is a Vector?

A vector is an object that has:

- Magnitude (length)
- Direction

Geometrically, it is represented as an arrow in space.

A vector remains the same even if moved around, as long as its length and direction do not change.

---

# 2. Three Perspectives of Vectors

## Physics Perspective

A vector is an arrow in space.

Examples:

- Velocity
- Force
- Acceleration

Focus:

- Direction
- Length (magnitude)

---

## Computer Science Perspective

A vector is an ordered list of numbers.

Example:

```text
[2]
[3]
```

represents:

- x = 2
- y = 3

Order matters.

---

## Mathematical Perspective

A vector can be anything that supports:

1. Vector Addition
2. Scalar Multiplication

This abstraction becomes important in advanced linear algebra.

---

# 3. Coordinate System

A coordinate system contains:

- X-axis (horizontal)
- Y-axis (vertical)
- Origin (0,0)

The origin is considered the starting point of vectors.

---

# 4. Vector Coordinates

Coordinates tell us how to move from the origin to the vector tip.

Example:

```text
[4]
[2]
```

means:

- Move 4 units right
- Move 2 units up

The vector ends at (4,2).

---

# 5. 2D Vectors

A 2D vector contains two values:

```text
[x]
[y]
```

Example:

```text
[3]
[5]
```

Represents a position in a 2-dimensional plane.

---

# 6. 3D Vectors

A 3D vector contains:

```text
[x]
[y]
[z]
```

Example:

```text
[2]
[4]
[1]
```

Represents movement in:

- X direction
- Y direction
- Z direction

---

# 7. Vector Addition

Vectors can be added.

Geometrically:

- Place the tail of the second vector at the tip of the first.
- Draw a new vector from the start to the final endpoint.

This is called the tip-to-tail method.

Example:

```text
[1]   [3]   [4]
[2] + [-1] = [1]
```

Add corresponding components:

- x values together
- y values together

---

# 8. General Formula for Vector Addition

```text
[x1]   [x2]   [x1+x2]
[y1] + [y2] = [y1+y2]
```

Add matching components together.

---

# 9. Scalar Multiplication

A scalar is simply a number used to scale a vector.

Examples:

- 2 → stretches vector
- 0.5 → shrinks vector
- -1 → flips direction

---

# 10. General Formula for Scalar Multiplication

```text
k[x] = [kx]
 [y]   [ky]
```

Example:

```text
2[3] = [6]
 [4]   [8]
```

Multiply every component by the scalar.

---

# 11. Why Vectors Matter

Vectors are the foundation of Linear Algebra.

Almost every concept later depends on:

1. Vector Addition
2. Scalar Multiplication

These two operations are the building blocks for:

- Span
- Basis
- Linear Transformations
- Eigenvectors
- Machine Learning
- Neural Networks

---

# 12. Diff btw scalar and vector

A scalar and a vector are different types of mathematical objects.

Think of it like:

Type	Example
Scalar	5
Vector	(5, 2)

A scalar is not part of a vector, but vectors are made up of scalar values.

For example:

```text
[3]
[7]
```

Here:

3 is a scalar
7 is a scalar
Together they form a vector

So:

Scalars are the building blocks used inside vectors.

# Key Takeaways (Must Remember)

✅ A vector has magnitude and direction.

✅ A vector can be represented as an ordered list of numbers.

✅ Coordinates describe movement from the origin.

✅ 2D vectors → (x, y)

✅ 3D vectors → (x, y, z)

✅ Vector Addition = add corresponding components.

✅ Scalar Multiplication = multiply each component by a number.

✅ Linear Algebra is built mainly on:
- Vector Addition
- Scalar Multiplication

---

# Revision Questions

1. What are the three interpretations of vectors?
2. What is the difference between a scalar and a vector?
3. How do you add two vectors?
4. How does scalar multiplication affect a vector?
5. Why is the origin important?
6. What does the vector [3, -2] represent?
7. Why are vectors important in Machine Learning?

---

# Next Lesson

Chapter 2: Linear Combinations, Span, and Basis Vectors
