# Exercise 11: React meets Express - part I

_Goal: Start connecting the "HeapOverrun" React Client and the API Server._

Starting from the React application developed in the last weeks and the API Server in Express developed in Week 04, make the React application consume some of the APIs to get the content.

In particular, replace the "fake" questions and answers with the information obtained through the server. To do so, set up CORS appropriately in Express, call the appropriate APIs from React (see the empty `API.mjs` file in `react-qa`), and set up `useEffect()` as needed.

For this week, we want to call the APIs to *get* the list of questions and the associated answers for each of them. Ignore the creation, editing, or deletion of questions and answers.