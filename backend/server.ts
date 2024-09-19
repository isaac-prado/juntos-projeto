import express from "express";
import { router } from "./src/routes/router";
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', router);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});