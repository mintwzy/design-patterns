/*
Creational design patterns abstract the instantiation process. They help make a system independent of how its objects
are created, composed, and represented. A class creational pattern uses inheritance to vary the class that’s instantiated,
whereas an object creational pattern will delegate instantiation to another object.

Creational patterns become important as systems evolve to depend more on object composition than class inheritance.
As that happens, emphasis shifts away from hard-coding a fixed set of behaviors toward defining a smaller set of
fundamental behaviors that can be composed into any number of more complex ones. Thus creating objects with particular
behaviors requires more than simply instantiating a class.


 */

/**
 * The class MapSite is the common abstract class for all the components of a maze. To simplify the example, MapSite
 * defines only one operation, Enter. Its meaning depends on what you’re entering. If you enter a room, then your
 * location changes. If you try to enter a door, then one of two things happen: If the door is open, you go into the
 * next room. If the door is closed, then you hurt your nose.
 */
interface MapSite {
    enter(): void
}

interface IMaze {
    addRoom(room: Room): void;

    roomNo(num: number): Room
}

interface IMazeGame {
    createMaze(): IMaze;
}

enum Direction {
    NORTH,
    SOUTH,
    EAST,
    WEST
}

/**
 * Room is the concrete subclass of MapSite that defines the key relationships between components in the maze. It
 * maintains references to other MapSite objects and stores a room number. The number will identify rooms in the maze.
 */
class Room implements MapSite {
    _roomNumber: number
    _sides: MapSite[]

    constructor(roomNo: number) {
        this._roomNumber = roomNo
        this._sides = []
    }

    getSide(direction: Direction): MapSite {

    }

    setSide(direction: Direction, map: MapSite): void {

    }

    enter() {

    }
}

class Wall implements MapSite {
   constructor() {
   }

   enter() {
   }
}

class Door implements MapSite {
    constructor() {
    }

    enter() {
    }
}

namespace Poor {

}

export {
    IMaze,
    IMazeGame,
    Wall,
    Room,
    Door,
    Direction
}





















