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