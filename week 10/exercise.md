# Exercise 10: React Q&A... with a Personality

_Goal: Use effects to implement a Dark/Light mode in the "HeapOverrun" React app developed last week._

Building on the app developed last week, use React's useEffect and the `data-bs-theme` attribute provided by Bootstrap 5.x to implement a basic application-wide Dark/Light mode.

Specifically:

  1. Implement a toggle in the navigation bar to switch between the two modes.
  2. Add the `data-bs-theme` attribute to the `<html>` tag and update it based on the current value set by the toggle.

**Hint**: use the [`documentElement`](https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement) DOM property to add the `data-bs-theme` attribute.

## Refine it with Context (optional)

To add more personalization, create a suitable context and its provider, which will be set by the toggle. Then, use it to adjust the application's style as needed to ensure proper contrast in both Dark and Light modes.
