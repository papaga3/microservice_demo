import express from 'express';
import { randomBytes } from 'crypto';
import bodyParser from 'body-parser';

const app = express();
const port = 4100;
app.use(bodyParser.json());

interface Comment {
  id: string;
  content: string;
}

// Map between postID and comment object
// For example: "post1": [{ comment_1 }, { comment_2 }]
const commentsByPostId: Map<string, Comment[]> = new Map<string, Comment[]>();

app.get('/posts/:id/comments', (req, res) => {
  const comments = commentsByPostId.get(req.params.id) || [];
  console.log(commentsByPostId);
  console.log(comments);
  res.send(comments);
});

app.post('/posts/:id/comments', (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { content } = req.body;
  const newComment = { id: id, content: content }
  
  const comments = commentsByPostId.get(req.params.id) || [];
  comments.push({ id: id, content: content });
  commentsByPostId.set(req.params.id, comments);

  res.status(201);
  res.send(newComment);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});