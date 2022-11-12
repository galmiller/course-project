const courtSelection = document.getElementById('courtSelection');

// const courts = [
//     { coordinates: [34.8277467689404, 32.17063790520452], name: "court1" },
//     { coordinates: [34.81980558366992, 32.16120607032562], name: "court2" },
//     { coordinates: [34.96450281659485, 32.15765209010602], name: "court3" },
//     { coordinates: [34.85395289198614, 32.166080622859454], name: "court4" },
//     { coordinates: [34.873522288578364, 32.180320165055676], name: "court5" }]

(() => {  
    courtSelection.addEventListener('change', (e) => {
        const point = e.target.value.split(',');
        point[0] = parseFloat(point[0].slice(0, point[0].length));
        point[1] = parseFloat(point[1].slice(0, point[1].length - 1));
        map.flyTo({ center: point, zoom: 15 });
        
    })
})()