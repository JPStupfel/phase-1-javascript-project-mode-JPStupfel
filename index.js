
const test = document.createElement('div')


fetch('https://api.coingecko.com/api/v3/exchange_rates').then(res=>res.json()).then(data=> { for (let i of Object.values(data['rates']))
    { 
        
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

    //make the drop down p
    const divDropDown = document.createElement('div')
    const ptype = document.createElement('p')
    const pSymbol = document.createElement('p')

    divDropDown.className = 'drop-down'
    divDropDown.id = `${this.name}-drop-down`

    ptype.textContent = `Type: ${this.type}`
    pSymbol.textContent = `Unit: ${this.unit}`
    divDropDown.appendChild(ptype)
    divDropDown.appendChild(pSymbol)

    //add event listener to div 'click' to append/remove  p
    div.addEventListener('click', (event)=>
    { 
       if ( 
           Boolean(document.querySelector(`#${this.name}-drop-down`))
           ){
            document.querySelector(`#${this.name}-drop-down`).remove()
       }
       else  
       event.target.appendChild(divDropDown);
       console.log(Boolean(document.querySelector(`#${this.name}-drop-down`)))
    }
    )
    
}
// div.addEventListener('click', (event)=>
// { 
//    if ( event.target.children.length <=2 ){
//     event.target.appendChild(divDropDown);
//     console.log(event.target)
//    }
//    else event.target.querySelector('.drop-down').remove()
// }
// )