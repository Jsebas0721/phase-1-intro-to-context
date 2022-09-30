// Your code here
function createEmployeeRecord([firstName, familyName, jobTitle, ratePerHour]){

    const employee = { 
        firstName: firstName,
        familyName: familyName,
        title: jobTitle,
        payPerHour: ratePerHour,
        timeInEvents: [],
        timeOutEvents: [],
    };

    return employee;
}

function createEmployeeRecords(arrayOfArrays){

    const employeeRecord = arrayOfArrays.map( record => createEmployeeRecord(record));


    return employeeRecord;
}

function createTimeInEvent(employeeRecord, timeStamp){

    const splitTime = timeStamp.split(" ");
    const timeInObject = {
        type: "TimeIn",
        hour: parseInt(splitTime[1]),
        date: splitTime[0],
    }
    employeeRecord.timeInEvents.push(timeInObject);
   
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, timeStamp){
    const splitTime = timeStamp.split(" ");
    const timeOutObject = {
        type: "TimeOut",
        hour: parseInt(splitTime[1]),
        date: splitTime[0],
    }

    employeeRecord.timeOutEvents.push(timeOutObject);
  
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date){

    const timeInHour = employeeRecord.timeInEvents.find(record => record.date === date);
    const timeOutHour = employeeRecord.timeOutEvents.find(record => record.date === date);

    return (timeOutHour.hour - timeInHour.hour) / 100;
}

function wagesEarnedOnDate(employeeRecord, date){

    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
   
    return hoursWorked * employeeRecord.payPerHour;
}


function allWagesFor(employeeRecord){

    const wagesForDates = employeeRecord.timeInEvents.map(record => record.date);
   
    const owedForAllDates = wagesForDates.reduce((previousValue, currentValue) => previousValue + wagesEarnedOnDate(employeeRecord, currentValue), 0);

    return owedForAllDates;
}

function calculatePayroll(employeeRecords){

    const totalOwed = employeeRecords.map(record => allWagesFor(record));

    const totalOwedToEmployees = totalOwed.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
   // console.log(totalOwed);
    console.log(totalOwedToEmployees);
    return totalOwedToEmployees;
}
