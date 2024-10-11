import express from 'express';
import { randomBytes } from 'crypto';
import bodyParser from 'body-parser';
import cors, { CorsOptions } from "cors";
import axios from 'axios';

interface Post {
 id: string;
 title: string; 
}

const eventURL = 'http://localhost:4500/events';

const app = express();
const port = 4000;
app.use(bodyParser.json());
app.use(cors());

const corsOptions: CorsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
}

const posts: Map<string, Post> = new Map<string, Post>();

app.get('/posts', cors(corsOptions),  (req, res) => {
  res.send(JSON.stringify(Object.fromEntries(posts)));
});

app.post('/posts', cors(corsOptions), async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  const newPost = { id: id, title: title }
  posts.set(id, newPost);

  try {
    const eventRes = await axios.post(eventURL, 
      { 
        type: 'PostCreated',
        data: { id, title }
      });
    res.status(201).send(newPost);
  } catch(err) {
    console.log("Emit Post Event Error: " + err);
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