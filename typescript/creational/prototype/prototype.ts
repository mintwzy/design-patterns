import IMazeFactory from "../abstract-factory/abstract-factory";
import {BombedWall, Door, IMaze, Maze, Room, Wall} from "../index";

/*
We’ll define a MazePrototypeFactory subclass of the MazeFactory class (page 92). MazePrototypeFactory will be
initialized with prototypes of the objects it will create so that we don’t have to subclass it just to change the classes of walls or rooms it creates.
 */
class MazePrototypeFactory implements IMazeFactory {
    prototypeMaze: IMaze
    prototypeWall: Wall
    prototypeRoom: Room
    prototypeDoor: Door

    /*
    MazePrototypeFactory augments the MazeFactory interface with a constructor that takes the prototypes as arguments:

    The new constructor simply initializes its prototypes:
     */
    constructor(maze: IMaze, wall: Wall, room: Room, door: Door) {
        this.prototypeMaze = maze
        this.prototypeWall = wall
        this.prototypeRoom = room
        this.prototypeDoor = door
    }

    /*
    The member functions for creating walls, rooms, and doors are similar: Each clones a prototype and then initializes it.
     */
    makeWall(): Wall {
        return this.prototypeWall.clone()
    }

    makeDoor(r1: Room, r2: Room): Door {
        const door: Door = this.prototypeDoor.clone()
        door.initialize(r1, r2)
        return door
    }
}

/*
We can use MazePrototypeFactory to create a prototypical or default maze just by initializing it with prototypes of
basic maze components:
 */
const mazePrototypeFactory: MazePrototypeFactory = new MazePrototypeFactory(new Maze(), new Wall(), new Room(), new Door())
const mazePrototypeFactory2: MazePrototypeFactory = new MazePrototypeFactory(new Maze(), new BombedWall(), new Room(), new Door())


























