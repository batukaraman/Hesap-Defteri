let notes = [];
let textElement = document.getElementById("text");
let range = undefined;
let text = undefined;

function getSelectedText() {
  text = window.getSelection().toString();
  if (text.length > 0) {
    range = window.getSelection().getRangeAt(0);
    originalSelectionColor = window.getSelection().toString();
    originalBackgroundColor = window.getSelection().getRangeAt(0).toString();
    showNoteForm(range);
  }
}

function showNoteForm(range) {
  let noteForm = document.getElementById("note-form");
  noteForm.style.display = "block";
  noteForm.querySelector("input").focus();
  noteForm.style.top = range.getBoundingClientRect().bottom + "px";
  noteForm.style.left = range.getBoundingClientRect().left + "px";
}

function addNote() {
  let noteInput = document.getElementById("note-input");
  let note = noteInput.value.trim();
  if (note === "") return;

  let noteObj = {
    note,
    range,
  };

  notes.push(noteObj);
  highlightSelectedText(noteObj);

  noteInput.value = "";
  document.getElementById("note-form").style.display = "none";
}

function highlightSelectedText(noteObj) {
  const span = document.createElement("span");
  span.className = "highlight";
  span.textContent = noteObj.range.toString();
  span.title = noteObj.note;
  span.addEventListener("click", function () {
    alert("Not: " + this.title);
  });

  noteObj.range.deleteContents();
  noteObj.range.insertNode(span);
}

function refresh() {
  textElement = document.getElementById("text");
  if (notes.length != 0) {
    notes.forEach((note) => {
      highlightSelectedText(note);
    });
  } else {
    console.log("No saved data found.");
  }
}

textElement.addEventListener("mouseup", getSelectedText);
document
  .getElementById("note-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    // Form işlemlerini burada gerçekleştirin
  });
