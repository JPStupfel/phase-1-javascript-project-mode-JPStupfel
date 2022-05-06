
const test = document.createElement('div')
test.textContent = 'testing'
document.querySelector('body').appendChild(test)

fetch('https://api.coingecko.com/api/v3/exchange_rates').then(res=>res.json()).then(data=> {test.textContent = data['rates']['aed']['value']; console.log(data)})

