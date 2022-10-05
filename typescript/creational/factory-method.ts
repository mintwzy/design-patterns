/*
## Intent

Define an interface for creating an object, but let subclasses decide which class to instantiate. Factory Method lets a
class defer instantiation to subclasses.

## Motivation

The framework must instantiate classes, but it only knows about abstract classes, which it cannot instantiate.

The Factory Method pattern offers a solution. It encapsulates the knowledge of which Document subclass to create and
moves this knowledge out of the framework.

Application subclasses redefine an abstract CreateDocument operation on Application to return the appropriate Document
subclass. Once an Application subclass is instantiated, it can then instantiate application-specific Documents without
knowing their class. We call CreateDocument a factory method because it’s responsible for “manufacturing” an object.

## Applicability

Use the Factory Method pattern when

- a class can’t anticipate the class of objects it must create.
- a class wants its subclasses to specify the objects it creates.
- classes delegate responsibility to one of several helper subclasses, and you want to localize the knowledge of which helper subclass is the delegate.

## Participants

- Product (Document)
  – defines the interface of objects the factory method creates.
- ConcreteProduct (MyDocument)
  – implements the Product interface.
- Creator (Application)
  – declares the factory method, which returns an object of type Product. Creator may also define a default implementation of the factory method that returns a default ConcreteProduct object.
  – may call the factory method to create a Product object.
- ConcreteCreator (MyApplication)
  – overrides the factory method to return an instance of a ConcreteProduct.

## Collaborations

- Creator relies on its subclasses to define the factory method so that it returns an instance of the appropriate
    ConcreteProduct.

## Consequences

Factory methods eliminate the need to bind application-specific classes into your code. The code only deals with the
Product interface; therefore it can work with any user-defined ConcreteProduct classes.

A potential disadvantage of factory methods is that clients might have to subclass the Creator class just to create a
particular ConcreteProduct object. Subclassing is fine when the client has to subclass the Creator class anyway, but
otherwise the client now must deal with another point of evolution.

Here are two additional consequences of the Factory Method pattern:

1. Provides hooks for subclasses. Creating objects inside a class with a factory method is always more flexible than
    creating an object directly. Factory Method gives subclasses a hook for providing an extended version of an object.

    In the Document example, the Document class could define a factory method called CreateFileDialog that creates a
    default file dialog object for opening an existing document. A Document subclass can define an application-specific
    file dialog by overriding this factory method. In this case the factory method is not abstract but provides a
    reasonable default implementation.

2. Connects parallel class hierarchies. In the examples we’ve considered so far, the factory method is only called by
    Creators. But this doesn’t have to be the case; clients can find factory methods useful, especially in the case of
    parallel class hierarchies.

    With these constraints, it’s better to use a separate Manipulator object that implements the interaction and keeps
    track of any manipulation-specific state that’s needed. Different figures will use different Manipulator subclasses
    to handle particular interactions. The resulting Manipulator class hierarchy parallels (at least partially) the
    Figure class hierarchy:

    The Figure class provides a CreateManipulator factory method that lets clients create a Figure’s corresponding
    Manipulator. Figure subclasses override this method to return an instance of the Manipulator subclass that’s right
    for them. Alternatively, the Figure class may implement CreateManipulator to return a default Manipulator instance,
    and Figure subclasses may simply inherit that default. The Figure classes that do so need no corresponding
    Manipulator subclass—hence the hierarchies are only partially parallel.

    Notice how the factory method defines the connection between the two class hierarchies. It localizes knowledge of
    which classes belong together.

## Implementation

Consider the following issues when applying the Factory Method pattern:

1. Two major varieties. The two main variations of the Factory Method pattern are (1) the case when the Creator class
    is an abstract class and does not provide an implementation for the factory method it declares, and (2) the case
    when the Creator is a concrete class and provides a default implementation for the factory method. It’s also
    possible to have an abstract class that defines a default implementation, but this is less common.

    The first case requires subclasses to define an implementation, because there’s no reasonable default. It gets
    around the dilemma of having to instantiate unforeseeable classes. In the second case, the concrete Creator uses
    the factory method primarily for flexibility. It’s following a rule that says, “Create objects in a separate
    operation so that subclasses can override the way they’re created.” This rule ensures that designers of subclasses
    can change the class of objects their parent class instantiates if necessary.

2. Parameterized factory methods. Another variation on the pattern lets the factory method create multiple kinds of
    products. The factory method takes a parameter that identifies the kind of object to create. All objects the
    factory method creates will share the Product interface. In the Document example, Application might support
    different kinds of Documents. You pass Create-Document an extra parameter to specify the kind of document to create.

3. Using templates to avoid subclassing. As we’ve mentioned, another potential problem with factory methods is that
    they might force you to subclass just to create the appropriate Product objects. Another way to get around this in
    C++ is to provide a template subclass of Creator that’s parameterized by the Product class:

4. Naming conventions. It’s good practice to use naming conventions that make it clear you’re using factory methods.
    For example, the MacApp Macintosh application framework [App89] always declares the abstract operation that defines the
    factory method as Class* DoMakeClass(), where Class is the Product class.
 */

/*
First we’ll define factory methods in MazeGame for creating the maze, room, wall, and door objects:
 */
import {BombedWall, Direction, Door, IMaze, Maze, Room, RoomWithBomb, Wall} from "./index";

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





























