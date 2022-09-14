/**
 * Entities must depend on abstraction not on concretions. It states that the high-level module must not depend on the
 * low-level module, but they should depend on abstractions.
 *
 * This principle states that a class should not depend on another class, but instead on an abstraction of that class.
 * It allows for loosing-coupling and more reusability.
 */
namespace Wrong {
  class MemoryStorage {
    private storage: any[];

    constructor() {
      this.storage = []
    }

    public insert(record: any): void {
      this.storage.push(record)
    }
  }

  /**
   * The PostService class depends on the MemoryStorage class to save new posts. What happens if we need to change the
   * storage used to save posts? We'll have to modify the PostService class to change the type of the db property,
   * thus violating the Open-Closed Principle.
   *
   * If PostService relies on an interface instead of a class, we wouldn't have to make changes on it.
   */
  class PostService {
    private db = new MemoryStorage();

    createPost(title: string){
      this.db.insert(title)
    }
  }
}

namespace Correct {
  interface DatabaseStorage {
    insert(record: any): void;
  }

  class MemoryStorage implements DatabaseStorage {
    private storage: any[]

    constructor() {
      this.storage = []
    }

    public insert(record: any): void {
      this.storage.push(record)
    }
  }

  class PostService {
    private db: DatabaseStorage;

    constructor(db: DatabaseStorage) {
      this.db = db
    }

    createPost(title: string){
      this.db.insert(title);
    }
  }
}
