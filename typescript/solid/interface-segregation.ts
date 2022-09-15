/**
 * Jany client-specific interfaces are better than one general-purpose interface.
 *
 * This principle states that classes should never implement interfaces that they don't need to use. If they do, we'll
 * end up having not implemented methods in our classes. This can be solved creating specific interfaces instead of
 * general-purpose interfaces.
 */

namespace Wrong {

  interface VehicleInterface {
    drive(): string;
    fly(): string;
  }

  class FutureCar implements VehicleInterface {
    public drive() : string {
      return 'Driving Car.';
    }

    public fly() : string {
      return 'Flying Car.';
    }
  }

  class Car implements VehicleInterface {
    public drive() : string {
      return 'Driving Car.';
    }

    public fly() : string {
      throw new Error('Not implemented method.');
    }
  }

  class Airplane implements VehicleInterface {
    public drive() : string {
      throw new Error('Not implemented method.');
    }

    public fly() : string {
      return 'Flying Airplane.';
    }
  }
}

/**
 * The solution is splitting VehicleInterface into specific interfaces.
 */
namespace Correct {
  interface CarInterface {
    drive() : string;
  }

  interface AirplaneInterface {
    fly() : string;
  }

  class FutureCar implements CarInterface, AirplaneInterface {
    public drive() {
      return 'Driving Car.';
    }

    public fly() {
      return 'Flying Car.'
    }
  }

  class Car implements CarInterface {
    public drive() {
      return 'Driving Car.';
    }
  }

  class Airplane implements AirplaneInterface {
    public fly() {
      return 'Flying Airplane.';
    }
  }
}
