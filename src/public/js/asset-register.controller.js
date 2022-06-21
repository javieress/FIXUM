// const placesList = require("..")
const place1 = {
    id: 0001,
    nombre: "Sala 1"
}
const place2 = {
    id: 0002,
    nombre: "Sala 2"
}
const place3 = {
    id: 0003,
    nombre: "Biblioteca"
}
const place4 = {
    id: 0004,
    nombre: "GYM"
}

let placesList = [place1,place2,place3,place4]

function insertPlaces(placesList){
    console.log('poto');
    const placesOptions = document.getElementById('placesOptions')
    placesList.forEach(place => {
        const insert = `<option value="${place.nombre}">${place.nombre}</option>`
        placesOptions.insertAdjacentHTML('beforeend',insert)
    });
    
}
insertPlaces(placesList)

