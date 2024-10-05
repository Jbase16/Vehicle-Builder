
import Vehicle from './Vehicle.js';
import Motorbike from './Motorbike.js';
import Car from './Car.js';
import Wheel from './Wheel.js';
import AbleToTow from '../interfaces/AbleToTow.js';



class Truck extends Vehicle {
  // declare properties of the Truck class
  vin: string;
  color: string;
  override make: string;
  override model: string;
  year: number;
  override weight: number;
  topSpeed: number;
  wheels: Wheel[];
  towingCapacity: number;

  // constructor for the Truck class
  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    wheels: Wheel[],
    towingCapacity: number
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
    this.towingCapacity = towingCapacity;

    // Check if wheels array has 4 elements, and create 4 new default Wheel objects if it does not
    if (wheels.length !== 4) {
      this.wheels = Array(4).fill(new Wheel ());
    } else {
      this.wheels = wheels;
    }
  }

  // implement the tow method
  tow(vehicle: Vehicle): void {
    // check if the vehicle's weight is less than or equal to the truck's towing capacity
    if (vehicle.weight <= this.towingCapacity) {
      console.log(`Towing ${vehicle.make} ${vehicle.model}`);
    } else {
      console.log(`Cannot tow ${vehicle.make} ${vehicle.model}`);
    }
  }
}


  
  

// Export the Truck class as the default export
export default Truck;
