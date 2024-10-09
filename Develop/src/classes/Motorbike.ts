// Importing Vehicle and Wheel classes
import Vehicle from "./Vehicle.js";
import Wheel from "./Wheel.js";

// Motorbike class extends the Vehicle class
class Motorbike extends Vehicle {
  wheelie() {
    console.log(`Motorbike ${this.make} ${this.model} is doing a wheelie!`);
  }

  override vin: string; // Add override keyword
  color: string;
  override make: string;
  override model: string;
  year: number;
  override weight: number;
  topSpeed: number;
  wheels: Wheel[];

  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    wheels: Wheel[]
  ) {
    super();
    this.vin = vin;
    this.color = color;
    this.make = make;
    this.model = model;
    this.year = year;
    this.weight = weight;
    this.topSpeed = topSpeed;
    this.wheels = wheels;

    if (wheels.length === 2) {
      this.wheels = wheels;
    } else {
      // Create 2 new default Wheel objects if it does not
      this.wheels = [new Wheel(), new Wheel()];
    }
  }
}

// Export the Motorbike class as the default export
export default Motorbike;
