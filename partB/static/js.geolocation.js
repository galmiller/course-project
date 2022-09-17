
let Date_Picker;
let map;
var service;
var infowindow;

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
    // x.innerHTML="Latitude: " + position.coords.latitude + 
    // "<br>Longitude: " + position.coords.longitude;
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
      infowindow = new google.maps.InfoWindow();
  
    }

    const elem = document.querySelector('input[name="foo"]');
    Date_Picker = new Datepicker(elem, {
      // ...options
    }); 
 
elem.addEventListener("changeDate",(Event) =>{

  console.log(Event);
})

const request = {
  query: "Basketball courts",
  fields: ["name", "geometry"],
};
service = new google.maps.places.PlacesService(map);

service.nearbySearch(
  request,callback)
  
  
  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        element(results[i]);
      }
    }
  }

//   var map;
// var service;
// var infowindow;
// const x = document.getElementById("geo");
// function getLocation() {
//     if (navigator.geolocation) {
//       navigator.geolocation.watchPosition(showPosition);
//     } else { 
//       x.innerHTML = "Geolocation is not supported by this browser.";
//     }
//   } 
// function initialize() {
//   var pyrmont = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);  
//   map = new google.maps.Map(document.getElementById('map'), {
//       center: pyrmont,
//       zoom: 15
//     });

//   var request = {
//     location: pyrmont,
//     radius: '500',
//     type: ['restaurant']
//   };

//   service = new google.maps.places.PlacesService(map);
//   service.nearbySearch(request, callback);
// }

// function callback(results, status) {
//   if (status == google.maps.places.PlacesServiceStatus.OK) {
//     for (var i = 0; i < results.length; i++) {
//       createMarker(results[i]);
//     }
//   }
// }