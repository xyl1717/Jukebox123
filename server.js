const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(bodyParser.json());

app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        playlists: true
      }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: {
        playlists: true
      }
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
});

app.post('/users/:id/playlists', async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  try {
    const newPlaylist = await prisma.playlist.create({
      data: {
        title,
        user: { connect: { id: parseInt(id) } }
      }
    });
    res.json(newPlaylist);
  } catch (error) {
    res.status(500).json({ error: 'Error creating playlist' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
