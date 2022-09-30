/**
 * ## Intent
 *
 * Separate the construction of a complex object from its representation so that the same construction process can
 * create different representations.
 *
 * ## Applicability
 *
 * Use the Builder pattern when
 *  - the algorithm for creating a complex object should be independent of the parts that make up the object and how
 *    they’re assembled.
 *  - the construction process must allow different representations for the object that’s constructed.
 *
 * ## Participants
 *
 * - Builder (TextConverter)
 *  – specifies an abstract interface for creating parts of a Product object.
 * - ConcreteBuilder (ASCIIConverter, TeXConverter, TextWidgetConverter)
 *  – constructs and assembles parts of the product by implementing the Builder interface.
 *  – defines and keeps track of the representation it creates.
 *  – provides an interface for retrieving the product (e.g., GetASCIIText, Get-Text Widget).
 * - Director (RTFReader)
 *  – constructs an object using the Builder interface.
 * - Product (ASCIIText, TeXText, TextWidget)
 *  – represents the complex object under construction. ConcreteBuilder builds the product’s internal representation
 *    and defines the process by which it’s assembled.
 *  – includes classes that define the constituent parts, including interfaces for assembling the parts into the final result.
 *
 * ## Collaborations
 *
 * - The client creates the Director object and configures it with the desired Builder object.
 * - Director notifies the builder whenever a part of the product should be built.
 * - Builder handles requests from the director and adds parts to the product.
 * - The client retrieves the product from the builder.
 *
 * ## Consequences
 *
 * 1. It lets you vary a product’s internal representation. The Builder object provides the director with an abstract
 *  interface for constructing the product. The interface lets the builder hide the representation and internal
 *  structure of the product. It also hides how the product gets assembled. Because the product is constructed through
 *  an abstract interface, all you have to do to change the product’s internal representation is define a new kind of
 *  builder.
 * 2. It isolates code for construction and representation. The Builder pattern improves modularity by encapsulating
 *  the way a complex object is constructed and represented. Clients needn’t know anything about the classes that define
 *  the product’s internal structure; such classes don’t appear in Builder’s interface.
 *
 *  Each ConcreteBuilder contains all the code to create and assemble a particular kind of product. The code is written
 *  once; then different Directors can reuse it to build Product variants from the same set of parts. In the earlier
 *  RTF example, we could define a reader for a format other than RTF, say, an SGMLReader, and use the same
 *  TextConverters to generate ASCIIText, TeXText, and TextWidget renditions of SGML documents.
 *
 * 3. It gives you finer control over the construction process. Unlike creational patterns that construct products in
 *  one shot, the Builder pattern constructs the product step by step under the director’s control. Only when the
 *  product is finished does the director retrieve it from the builder. Hence the Builder interface reflects the process
 *  of constructing the product more than other creational patterns. This gives you finer control over the construction
 *  process and consequently the internal structure of the resulting product.
 *
 * ## Implementation
 *
 * Typically there’s an abstract Builder class that defines an operation for each component that a director may ask it
 * to create. The operations do nothing by default. A ConcreteBuilder class overrides operations for components it’s
 * interested in creating.
 *
 * 1. Assembly and construction interface. Builders construct their products in step-by-step fashion. Therefore the
 *  Builder class interface must be general enough to allow the construction of products for all kinds of concrete
 *  builders.
 *
 *  A key design issue concerns the model for the construction and assembly process. A model where the results of
 *  construction requests are simply appended to the product is usually sufficient. In the RTF example, the builder
 *  converts and appends the next token to the text it has converted so far.
 *
 *  But sometimes you might need access to parts of the product constructed earlier. In the Maze example we present in
 *  the Sample Code, the MazeBuilder interface lets you add a door between existing rooms. Tree structures such as parse
 *  trees that are built bottom-up are another example. In that case, the builder would return child nodes to the
 *  director, which then would pass them back to the builder to build the parent nodes.
 *
 * 2. Why no abstract class for products? In the common case, the products produced by the concrete builders differ so
 *  greatly in their representation that there is little to gain from giving different products a common parent class.
 *  In the RTF example, the ASCIIText and the TextWidget objects are unlikely to have a common interface, nor do they
 *  need one. Because the client usually configures the director with the proper concrete builder, the client is in a
 *  position to know which concrete subclass of Builder is in use and can handle its products accordingly.
 *
 * 3. Empty methods as default in Builder. In C++, the build methods are intentionally not declared pure virtual member
 *  functions. They’re defined as empty methods instead, letting clients override only the operations they’re interested
 *  in.
 */
import {Direction, Door, IMaze, Maze, Room, Wall} from "./index";

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

























