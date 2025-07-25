const Base_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";


const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".From select");
const toCurr = document.querySelector(".To select");
const msg =document.querySelector(".msg");

window.document.addEventListener("load", () => {
    updateExchangerate();
});

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }else if (select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element)  => {
    let currCode =element.value;
    let countryCode =countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src=newSrc;

};

btn.addEventListener("click", (evt)=>{
    evt.preventDefault();//used all work by us when form submitted or button clicked not automatically does.
   updateExchangerate();
});

updateExchangerate = async () =>{
     let amount = document.querySelector(".amount input");
    let amtval =amount.value;
    if(amtval === "" || amtval <1 ){
         amount.value ="1";
    }


   // console.log(fromCurr.value,toCurr.value);
    const URL = `${Base_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    
    let data = await response.json();
    
    const fromCode = fromCurr.value.toLowerCase();
    const toCode = toCurr.value.toLowerCase();

    let rate = data[fromCode][toCode];

    let convertedAmount = (amount.value * rate).toFixed(2);
    console.log(`ConvertedAmount: ${convertedAmount}`);
    msg.innerText = `${amtval} ${fromCurr.value} = ${convertedAmount} ${toCurr.value}`;
}