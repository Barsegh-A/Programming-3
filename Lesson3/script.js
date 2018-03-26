 function main(){
     
    socket = io.connect();   
    function handleSubmit(evt) {
        socket.emit("send data", matrix);
    }
    
    

    
}

window.onload = main;

var side = 25;
    var rnd = [0, 1];
    var rand = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 4]; 
    var arr = [];
    var n = 32;//prompt("Please, specify the number of rows!");
    var m = 32;//prompt("Please, specify the number of colums!");
    var grassArr = [];
    var herbArr = [];
    var predArr = [];
    var superArr = [];
    var genArr = [];
    var ggt = [0, Grass, Herb, Predator, Super];
    var gga = [0, grassArr, herbArr, predArr, superArr];
    var matrix = [];

    var st = document.getElementById("season");
    var seasons = ["Winter", "Spring", "Summer", "Autumn"];
    var si = 0;
    function changeSeason() {
        si++;
        if (si >= seasons.length) {
            si = 0;
        }
        st.innerText = seasons[si];
        //console.log(st.innerText);

    }
    setInterval(changeSeason, 5000);

    var colorGrass = "Green";
    var multGrass = 8;

    function bomb(){
        var bl = 2;
        var bombY = floor(random(2,30));//floor(random(matrix.length)) > 32 ? 32 : floor(random(matrix.length));;
        var bombX = floor(random(2,30));//floor(random(matrix[bombY].length)) > 32 ? 32 : floor(random(matrix[bombY].length));
        var bombmatrix = [
            [bombY-1, bombX-1],
            [bombY-1, bombX],
            [bombY-1, bombX+1],
            [bombY, bombX-1],
            [bombY, bombX],
            [bombY, bombX+1],
            [bombY+1, bombX-1],
            [bombY+1, bombX],
            [bombY+1, bombX+1],
        ];
        for(var i = 0; i<bombmatrix.length; i++){
            matrix[bombmatrix[i][0]][bombmatrix[i][1]] = 6;
        }
        // return [bombX, bombY];
    }
    //setInterval(bomb, 5000);

