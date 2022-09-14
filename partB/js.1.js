const ActivePage=window.location.pathname;

const activeNav=document.querySelectorAll('nav a').forEach(

PageLinks=>{
if (PageLinks.href.includes(`${ActivePage}`)) {
	
	PageLinks.classList.add('Active');
}

}	
)

const x = document.getElementById("demo");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
  function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
  }

  