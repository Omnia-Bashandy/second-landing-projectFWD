/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate =  d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

const apiK = "&appid=d24bf70d6dae818a6893be61edd0ae3c&units=metric";

const error = document.getElementById("error");

const server = "http://127.0.0.1:4000";
let generateBtn= document.getElementById("generate")

// generate function to generate info from inputs
function generateData(e){
    const zipCode = document.getElementById('zip').value
    const feeling = document.getElementById("feelings").value;
    getWData(baseURL, zipCode, apiK).then(function(data) {
        // console.log(data);
        postAllData(server + "/add", {
            date: d,
            temp: data.main.temp,
            content: feeling,
        });
        updtUI();
        console.log(data);
    });
};
generateBtn.addEventListener("click",generateData);

const getWData = async (baseURL,zipCode , apiK) => {
    const Res = await fetch(baseURL + zipCode + apiK);
    try{
        const data = await Res.json();
        return data;
    }
    catch(err){
        console.log(`error${err}`);
    }
}
//  POST Function
const postAllData = async(url = "", data = {}) => {
    console.log(data);
    const Res = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await Res.json();
        console.log(newData);
        return newData;
    } catch (e) {
        console.log("error", e);
    }
};
const updtUI = async () => {
    try {
        const req = await fetch(server +"/all");
        const savedData = await req.json();
        console.log(savedData);
        document.getElementById("date").innerHTML = ("Date: " + savedData.date);
        document.getElementById("temp").innerHTML ="Tempreture : "+ savedData.temp + '&degC';
        document.getElementById("content").innerHTML ="Your Feeling is : "+ savedData.content;
    } catch (error) {
        console.log(error);
    }
};
