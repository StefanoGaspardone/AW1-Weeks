# Exercise 9: React Q&A with Multiple Pages

_Goal: Manage routes in the "HeapOverrun" React app developed last week._

Starting from the app developed last week, incorporate React Router to enable navigation across multiple pages within the application.

Create four distinct pages with their corresponding routes:

  1. **All questions** in a list (`index`). _Clicking on a question should navigate to the page described in point 2_.
  2. **Single question and its answers**, i.e., the current content of the application.
      - Clicking the "Add" button will open a new page for adding a new answer.
      - The "Edit" button should navigate to the same page as above but in editing mode.
  3. **Add/edit an answer**, i.e., the form already in the app. _After successfully submitting the form, redirect the user to the page described in point 2_.
  4. Properly **handle wrong URLs** by providing a _404 Not Found page_.

## Hints

Start by splitting the current application content (points 2 and 3 above) into separate pages/routes.
First, decide on the route structure and naming. Then, restructure the application for implementing those routes, making sure to pass the necessary information between them (e.g., the answer id or the answer to edit). Make sure not to break any existing functionalities.

Finally, implement the _index_ page (point 1) and the _Not Found_ page (point 4).
