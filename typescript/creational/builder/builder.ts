/**
 */
import {Direction, Door, IMaze, Maze, Room, Wall} from "../index";

/*
Note that MazeBuilder does not create mazes itself; its main purpose is just to define an interface for creating mazes.
It defines empty implementations primarily for convenience. Subclasses of MazeBuilder do the actual work.
 */
interface IMazeBuilder {
  buildMaze(): void
  buildRoom(room: number): void
  buildDoor(roomFrom: number, roomTo: number): void

  getMaze(): IMaze
}

class MazeGame {
  /*
  Compare this version of CreateMaze with the original. Notice how the builder hides the internal representation of
  the Maze—that is, the classes that define rooms, doors, and walls—and how these parts are assembled to complete the
  final maze. Someone might guess that there are classes for representing rooms and doors, but there is no hint of one
  for walls. This makes it easier to change the way a maze is represented, since none of the clients of MazeBuilder has
  to be changed.
   */
  createMaze(builder: IMazeBuilder): IMaze {
    builder.buildMaze();

    builder.buildRoom(1)
    builder.buildRoom(2)
    builder.buildDoor(1, 2)

    return builder.getMaze();
  }

  /*
  Like the other creational patterns, the Builder pattern encapsulates how objects get created, in this case through
  the interface defined by MazeBuilder. That means we can reuse MazeBuilder to build different kinds of mazes. The
  CreateComplexMaze operation gives an example:
   */
  createComplexMaze(builder: IMazeBuilder): IMaze {
    builder.buildRoom(1)
    // ...
    builder.buildRoom(1001)

    return builder.getMaze()
  }
}

class StandardMazeBuilder implements IMazeBuilder {
  _currentMaze: IMaze

  constructor() {
  }

  /*
  CommonWall is a utility operation that determines the direction of the common wall between two rooms.
   */
  commonWall(room1: Room, room2: Room): Direction {

  }

  /*
  BuildMaze instantiates a Maze that other operations will assemble and eventually return to the client (with GetMaze).
   */
  buildMaze() {
    this._currentMaze = new Maze()
  }

  getMaze(): IMaze {
    return this._currentMaze;
  }

  /*
  The BuildRoom operation creates a room and builds the walls around it:
   */
  buildRoom(n: number) {
    if(!this._currentMaze.roomNo(n)){
      const room: Room = new Room(n)
      this._currentMaze.addRoom(room)

      room.setSide(Direction.NORTH, new Wall())
      room.setSide(Direction.SOUTH, new Wall())
      room.setSide(Direction.EAST, new Wall())
      room.setSide(Direction.WEST, new Wall())
    }
  }

  /*
  To build a door between two rooms, StandardMazeBuilder looks up both rooms in the maze and finds their adjoining wall
   */
  buildDoor(roomFrom: number, roomTo: number) {
    const room1: Room = this._currentMaze.roomNo(roomFrom)
    const room2: Room = this._currentMaze.roomNo(roomTo)

    const door: Door = new Door(room1, room2)

    room1.setSide(this.commonWall(room1, room2), door)
    room1.setSide(this.commonWall(room2, room1), door)
  }
}

// Clients can now use CreateMaze in conjunction with StandardMazeBuilder to create a maze:
const standardMazeBuilder: StandardMazeBuilder = new StandardMazeBuilder()
const game: MazeGame = new MazeGame()

game.createMaze(standardMazeBuilder)
const maze: IMaze = standardMazeBuilder.getMaze()

/*
A more exotic MazeBuilder is CountingMazeBuilder. This builder doesn’t create a maze at all; it just counts the
different kinds of components that would have been created.
 */
class CountingMazeBuilder implements IMazeBuilder {
  _doors: number
  _rooms: number

  /*
  The constructor initializes the counters, and the overridden MazeBuilder operations increment them accordingly.
   */
  constructor() {
    this._doors = 0
    this._rooms = 0
  }

  buildRoom(room: number) {
    this._rooms++;
  }

  buildDoor(roomFrom: number, roomTo: number) {
    this._doors++
  }

  getCount(): number[]{
    return [this._doors, this._rooms]
  }

  buildMaze() {
  }

  getMaze(): IMaze {
  }
}

const game2: MazeGame = new MazeGame()
const countingMazeBuilder: CountingMazeBuilder = new CountingMazeBuilder()
game2.createMaze(countingMazeBuilder)
console.log(countingMazeBuilder.getCount())

























