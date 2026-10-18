/* 1. Select HTML elements */
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

/* 2. Load saved notes from localStorage */
let notes = [];

try {
  const savedNotes = localStorage.getItem("quicknotes");

  if (savedNotes !== null) {
    const parsedNotes = JSON.parse(savedNotes);

    if (Array.isArray(parsedNotes)) {
      notes = parsedNotes;
    }
  }
} catch (error) {
  notes = [];
}

/* 3. Save notes to localStorage */
function saveNotes() {
  localStorage.setItem("quicknotes", JSON.stringify(notes));
}

/* 4. Update the note count */
function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

/* 5. Render notes and apply search */
function render() {
  notesList.textContent = "";

  const searchText = searchInput.value.trim().toLowerCase();

  const filteredNotes = notes.filter(function (note) {
    return note.text.toLowerCase().includes(searchText);
  });

  if (filteredNotes.length === 0 && searchText !== "") {
    const message = document.createElement("li");
    message.textContent = "No notes match your search.";
    notesList.appendChild(message);
  } else {
    filteredNotes.forEach(function (note) {
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

      deleteButton.addEventListener("click", function () {
        notes = notes.filter(function (item) {
          return item.id !== note.id;
        });

        saveNotes();
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
  }

  updateCount();
}

/* 6. Add and validate notes */
noteForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = noteInput.value.trim();
  const category = noteCategory.value;

  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  const note = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString(),
  };

  notes.push(note);

  saveNotes();

  errorMessage.textContent = "";
  noteInput.value = "";

  render();
});

/* 7. Search as the user types */
searchInput.addEventListener("input", function () {
  render();
});

/* 8. Display saved notes when the page opens */
render();
