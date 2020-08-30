// console.log("omsairam");

const socket = io('/');
const videoDisplay = document.getElementById('video-grid');
const myvideo = document.createElement('video');
myvideo.muted = true;

let myvideoStream;
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,


}).then(stream => {
    myvideoStream = stream;
    addVideoStraem(myvideo, stream);
})


// socket.emit('join-room');



const addVideoStraem = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    })
    videoDisplay.append(video)
}
