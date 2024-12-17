export class Node {
    constructor(x, y, dir, distanceFunction, neighborsFunction) {
        this.x = x;
        this.y = y;
        this.dir = dir;
        this.distanceFunction = distanceFunction;
        this.neighborsFunction = neighborsFunction
    }

    distance(other) {
        return this.distanceFunction(this, other);
    }

    neighbors() {
        return this.neighborsFunction(this);
    }
}

export class A_Star {


    constructor(start, goal, h) {
        this.start = start;
        this.goal = goal;
        this.h = h;
        this.openSet = [start];
        this.cameFrom = {};
        this.gScore = {};
        this.gScore[start] = 0;
        this.fScore = {};
        this.fScore[start] = h(start, goal);
    }

    reconstructPath(current) {
        let totalPath = [current];
        while(this.cameFrom[current]) {
            current = this.cameFrom[current];
            totalPath.push(current);
        }
        return totalPath;
    }

    step() {
        let current = this.openSet.shift();
        if(current === this.goal) {
            return this.reconstructPath(current);
        }
        for(let neighbor of current.neighbors()) {
            let tentative_gScore = this.gScore[current] + current.distance(neighbor);
            if(tentative_gScore < this.gScore[neighbor]) {
                this.cameFrom[neighbor] = current;
                this.gScore[neighbor] = tentative_gScore;
                this.fScore[neighbor] = tentative_gScore + this.h(neighbor, this.goal);
                if(!this.openSet.includes(neighbor)) {
                    this.openSet.push(neighbor);
                }
            }
        }
        return null;
    }

    run() {
        while(this.openSet.length > 0) {
            let result = this.step();
            if(result) {
                return result;
            }
        }
        return null;
    }

    
}