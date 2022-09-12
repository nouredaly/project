/* Global Variables */
const apiKey = '&appid=0a5933b05bb2a9e920438974545636a3&units=imperial'
const apiURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const date = document.querySelector('#date');
const temp =document.querySelector('#temp');
const content = document.querySelector('#content');
const entryHolder = document.querySelector('#entryHolder');
const generate = document.querySelector('#generate');

// Create a new date instance dynamically with JS
let theDate = new Date();
let newDate = theDate.getMonth()+1 +'.'+ theDate.getDate()+'.'+ theDate.getFullYear();

generate.addEventListener('click', async()=>{
    const zipCode = document.querySelector('#zip').value
    const feelings = document.querySelector('#feelings')

    try {
        const apiData = await fetch(`${apiURL}${zipCode}${apiKey}`)
            .then(res => res.json());
        apiData.feelings = feelings.value
        apiData.date = newDate
        // Post data to server 
        const posted = await fetch('/savingData', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(apiData)
        }).then(res => res.json());
        updateUI()
    } catch (err) {
        console.log(err);
    }
})

async function updateUI(){
    try {
        const serverRes = await fetch ('/getData', { credentials: 'same-origin'})
        .then(res => res.json());
        content.innerHTML =
        `City: ${serverRes.name}
        <div> Date: ${serverRes.date} </div>
        <div> Temp: ${serverRes.temp} </div>
        <div> Weather: ${serverRes.weather} </div>
        <div> Feelings: ${serverRes.feelings} </div>
        `
    } catch (err) {
        console.log(err)
    }
}

