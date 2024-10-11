import express from 'express';
import bodyParser from 'body-parser';
import cors, { CorsOptions } from "cors";

interface Comment {
  id: string;
  contend: string;
}

interface Post {
  id: string;
  title: string;
  comments: Comment[];
}

const app = express();
const port = 4200;
app.use(bodyParser.json());
app.use(cors());

const posts: Map<string, Post> = new Map<string, Post>();

const corsOptions: CorsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
}

app.post('/events', cors(corsOptions), async (req, res) => {
  const eventType = req.body.type;
  switch(eventType) {
    case 'PostCreated': {
      const newPost: Post = { 
        id: req.body.data.id,
        title: req.body.data.title,
        comments: new Array<Comment>()
      }
      posts.set(req.body.data.id, newPost);
      break;
    }
    case 'CommentCreated': {
      const curPos = posts.get(req.body.data.postId);
      if(curPos !== undefined) {
        curPos.comments.push({ id: req.body.data.id, contend: req.body.data.content })
      }
      break;
    }
  }
});

app.get('/posts', cors(corsOptions), async (req, res) => {
  res.send(JSON.stringify(Object.fromEntries(posts)));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});