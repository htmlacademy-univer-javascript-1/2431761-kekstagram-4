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
