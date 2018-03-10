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