# Exercise 8: React Q&A, now with state manipulation and forms

_Goal: Managing forms and related states in the "HeapOverrun" React app developed last week._

## Implement the "vote up" function

Make the "vote up" function of each answer work! By clicking on the button associated with an answer, the information about the answer's score must be increased by 1.

Use the defined state and decide where to put the function to increase the score.

## Add a new answer

Include a form on the question page to add a new answer. The form will appear under the answers' table; choose whether to use _controlled input components_ or _useActionState_. 

First, start defining the suitable components to show the form *without* handling the insertion of a new answer in the table. Then, *handle the insertion* of a new answer in the table. Use the defined state to perform this operation.

## To use state or not to use state

Make the entire form appear and disappear through a suitable button at the end of the table. Do you need a new state?

Now, sort the table content by clicking on the "Score" header. For simplicity, a first click will sort the table from the lowest value to the highest and a second click from the highest to the lowest. Do you need a new state?

## Edit an answer

Make the "edit" button available for each answer row work. When pressed, re-use the form on the question page to edit the chosen answer. Handle the state update accordingly.

What happens when you edit two answers, one after the other, without submitting the form? Why? How can you solve the issue?

## Delete an answer (optional)

By clicking on the "delete" button associated with an answer, the answer should be deleted from the table (and the state).

