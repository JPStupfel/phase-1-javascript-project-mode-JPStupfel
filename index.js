

fetch('https://api.coingecko.com/api/v3/exchange_rates').then(res=>res.json()).then(data=> { for (let i of Object.keys(data['rates']))
    { 
        makeCard.call(data['rates'][i],i);
    }
})



function makeCard(id){
    const div = document.createElement('div')
    const pName = document.createElement('p')
    const pValue = document.createElement('p')

    div.id = `${id}-container-div`
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
    
    divDropDown.id = `${id}-drop-down`
    

    ptype.textContent = `Type: ${this.type}`
    pSymbol.textContent = `Unit: ${this.unit}`
    divDropDown.appendChild(ptype)
    divDropDown.appendChild(pSymbol)

    //add event listener to div 'click' to append/remove  p
    div.addEventListener('click', (event)=>
        { 
        if ( 
            Boolean(document.querySelector(`#${id}-drop-down`))
            ){
                document.querySelector(`#${id}-drop-down`).remove()
        }
        else  
        event.target.appendChild(divDropDown);
        }
    )
}
