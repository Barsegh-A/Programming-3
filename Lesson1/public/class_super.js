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