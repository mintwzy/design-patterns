import {Direction, Door, IMaze, Room, Wall} from "../index";

/*
Class MazeFactory can create components of mazes. It builds rooms, walls, and doors between rooms. It might be used by
a program that reads plans for mazes from a file and builds the corresponding maze. Or it might be used by a program
that builds mazes randomly. Programs that build mazes take a MazeFactory as an argument so that the programmer can
specify the classes of rooms, walls, and doors to construct.
 */
interface IMazeFactory {
    makeMaze(): IMaze;
    makeWall(): Wall;
    makeRoom(n: number): Room;
    makeDoor(r1: Room, r2: Room): Door;
}

/*
Recall that the member function CreateMaze (page 84) builds a small maze consisting of two rooms with a door between
them. CreateMaze hard-codes the class names, making it difficult to create mazes with different components.

Here’s a version of CreateMaze that remedies that shortcoming by taking a MazeFactory as a parameter:
 */
class MazeGame {
    constructor() {
    }

    createMaze(factory: IMazeFactory): IMaze {
        const maze: IMaze = factory.makeMaze();
        const r1: Room = factory.makeRoom(1)
        const r2: Room = factory.makeRoom(2)
        const door: Door = factory.makeDoor(r1, r2)

        maze.addRoom(r1)
        maze.addRoom(r2)

        r1.setSide(Direction.NORTH, factory.makeWall())
        r1.setSide(Direction.EAST, door)
        r1.setSide(Direction.SOUTH, factory.makeWall())
        r1.setSide(Direction.WEST, factory.makeWall())

        r2.setSide(Direction.NORTH, factory.makeWall())
        r2.setSide(Direction.EAST, factory.makeWall())
        r2.setSide(Direction.SOUTH, factory.makeWall())
        r2.setSide(Direction.WEST, door)

        return maze;
    }
}

export default IMazeFactory
















