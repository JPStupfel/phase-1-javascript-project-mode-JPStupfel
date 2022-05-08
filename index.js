
let jsonOBJ = {}
let globalBaserate = 1
let timeStamp


document.addEventListener('DOMContentLoaded',pullContent)

function pullContent() {fetch('https://api.coingecko.com/api/v3/exchange_rates').then(res=>res.json()).then(data=> {
        buildPage(data); jsonOBJ = data; timeStamp = new Date(); addTimeStamp(timeStamp)

})}

function addTimeStamp(time){

    let timeHeader = document.createElement('h1')
    timeHeader.id = 'time-header'
    timeHeader.textContent = `${time}`



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

//returns the baserate button
function makeBaserateButton(){
    const baseRateButton = document.createElement('button')
    baseRateButton.textContent = `Use ${this.name} as base rate`
    baseRateButton.className = 'base-rate-button'
     //baserate button resests the global baserate value and rebuilds the page using the jsonOBJ copy
     baseRateButton.addEventListener('click', ()=> {globalBaserate = this.value; buildPage(jsonOBJ)}
     )
    return baseRateButton
}

function makeDiv(id,baserate){
    const div = document.createElement('div')
    const pName = document.createElement('p')
    const pValue = document.createElement('p')

    div.id = `${id}-container-div`
    div.className = 'card'
    pName.className = 'name'
    pValue.className = 'value'

    pName.textContent = this.name
    pValue.textContent = this.value / baserate

    div.appendChild(pName)
    div.appendChild(pValue)

    div.addEventListener('click', (event)=>
    { if ( 
        Boolean(document.querySelector(`#${id}-drop-down`))
        ){
            document.querySelector(`#${id}-drop-down`).remove()
    }
    else  
    event.target.appendChild(makeDropDown.call(this,id));
    }
)

    return div

}

function makeDropDown(id){
    const divDropDown = document.createElement('div')
    const ptype = document.createElement('p')
    const pSymbol = document.createElement('p')

    divDropDown.className = 'drop-down'
    
    divDropDown.id = `${id}-drop-down`
    

    ptype.textContent = `Type: ${this.type}`
    pSymbol.textContent = `Unit: ${this.unit}`
  


    divDropDown.appendChild(ptype)
    divDropDown.appendChild(pSymbol)

    return divDropDown
}

function makeCard(id,baserate){

    const div = makeDiv.call(this,id,baserate)
    document.querySelector('#card-body').appendChild(div)

    const baseRateButton = makeBaserateButton.call(this)
    div.append(baseRateButton)
       
}


//refactor makecard for each item

//function to sort jsonOBJ alphabetically
//function to sort jsonOBJ by rate low to high
//function to sort jsonOBJ by rate high to low
