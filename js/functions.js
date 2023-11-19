const lengthCheck = function (string, symbols) {
  return(string.length <= symbols);
};

lengthCheck('абракадабра', 15);
lengthCheck('абракадабра', 11);
lengthCheck('абракадабра', 10);

const palinCheck = function (string){
  string = string.replaceAll(' ', '').toLowerCase();
  let emptyString = ('');
  for (let i = string.length - 1; i >= 0; i = i - 1) {
    let currSymb = string.at(i);
    emptyString += currSymb;
  }
  return emptyString === string;
};


palinCheck('топот');
palinCheck('ДовОд');
palinCheck('Кекс');
palinCheck('Лёша на полке клопа нашёл');


function meetingWithinWorkHours(dayStart, dayEnd, meetingStart, meetingDuration) {
  function convertToMinutes(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  const dayStartInMinutes = convertToMinutes(dayStart);
  const dayEndInMinutes = convertToMinutes(dayEnd);
  const meetingStartInMinutes = convertToMinutes(meetingStart);
  const meetingEndInMinutes = meetingStartInMinutes + meetingDuration;

  return meetingStartInMinutes >= dayStartInMinutes && meetingEndInMinutes <= dayEndInMinutes;
}

// Примеры использования
console.log(meetingWithinWorkHours('08:00', '17:30', '14:00', 90)); // true
console.log(meetingWithinWorkHours('8:0', '10:0', '8:0', 120));     // true
console.log(meetingWithinWorkHours('08:00', '14:30', '14:00', 90)); // false
console.log(meetingWithinWorkHours('14:00', '17:30', '08:0', 90));  // false
console.log(meetingWithinWorkHours('8:00', '17:30', '08:00', 900)); // false
console.log(meetingWithinWorkHours('08:00', '15:30', '14:00', 90)); // true
