
let jsonOBJ = {}
let timeStamp
let globalBaserate = 1
let globalBaserateID = 'BTC'

document.addEventListener('DOMContentLoaded',pullContent)



function pullContent() {
    fetch('https://api.coingecko.com/api/v3/exchange_rates').then(res=>res.json()).then(data=> {
        buildPage(data); jsonOBJ = data; timeStamp = new Date(); addTimeStamp(timeStamp)})
}

function addTimeStamp(time){
    let timeHeader = document.createElement('h1')
    timeHeader.id = 'time-header'
    timeHeader.textContent = `${time}`
    document.querySelector('body').prepend(timeHeader)
}

//returns the baserate button
function makeBaserateButton(id){
    const baseRateButton = document.createElement('button')
    baseRateButton.textContent = `Use ${this.unit} as base rate`
    baseRateButton.className = 'base-rate-button'
     //baserate button resests the global baserate value and rebuilds the page using the jsonOBJ copy
     baseRateButton.addEventListener('click', ()=> {globalBaserateID = this.unit; globalBaserate = this.value; buildPage(jsonOBJ)})
    return baseRateButton
}

function makeDiv(id){
    const div = document.createElement('div')
    const pName = document.createElement('p')
    const pValue = document.createElement('p')

        div.id = `${id}-container-div`
        div.className = 'card'
        
        pName.className = 'name'
        pValue.className = 'value'

        pName.textContent = this.name
        pValue.textContent = `${this.value / globalBaserate}(${globalBaserateID})`

    div.appendChild(pName)
    div.appendChild(pValue)

    div.addEventListener('click', (event)=>{ 
        if ( Boolean(document.querySelector(`#${id}-drop-down`))){
            document.querySelector(`#${id}-drop-down`).remove()}
         else  event.target.appendChild(makeDropDown.call(this,id));
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

function makeCard(id){

    const div = makeDiv.call(this,id,globalBaserate)
    document.querySelector('#card-body').appendChild(div)

    const baseRateButton = makeBaserateButton.call(this,id)
    div.append(baseRateButton)
       
}

function buildPage(data){
    //start by clearing the card-body
    while (document.querySelector('#card-body').children.length) {document.querySelector('#card-body').firstChild.remove()}
    //then build all the cards
    for (let i of Object.keys(data['rates'])){
        makeCard.call(data['rates'][i],i);
    }
return jsonOBJ
}

//function to sort jsonOBJ alphabetically
//function to sort jsonOBJ by rate low to high
//function to sort jsonOBJ by rate high to low

//I want to rearrange the object jsonOBJ.rates by jsonOBJ.rates[i].name alphabetically


function sortJsonAlpha(){
    let sortArray = []
    //newOBJ will replace jsonOBJ['rates] once we build it sorted
    let newOBJ = {}

    //add all the sorting values to sortArray
    for (let i in jsonOBJ.rates) {
        sortArray.push(jsonOBJ.rates[i]['name'])
    }

    //sort sortArray however you like
    sortArray = sortArray.sort()

    //for all sorted values in order, iterate through orig obj by keys, if origOBJ.key.sortingValue === sortArray[iterater] then add origOBJ.key to the newOBJ
    for (let i in sortArray){
        for (j in jsonOBJ.rates )
        {
            if (jsonOBJ.rates[j]['name'] === sortArray[i]){
                newOBJ[j] = jsonOBJ.rates[j]
            }
        }
    } 
    //replace with newObj
    jsonOBJ['rates']=newOBJ
    buildPage(jsonOBJ)
}

