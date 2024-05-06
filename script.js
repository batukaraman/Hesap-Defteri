let selectedText = { start: 0, end: 0 };
let notes = [];

function getSelectedText() {
  let text = window.getSelection().toString();
  if (text.length > 0) {
    let range = window.getSelection().getRangeAt(0);
    selectedText.start = range.startOffset;
    selectedText.end = range.endOffset;
    showNoteForm(range);
  }
}

function showNoteForm(range) {
  let noteForm = document.getElementById("note-form");
  noteForm.style.display = "block";
  noteForm.style.top = range.getBoundingClientRect().bottom + "px";
  noteForm.style.left = range.getBoundingClientRect().left + "px";
}

function addNote() {
  let noteInput = document.getElementById("note-input");
  let noteText = noteInput.value.trim();
  if (noteText === "") return;

  let noteObj = {
    note: noteText,
    start: selectedText.start,
    end: selectedText.end,
  };

  notes.push(noteObj);
  console.log(notes);
  highlightSelectedText(noteObj);

  noteInput.value = "";
  document.getElementById("note-form").style.display = "none";
}

function highlightSelectedText(noteObj) {
  let textElement = document.getElementById("text");
  console.log(textElement.childNodes);
  let textNode = textElement.childNodes[0];
  let spanNode = document.createElement("span");
  spanNode.className = "note";
  spanNode.textContent = textNode.textContent.substring(
    noteObj.start,
    noteObj.end
  );
  spanNode.title = noteObj.note;
  spanNode.onclick = function () {
    alert(noteObj.note);
  };

  let beforeText = document.createTextNode(
    textNode.textContent.substring(0, noteObj.start)
  );
  let afterText = document.createTextNode(
    textNode.textContent.substring(noteObj.end)
  );

  textNode.textContent = "";

  textElement.appendChild(beforeText);
  textElement.appendChild(spanNode);
  textElement.appendChild(afterText);
}

document.addEventListener("mouseup", getSelectedText);
