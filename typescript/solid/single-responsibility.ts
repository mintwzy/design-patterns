/**
 * A class should have one, and only one, reason to change.
 *
 * If our classes assume multiple responsibilities, they will be highly coupled thus making them more difficult to
 * maintain
 *
 * ## What's a reason to change?
 * Uncle Bob states that this principle is about people. This means that when you write a software module, and changes
 * are requested on that module, those changes can only originate from a single person or a tight group of people
 * representing a single narrowly defined business function.
 *
 * Another definition for this principle is:
 * Gather together those things that change for the same reason, and separate those things that change for different
 * reasons.
 *
 * This can also be considered the definition of Separation of Concerns.
 */
namespace Wrong {
  /**
   * The following piece of code shows a violation of the SRP in which the Book class is both a representation of an
   * entity and also implements the persistence of such entity.
   */
  class Book {
    constructor(private _author: string, private _title: string) {}

    get author(): string {
      return this._author;
    }

    get title(): string {
      return this._title;
    }

    save(): void {
      // Save book in the database.
    }
  }
}

namespace Correct {
  /**
   * By applying Separation of Concerns, we split the Book class to have the representation of the book in a class and
   * the persistence logic in another one
   */
  class Book {
    constructor(private _author: string, private _title: string) {
    }

    get author(): string {
      return this._author
    }

    get title(): string {
      return this._title;
    }
  }

  interface IRepository<T>{
    save(entity: T): void;
  }

  class BookRepository<T extends Book> implements IRepository<T>{
    save(book: Book): void {

    }
  }
}




















