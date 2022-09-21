/*
## Intent

Provide an interface for creating families of related or dependent objects without specifying their concrete classes.

## Applicability

Use the Abstract Factory pattern when
- a system should be independent of how its products are created, composed, and represented.
- a system should be configured with one of multiple families of products.
- a family of related product objects is designed to be used together, and you need to enforce this constraint.
- you want to provide a class library of products, and you want to reveal just their interfaces, not their implementations.

## Participants

- AbstractFactory (WidgetFactory)
  – declares an interface for operations that create abstract product objects.
- ConcreteFactory (MotifWidgetFactory, PMWidgetFactory)
  – implements the operations to create concrete product objects.
- AbstractProduct (Window, ScrollBar)
  – declares an interface for a type of product object.
- ConcreteProduct (MotifWindow, MotifScrollBar)
  – defines a product object to be created by the corresponding concrete factory.
  – implements the AbstractProduct interface.
- Client
  – uses only interfaces declared by AbstractFactory and AbstractProduct classes.

## Collaborations

- Normally a single instance of a ConcreteFactory class is created at run-time. This concrete factory creates product
  objects having a particular implementation. To create different product objects, clients should use a different
  concrete factory.
- AbstractFactory defers creation of product objects to its ConcreteFactory subclass.

## Consequences

1. It isolates concrete classes. The Abstract Factory pattern helps you control the classes of objects that an
  application creates. Because a factory encapsulates the responsibility and the process of creating product objects,
  it isolates clients from implementation classes. Clients manipulate instances through their abstract interfaces.
  Product class names are isolated in the implementation of the concrete factory; they do not appear in client code.
2. It makes exchanging product families easy. The class of a concrete factory appears only once in an application—that
  is, where it’s instantiated. This makes it easy to change the concrete factory an application uses. It can use
  different product configurations simply by changing the concrete factory. Because an abstract factory creates a
  complete family of products, the whole product family changes at once. In our user interface example, we can switch
  from Motif widgets to Presentation Manager widgets simply by switching the corresponding factory objects and
  recreating the interface.
3. It promotes consistency among products. When product objects in a family are designed to work together, it’s
  important that an application use objects from only one family at a time. AbstractFactory makes this easy to enforce.
4. Supporting new kinds of products is difficult. Extending abstract factories to produce new kinds of Products isn’t
  easy. That’s because the AbstractFactory interface fixes the set of products that can be created. Supporting new
  kinds of products requires extending the factory interface, which involves changing the AbstractFactory class and all
  of its subclasses.
 */






