function setup() {
        frameRate(5);
        createCanvas(n * side, m * side);
        background('#acacac');

        for (i = 0; i < n; i++) {
            matrix[i] = [];
            for (a = 0; a < m; a++) {
                matrix[i][a] = random(rand);
            }
        }

        matrix[14][15] = 2;
        matrix[0][0] = 3;
        matrix[3][13] = 4;
        matrix[24][24] = 11;
        matrix[7][24] = 12;
        matrix[7][7] = 13;
        matrix[24][7] = 14;


        for (var y = 0; y < matrix.length; ++y) {
            for (var x = 0; x < matrix[y].length; ++x) {
                if (matrix[y][x] == 1) {
                    var gr = new Grass(x, y);
                    grassArr.push(gr);
                }
                else if (matrix[y][x] == 2) {
                    herbArr.push(new Herb(x, y, 2, 5, 1));
                }
                else if (matrix[y][x] == 3) {
                    predArr.push(new Predator(x, y, 3, 10, 1));
                }
                else if (matrix[y][x] == 4) {
                    superArr.push(new Super(x, y, 4, 15, 1));
                }
                else if (matrix[y][x] == 11) {
                    //grassGen = new Generator(x, y, 1);
                    genArr.push(new Generator(x, y, 1));
                }
                else if (matrix[y][x] == 12) {
                    genArr.push(new Generator(x, y, 2));
                }
                else if (matrix[y][x] == 13) {
                    genArr.push(new Generator(x, y, 3));
                }
                else if (matrix[y][x] == 14) {
                    genArr.push(new Generator(x, y, 4));
                }
            }
        }
        //console.log(grassArr, herbArr);
    }


    function draw() {

        if (si == 0) {
            colorGrass = "#3F4B2E";
            multGrass = 8;
        }
        else if (si == 1) {
            colorGrass = "Green";
            multGrass = 5;
        }
        else if (si == 2) {
            colorGrass = "#06500B";
            multGrass = 6;
        }
        else {
            colorGrass = "#4C6A41";
            multGrass = 7;
        }

        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {

                if (matrix[y][x] == 1) {
                    fill(colorGrass);
                    rect(x * side, y * side, side, side);
                }
                else if (matrix[y][x] == 2) {
                    fill("yellow");
                    rect(x * side, y * side, side, side);
                }
                else if (matrix[y][x] == 0) {
                    fill("#acacac");
                    rect(x * side, y * side, side, side);
                }
                else if (matrix[y][x] == 3) {
                    fill("red");
                    rect(x * side, y * side, side, side);
                }
                else if (matrix[y][x] == 4) {
                    fill("blue");
                    rect(x * side, y * side, side, side);
                }
                else if (matrix[y][x] == 6) {
                    fill("black");
                    rect(x * side, y * side, side, side);
                }
                else if (matrix[y][x] == 11) {
                    fill("#0B2D00");
                    rect(x * side, y * side, side, side);
                }
                else if (matrix[y][x] == 12) {
                    fill("#DADA00");
                    rect(x * side, y * side, side, side);
                }
                else if (matrix[y][x] == 13) {
                    fill("#801515");
                    rect(x * side, y * side, side, side);
                }
                else if (matrix[y][x] == 14) {
                    fill("#140888");
                    rect(x * side, y * side, side, side);
                }
            }
        }

        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                for (var a in grassArr) {
                    if (grassArr[a].x == x && grassArr[a].y == y && matrix[y][x] == 0) {
                        grassArr.splice(a, 1);
                    }
                }
            }
        }


        for (var i in grassArr) {
            grassArr[i].mult(multGrass);
        }

        for (var i in herbArr) {
            if (herbArr[i].freespace(1)[0]) {
                herbArr[i].eat();
            }
            else {
                herbArr[i].move();
            }

            /*if (herbArr[i].freespace(2)) {
                var multHerb = herbArr[i].freespace(2);
                //console.log(multHerb);
                if(multHerb.length > 0){
                    for (var a = 0; a < multHerb.length; a++) {
                        for (var b in herbArr) {
                            if (multHerb[a][0] == herbArr[b].x && multHerb[a][1] == herbArr[i].y && herbArr[i].gender != herbArr[b].gender) {
                                //setTimeout(herbArr[i].mult(), 1000);
                                herbArr[i].mult();
                                break;
                            }
                            break;
                        }
                    }
                }
            }*/
            herbArr[i].mult();


            if (herbArr[i].energy == 0) {
                herbArr[i].die();

            }
        }




        for (var i in predArr) {
            if (predArr[i].freespace(2)[0]) {
                predArr[i].eat();
            }
            else {
                predArr[i].move();
            }

                predArr[i].mult();
            

            if (predArr[i].energy == 0) {
                predArr[i].die();
            }
        }




        for (var i in superArr) {
            if (superArr[i].freespace(1)[0] || superArr[i].freespace(2)[0] || superArr[i].freespace(3)[0]) {
                superArr[i].eat1();
            }
            else {
                superArr[i].move();
            }

            /*if (superArr[i].ttl >= 15) {
                superArr[i].ttl = 0;
                superArr.push(new Super(superArr[i].x, superArr[i].y, 4, 15));
                matrix[superArr[i].y][superArr[i].x] = 4;
            }*/
            superArr[i].mult();

            if (superArr[i].energy == 0) {
                for (var a in superArr) {
                    if (superArr[a].x == superArr[i].x && superArr[a].y == superArr[i].y) {
                        matrix[superArr[i].y][superArr[i].x] = 0;
                        superArr.splice(a, 1);
                    }
                }
            }
        }

        for (var i in genArr) {
            genArr[i].mult();
        }



        //console.log(herbArr, grassArr, predArr); 
        //console.log(grassArr.length); 

        if(frameCount%60==0){
            console.log("dse");
            handleSubmit();
        }

    }


/*
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


}*/