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
            let studentArr = [];
            sede = Object.getOwnPropertyNames(data);
            generacion = Object.values(data);
            generacion.forEach(generation => {
                //gene = Object.getOwnPropertyNames(element.generacion);
                student = Object.values(generation.generacion);
                student.forEach(student => {
                    //est = Object.getOwnPropertyNames(element.student);
                    estInfo = Object.values(student.estudiantes);
                    estInfo.forEach(information => {
                        //console.log(element);
                        datosPersonales = Object.values(information);
                        console.log(information.turno);
                       // console.log(datosPersonales);
                        //for(let i=0;i<datosPersonales.length;i++){
                           // studentArr[i] = datosPersonales[i];
                            //console.log(datosPersonales);
                            //console.log(studentArr[0]);
                            //console.log(studentArr[3]);
                        //}
                        })
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