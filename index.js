
let jsonOBJ = {}
let globalBaserate = 1
let timeStamp


document.addEventListener('DOMContentLoaded', pullContent
)

function pullContent() {fetch('https://api.coingecko.com/api/v3/exchange_rates').then(res=>res.json()).then(data=> {
        buildPage(data); jsonOBJ = data; timeStamp = new Date(); addTimeStamp(timeStamp)

})}

function addTimeStamp(time){
    let timeHeader = document.createElement('h1')
    timeHeader.id = 'time-header'
    timeHeader.textContent = `This request pulled from api.coingecko.com on ${time}`
    document.querySelector('body').prepend(timeHeader)

}


function buildPage(data){
    //start by clearing the dom
    while (document.querySelector('#card-body').children.length) {document.querySelector('#card-body').firstChild.remove()}
    //then build all the cards
    for (let i of Object.keys(data['rates'])){
        makeCard.call(data['rates'][i],i,globalBaserate);
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
    pValue.textContent = this.value / baserate

    div.appendChild(pName)
    div.appendChild(pValue)

    document.querySelector('#card-body').appendChild(div)

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

    //baserate button resests the global baserate value and rebuilds the page using the jsonOBJ copy
    baseRateButton.addEventListener('click', ()=> {globalBaserate = this.value; buildPage(jsonOBJ)}
    )
}


//display time of fetch, using event listener time get or whatever, at top of screen...with a button to update...but that keeps the current base rate :-)

//I really want the baserate button to be on the right hand side

//if I could refactor makecard somehow..you refactors can be called using dot call and pass this as context