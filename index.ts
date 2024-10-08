class Car {
  license: string;
  checkInTime: Date;
  feeCharged: number;
  checkOutTime: Date | null;

  constructor(license: string, checkInTime: Date) {
    this.license = license;
    this.checkInTime = checkInTime || new Date();
    this.feeCharged = 0;
    this.checkOutTime = null;
  }

  checkOut(checkOutTime: Date, rate: number): void {
    const hoursParked = (checkOutTime.getTime() - this.checkInTime.getTime()) / (1000 * 60 * 60);
    this.checkOutTime = checkOutTime;
    this.feeCharged = rate * hoursParked;
  }
}

class ParkingLot {
  name: string;
  rate: number;
  cars: Record<string, Car>;
  totalRevenue: number;

  constructor(name: string, rate: number) {
    this.name = name;
    this.rate = rate;
    this.cars = {};
    this.totalRevenue = 0;
  }

  addCar(license: string, checkInTime: Date): boolean {
    if (this.cars[license]) {
      console.log('Car is already checked in.');
      return false;
    }
    const car = new Car(license, checkInTime);
    this.cars[license] = car;
    console.log(`Car ${license} checked in at ${car.checkInTime}`);
    return true;
  }

  removeCar(license: string, checkOutTime: Date): boolean {
    const car = this.cars[license];
    if (!car) {
      console.log('Car is not checked in.');
      return false;
    }
    car.checkOut(checkOutTime, this.rate);
    this.totalRevenue += car.feeCharged;
    console.log(`Car ${license} checked out and charged $${car.feeCharged.toFixed(2)}`);
    delete this.cars[license];
    return true;
  }
}

class ParkingGarageManagement {
  parkingLots: Record<string, ParkingLot>;

  constructor() {
    this.parkingLots = {};
  }

  addParkingLot(name: string, rate: number): boolean {
    if (this.parkingLots[name]) {
      console.log('Parking lot already exists.');
      return false;
    }
    this.parkingLots[name] = new ParkingLot(name, rate);
    return true;
  }

  addCar(parkingLotName: string, license: string, checkInTime: Date): boolean {
    const lot = this.parkingLots[parkingLotName];
    if (!lot) {
      console.log('Parking lot does not exist.');
      return false;
    }
    return lot.addCar(license, checkInTime);
  }

  removeCar(parkingLotName: string, license: string, checkOutTime: Date): boolean {
    const lot = this.parkingLots[parkingLotName];
    if (!lot) {
      console.log('Parking lot does not exist.');
      return false;
    }
    return lot.removeCar(license, checkOutTime);
  }

  getHighestRevenueLot(): string | null {
    let highestRevenueLot: ParkingLot | null = null;
    let maxRevenue = 0;

    for (const lot of Object.values(this.parkingLots)) {
      if (lot.totalRevenue > maxRevenue) {
        highestRevenueLot = lot;
        maxRevenue = lot.totalRevenue;
      }
    }

    return highestRevenueLot ? highestRevenueLot.name : null;
  }
}

// Example usage
const parkingManagement = new ParkingGarageManagement();
parkingManagement.addParkingLot('South Side', 10);
parkingManagement.addParkingLot('North Side', 5);

parkingManagement.addCar('South Side', 'ABC123', new Date('2024-08-09T10:56:22-05:00'));
parkingManagement.addCar('South Side', 'XYZ789', new Date('2024-08-09T10:58:22-05:00'));
parkingManagement.addCar('North Side', 'LMN456', new Date('2024-08-09T10:58:22-05:00'));

parkingManagement.removeCar('South Side', 'ABC123', new Date('2024-08-09T12:56:22-05:00'));
parkingManagement.removeCar('South Side', 'XYZ789', new Date('2024-08-09T12:58:22-05:00'));
parkingManagement.removeCar('North Side', 'LMN456', new Date('2024-08-10T12:58:22-05:00'));

console.log(`Parking lot with the highest revenue: ${parkingManagement.getHighestRevenueLot()}`);
console.log(parkingManagement.parkingLots);
