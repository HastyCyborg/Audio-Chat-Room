# Audio Chat Room System for SM Application

This Project is part of SyntHeim internship project, developed by Prakhar Bhatnagar.

## Tasks at hand:
### Server Side
- [x] Establish Socket.io connection
- [x] Enable Peer Connection through sockets using Peer Js
- [x] Auto Generating Rooms and Socket Rooms for users to join
- [x] Document till this point

### Testing/Client Side
- [x] Establish Socket.io connection
- [x] Enable Peer Connection using Peer data coming from server
- [x] Sending and receiving the Stream (audio + video)
- [] Allowing users to Mute and Unmute themselves
- [] Creating a leave button to exit the user

## Next To DO:
- Allowing People to send messages in the rooms
- Generate Roles
    - Allowing only speakers to speak and
    - Leader/Mod to moderate the rooms


Main Files: 
- server.js
- script.js

## Running instructions:
Peer js must be installed on system globally

Two scripts are to be run on different terminal:
- peerjs --port 3001
- npm run devStart
The app will be available on localhost:3000