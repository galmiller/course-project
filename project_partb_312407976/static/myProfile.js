
const tbody=document.getElementById("content");
let saveCourts = JSON.parse(localStorage.getItem('saveCourts'));
saveCourts.forEach(element => {
    const tr = document.createElement("tr");
    const tdCourt = document.createElement("td");
    const courtText = document.createTextNode(element.court||"_");
    tdCourt.appendChild(courtText); 
    const tdDay = document.createElement("td");
    const dayText = document.createTextNode(element.time);
    tdDay.appendChild(dayText); 
    const tdTime = document.createElement("td");
    const timeText = document.createTextNode(element.date);
    tdTime.appendChild(timeText);
    tr.appendChild(tdCourt); 
    tr.appendChild(tdDay); 
    tr.appendChild(tdTime); 
    tbody.appendChild(tr);
});



