import api from './api/index.js';
import express from 'express';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/public', express.static('public'));
app.use(cors())

app.use('/api/v1', api);
export default app;
