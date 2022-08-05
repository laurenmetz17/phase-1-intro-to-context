// Your code here

function createEmployeeRecord(employee) {
    let newEmployee = {};
    newEmployee.firstName = employee[0];
    newEmployee.familyName = employee[1];
    newEmployee.title = employee[2];
    newEmployee.payPerHour = employee[3];
    newEmployee.timeInEvents = [];
    newEmployee.timeOutEvents = [];
    return newEmployee;
}

function createEmployeeRecords(employees) {
    let employeeRecords = [];
    employees.forEach(employee => {
        employeeRecords.push(createEmployeeRecord(employee));
    })
    return employeeRecords;

}

function createTimeInEvent(employee,time) {
    //time in the form "YYYY-MM-DD 800"
    let timeIn = {};
    timeIn.type ='TimeIn';
    [timeIn.date, timeIn.hour] = time.split(' ');
    timeIn.hour = parseInt(timeIn.hour,10);
    employee.timeInEvents.push(timeIn);
    return employee;
}

function createTimeOutEvent(employee,time) {
    //time in the form "YYYY-MM-DD 800"
    let timeOut = {};
    timeOut.type = 'TimeOut';
    [timeOut.date, timeOut.hour] = time.split(' ');
    timeOut.hour = parseInt(timeOut.hour);
    employee.timeOutEvents.push(timeOut);
    return employee;
}

function hoursWorkedOnDate(employee,date) {
    let inTime  = 0;
    let outTime = 0;
    employee.timeInEvents.forEach(timeIn => {
        if(timeIn.date == date) {
            inTime = timeIn.hour;
        }
    })
    employee.timeOutEvents.forEach(timeOut => {
        if(timeOut.date == date) {
            outTime = timeOut.hour;
        }
    })

    return (outTime - inTime)/100;
}

function wagesEarnedOnDate(employee, date) {
    return hoursWorkedOnDate(employee,date) * employee.payPerHour;
}

function allWagesFor(employee) {
    let allWages = 0;
    let dates = []
    employee.timeInEvents.forEach(event => dates.push(event.date));
    dates.forEach(date => {
        allWages = allWages + (wagesEarnedOnDate(employee,date));
    })
    return allWages;
}

function calculatePayroll(employees) {
    let payRoll = 0;
    employees.forEach(employee => {
        payRoll = payRoll + allWagesFor(employee);
    })
    return payRoll;
}