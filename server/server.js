const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport');
require('./config/passport-setup');
// const songController = require('./controllers/songController');
// const apiController = require('./controllers/apiController');
// const userController = require('./controllers/userController');

const PORT = process.env.PORT || 3000;
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

const authRoute = require('./routes/auth');
const apiRoute = require('./routes/api');

// Initialize passport
app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Use routes
app.use('/auth', authRoute);
app.use('/api/v1', apiRoute);

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'));
});

io.on('connection', socket => {
  console.log('User connected!!', socket.id);
  socket.on('join_room', room => {
    socket.join(room);
    console.log('User joined room:   ', room);
  });

  socket.on('chat', data => {
    console.log('Getting chat from room', data);
    io.to(data.room).emit('chat', data.message);
  });
});

/**
 * ***************************************
 * Serve static files in production mode *
 * ***************************************
 */
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join((__dirname, '../client'))));

  app.use('/build', express.static(path.resolve(__dirname, '../build')));

  // Handle redirects
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/index.html'));
  });
}

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Untracked error caught in global error handler',
    status: 500,
    message: 'Check logs for more information',
  };

  const returnErr = Object.assign(defaultErr, err);

  // Print error in terminal
  console.log(returnErr);
  res.status(501).json({ message: 'Internal server error' });
});

http.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
