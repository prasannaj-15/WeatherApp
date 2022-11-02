
// Api Url - https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=4f73b128ecfebbf846f0610eb50558a9

let key = "4f73b128ecfebbf846f0610eb50558a9";
let weatherinfo = document.querySelector("#weatherinfo");

let date1 = (new Date()).toString().split(' ').splice(1,2).join(' ');
let date2 = (new Date()).toString().split(' ').splice(4,1).join(' ');
date = date1 +" "+ date2;

// api.openweathermap.org/data/2.5/forecast/daily?lat=35&lon=139&cnt=10&appid={API key}

// data.coord.lat

async function sevenDayWeather(data){
    
    let lat = data.coord.lat;
    let lon = data.coord.lon;
    console.log(lat);
    try{
        let res1 = await fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=10&appid=${key}`);
        
        let data1 = await res1.join();
        console.log(data1);
    }
    catch(err){
        console.log(err);
    }
}

// sevenDayWeather();

async function getWeather(){
    let city = document.querySelector("#city").value;    
    
    try{

    let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`);
    
    let data = await res.json();
    displayWeather(data);
    sevenDayWeather(data);
    // console.log(data);
    }
    catch(err){
        console.log(err);
    }
}


function displayWeather(data){

    weatherinfo.innerHTML= null;

    let dateNow = document.createElement('p');
    dateNow.innerText = date;    
    
    let name = document.createElement('h2');
    name.innerText =data.name;

    let tempDiv = document.createElement('div');
    tempDiv.setAttribute("id", "tempdiv");    
    let icon = document.createElement('img');
    icon.src = "https://cdn-icons-png.flaticon.com/128/2932/2932445.png";

    let temp = document.createElement('h2');
    temp.innerText = `${data.main.temp}C`;
    
    tempDiv.append(icon,temp);
    

    let feelslike = document.createElement('p');
    feelslike.innerText = `Feels like ${data.main.feels_like}C.`

    let humidity = document.createElement('p');
    humidity.innerText = `Humidity - ${data.main.humidity}`;

    let pressure = document.createElement('p');
    pressure.innerText = `Pressure - ${data.main.pressure}`;

    let visibility = document.createElement('p');
    visibility.innerText = "Visibility - 10.0 Km";

    

    weatherinfo.append(dateNow,name,tempDiv,feelslike,humidity,pressure,visibility);

    let map = document.getElementById('gmap_canvas');

    map.src = `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
}



