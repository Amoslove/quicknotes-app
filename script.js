/* 1. Select the HTML elements */
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

/* 2. Store notes in an array */
let notes = [];

/* 3. Display the correct number of notes */
function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

/* 4. Display the notes */
function render() {
  notesList.textContent = "";

  notes.forEach(function (note) {
    const noteCard = document.createElement("li");

    noteCard.classList.add("category-" + note.category.toLowerCase());

    const noteText = document.createElement("p");
    noteText.textContent = note.text;

    const categoryLabel = document.createElement("span");
    categoryLabel.textContent = note.category;

    const dateLabel = document.createElement("small");
    dateLabel.textContent = note.createdAt;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";

    /* 5. Delete this particular note */
    deleteButton.addEventListener("click", function () {
      notes = notes.filter(function (item) {
        return item.id !== note.id;
      });

      render();
    });

    noteCard.appendChild(noteText);
    noteCard.appendChild(categoryLabel);
    noteCard.appendChild(document.createElement("br"));
    noteCard.appendChild(dateLabel);
    noteCard.appendChild(document.createElement("br"));
    noteCard.appendChild(deleteButton);

    notesList.appendChild(noteCard);
  });

  updateCount();
}

/* 6. Validate and add notes */
noteForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = noteInput.value.trim();
  const category = noteCategory.value;

  /* Reject empty notes */
  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  /* Reject notes longer than 200 characters */
  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  /* Create the note object */
  const note = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString(),
  };

  notes.push(note);

  /* Clear the error and input */
  errorMessage.textContent = "";
  noteInput.value = "";

  render();
});

/* 7. Show the initial count */
updateCount();
