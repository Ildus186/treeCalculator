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

console.log(inputs);

function calculateResult() {
    
    const width = parseFloat(materialWidth.value) || 0;
    const height = parseFloat(materialHeight.value) || 0;
    const length = parseFloat(lengthMaterial.value) || 0;
    const quantity = parseFloat(materialQuantity.value) || 0;
    const price = parseFloat(priceBox.value) || 0;
    
    const result = 0.0001 * width * height * length * quantity;
    const resultSum = result * price

    const formatter = new Intl.NumberFormat('ru-RU');

    resultBox.textContent = `Объём: ${formatter.format(result)} м3`;
    resultSumBox.textContent = `Стоимость: ${formatter.format(resultSum)} Руб.`
}   

calculateResult();

materialWidth.addEventListener('input', calculateResult);
materialHeight.addEventListener('input', calculateResult);
materialQuantity.addEventListener('input', calculateResult);

 
form.addEventListener('input', calculateResult);  

 
form.addEventListener('submit', function(event) {
    event.preventDefault();   
    calculateResult();
});