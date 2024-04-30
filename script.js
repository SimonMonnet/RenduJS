let projetJs;
const menuHamburger = document.querySelector('.menu-hamburger')
const navLinks = document.querySelector(".nav-links")
let map = L.map('map').setView([48.85, 2.34], 13);
let marker = L.marker([48.85, 2.34]).addTo(map);
let popups = L.popup()
    .setLatLng([48.855, 2.34])
    .setContent("Nous sommes ici")
    .openOn(map);
let popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("Vous avez cliqué au " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
menuHamburger.addEventListener('click', () =>{
    navLinks.classList.toggle('menu-mobile')
})



document.addEventListener("DOMContentLoaded", function () {
  fetchProjet();
});

function fetchProjet() {
  let apiUrl = "projet.json"; // Lien vers un fichier JSON ou l'URL d'une API externe
  fetch(apiUrl)
    .then(response => response.json()) // Attente de la réponse à une promesse JS qu'on transformera en JSON
    .then(data => {
      projetJs = data.entreprise;

header();

main();

footer(); 

    })
    .catch((error) =>
      console.error("Erreur lors de la récupération des données :", error)
    );
}

function header() {
    let myH1 = document.createElement("h1");
      myH1.textContent = projetJs.nomCommercial;
      document.querySelector("#head").appendChild(myH1);

      let myH2 = document.createElement("h2");
      myH2.textContent = projetJs.phraseAccroche;
      document.querySelector("#head").appendChild(myH2);

    let btn = document.createElement("BUTTON");      
    let bouton = document.createTextNode("Réservez votre aventure");       
    btn.appendChild(bouton);                                
    document.querySelector("#head").appendChild(btn); 

}

function main() {
    let myUl = document.createElement("ul");
      
      document.querySelector("#main").appendChild(myUl);

     
     projetJs.avantagesClients.forEach(element => {
        let myParaH = document.createElement("p");
      myParaH.textContent = element;    
      myUl.appendChild(myParaH);
     });
     let titreActivite = document.createElement('h2');
     titreActivite.textContent = ("Activités:");
     document.querySelector("#main").appendChild(titreActivite);

     


     let myUl2 = document.createElement("ul");
      document.querySelector("#main").appendChild(myUl2);

     
     projetJs.activites.forEach(index => {
        let myActH = document.createElement("h2");
      myActH.textContent =`${index.nom}`;
      myUl2.appendChild(myActH);
let myActP = document.createElement("p");
myActP.textContent = `${index.description}`;
myUl2.appendChild(myActP);

let myImg = new Image(600, 400);
myImg.src = `${index.image}`;
myUl2.appendChild(myImg)
      
     });


}

function footer() {
    let titreTemoin = document.createElement('h2');
titreTemoin.textContent = ("Témoignages:");
document.querySelector("#foot").appendChild(titreTemoin);


     let myUl3 = document.createElement('ul');
     document.querySelector("#foot").appendChild(myUl3);

projetJs.temoignages.forEach(temoin => {
    let myTemoinP = document.createElement('h2');
    myTemoinP.textContent = `${temoin.prenom}`;
myUl3.appendChild(myTemoinP);

const myImageTemoin = new Image(200, 200);
myImageTemoin.src = `${temoin.image}`;
myUl3.appendChild(myImageTemoin);

let myTemoinTE = document.createElement('h3');
myTemoinTE.textContent = `${temoin.typeExperience}`;
myUl3.appendChild(myTemoinTE);


let myTemoinComm = document.createElement("p");
myTemoinComm.textContent = `${temoin.commentaire}`;
myUl3.appendChild(myTemoinComm);

});
}