function censor() {
    const arrayString = [];
    return function (stringOne, stringTwo = '') {
        if (stringTwo) {
            arrayString.push([stringOne, stringTwo]);
            /*
            Если передано две переменных -> добавляем значения в массив.
            */
        } else {
            /*
            Иначе обходим наш массив циклом и заменяем регулярным выражением
            В поступившей нам строке на значения из массива.
            */
            for (let couple of arrayString) {
                stringOne = stringOne.replace(new RegExp(couple[0], 'gi'), couple[1]);
            }
            return stringOne;
        }
    }
}

const changeScene = censor();
changeScene('PHP','JS');
changeScene('backend', 'frontend')
console.log(changeScene('PHP is the most popular programming language for backend web-development'));
