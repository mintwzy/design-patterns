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

    setSide(direction: Direction, map: MapSite): void {

    }

    enter() {

    }
}

class RoomWithBomb extends Room {}

class Wall implements MapSite {
   constructor() {
   }

   enter() {
   }
}

class BombedWall extends Wall {}

class Door implements MapSite {
    constructor(r1: Room, r2: Room) {
    }

    enter() {
    }
}

class Maze implements IMaze {
    constructor() {
    }
    addRoom(room: Room) {
    }
    roomNo(num: number): Room {
    }
}

namespace Poor {
  /*
  Another class we define is MazeGame, which creates the maze. One straightforward way to create a maze is with a
  series of operations that add components to a maze and then interconnect them. For example, the following member
  function will create a maze consisting of two rooms with a door between them:

  This function is pretty complicated, considering that all it does is create a maze with two rooms. There are obvious
  ways to make it simpler. For example, the Room constructor could initialize the sides with walls ahead of time. But
  that just moves the code somewhere else. The real problem with this member function isn’t its size but its
  inflexibility. It hard-codes the maze layout. Changing the layout means changing this member function, either by
  overriding it—which means reimplementing the whole thing—or by changing parts of it—which is error-prone and doesn’t
  promote reuse.
   */
  class MazeGame {
    createMaze(): IMaze {
      const maze: Maze = new Maze()
      const r1: Room = new Room(1)
      const r2: Room = new Room(2)
      const door: Door = new Door(r1, r2)

      maze.addRoom(r1)
      maze.addRoom(r2)

      r1.setSide(Direction.NORTH, new Wall())
      r1.setSide(Direction.EAST, door)
      r1.setSide(Direction.SOUTH, new Wall())
      r1.setSide(Direction.WEST, new Wall())

      r2.setSide(Direction.NORTH, new Wall())
      r2.setSide(Direction.EAST, new Wall())
      r2.setSide(Direction.SOUTH, new Wall())
      r2.setSide(Direction.WEST, door)

      return maze;
    }
  }
}

export {
    IMaze,
    IMazeGame,
    Wall,
    BombedWall,
    Room,
    RoomWithBomb,
    Door,
    Direction,
    Maze
}





















