const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the public folder

// In-memory data store for contacts
let contacts = [];
let nextId = 1; // Simple ID counter

// API endpoint to handle contact operations
app.post('/api/contacts', (req, res) => {
    const { operation, firstname, lastname, phone_number } = req.body;

    switch (operation) {
        case 'create':
            const newContact = { ID: nextId++, firstname, lastname, PhoneNumber: phone_number };
            contacts.push(newContact);
            return res.status(201).json(newContact);
        case 'read':
            return res.json(contacts);
        case 'update':
            const contactToUpdate = contacts.find(contact => contact.firstname === firstname && contact.lastname === lastname);
            if (contactToUpdate) {
                contactToUpdate.PhoneNumber = phone_number;
                return res.json(contactToUpdate);
            }
            return res.status(404).json({ message: 'Contact not found' });
        case 'delete':
            contacts = contacts.filter(contact => !(contact.firstname === firstname && contact.lastname === lastname));
            return res.status(204).send(); // No content
        default:
            return res.status(400).json({ message: 'Invalid operation' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
