//Declaración de variables para llamar los contenedores de la página de acceso
let loginContainer = document.querySelector("#login-container");
let userName = document.querySelector("#user-name");
let pwd = document.querySelector("#pwd");
let selectCampus = document.querySelector("#select-campus");
let loginButton = document.querySelector("#login-button");

//Declaración de variables para llamar los contenedores de la página inicial del Dashboard
let mainPage = document.querySelector("#main-page");
let selectCampusDashboard1 = document.querySelector("#select-campus-dashboard-1");
let selectCampusDashboard2 = document.querySelector("#select-campus-dashboard-2");

//const json = '../data/laboratoria.json';s
const json = 'https://raw.githubusercontent.com/citlallidmg/cdmx-2018-06-bc-core-am-data-dashboard/master/data/laboratoria.json#'

const getData = () => {
    fetch(json)
    .then( response => response.json() )
    .then((res) => {
        const generations = computeGenerationsStats(res);
        const campus = obtainCampus(res);
        //const users = computeStudentsStats(res);
        drawCampus(campus);
        drawCampusDashboard(campus);
        //console.log(generations);
        //return generations;
        
    })
    .catch((error) => {
        console.log(error);
    });
}

getData();

const drawCampus = (sedes) => {
    //const containerCampus = document.getElementById('campus');
    console.log(sedes);
    sedes.forEach((sede) => {
        const option = document.createElement('option');
        option.innerHTML = sede.toUpperCase();
        selectCampus.appendChild(option);
    });
};

loginButton.addEventListener('click', checkLogin);

