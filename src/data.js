window.data = {

    //Funcion que obtiene data.
    getData: () => {
        let url = 'https://raw.githubusercontent.com/jetzable/cdmx-2018-06-bc-core-am-data-dashboard/master/data/laboratoria.json';
        let laboratoria = fetch(url);
        data.computeStudentsStats(laboratoria);
        data.computeGenerationStats(laboratoria);

    },



    //Funcion que crea lista de estudiantes.
    computeStudentsStats: (laboratoria) => {
        laboratoria.then( resp => resp.json() )
        .then(data => {

            sede = Object.getOwnPropertyNames(data);
            generacion = Object.values(data);
            generacion.forEach(element => {
                gene = Object.getOwnPropertyNames(element.generacion);
                student = Object.values(element.generacion);
                student.forEach(element => {
                    console.log(element.estudiantes);
                })
            })
        })
    },


    //Funcion que enlista las generacines.
    computeGenerationStats: (laboratoria) => {
        console.log("prueba2");

    },


    //Funcion que ordena la lista de estudiantes.
    sortStudents: (students,orderBy,orderDirection) => {

    },


    //Funcion que filtra estudaintes.
    filterStudents: (students, search) => {

    },

}

//module.exports