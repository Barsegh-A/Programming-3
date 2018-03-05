var side = 25;
var rnd = [0, 1];
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

function setup() {
    frameRate(5);
    createCanvas(n * side, m * side);
    background('#acacac');

    for (i = 0; i < n; i++) {
        matrix[i] = [];
        for (a = 0; a < m; a++) {
            matrix[i][a] = random(rnd);
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
                herbArr.push(new Herb(x, y));
            }
            else if (matrix[y][x] == 3) {
                predArr.push(new Predator(x, y));
            }
            else if (matrix[y][x] == 4) {
                superArr.push(new Super(x, y));
            }
            else if (matrix[y][x] == 11)
            {
                //grassGen = new Generator(x, y, 1);
                genArr.push(new Generator(x, y, 1));
            }
            else if (matrix[y][x] == 12)
            {
                genArr.push(new Generator(x, y, 2));
            }
            else if (matrix[y][x] == 13)
            {
                genArr.push(new Generator(x, y, 3));
            }
            else if (matrix[y][x] == 14)
            {
                genArr.push(new Generator(x, y, 4));
            }
        }
    }
    //console.log(grassArr, herbArr);
}


function draw() {



    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
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
            for(var a in grassArr){
                if(grassArr[a].x == x && grassArr[a].y == y && matrix[y][x] == 0){
                    grassArr.splice(a,1);
                }
            }
        }
    }

    

   
    for (var i in herbArr) {
        if (herbArr[i].freespace(1)[0]) {
            herbArr[i].eat();
            for(var a in grassArr){
                if(grassArr[a].x == herbArr[i].x && grassArr[a].y == herbArr[i].y){
                    //grassArr[a].die(a);
                    grassArr.splice(a,1);
                    break;
                }
            }
        }
        else {
            herbArr[i].move();
        }
        if (herbArr[i].ttl == 5) {
            herbArr[i].ttl = 0;
            herbArr.push(new Herb(herbArr[i].x, herbArr[i].y));
        }

        if (herbArr[i].energy == 0) {
            for (var a in herbArr) {
                if (herbArr[a].x == herbArr[i].x && herbArr[a].y == herbArr[i].y) {
                    matrix[herbArr[i].y][herbArr[i].x] = 0;
                    herbArr.splice(a, 1);

                }
            }

        }
    }

     for (var i in grassArr) {
        grassArr[i].mult();
    }


    for (var i in predArr) {
        if (predArr[i].freespace(2)[0]) {
            predArr[i].eat();
        }
        else {
            predArr[i].move();
        }

        if (predArr[i].ttl == 5) {
            predArr[i].ttl = 0;
            predArr.push(new Predator(predArr[i].x, predArr[i].y));
            matrix[predArr[i].y][predArr[i].x] = 3;
        }


        if (predArr[i].energy == 0) {
            for (var a in predArr) {
                if (predArr[a].x == predArr[i].x && predArr[a].y == predArr[i].y) {
                    matrix[predArr[i].y][predArr[i].x] = 0;
                    predArr.splice(a, 1);
                }
            }
        }
    }

    for (var i in superArr) {
        if (superArr[i].freespace(1)[0] || superArr[i].freespace(2)[0] || superArr[i].freespace(3)[0]) {
            superArr[i].eat();
        }
        else {
            superArr[i].move();
        }

        if (superArr[i].ttl >= 15) {
            superArr[i].ttl = 0;
            superArr.push(new Super(superArr[i].x, superArr[i].y));
            matrix[superArr[i].y][superArr[i].x] = 4;
        }

        if (superArr[i].energy == 0) {
            for (var a in superArr) {
                if (superArr[a].x == superArr[i].x && superArr[a].y == superArr[i].y) {
                    matrix[superArr[i].y][superArr[i].x] = 0;
                    superArr.splice(a, 1);
                }
            }
        }
    }

    for(var i in genArr){
        genArr[i].mult();
    }



    //console.log(herbArr, grassArr, predArr); 
    //console.log(grassArr.length);   
}

