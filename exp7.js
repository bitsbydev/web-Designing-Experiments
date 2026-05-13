import React, { useState } from "react";
function NotesApp() {
const [notes, setNotes] = useState([]);
const [input, setInput] = useState("");
const [editId, setEditId] = useState(null);

const addOrUpdateNote = () => {
if (input.trim() === "") return;

if (editId !== null) {
const updatedNotes = notes.map((note) =>
note.id === editId ? { ...note, text: input } : note
);
setNotes(updatedNotes);
setEditId(null);
} else {
const newNote = {
id: Date.now(),
text: input,
};
setNotes([...notes, newNote]);
}
setInput("");
};
const editNote = (id) => {
const noteToEdit = notes.find((note) => note.id === id);
setInput(noteToEdit.text);
setEditId(id);
};
const deleteNote = (id) => {
const filteredNotes = notes.filter((note) => note.id !== id);
setNotes(filteredNotes);

if (editId === id) {
setEditId(null);
setInput("");
}
};
return (
<div style={{ maxWidth: "500px", margin: "30px auto", textAlign: "center" }}>
<h2>Notes App</h2>
<input
type="text"
placeholder="Enter note"
value={input}
onChange={(e) => setInput(e.target.value)}
style={{ padding: "10px", width: "70%" }}
/>
<button onClick={addOrUpdateNote} style={{ marginLeft: "10px", padding: "10px" }}>
{editId !== null ? "Update" : "Add"}
</button>

<ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
{notes.map((note) => (
<li
key={note.id}
style={{
margin: "10px 0",
padding: "10px",
border: "1px solid #ccc",
borderRadius: "5px"
}}
>

{note.text}
<br />
<button onClick={() => editNote(note.id)} style={{ margin: "5px" }}>
Edit
</button>
<button onClick={() => deleteNote(note.id)} style={{ margin: "5px" }}>
Delete
</button>
</li>
))}
</ul>
</div>
);
}
