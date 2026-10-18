

/* 1. Select the HTML elements */
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

/* 2. Create an array to store our notes */
let notes = [];

/* 3. Display the notes on the page */
function render() {
    notesList.textContent = "";

    notes.forEach(function(note) {
        // Create a list item for this note
        const noteCard = document.createElement("li");

        // Give each category its own CSS class
        noteCard.classList.add(
            "category-" + note.category.toLowerCase()
        );

        // Create the note text
        const noteText = document.createElement("p");
        noteText.textContent = note.text;

        // Create the category label
        const categoryLabel = document.createElement("span");
        categoryLabel.textContent = note.category;

        // Create the date and time
        const dateLabel = document.createElement("small");
        dateLabel.textContent = note.createdAt;

        // Create the Delete button
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";

        // Add everything to the note card
        noteCard.appendChild(noteText);
        noteCard.appendChild(categoryLabel);
        noteCard.appendChild(document.createElement("br"));
        noteCard.appendChild(dateLabel);
        noteCard.appendChild(document.createElement("br"));
        noteCard.appendChild(deleteButton);

        // Add the card to the notes list
        notesList.appendChild(noteCard);
    });
}

/* 4. Listen for the form submission */
noteForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // Get the text and selected category
    const text = noteInput.value.trim();
    const category = noteCategory.value;

    // Do not create an empty note
    if (text === "") {
        return;
    }

    // Create a new note object
    const note = {
        id: Date.now(),
        text: text,
        category: category,
        createdAt: new Date().toLocaleString()
    };

    // Add the note to the array
    notes.push(note);

    // Display the updated notes
    render();

    // Clear the input
    noteInput.value = "";
});
