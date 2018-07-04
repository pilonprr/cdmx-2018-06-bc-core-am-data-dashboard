window.data = {
  
  
  computeStudentsStats: (laboratoria) => {
  let studentsArray = [];
  let nombreEstudiante;
  let mailEstudiante;
  let porcentajeEstudiante;
  let statusEstudiante;
  let generacionEnSede;
  let topicsEstudiante;
  let turnoEstudiante;
  for(venue in laboratoria){
    let sede = venue; 
    const generations = Object.keys(laboratoria[venue].generacion); 
    generations.forEach((generationInVenue) => {
     generacionEnSede = generationInVenue;
      const students = laboratoria[venue].generacion[generationInVenue].estudiantes;     
      students.forEach((student) => {
        nombreEstudiante = student.nombre; //Agregamos nombre de estudiante
        mailEstudiante = student.correo; //Agregamos correo de estudiante
        turnoEstudiante = student.turno;
        porcentajeEstudiante = student.progreso.porcentajeCompletado; //Agregamos porcentaje de avance general
        let progress = porcentajeEstudiante;
        if (progress < 60) {
          statusEstudiante = "below"; //Indicamos que esta debajo del 60%
        } else if (progress > 90) {
          statusEstudiante = "over"; //Indicamos que esta sobre el 90%
        } else {
          statusEstudiante = "average"; //Indicamos que esta en la media
        };
        const topics = Object.keys(student.progreso.temas);
        
        for (topic of topics) {
          //La siguiente linea añade los temas como nuevas propiedades del objeto topics y les da como valor que sean un objeto
          let newProperty = Object.defineProperty(student.progreso.temas, topic, { writable: true});
          topicsEstudiante = newProperty;
          //console.log(topicsEstudiante);
          valuesTopicsEstudiante = Object.values(topicsEstudiante);
            for(i=0; i < valuesTopicsEstudiante.length; i++){
              valuesTopicsEstudiante[i].completedPercentage = valuesTopicsEstudiante[i].porcentajeCompletado;
              let topicProgress = (valuesTopicsEstudiante[i].duracionTemaCompletado*100)/valuesTopicsEstudiante[i].duracionTema;
              valuesTopicsEstudiante[i].percentageDuration = Math.round(topicProgress);
            };
         //console.log(valuesTopicsEstudiante);
          
          //console.log(topicsEstudiante);

          // valuesTopicsEstudiante.forEach(values => {
          //   console.log(valuesTopicsEstudiante);
          //   for(let i=0 ;i < valuesTopicsEstudiante.length; i++){
          //     valuesTopicsEstudiante[i].completedPercentage = valuesTopicsEstudiante[i].porcentajeCompletado;
          //     let topicProgress = (valuesTopicsEstudiante[i].duracionTemaCompletado*100)/valuesTopicsEstudiante[i].duracionTema;
          //     valuesTopicsEstudiante[i].percentageDuration = Math.round(topicProgress);
          //     console.log(valuesTopicsEstudiante[i].percentageDuration);
          //   };
          //   for(i=0; i< valuesTopicsEstudiante.length; i++){
          //     delete valuesTopicsEstudiante.duracionTema;
          //     delete valuesTopicsEstudiante.duracionTemaCompletado;
          //   };
          //   console.log(valuesTopicsEstudiante);
          // })
        
        };




        studentsArray.push({'name': nombreEstudiante,'email': mailEstudiante, 'campus': sede, 'generation': generacionEnSede, 'turn': turnoEstudiante, 'stats':{
          'status': statusEstudiante, 'completedPercentage': porcentajeEstudiante, 'topics': topicsEstudiante}});
        });
    });
  }
  console.log(studentsArray);
  return studentsArray;
  
},

computeGenerationsStats: (laboratoria) => {

  const generationsArray = [];
  let valueCampus;
  let valueGeneration;
  let valueAverage;
  let valueCount;
  
  let average = 0;
  for (key in laboratoria) {
  
    valueCampus = key;
    //average = 0;
    const generations = Object.keys(laboratoria[key].generacion);
    //console.log(generations);
    generations.forEach((generation) => {
   
      valueGeneration = generation;
      const students = laboratoria[key].generacion[generation].estudiantes;
      //console.log(students);
      
      for (student in students) {
   
        average += students[student].progreso.porcentajeCompletado;
        //average = average / students.length;
        valueAverage = Math.round(average/students.length);
        valueCount = students.length;
        
      };    
      generationsArray.push({'campus': valueCampus, 'generation': valueGeneration, 'average': valueAverage, 'count': valueCount});        
    })        
  }
  //console.log(generationsArray);
  return generationsArray;
  
},

obtainCampus: (laboratoria) => {

  const venues = Object.getOwnPropertyNames(laboratoria);
  //console.log(venues); 
  return venues;

},

obtainGeneration: (laboratoria) => {
  //console.log(laboratoria);
  //const generations = Object.getOwnPropertyNames(laboratoriasedes);
  //console.log(generations);
  for (key in laboratoria) {
    const generationOption = Object.keys(laboratoria[key].generacion);
    //console.log(generationOption);
    return generationOption;
  }
},

checkLogin: (sedes,generaciones,generations,students) => {
  //console.log(generations);
  //console.log(students);
  let name = userName.value;
  let password = pwd.value;
  let venue = selectCampus.value;
  let generation = selectGeneration.value;
  // console.log(name);
  // console.log(password);
  // console.log(venue);
  // console.log(generation);

  if(name === ""  || password === "" || venue === "Sede" || generation === "Generacion"){

    //Regresa una alerta si no se llenan todos los campos
    return alert(`Oops...
Debes ingresar todos los datos`);

  }else if(name === "usuario" && password === "1234" && venue != "Sede" && generation != "Generacion"){
  
    loginContainer.style.display = "none";
    mainPage.style.display = "block";
    //console.log(name);
    //console.log(password);
    //console.log(venue);

    //Llama a la función que despliega el número de estudiantes activas
    data.welcomeDashboard(name,venue,generation,generations,students);
    data.getTurno(name,venue,generation,generations,students);
    //agregamos esta línea para poder llamar los valores después
    return [name,venue];

  }else{
  
    //Regresa una alerta si algún dato no es correcto
    return alert("Alguno de tus datos es incorrecto");
    
  }
  
},


//Función que despliega los datos a mostrar en la pantalla de inicio del Dashboard después del login
welcomeDashboard : (name,sede,generation,generations,students) =>{
  document.querySelector("#venue").innerHTML = sede;
  document.querySelector("#generation").innerHTML = `${generation} GENERACIÓN`;
  document.querySelector("#user").innerHTML = name.toUpperCase();
  let venue = sede.toLowerCase();
  let gen = generation.toLowerCase();
  let estudiantes;
  for( let i = 0; i < generations.length; i++){
    let campus = generations[i].campus;
    let generacion = generations[i].generation;
    if(campus === venue && generacion === gen){
      estudiantes = generations[i].count; 
    }
  }
  const numberStudents = document.createElement('h3');
  numberStudents.innerHTML = estudiantes;
  document.getElementById("lista").appendChild(numberStudents);
},

drawCampusDashboard : (sedes,generations) => {
  //const containerCampus = document.getElementById('campus');
  //Crea el dropdown de generaciones en el menú para la versión móvil
  sedes.forEach((sede) => {
      const option = document.createElement('option');
      option.innerHTML = sede.toUpperCase();
      selectCampusDashboard1.appendChild(option);
  });
  //Crea el dropdown de generaciones en el menú para la versión desktop
  sedes.forEach((sede) => {
    const option = document.createElement('option');
    option.innerHTML = sede.toUpperCase();
    selectCampusDashboard2.appendChild(option);
  });
},

drawGenerationDashboard: (generations) => {
  //console.log(generations);
  //console.log("entramos");
  for(let i=0; i< generations.length; i++){
    const option = document.createElement('option');
    const textOption = generations[i];
    //console.log(textOption);
    option.innerHTML= textOption.toUpperCase();
    // También se puede hacer de esta manera
    //document.getElementById("select-generation-dashboard-1").appendChild(option);
    //document.getElementById("select-generation-dashboard-2").appendChild(option);
    selectGenerationDashboard1.appendChild(option);
  }
  for(let i=0; i< generations.length; i++){
    const option = document.createElement('option');
    const textOption = generations[i];
    //console.log(textOption);
    option.innerHTML= textOption.toUpperCase();
    selectGenerationDashboard2.appendChild(option);
  }  
},

sortStudents : (students, orderBy, orderDirection) =>{

},

filterStudents : (students, search) => {
},  

getTurno: (name,venue,generation,generations,students) => {
  let valores = Object.values(students);
  let turnoAM = 0;
  let turnoPM = 0;
  
  for(i=0; i< valores.length; i++){
    console.log(valores[i].turn);
  if(valores[i].campus === venue && valores[i].generation === generation){
        if(valores[i].turn === "AM"){
          turnoAM += 1;
        }
        else{
          turnoPM += 1;
        }
    }
    //console.log(turnoAM);
  }  
},

// filtrarTurno: (venue, generation, valores) => {
//   let turnoAM = 0;
//   let turnoPM = 0;
//   console.log(valores);
//   let valores = 
//   if(valores.campus === venue && valores.generation === generation){
//     if(valores.turno === "AM"){
//       turnoAM += 1;
//     }
//     else{
//       turnoPM += 1;
//     }
//     //console.log(turnoAM); 
//   }

// }


}
