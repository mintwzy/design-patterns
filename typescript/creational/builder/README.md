## Intent

Separate the construction of a complex object from its representation so that the same construction process can
create different representations.

## Applicability

Use the Builder pattern when
- the algorithm for creating a complex object should be independent of the parts that make up the object and how
  they’re assembled.
- the construction process must allow different representations for the object that’s constructed.

## Participants

- Builder (TextConverter)
  – specifies an abstract interface for creating parts of a Product object.
- ConcreteBuilder (ASCIIConverter, TeXConverter, TextWidgetConverter)
  – constructs and assembles parts of the product by implementing the Builder interface.
  – defines and keeps track of the representation it creates.
  – provides an interface for retrieving the product (e.g., GetASCIIText, Get-Text Widget).
- Director (RTFReader)
  – constructs an object using the Builder interface.
- Product (ASCIIText, TeXText, TextWidget)
  – represents the complex object under construction. ConcreteBuilder builds the product’s internal representation
  and defines the process by which it’s assembled.
  – includes classes that define the constituent parts, including interfaces for assembling the parts into the final result.

## Collaborations

- The client creates the Director object and configures it with the desired Builder object.
- Director notifies the builder whenever a part of the product should be built.
- Builder handles requests from the director and adds parts to the product.
- The client retrieves the product from the builder.

## Consequences

1. It lets you vary a product’s internal representation. The Builder object provides the director with an abstract
   interface for constructing the product. The interface lets the builder hide the representation and internal
   structure of the product. It also hides how the product gets assembled. Because the product is constructed through
   an abstract interface, all you have to do to change the product’s internal representation is define a new kind of
   builder.
2. It isolates code for construction and representation. The Builder pattern improves modularity by encapsulating
   the way a complex object is constructed and represented. Clients needn’t know anything about the classes that define
   the product’s internal structure; such classes don’t appear in Builder’s interface.

   Each ConcreteBuilder contains all the code to create and assemble a particular kind of product. The code is written
   once; then different Directors can reuse it to build Product variants from the same set of parts. In the earlier
   RTF example, we could define a reader for a format other than RTF, say, an SGMLReader, and use the same
   TextConverters to generate ASCIIText, TeXText, and TextWidget renditions of SGML documents.

3. It gives you finer control over the construction process. Unlike creational patterns that construct products in
   one shot, the Builder pattern constructs the product step by step under the director’s control. Only when the
   product is finished does the director retrieve it from the builder. Hence the Builder interface reflects the process
   of constructing the product more than other creational patterns. This gives you finer control over the construction
   process and consequently the internal structure of the resulting product.

## Implementation

Typically there’s an abstract Builder class that defines an operation for each component that a director may ask it
to create. The operations do nothing by default. A ConcreteBuilder class overrides operations for components it’s
interested in creating.

1. Assembly and construction interface. Builders construct their products in step-by-step fashion. Therefore the
   Builder class interface must be general enough to allow the construction of products for all kinds of concrete
   builders.

   A key design issue concerns the model for the construction and assembly process. A model where the results of
   construction requests are simply appended to the product is usually sufficient. In the RTF example, the builder
   converts and appends the next token to the text it has converted so far.

   But sometimes you might need access to parts of the product constructed earlier. In the Maze example we present in
   the Sample Code, the MazeBuilder interface lets you add a door between existing rooms. Tree structures such as parse
   trees that are built bottom-up are another example. In that case, the builder would return child nodes to the
   director, which then would pass them back to the builder to build the parent nodes.

2. Why no abstract class for products? In the common case, the products produced by the concrete builders differ so
   greatly in their representation that there is little to gain from giving different products a common parent class.
   In the RTF example, the ASCIIText and the TextWidget objects are unlikely to have a common interface, nor do they
   need one. Because the client usually configures the director with the proper concrete builder, the client is in a
   position to know which concrete subclass of Builder is in use and can handle its products accordingly.

3. Empty methods as default in Builder. In C++, the build methods are intentionally not declared pure virtual member
   functions. They’re defined as empty methods instead, letting clients override only the operations they’re interested
   in.
