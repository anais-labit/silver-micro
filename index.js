const express = require('express');
const app = express();
const port = 3000;
const { Sequelize } = require("sequelize");

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Liste des utilisateurs (simulée pour cet exemple)
let users = [
  { id: 1, name: 'Jeremy' },
  { id: 2, name: 'Anais' },
  { id: 3, name: 'Vincent' },
  { id: 4, name: 'Marie' },
  { id: 5, name: 'Pauline'},
  { id: 6, name: 'Mickael' },
  { id: 7, name: 'Laurent' },
  { id: 8, name: 'Sophie' },
  { id: 9, name: 'Lucas' },
  { id: 10, name: 'Julie'}
];

app.get('/', (req, res) => {
  res.send('Bienvenue sur la page d\'accueil !');
});

app.get('/api/users', (req, res) => {
  res.json(users);
});

// Récupérer un utilisateur par son ID
app.get('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'Utilisateur non trouvé' });
  }
});

// Ajouter un nouvel utilisateur
app.post('/api/users', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
});

// Mettre à jour un utilisateur existant
app.put('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedUser = req.body;
  users = users.map(user => (user.id === id ? { ...user, ...updatedUser } : user));
  res.json(updatedUser);
});

// Supprimer un utilisateur
app.delete('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter(user => user.id !== id);
  res.status(204).end();
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}`);
});
