/*
First we’ll define factory methods in MazeGame for creating the maze, room, wall, and door objects:
 */
import {BombedWall, Direction, Door, IMaze, Maze, Room, RoomWithBomb, Wall} from "../index";

class MazeGame {

    createMaze(): IMaze {
        const maze: IMaze = this.maeMaze();

        const r1: Room = this.makeRoom(1)
        const r2: Room = this.makeRoom(2)
        const door: Door = this.makeDoor(r1, r2)

        maze.addRoom(r1)
        maze.addRoom(r2)

        r1.setSide(Direction.NORTH, this.makeWall())
        r1.setSide(Direction.EAST, door)
        r1.setSide(Direction.SOUTH, this.makeWall())
        r1.setSide(Direction.WEST, this.makeWall())

        r2.setSide(Direction.NORTH, this.makeWall())
        r2.setSide(Direction.EAST, this.makeWall())
        r2.setSide(Direction.SOUTH, this.makeWall())
        r2.setSide(Direction.WEST, door)

        return maze
    }

    maeMaze(): Maze {
        return new Maze()
    }

    makeRoom(n: number): Room {
        return new Room(n)
    }

    makeWall(): Wall {
        return new Wall()
    }

    makeDoor(r1: Room, r2: Room): Door {
        return new Door(r1, r2)
    }
}

/*
Different games can subclass MazeGame to specialize parts of the maze. MazeGame subclasses can redefine some or all of
the factory methods to specify variations in products. For example, a BombedMazeGame can redefine the Room and Wall
products to return the bombed varieties:
 */
class BombedMazeGame extends MazeGame {

    makeWall(): Wall {
        return new BombedWall()
    }

    makeRoom(n: number): Room {
        return new RoomWithBomb(n)
    }
}





























