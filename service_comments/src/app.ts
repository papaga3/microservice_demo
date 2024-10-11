import express from 'express';
import { randomBytes } from 'crypto';
import bodyParser from 'body-parser';
import cors, { CorsOptions } from "cors";
import axios from 'axios';

const eventURL = 'http://localhost:4500/events';

const app = express();
const port = 4100;
app.use(bodyParser.json());
app.use(cors());

const corsOptions: CorsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
}


interface Comment {
  id: string;
  content: string;
}

// Map between postID and comment object
// For example: "post1": [{ comment_1 }, { comment_2 }]
const commentsByPostId: Map<string, Comment[]> = new Map<string, Comment[]>();

app.get('/posts/:id/comments', cors(corsOptions), (req, res) => {
  const comments = commentsByPostId.get(req.params.id) || [];
  res.send(comments);
});

app.post('/posts/:id/comments', cors(corsOptions), async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { content } = req.body;
  const newComment = { id: id, content: content }
  
  const comments = commentsByPostId.get(req.params.id) || [];
  comments.push({ id: id, content: content });
  commentsByPostId.set(req.params.id, comments);

  try {
    const eventRes = await axios.post(eventURL, {
      type: "CommentCreated",
      data: { postId: req.params.id, id: id, content: content }
    });
    res.status(201);
    res.send(newComment);
  } catch(err) {
    console.log("Emit Comment Event Error: " + err);
  }
});

// Handle event
app.post('/events', cors(corsOptions), (req, res) => {
  console.log('Event type: ' + req.body.type);
  res.send({});
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});