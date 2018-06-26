let caja = document.getElementById("lista");
let result;


//Funcion para bajar data y poder manipularla.
const getData = () => {
    let url = 'https://raw.githubusercontent.com/jetzable/cdmx-2018-06-bc-core-am-data-dashboard/master/data/laboratoria.json';     
    let result;
 
    fetch( url ).then( resp => resp.json() )
        .then(data => {
            //result = Object.keys(data);
            for(campus in data){
                for(generation in campus){
                    console.log();
                }
                console.log(campus);
            }
            caja.innerHTML = result;
        });
    }

getData(); 

