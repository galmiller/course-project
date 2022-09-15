/*const courts= require("./DataCourts") */
let Date_Picker;
let map;
const x = document.getElementById("geo");
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(showPosition);
    } else { 
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  
  function showPosition(position) {
    let Myposition = {lat: position.coords.latitude, lng: position.coords.longitude};
    x.innerHTML="Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;
    map.setCenter(Myposition);
   
    const marker = new google.maps.Marker({
        position: Myposition,
        map: map
      });
      courts.forEach(element => {
      const markerForCourts=new google.maps.Marker({

        position: element.coordinates,
        map: map 
        
      })
      markerForCourts.addListener("click", () => {
       
        map.setCenter(markerForCourts.getPosition());
        getAvailability(element.Name,Date_Picker.getDate());
      });
    
      
      });


}

function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        x.innerHTML = "User denied the request for Geolocation."
        break;
      case error.POSITION_UNAVAILABLE:
        x.innerHTML = "Location information is unavailable."
        break;
      case error.TIMEOUT:
        x.innerHTML = "The request to get user location timed out."
        break;
      case error.UNKNOWN_ERROR:
        x.innerHTML = "An unknown error occurred."
        break;
    }
  }
 

 
function initMap() {
    const uluru = { lat: -25.344, lng: 131.031 }; 
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: uluru,
      });
      
  
    }

    const elem = document.querySelector('input[name="foo"]');
    Date_Picker = new Datepicker(elem, {
      // ...options
    }); 
 
elem.addEventListener("changeDate",(Event) =>{

  console.log(Event);
})




