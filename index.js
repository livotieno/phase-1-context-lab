
/* Your Code Here */
const createEmployeeRecord = function (employeeData) {
    return {
      firstName: employeeData[0],
      familyName: employeeData[1],
      title: employeeData[2],
      payPerHour: employeeData[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
  };
  
  const createEmployeeRecords = function (employeesData) {
    return employeesData.map(createEmployeeRecord);
  };
  
  const createTimeInEvent = function (timestamp) {
    const [date, hour] = timestamp.split(" ")[1].split(":");
    const timeInEvent = {
      type: "TimeIn",
      hour: parseInt(hour),
      date: date,
    };
    this.timeInEvents.push(timeInEvent);
    return this;
  };
  
  const createTimeOutEvent = function (timestamp) {
    const [date, hour] = timestamp.split(" ")[1].split(":");
    const timeOutEvent = {
      type: "TimeOut",
      hour: parseInt(hour),
      date: date,
    };
    this.timeOutEvents.push(timeOutEvent);
    return this;
  };
  
  const hoursWorkedOnDate = function (date) {
    const timeInEvent = this.timeInEvents.find((e) => e.date === date);
    const timeOutEvent = this.timeOutEvents.find((e) => e.date === date);
  
    if (!timeInEvent || !timeOutEvent) {
      return 0;
    }
  
    return timeOutEvent.hour - timeInEvent.hour;
  };
  
  const wagesEarnedOnDate = function (date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    return hoursWorked * this.payPerHour;
  };
  
  /*
   We're giving you this function. Take a look at it, you might see some usage
   that's new and different. That's because we're avoiding a well-known, but
   sneaky bug that we'll cover in the next few lessons!
  
   As a result, the lessons for this function will pass *and* it will be available
   for you to use if you need it!
   */
  
  const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
      return e.date;
    });
  
    const payable = eligibleDates.reduce(
      function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d);
      }.bind(this),
      0
    ); // <== Hm, why did we need to add bind() there? We'll discuss soon!
  
    return payable;
  };


