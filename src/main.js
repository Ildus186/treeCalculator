import './style.css'

const form = document.querySelector('form')
const inputs = form.getElementsByTagName('input')
const materialWidth = inputs[0]
const materialHeight = inputs[1]
const lengthMaterial = inputs[2]
const materialQuantity = inputs[3]
const priceBox = inputs[4]
const resultBox = form.querySelector('.output1')
const resultSumBox = form.querySelector('.output2')


function calculateResult() {
    
    const width = parseFloat(materialWidth.value) || 0;
    const height = parseFloat(materialHeight.value) || 0;
    const length = parseFloat(lengthMaterial.value) || 0;
    const quantity = parseFloat(materialQuantity.value) || 1;
    const price = parseFloat(priceBox.value) || 0;
    
    const result = 0.0001 * width * height * length * quantity;
    const resultSum = result * price
    const roundedResultSum = Math.round(resultSum * 100) / 100;

    const formatter = new Intl.NumberFormat('ru-RU');

    resultBox.textContent = `Объём: ${formatter.format(result)} м3`;
    resultSumBox.textContent = `Стоимость: ${formatter.format(roundedResultSum)} руб.`
}   

calculateResult();
 
form.addEventListener('input', calculateResult);  


const installButton = document.getElementById('installBtn');
let deferredPrompt;

// 1. Показываем кнопку, когда браузер готов предложить установку
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installButton.classList.remove('hidden'); // Показываем кнопку
  
  // Автоматически скрыть через 10 секунд
  setTimeout(() => {
    installButton.classList.add('hidden');
  }, 10000);
});

// 2. Обработка клика по кнопке
installButton.addEventListener('click', async () => {
  if (deferredPrompt) {
    // Показываем нативное окно установки
    deferredPrompt.prompt();
    
    // Ждём выбора пользователя
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`Пользователь выбрал: ${outcome}`);
    
    // Скрываем кнопку после выбора
    installButton.classList.add('hidden');
    deferredPrompt = null;
  } else {
    // Если события beforeinstallprompt не было (например, на iOS)
    showInstallInstructions();
  }
});

// 3. Если приложение уже установлено — скрываем кнопку
window.addEventListener('appinstalled', () => {
  console.log('Приложение установлено!');
  installButton.classList.add('hidden');
});

// 4. Функция для показа инструкций (особенно для iOS)
function showInstallInstructions() {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
  
  if (isIOS && isSafari) {
    alert('Для установки нажмите кнопку "Поделиться" (📤) внизу и выберите "На экран «Домой»"');
  } else if (/Android/.test(navigator.userAgent)) {
    alert('Нажмите ⋮ (меню) в браузере и выберите "Установить приложение"');
  } else {
    alert('Используйте кнопку установки в адресной строке браузера');
  }
}

// 5. Проверяем, установлено ли приложение уже
if (window.matchMedia('(display-mode: standalone)').matches) {
  // Приложение уже запущено в standalone-режиме
  installButton.classList.add('hidden');
}