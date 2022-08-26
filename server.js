const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4: uuidV4 } = require('uuid')

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect(`/${uuidV4()}`)
})

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})

/* 
  Whenever there is a new connection over socket io this is called.

  When a peer is loaded, its peer Id (userId) is sent over 'join-room'
  through socketio along with the room code
  
  It makes the received socket connection join the room with roomId
  and emits on 'user-connected' channel of that socket room informing 
  someone new has joined.
  They then connect to this new user on their own with PeerJs through
  connectToNewUser(userId, stream) function.
*/
io.on('connection', socket => {
  // roomId: socket room (url from webpage)      userId: PeerJS id
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.to(roomId).emit('user-connected', userId)

    socket.on('disconnect', () => {
      socket.to(roomId).emit('user-disconnected', userId)
    })
  })
})

server.listen(3000)