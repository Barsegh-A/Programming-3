class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.index = 1;
        this.multiply = 0;

        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];


    }

    freespace(ch) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    mult() {
        this.multiply++;
        var newcord = random(this.freespace(0));
        if (this.multiply >= 8 && newcord && matrix[this.y][this.x] != 0) {
            grassArr.push(new Grass(newcord[0], newcord[1]));
            matrix[newcord[1]][newcord[0]] = 1;
            this.multiply = 0;
        }
    }

    /*die(a){
        grassArr.splice(a,1);
        
    }*/

}

class Herb {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 5;
        this.ttl = 0;
        this.directions = [];
        this.index = 2;
    }

    getnewcoordinates() {
        this.directions = [];
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }

    freespace(c) {
        var found = [];
        this.getnewcoordinates();
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == c) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;

    }

    move() {
        var dir = random(this.freespace(0));
        if (dir) {
            matrix[this.y][this.x] = 0;
            this.x = dir[0];
            this.y = dir[1];
            matrix[this.y][this.x] = 2;
            this.ttl = 0;
            this.energy -= 1;
        }
        //return dir;
    }




    eat() {
      var dir = random(this.freespace(1));
      if(dir){
            matrix[this.y][this.x] = 0;
            this.x = dir[0];
            this.y = dir[1];
            matrix[dir[1]][dir[0]] = 2;

            /*for(var a in grassArr){
                if(grassArr[a].x == this.x && grassArr[a].y == this.y){
                    //grassArr[a].die(a);
                    grassArr.splice(a,1);
                    break;
                }
            }*/

            this.ttl += 1;
            this.energy = 5;

        }

        

    }


}

class Predator {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 15;
        this.ttl = 0;
        this.directions = [];
        this.index = 3;
    }

    getnewcoordinates() {
        this.directions = [];
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }


    freespace(ch) {
        var found = [];
        this.getnewcoordinates();
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {
        this.getnewcoordinates();
        var dir = random(this.freespace(0));
        var rt = random(this.freespace(1));
        if (dir) {
            matrix[this.y][this.x] = 0;
            this.x = dir[0];
            this.y = dir[1];
            matrix[this.y][this.x] = 3;
            this.energy -= 1;
            this.ttl = 0;
        }
        /*else if(rt){
            matrix[this.y][this.x] = 0;
            this.x = rt[0];
            this.y = rt[1];
            matrix[this.y][this.x] = 3;
            this.energy -= 1;
            this.ttl = 0;
        }
        */
    }

    eat() {
        var dir = random(this.freespace(2));
        if (dir) {
            matrix[this.y][this.x] = 0;
            this.x = dir[0];
            this.y = dir[1];
            matrix[this.y][this.x] = 3;
            for (var a in herbArr) {
                if (herbArr[a].x == dir[0] && herbArr[a].y == dir[1]) {
                    herbArr.splice(a, 1);
                }
            }

            this.ttl += 1;
            this.energy = 15;
        }
    }
}

class Super {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 15;
        this.ttl = 0;
        this.directions = [];
        this.index = 4;
    }

    getnewcoordinates() {
        this.directions = [];
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }


    freespace(ch) {
        var found = [];
        this.getnewcoordinates();
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {
        this.getnewcoordinates();
        var dir = random(this.freespace(0));
        if (dir) {
            matrix[this.y][this.x] = 0;
            this.x = dir[0];
            this.y = dir[1];
            matrix[this.y][this.x] = 4;
            this.energy -= 1;
            this.ttl = 0;
        }
    }

    wte() {

    }

    eat() {
        if (this.freespace(3)[0]) {
            var dir = random(this.freespace(3));
            var src = predArr;
            var pts = 3;
        }
        else if (this.freespace(2)[0]) {
            var dir = random(this.freespace(2));
            var src = herbArr;
            var pts = 2;
        }
        else if (this.freespace(1)[0]) {
            var dir = random(this.freespace(1));
            var src = grassArr;
            var pts = 1;
        }


        if (dir) {
            matrix[this.y][this.x] = 0;
            this.x = dir[0];
            this.y = dir[1];
            matrix[this.y][this.x] = 4;
            for (var a in src) {
                if (src[a].x == dir[0] && src[a].y == dir[1]) {
                    src.splice(a, 1);
                }
            }

            this.ttl += pts;
            this.energy = 15;
        }
    }
}

class Generator{
    constructor(x, y, ind){
        this.x = x;
        this.y = y;
        this.index = ind;
        this.directions = [];
        this.multiply = 0;
        this.type = ggt[this.index];
        this.sga = gga[this.index];
    }

    getnewcoordinates() {
        this.directions = [];
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    freespace(ch) {
        this.getnewcoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    /*mult() {
        this.multiply++;
        var newcord = random(this.freespace(0));
        if (this.multiply >= 5  && newcord) {
            this.sga.push(new this.type(newcord[0], newcord[1]));
            matrix[newcord[1]][newcord[0]] = this.index;
            this.multiply = 0;
        }
    }
    */

    mult() {
        this.multiply++;
        var newcord = random(this.freespace(0));
        var elsec = random(this.freespace(1));
        if (this.multiply >= 5  && newcord) {
            this.sga.push(new this.type(newcord[0], newcord[1]));
            matrix[newcord[1]][newcord[0]] = this.index;
            this.multiply = 0;
        }
        else if(this.multiply >= 5  && elsec &&  (this.index == 2 || this.index == 4)) {
            this.sga.push(new this.type(elsec[0], elsec[1]));
            matrix[elsec[1]][elsec[0]] = this.index;
            this.multiply = 0;
        }
    }

   /* mult() {
        this.multiply++;
        for(var i in this.freespace(0)){
            if (this.multiply >= 5  && i) {
                this.sga.push(new this.type(i[0], i[1]));
                matrix[i[1]][i[0]] = this.index;
                this.multiply = 0;
            }
        }
    }*/
}
