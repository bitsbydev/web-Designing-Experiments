const express = require('express');
const app = express();
app.use(express.json());

// --- In-memory store ---
let items = [];
let nextId = 1;

// --- Routes ---
// GET all
app.get('/', (req, res) => {
res.json(items);
});

// GET one
app.get('/:id', (req, res) => {

const item = items.find(i => i.id === Number(req.params.id));
if (!item) return res.status(404).json({ error: 'Item not found' });
res.json(item);
});

// POST create
app.post('/', (req, res) => {
const { bookid, bookname, bookauthour} = req.body;
if (!bookname) return res.status(400).json({ error: 'Name is required' });
const newItem = { id: nextId++, bookid, bookname, bookauthour };
items.push(newItem);
res.status(201).json(newItem);
});

// PUT update
app.put('/:id', (req, res) => {
const index = items.findIndex(i => i.id === Number(req.params.id));
if (index === -1) return res.status(404).json({ error: 'Item not found' });
const { bookid, bookname, bookauthour} = req.body;
items[index] = { ...items[index], bookid, bookname, bookauthour };
res.json(items[index]);
});
// DELETE
app.delete('/:id', (req, res) => {
const index = items.findIndex(i => i.id === Number(req.params.id));
if (index === -1) return res.status(404).json({ error: 'Item not found' });
items.splice(index, 1);
res.status(204).send();
});
// --- Start ---
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
