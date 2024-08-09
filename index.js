class car {
  constructor(license, checkInTime) {
    this.license = license;
    this.checkedIn = checkInTime
    this.feeCharged = 0
    this.checkoutTime = undefined
  }

  checkOut(checkoutTime, fee) {
    const hoursParked = (checkoutTime - this.checkedIn)/ (1000*60*60)
    this.checkoutTime = checkoutTime
    this.feeCharged = fee * hoursParked
  }
}


class ParkingLot {
  constructor(name, fee) {
    this.name = name
    this.fee = fee
    this.cars = {}
    this.totalMade = 0
  }

  addCar(licenseNumber, checkInTime) {
    const timeCheckedIn = checkInTime || new Date()
    const newCar = new car(licenseNumber, timeCheckedIn)
    if(this.cars[licenseNumber]) {
      console.log('car already exists')
      return false
    }
    console.log('car checked in at', newCar.checkedIn)
    this.cars[licenseNumber] = newCar
  }

  removeCar(licenseNumber, checkoutTime) {
    const car = this.cars[licenseNumber]
    if(!car) {
      console.log('car is not checked in')
      return false
    }
    car.checkOut(checkoutTime, this.fee)
    this.totalMade = car.feeCharged + this.totalMade
    console.log('car has been checked out and charged', car.feeCharged)
    delete this.cars[licenseNumber]
  }
}


class ParkingGarageManagement {
  constructor(){
    this.parkingLots = {}
  }

  addParkingGarage(name, fee){
    const newGarage = new ParkingLot(name, fee)
    if(this.parkingLots[fee]) {
      console.log('parking garage already exists')
      return false
    }
    this.parkingLots[name] = newGarage
  }

  addCar(parkingLotName,licenseNumber, checkInTime) {
    const garage = this.parkingLots[parkingLotName]
    if(!garage) {
      console.log('garage does not exist')
      return false
    }
    garage.addCar(licenseNumber, checkInTime)
  }

  removeCar(parkingLotName,licenseNumber, checkoutTime) {
    const garage = this.parkingLots[parkingLotName]
    if(!garage) {
      console.log('garage does not exist')
      return false
    }
    garage.removeCar(licenseNumber, checkoutTime)
  }
  
  fetchHighestRevenueGenerator() {
    const parkingLotArr = Object.values(this.parkingLots)
    const parkingLotsSorted = parkingLotArr.sort((a,b) => b.totalMade - a.totalMade)
    return parkingLotsSorted[0].name 
  }
}

const houstonParkingManagement = new ParkingGarageManagement()
houstonParkingManagement.addParkingGarage('south side', 10)
houstonParkingManagement.addParkingGarage('north side', 5)
houstonParkingManagement.addCar('south side', 'abc', new Date('Fri Aug 09 2024 10:56:22 GMT-0500 (Central Daylight Time)'))
houstonParkingManagement.addCar('south side', 'abcd', new Date('Fri Aug 09 2024 10:58:22 GMT-0500 (Central Daylight Time)'))
houstonParkingManagement.addCar('north side', 'xyz', new Date('Fri Aug 09 2024 10:58:22 GMT-0500 (Central Daylight Time)'))
houstonParkingManagement.removeCar('south side', 'abc', new Date('Fri Aug 09 2024 12:56:22 GMT-0500 (Central Daylight Time)'))
houstonParkingManagement.removeCar('south side', 'abcd', new Date('Fri Aug 09 2024 12:58:22 GMT-0500 (Central Daylight Time)'))
houstonParkingManagement.removeCar('north side', 'xyz', new Date('Fri Aug 10 2024 12:58:22 GMT-0500 (Central Daylight Time)'))
console.log(`parking lot that made most revenue: ${houstonParkingManagement.fetchHighestRevenueGenerator()}`)
console.log(houstonParkingManagement.parkingLots)