const socket = io();

socket.on('welcome', message=>{
    console.log(message);
});