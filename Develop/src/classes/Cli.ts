// importing classes from other files
import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";

// define the Cli class
class Cli {
  vehicles: (Car | Truck | Motorbike)[];
  selectedVehicleVin: string | undefined;
  exit: boolean = false;

  constructor(vehicles: (Car | Truck | Motorbike)[]) {
    this.vehicles = vehicles;
  }

  // static method to generate a vin
  static generateVin(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  // method to choose a vehicle from existing vehicles
  chooseVehicle(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectedVehicleVin',
          message: 'Select a vehicle to perform an action on',
          choices: this.vehicles.map((vehicle) => ({
            name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
            value: vehicle.vin,
          })),
        },
      ])
      .then((answers) => {
        this.selectedVehicleVin = answers.selectedVehicleVin;
        this.performActions();
      });
  }

  // method to perform actions on a vehicle
  performActions(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'action',
          message: 'Select an action',
          choices: [
            'Print details',
            'Start vehicle',
            'Accelerate 5 MPH',
            'Decelerate 5 MPH',
            'Stop vehicle',
            'Turn right',
            'Turn left',
            'Reverse',
            'Tow vehicle',
            'Do a wheelie',
            'Select or create another vehicle',
            'Exit',
          ],
        },
      ])
      .then((answers) => {
        const vehicle = this.vehicles.find(v => v.vin === this.selectedVehicleVin);
        if (!vehicle) return;

        switch (answers.action) {
          case 'Print details':
            vehicle.printDetails();
            break;
          case 'Start vehicle':
            vehicle.start();
            break;
          case 'Accelerate 5 MPH':
            vehicle.accelerate(5);
            break;
          case 'Decelerate 5 MPH':
            vehicle.decelerate(5);
            break;
          case 'Stop vehicle':
            vehicle.stop();
            break;
          case 'Turn right':
            vehicle.turn('right');
            break;
          case 'Turn left':
            vehicle.turn('left');
            break;
          case 'Reverse':
            vehicle.reverse();
            break;
          case 'Tow vehicle':
            if (vehicle instanceof Truck) {
              this.findVehicleToTow(vehicle);
              return;
            } else {
              console.log('Only trucks can tow vehicles');
            }
            break;
          case 'Do a wheelie':
            if (vehicle instanceof Motorbike) {
              vehicle.wheelie();
            } else {
              console.log('Only motorbikes can do wheelies');
            }
            break;
          case 'Select or create another vehicle':
            this.startCli();
            return;
          case 'Exit':
            this.exit = true;
            break;
        }

        if (!this.exit) {
          this.performActions();
        }
      });
  }

  // method to create a vehicle
  createVehicle(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vehicleType',
          message: 'Select a vehicle type',
          choices: ['Car', 'Truck', 'Motorbike'],
        },
      ])
      .then((answers) => {
        switch (answers.vehicleType) {
          case 'Car':
            this.createCar();
            break;
          case 'Truck':
            this.createTruck();
            break;
          case 'Motorbike':
            this.createMotorbike();
            break;
        }
      });
  }

  // method to create a car
  createCar(): void {
    inquirer
      .prompt([
        { type: 'input', name: 'color', message: 'Enter Color' },
        { type: 'input', name: 'make', message: 'Enter Make' },
        { type: 'input', name: 'model', message: 'Enter Model' },
        { type: 'input', name: 'year', message: 'Enter Year' },
        { type: 'input', name: 'weight', message: 'Enter Weight' },
        { type: 'input', name: 'topSpeed', message: 'Enter Top Speed' },
      ])
      .then((answers) => {
        const car = new Car(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          []
        );
        this.vehicles.push(car);
        this.selectedVehicleVin = car.vin;
        this.performActions();
      });
  }

  // method to create a truck
  createTruck(): void {
    inquirer
      .prompt([
        { type: 'input', name: 'color', message: 'Enter Color' },
        { type: 'input', name: 'make', message: 'Enter Make' },
        { type: 'input', name: 'model', message: 'Enter Model' },
        { type: 'input', name: 'year', message: 'Enter Year' },
        { type: 'input', name: 'weight', message: 'Enter Weight' },
        { type: 'input', name: 'topSpeed', message: 'Enter Top Speed' },
        { type: 'input', name: 'towingCapacity', message: 'Enter Towing Capacity' },
      ])
      .then((answers) => {
        const truck = new Truck(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          Array(4).fill(new Wheel()),
          parseInt(answers.towingCapacity)
        );
        this.vehicles.push(truck);
        this.selectedVehicleVin = truck.vin;
        this.performActions();
      });
  }

  // method to create a motorbike
  createMotorbike(): void {
    inquirer
      .prompt([
        { type: 'input', name: 'color', message: 'Enter Color' },
        { type: 'input', name: 'make', message: 'Enter Make' },
        { type: 'input', name: 'model', message: 'Enter Model' },
        { type: 'input', name: 'year', message: 'Enter Year' },
        { type: 'input', name: 'weight', message: 'Enter Weight' },
        { type: 'input', name: 'topSpeed', message: 'Enter Top Speed' },
        { type: 'input', name: 'frontWheelDiameter', message: 'Enter Front Wheel Diameter' },
        { type: 'input', name: 'frontWheelBrand', message: 'Enter Front Wheel Brand' },
        { type: 'input', name: 'rearWheelDiameter', message: 'Enter Rear Wheel Diameter' },
        { type: 'input', name: 'rearWheelBrand', message: 'Enter Rear Wheel Brand' },
      ])
      .then((answers) => {
        const motorbike = new Motorbike(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [
            new Wheel(parseInt(answers.frontWheelDiameter), answers.frontWheelBrand),
            new Wheel(parseInt(answers.rearWheelDiameter), answers.rearWheelBrand)
          ]
        );
        this.vehicles.push(motorbike);
        this.selectedVehicleVin = motorbike.vin;
        this.performActions();
      });
  }

  // method to find a vehicle to tow
  findVehicleToTow(truck: Truck): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vehicleToTow',
          message: 'Select a vehicle to tow',
          choices: this.vehicles.map((vehicle) => ({
            name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
            value: vehicle,
          })),
        },
      ])
      .then((answers) => {
        if (answers.vehicleToTow === truck) {
          console.log('The truck cannot tow itself.');
        } else {
          truck.tow(answers.vehicleToTow);
        }
        this.performActions();
      });
  }

  // method to start the cli
  startCli(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'CreateOrSelect',
          message:
            'Would you like to create a new vehicle or perform an action on an existing vehicle?',
          choices: ['Create a new vehicle', 'Select an existing vehicle'],
        },
      ])
      .then((answers) => {
        if (answers.CreateOrSelect === 'Create a new vehicle') {
          this.createVehicle();
        } else {
          this.chooseVehicle();
        }
      });
  }
}

// export the Cli class
export default Cli;
