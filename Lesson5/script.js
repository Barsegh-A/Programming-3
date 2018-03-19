
var socket;

function main() {
    socket = io.connect('http://localhost:3000');
    //var chatDiv = document.getElementById('chat');
    //var input = document.getElementById('message');
    //var button = document.getElementById('submit');

    function handleMessage(msg) {
        fill("#00ff00");
        if (msg.length == 2) {
            rect(msg[0], msg[1], 25, 25);
        }
    }




    socket.on('display message', handleMessage);
} // main closing bracket

window.onload = main;

function setup() {
    frameRate(20);
    createCanvas(512, 512);
    background('#acacac');

}
var m = [];
//var arr = [];
function draw() {
    fill("#00ff00");
    if (m.length == 2) {
        rect(m[0], m[1], 25, 25);
    }
}
function mouseDragged() {

    function handleSubmit(evt) {
        socket.emit("send img", m);
    }
    m = [mouseX, mouseY]
    //arr.push(m);
    handleSubmit();


}