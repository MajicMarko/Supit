var Kolegiji = [];
var labela = [];
var Kolegiji_u_tablici = [];
let token1 = localStorage.getItem("token");
$("#tablica").hide();
function Prikaz_Tablice() {
  $("#tablica").show();
}
function getCurriculumList() {
  $.ajax({
    type: "GET",
    url: "https://www.fulek.com/data/api/supit/curriculum-list/hr",
    headers: { Authorization: "Bearer " + token1 },
    success: function (response) {
      response.data.forEach(function (name) {
        Kolegiji.push(name);
        labela.push(name.kolegij);
      });
    },
  });
}

getCurriculumList();
function getCuriculum(vrijednost) {
  $.ajax({
    type: "GET",
    url: `https://www.fulek.com/data/api/supit/get-curriculum/${vrijednost}`,
    headers: { Authorization: "Bearer " + token1 },
    success: function (response) {
      insertPredmet(response.data);
      Prikaz_Tablice();
    },
  });
}

$(function () {
  $("#pretraga").autocomplete({
    source: labela,
    select: function (e, label) {
      var vrijednost;
      Kolegiji.forEach((element) => {
        if (element.kolegij == label.item.label) {
          vrijednost = element.id;
        }
      });
      getCuriculum(vrijednost);
    },
  });
});

function Zbrojivrijednosti() {
  var Ukupno_ects = document.getElementById("ects");
  var Ukupno_sati = document.getElementById("sati");
  let zbroj_ects = 0;
  let zbroj_sati = 0;
  Kolegiji_u_tablici.forEach((element) => {
    zbroj_ects += element.ects;
    zbroj_sati += element.sati;
  });
  Ukupno_ects.innerHTML = zbroj_ects;
  Ukupno_sati.innerHTML = zbroj_sati;
  if (zbroj_sati == 0) {
    $("#tablica").hide();
  }
}

function insertPredmet(kolegij) {
  Kolegiji_u_tablici.push(kolegij);
  let tablica = document.getElementById("tablica");
  let redak = tablica.insertRow(Kolegiji_u_tablici.length);
  redak.setAttribute("id", "kolegijRedak");
  let celija1 = redak.insertCell(0);
  let celija2 = redak.insertCell(1);
  let celija3 = redak.insertCell(2);
  let celija4 = redak.insertCell(3);
  let celija5 = redak.insertCell(4);
  let celija6 = redak.insertCell(5);
  let celija7 = redak.insertCell(6);
  var btn;
  var btn = document.createElement("button");
  btn.setAttribute("id", kolegij.id);
  btn.setAttribute("class", "brisiButton");
  console.log(btn.id);
  btn.innerHTML = "Obriši";
  celija1.innerHTML = kolegij.kolegij;
  celija2.innerHTML = kolegij.ects;
  celija3.innerHTML = kolegij.sati;
  celija4.innerHTML = kolegij.predavanja;
  celija5.innerHTML = kolegij.vjezbe;
  celija6.innerHTML = kolegij.tip;
  celija7.appendChild(btn);
  Zbrojivrijednosti();
  ObrisiKolegij(btn, kolegij);
}

function ObrisiKolegij(button, kolegij) {
  $(button).click(function () {
    $(this).closest("tr").remove();
    for (var i = 0; i < Kolegiji_u_tablici.length; i++) {
      if (Kolegiji_u_tablici[i] == kolegij) {
        Kolegiji_u_tablici.splice(i, 1);
      }
    }
    Zbrojivrijednosti();
  });
}
