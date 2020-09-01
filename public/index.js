

// console.log("omsairam");
const socket = io('/');
const videoDisplay = document.getElementById('video-grid');
const myvideo = document.createElement('video');
myvideo.muted = true;


var peer = new Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port: '8000',
});

let myvideoStream;
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,


}).then(stream => {
    myvideoStream = stream;
    addVideoStraem(myvideo, stream);

    peer.on('call', call => {
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
            addVideoStraem(video, userVideoStream)
        })
    })


    let username = prompt("Please enter your name ")
    console.log(username)

    socket.emit('new- user-joined', username)

    socket.on('user-joined', username => {
        $('.message').append(`<li><br>${username}</li>` + "has joined the meeting")


    })



    socket.on('user-connected', (userId) => {
        connecttouser(userId, stream);


    })
    socket.on('createMessage', message => {
        $('.message').append(`<li><br>${message} </li> `)
    })
})

peer.on('open', id => {
    console.log(id);

    socket.emit('join-room', RoomI_d, id);
})



const connecttouser = (userId, stream) => {
    console.log(userId);
    const call = peer.call(userId, stream)
    const video = document.getElementById('video')
    call.on('stream', userVideoStream => {
        addVideoStraem(video, userVideoStream)
    })

    console.log("a new user has been joined")
}


const addVideoStraem = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    })
    videoDisplay.append(video)
}
let msg = $('input');


$('html').keydown((e) => {
    if (e.which == 13 && msg.val().length !== 0) {
        console.log(msg.val());
        socket.emit('message', msg.val());
        msg.val('');
    }
})
const muteunmute = () => {
    const enabled = myvideoStream.getAudioTracks()[0].enabled;
    if (enabled) {
        myvideoStream.getAudioTracks()[0].enabled = false;
    }
    else {
        myvideoStream.getAudioTracks()[0].enabled = true;
    }
}
const videojj = () => {
    const enabled = myvideoStream.getVideoTracks()[0].enabled
    if (enabled) {
        myvideoStream.getVideoTracks()[0].enabled = false;
    }
    else {
        myvideoStream.getVideoTracks()[0].enabled = true;
    }
}