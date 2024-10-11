import express from 'express';
import bodyParser from 'body-parser';
import cors, { CorsOptions } from "cors";
import axios from 'axios';

const postURL = 'http://localhost:4000/events';
const commentURL = 'http://localhost:4100/events';
const serviceURL = 'http://localhost:4200/events';

const app = express();
const port = 4500;
app.use(bodyParser.json());
app.use(cors());

const corsOptions: CorsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
}

app.post('/events', cors(corsOptions), async (req, res) => {
  const event = req.body;
  
  axios.post(postURL, event).catch(err => {
    console.log("Post Event Error: " + err);
  });

  axios.post(postURL, event).catch(err => {
    console.log("Comment Event Error: " + err);
  });

  axios.post(postURL, event).catch(err => {
    console.log("Query Event Error: " + err);
  });
  
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});