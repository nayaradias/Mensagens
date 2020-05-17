const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const app = express();
const path = require('path');
const cors = require('cors');
// const router
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/api-messages', { useUnifiedTopology: true, useNewUrlParser: true });
app.use('/files',express.static(path.resolve(__dirname,'./tmp/uploads')));
requireDir('./src/models');
app.use('/api',require('./src/routes'));

app.listen(3001);