
const test = document.createElement('div')


fetch('https://api.coingecko.com/api/v3/exchange_rates').then(res=>res.json()).then(data=> { for (let i of Object.values(data['rates']))
    { 
        console.log(i.name)
        makeCard(i.name,i.value); console.log(data)
    }
})

//create a card builer
//input will be (name,value)
/*out = 
<div id=`${name}`>
    <p classname='name'>name</p>
    <p classname='value'></p>
</div>
*/

function makeCard(name,value){
    const div = document.createElement('div')
    const pName = document.createElement('p')
    const pValue = document.createElement('p')

    div.id = `${name}`
    pName.className = 'name'
    pValue.classValue = 'value'

    pName.textContent = name
    pValue.textContent = value

    div.appendChild(pName)
    div.appendChild(pValue)

    document.querySelector('body').appendChild(div)

}