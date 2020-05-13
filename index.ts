import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import apiRoutes from './src/api-routes'

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/resthub', { useNewUrlParser: true});

const db = mongoose.connection;

if(!db)
  console.error('Error connecting db')

app.use('/api', apiRoutes);

app.listen(port, function () {
  console.log('Running RestHub on port ' + port);
});
