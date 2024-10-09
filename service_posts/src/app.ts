import express from 'express';
import { randomBytes } from 'crypto';
import bodyParser from 'body-parser';

const app = express();
const port = 4000;
app.use(bodyParser.json());

interface Post {
 id: string;
 title: string; 
}

const posts: Map<string, Post> = new Map<string, Post>();

app.get('/posts', (req, res) => {
  res.send(JSON.stringify(Object.fromEntries(posts)));
});

app.post('/posts', (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  const newPost = { id: id, title: title }
  posts.set(id, newPost);
  res.status(201);
  res.send(newPost);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});