
const test = document.createElement('div')

// fetch('https://api.coingecko.com/api/v3/exchange_rates').then(res=>res.json()).then(data=> { for (let i of Object.values(data['rates']))
//     { 
//         makeCard.call(i);
//     }
// })



fetch('https://api.coingecko.com/api/v3/exchange_rates').then(res=>res.json()).then(data=> { 
    for (let i of Object.keys(data['rates'])){ 
        makeCard.call(data.rates[i],i);
        //console.log(i)
    }
    // let keys = Object.keys(data['rates'])
    // console.log(data.rates[keys[0]])
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
function makeCard(id){
    const div = document.createElement('div')
    const pName = document.createElement('p')
    const pValue = document.createElement('p')

    div.id = `${this.name}`
    div.className = 'card'
    pName.className = 'name'
    pValue.className = 'value'

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
    
    divDropDown.id = `${id}-drop-down`
    

    ptype.textContent = `Type: ${this.type}`
    pSymbol.textContent = `Unit: ${this.unit}`
    divDropDown.appendChild(ptype)
    divDropDown.appendChild(pSymbol)

    //add event listener to div 'click' to append/remove  p
    div.addEventListener('click', (event)=>
    { 
       console.log(this)
        console.log(document.querySelector(`#${this.name}-drop-down`))
       if ( 
           Boolean(document.querySelector(`#${id}-drop-down`))
           ){
            document.querySelector(`#${id}-drop-down`).remove()
       
        console.log(event.target)
       }
       else  
       event.target.appendChild(divDropDown);
       
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