const datePicker = document.getElementById("datePicker");
const court = document.getElementById("court");
const days = document.getElementById("days");
const submitBtn = document.getElementById("courtsSubmit");

submitBtn.addEventListener("click",(event)=> {
const data={
    date:datePicker.value ,
    time:days.value,
    court:court.value
}
let saveCourts = JSON.parse(localStorage.getItem('saveCourts'));
if (!saveCourts||saveCourts==""||!Array.isArray(saveCourts)) {
    
    saveCourts=[];
}

saveCourts.push(data);

localStorage.setItem("saveCourts", JSON.stringify(saveCourts));

console.log(`${window.location.hostname}/MyProfile.html`);
window.location.href=`/MyProfile`;
});



