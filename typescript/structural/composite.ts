/**
 * ## Intent
 *
 * Compose objects into tree structures to represent part-whole hierarchies. Composite lets clients treats
 * individual objects and compositions of objects uniformly.
 *
 * ## Motivation
 *
 * THe key to the composite pattern is an abstract class that represents both primitive and their containers.
 *
 * ## Applicability
 *
 * Use the Composite pattern when
 *  - you want to represent part-whole hierarchies of objects.
 *  - you want clients to be able to ignore the difference between compositions of objects and individual objects.
 *  Clients will treat all objects in the composite structure uniformly.
 *
 * ## Participants
 *
 *  - Component
 *      - declares the interface for objects in the composition.
 *      - implements default behavior for the interface common to all classes, as appropriate.
 *      - declares an interface for accessing and managing its child components.
 *      - (optional) defines an interface for accessing a component's parent in the recursive structure, and implement
 *          it if that's appropriate
 *  - Leaf
 *      - represents leaf objects in the composition. A leaf has no children.
 *      - defines behavior for primitive objects in the composition.
 *  - Composite
 *      - defines behavior for components having children.
 *      - stores child components
 *      - implements child-related operations in the Component interface.
 *   - Client
 *      - manipulates objects in the composition through the Component interface.
 *
 * ## Collaborations
 *
 * - Clients use the Component class interface to interact with objects in the composite structure. If the recipient is
 *      a leaf, then the request is handled directly. If the recipient is a Composite, then it usually forwards
 *      requests to its child components, possibly performing additional operations before and/or after forwarding.
 *
 * ## Consequences
 *
 * The Composite pattern
 * - defines class hierarchies consisting of primitive objects and composite objects. Primitive objects can be composed
 *      into more complex objects, which in turn can be composed, and so on recursively. Wherever client code expects
 *      a primitive object, it can also take a composite object.
 * - makes the client simple. Clients can treat composite structures and individual objects uniformly. Clients normally
 *      don’t know (and shouldn’t care) whether they’re dealing with a leaf or a composite component. This simplifies
 *      client code, because it avoids having to write tag-and-case-statement-style functions over the classes that
 *      define the composition.
 * - makes it easier to add new kinds of components. Newly defined Composite or Leaf subclasses work automatically
 *      with existing structures and client code. Clients don’t have to be changed for new Component classes.
 * - can make your design overly general. The disadvantage of making it easy to add new components is that it makes
 *      it harder to restrict the components of a composite. Sometimes you want a composite to have only certain
 *      components. With Composite, you can’t rely on the type system to enforce those constraints for you.
 *      You’ll have to use run-time checks instead.
 *
 * ## Implementation
 *
 * There are many issues to consider when implementing the Composite pattern:
 *  1. Explicit parent references. Maintaining references from child components to their parent can simplify the
 *      traversal and management of a composite structure. The parent reference simplifies moving up the structure and
 *      deleting a component. Parent references also help support the Chain of Responsibility (223) pattern.
 *
 *      The usual place to define the parent reference is in the Component class. Leaf and Composite classes can
 *      inherit the reference and the operations that manage it.
 *
 *      With parent references, it’s essential to maintain the invariant that all children of a composite have as their
 *      parent the composite that in turn has them as children. The easiest way to ensure this is to change a
 *      component’s parent only when it’s being added or removed from a composite. If this can be implemented once in
 *      the Add and Remove operations of the Composite class, then it can be inherited by all the subclasses, and the
 *      invariant will be maintained automatically.
 *
 *  2. Sharing components. It’s often useful to share components, for example, to reduce storage requirements. But
 *      when a component can have no more than one parent, sharing components becomes difficult.
 *
 *      A possible solution is for children to store multiple parents. But that can lead to ambiguities as a request
 *      propagates up the structure. The Flyweight (195) pattern shows how to rework a design to avoid storing parents
 *      altogether. It works in cases where children can avoid sending parent requests by externalizing some or all of
 *      their state.
 *
 *  3. Maximizing the Component interface. One of the goals of the Composite pattern is to make clients unaware of
 *      the specific Leaf or Composite classes they’re using. To attain this goal, the Component class should define
 *      as many common operations for Composite and Leaf classes as possible. The Component class usually provides
 *      default implementations for these operations, and Leaf and Composite subclasses will override them.
 *
 *      However, this goal will sometimes conflict with the principle of class hierarchy design that says a class
 *      should only define operations that are meaningful to its subclasses. There are many operations that Component
 *      supports that don’t seem to make sense for Leaf classes. How can Component provide a default implementation
 *      for them?
 *
 *      Sometimes a little creativity shows how an operation that would appear to make sense only for Composites can be
 *      implemented for all Components by moving it to the Component class. For example, the interface for accessing
 *      children is a fundamental part of a Composite class but not necessarily Leaf classes. But if we view a Leaf as
 *      a Component that never has children, then we can define a default operation for child access in the Component
 *      class that never returns any children. Leaf classes can use the default implementation, but Composite classes
 *      will reimplement it to return their children.
 *
 *      The child management operations are more troublesome and are discussed in the next item.
 *
 *  4. Declaring the child management operations. Although the Composite class implements the Add and Remove operations
 *      for managing children, an important issue in the Composite pattern is which classes declare these operations in
 *      the Composite class hierarchy. Should we declare these operations in the Component and make them meaningful for
 *      Leaf classes, or should we declare and define them only in Composite and its subclasses?
 *
 *      The decision involves a trade-off between safety and transparency:
 *          - Defining the child management interface at the root of the class hierarchy gives you transparency, because
 *          you can treat all components uniformly. It costs you safety, however, because clients may try to do
 *          meaningless things like add and remove objects from leaves.
 *          - Defining child management in the Composite class gives you safety, because any attempt to add or remove
 *          objects from leaves will be caught at compile-time in a statically typed language like C++. But you lose
 *          transparency, because leaves and composites have different interfaces.
 *
 *      Usually it’s better to make Add and Remove fail by default (perhaps by raising an exception) if the component
 *      isn’t allowed to have children or if the argument of Remove isn’t a child of the component, respectively.
 *
 *  5. Should Component implement a list of Components? You might be tempted to define the set of children as an
 *      instance variable in the Component class where the child access and management operations are declared. But
 *      putting the child pointer in the base class incurs a space penalty for every leaf, even though a leaf never
 *      has children. This is worthwhile only if there are relatively few children in the structure.
 *
 *  6. Child ordering. Many designs specify an ordering on the children of Composite. In the earlier Graphics example,
 *      ordering may reflect front-to-back ordering. If Composites represent parse trees, then compound statements can
 *      be instances of a Composite whose children must be ordered to reflect the program.
 *
 *      When child ordering is an issue, you must design child access and management interfaces carefully to manage the
 *      sequence of children. The Iterator (257) pattern can guide you in this.
 *
 *  7. Caching to improve performance. If you need to traverse or search compositions frequently, the Composite class
 *      can cache traversal or search information about its children. The Composite can cache actual results or just
 *      information that lets it short-circuit the traversal or search. For example, the Picture class from the
 *      Motivation example could cache the bounding box of its children. During drawing or selection, this cached
 *      bounding box lets the Picture avoid drawing or searching when its children aren’t visible in the current window.
 *
 *      Changes to a component will require invalidating the caches of its parents. This works best when components know
 *      their parents. So if you’re using caching, you need to define an interface for telling composites that their
 *      caches are invalid.
 *
 *  8. Who should delete components? In languages without garbage collection, it’s usually best to make a Composite
 *      responsible for deleting its children when it’s destroyed. An exception to this rule is when Leaf objects are
 *      immutable and thus can be shared.
 *
 *  9. What’s the best data structure for storing components? Composites may use a variety of data structures to store
 *      their children, including linked lists, trees, arrays, and hash tables. The choice of data structure depends
 *      (as always) on efficiency. In fact, it isn’t even necessary to use a general-purpose data structure at all.
 *      Sometimes composites have a variable for each child, although this requires each subclass of Composite to
 *      implement its own management interface. See Interpreter (243) for an example.
 */
























