
const test = document.createElement('div')


fetch('https://api.coingecko.com/api/v3/exchange_rates').then(res=>res.json()).then(data=> { for (let i of Object.values(data['rates']))
    { 
        console.log(i.name)
        makeCard.call(i);
    }
})

//create a card builder
//input will be (name,value)
/*out = 
<div id=`${name}`>
    <p classname='name'>name</p>
    <p classname='value'></p>
</div>
*/
//lets change this so instead of taking args it does a .this
function makeCard(){
    const div = document.createElement('div')
    const pName = document.createElement('p')
    const pValue = document.createElement('p')

    div.id = `${this.name}`
    div.className = 'card'
    pName.className = 'name'
    pValue.classValue = 'value'

    pName.textContent = this.name
    pValue.textContent = this.value

    div.appendChild(pName)
    div.appendChild(pValue)

    document.querySelector('body').appendChild(div)

}
