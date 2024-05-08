let search=document.querySelector('.search');
let input=document.querySelector('.inputCity');
let yourWeather=document.querySelector('.yourWeather');
let searchWeather=document.querySelector('.searchWeather');
let city=document.querySelector('.city');
let yourWeatherCode=document.querySelector('.yourWeatherCode');
getCurr();
function getCurr(){
  navigator.geolocation.getCurrentPosition((p)=>{
    let lat=p.coords.latitude;
    let lon=p.coords.longitude;
   getWeather(lat,lon);
    
  })
}
async function getWeather(lat,lon){

 try{ const myLocation=document.querySelector('.location');
const flag=document.querySelector('.country');

const weather=document.querySelector('.myWeather');
const icon=document.querySelector('.myWeatherImage');
const temperature=document.querySelector('.myTemp');
const windSpeed=document.querySelector('.windSpeed');
const humidity=document.querySelector('.humidity');
const clouds=document.querySelector('.clouds');
  let key="a3493c8250255ee5dae6c8b486bcabe5";
  let response=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`);
  let data=await response.json();
  myLocation.innerText=data?.name;
  flag.src=`https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`;
  weather.innerText=data?.weather?.[0]?.main;
  icon.src=`https://openweathermap.org/img/wn/${data?.weather?.[0]?.icon}@2x.png`;
  windSpeed.innerText=data?.wind?.speed +" m/s";
  humidity.innerText=data?.main?.humidity +" %";
  clouds.innerText=data?.clouds?.all +" %";
  temperature.innerText=(data?.main?.temp-271.15).toFixed(2)+" °C";
  if(data?.name==undefined){
    searchWeather.click();
    throw new Error("error");
  }
}
  catch(e){
    alert("try again");
  }
 
}
search.addEventListener('click',searchCity);
async function searchCity(){
   if(input.value==""){return;}
   try{
    let city=input.value;
    let response1=await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=a3493c8250255ee5dae6c8b486bcabe5`);
    let data1=await response1.json();
  
    let latitude=data1?.[0]?.lat;
    let longitude=data1?.[0]?.lon;
    getWeather(latitude,longitude);
    yourWeatherCode.classList.remove('invisible');

   }
   catch(e){
    alert('no city found....try writing a valid name');
   }
}
yourWeather.addEventListener('click',()=>{
  yourWeather.setAttribute("style","background-color: rgb(132, 173, 209);");
  searchWeather.setAttribute("style","background-color: rgb(0, 153, 255);");
  for(let key of yourWeatherCode.classList){if(key=="invisible"){
    yourWeatherCode.classList.remove('invisible');
  }}
  for(let key of city.classList){if(key=="invisible"){
    getCurr();return;
  }}
  city.classList.add('invisible');
  getCurr();
});

searchWeather.addEventListener('click',()=>{
  searchWeather.setAttribute("style","background-color: rgb(132, 173, 209);");
  yourWeather.setAttribute("style","background-color: rgb(0, 153, 255);");
 
  for(let key of city.classList){if(key=="invisible"){
    city.classList.remove('invisible');
  }} 
  let inv=true;
  for(let key of yourWeatherCode.classList){if(key=="invisible"){
    inv=false;
  }}
if(inv){yourWeatherCode.classList.add('invisible');}
   input.value="";
});
input.addEventListener('keypress',(e)=>{
  if(e.key==="Enter"){
    e.preventDefault();
    search.click();
  }
})
