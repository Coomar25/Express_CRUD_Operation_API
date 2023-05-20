import express from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/user.js'

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', userRoutes);

app.listen(port, () => {
    console.log(`server is running on port: http://localhost:${port}`);
})

app.get('/', (req, res) => res.send("Hello This Message is from Express Server"));
app.get('*', (req, res) => res.send("The URL doesn't exixt"));
