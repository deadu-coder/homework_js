// Получаем элементы со страницы
const spoiler = document.getElementById('spoiler');
const myBtn = document.getElementById('myBtn');

// Добавляем обработчик клика на кнопку
myBtn.addEventListener('click', toggleElem);

// Добавляем обработчик нажатия клавиши Esc
document.addEventListener('keydown', closeWithEsc);

// Функция для переключения состояния элемента
function toggleElem() {
  spoiler.classList.toggle('closed');
}

// Функция для закрытия элемента при нажатии клавиши Esc
function closeWithEsc(event) {
  // Проверяем, что элемент не закрыт и нажата клавиша Esc
  if (!spoiler.classList.contains('closed') && event.key === 'Escape') {
    spoiler.classList.add('closed');
  }
}