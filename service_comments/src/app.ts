import express from 'express';
import { randomBytes } from 'crypto';
import bodyParser from 'body-parser';

const app = express();
const port = 4100;
app.use(bodyParser.json());

interface Comment {
  id: string;

}

app.get('/posts/:id/comments', (req, res) => {
  res.send('Hello, TypeScript Node Express!');
});

app.post('/posts/:id/comments', (req, res) => {
  res.send('Hello, TypeScript Node Express!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});