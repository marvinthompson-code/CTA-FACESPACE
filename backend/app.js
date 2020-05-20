const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const likesRouter = require('./routes/likes');
const hashtagsRouter = require('./routes/hashtags');
const commentsRouter = require('./routes/comments');

app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/likes', likesRouter);
app.use('/hashtags', hashtagsRouter);
app.use('/comments', commentsRouter);

app.listen(PORT, () => {
    console.log("Listening on port ", PORT)
})