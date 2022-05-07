
let jsonOBJ = {}
document.addEventListener('DOMContentLoaded',

()=>{fetch('https://api.coingecko.com/api/v3/exchange_rates').then(res=>res.json()).then(data=> {
        buildPage(data); jsonOBJ = data;
})}
)


//separate the for loop in the fetch funcion. make it take the json object.
//copy the json object so it can be reused

function buildPage(data){
    //start by clearing the dom
    while (document.querySelector('body').children.length) {document.querySelector('body').firstChild.remove()}
    //then build all the cards
    for (let i of Object.keys(data['rates'])){
        makeCard.call(data['rates'][i],i,1);
    }
    return jsonOBJ
}



function makeCard(id,baserate){



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
    const baseRateButton = document.createElement('button')

    divDropDown.className = 'drop-down'
    
    divDropDown.id = `${id}-drop-down`
    

    ptype.textContent = `Type: ${this.type}`
    pSymbol.textContent = `Unit: ${this.unit}`
    baseRateButton.textContent = `Use ${this.name} as base rate`
    baseRateButton.className = 'base-rate-button'


    divDropDown.appendChild(ptype)
    divDropDown.appendChild(pSymbol)
    div.parentElement.append(baseRateButton)

    //add event listener to div 'click' to append/remove  p
    div.addEventListener('click', (event)=>
        { if ( 
            Boolean(document.querySelector(`#${id}-drop-down`))
            ){
                document.querySelector(`#${id}-drop-down`).remove()
        }
        else  
        event.target.appendChild(divDropDown);
        }
    )

    
    baseRateButton.addEventListener('click', ()=>console.log(this)
    )
}

// ()=> {while (document.querySelector('body').children.length) {document.querySelector('body').firstChild.remove()}}

//1. put the fetch request in its own function that makes a global copy of the json file, and makes a global copy of a timestamp.
//2. then you can call makecard with that global json copy as the context and use Object.keys(this.rates), you won't have to pass anything into makeCard at all.
//then make makeCard recursive delete all the dom divs if they're there so it can be used to refresh the list when you sort or change the base rate.

//actually, all you have to do is pass the whole json object as context in your first fetch>makeCard call...tehn refactor makeCard using all that data...this.rate>keys etc. 
//then make makeCards revursive del elems if there, and add makeCard to the button with baserate variable.


//provide a function to sort by total value, lowest and another sort by highest

//provide a function to switch base rate
    //this could be done by adding a global variable for base rate, then on pValue in makeCard add an event listener that listens for global variable base rate to change...and when it does it changes it's function scope variable

    //or...I could add a second arg to makeCard that is the exchange rate, and when you click the base rate button of a certain card, it 1. dels all the active cards, 2. runs make card again with the new base rate.

//display time of fetch, using event listener time get or whatever, at top of screen...with a button to update...but that keeps the current base rate :-)