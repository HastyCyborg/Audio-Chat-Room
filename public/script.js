const socket = io('/')

// Taking Video Grid from Room page 
const videoGrid = document.getElementById('video-grid')

// The Peer object is where we create and receive connections.
const myPeer = new Peer(undefined, {
  host: '/',
  port: '3001'
})

const peers = {}

const myVideo = document.createElement('video')
myVideo.muted = true    

navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
  
  // Appends the video to the video grid and starts playing it
  addVideoStream(myVideo, stream)

  /* 
    To answer a call made by a call starter, 
    here our video stream is passed as an when answered the call and the
    call starter passes its stream to us, received on 'stream'

    Creates a video element and calls and whenever other user's video
    stream is availabe on 'stream' it adds it using addVideoStream
  */
  myPeer.on('call', call => {
    call.answer(stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream)
    })
  })

  /* 
    Socket io informs when a new user joins room,
    we call this function connectToNewUser for the same
    and give them our stream
  */
  socket.on('user-connected', userId => {
    connectToNewUser(userId, stream)
  })
})

// Disconnects the user when signal comes from socketio
socket.on('user-disconnected', userId => {
  if (peers[userId]) peers[userId].close()
})

myPeer.on('open', id => {
  // Here id is this user's peer id
  socket.emit('join-room', ROOM_ID, id)
})


/*
  Function to connect to new Peer
  Arguments: userId --> Peer id of the new user
             stream --> Our video stream

  It calls the new peer and gives them our stream
  Their stream will come to us when they accept our call, 
  and return to us their stream.
  Removes the video when call ends.
  Finally it appends the new userId to peers list
*/
function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream)
  const video = document.createElement('video')
  call.on('stream', userVideoStream => {
    addVideoStream(video, userVideoStream)
  })
  call.on('close', () => {
    video.remove()
  })

  peers[userId] = call
}



/*  addVideoStream function
    
    Arguments: video  --> The video element from room DOM
               stream --> The video stream coming from webcam & mic
    Returns Nothing

    Appends the video to the video grid and starts playing it
*/
function addVideoStream(video, stream) {
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  videoGrid.append(video)
}