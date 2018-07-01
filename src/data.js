window.computeStudentsStats = (laboratoria) => {
  const studentsArray = [];
  const studentObject = {
    name : "",
    email : "",
    campus : "",
    generation : "",
    stats : {
      status : 0,
      completedPercentage : 0,
      topics : {

      }
    },
  }

  for(venue in laboratoria){
    //console.log(laboratoria[venue]); Me da un arreglo con las sedes
    studentObject.campus = venue;
    //console.log(student); 
    const generations = Object.keys(laboratoria[venue].generacion);
    //console.log(generations); //Me da tres arreglos con las keys de generación de cada 
    generations.forEach((generationInVenue) => {
      //console.log(generationInVenue); //Me da los nombres de las generaciones para cada sede en string
      studentObject.generation = generationInVenue;
      //console.log(student);
      const students = laboratoria[venue].generacion[generationInVenue].estudiantes;
      //console.log(students);
      students.forEach((student) => {
        studentObject.name = student.nombre; //Agregamos nombre de estudiante
        studentObject.email = student.correo; //Agregamos correo de estudiante
        studentObject.stats.completedPercentage = student.progreso.porcentajeCompletado; //Agregamos porcentaje de avance general
        let progress = studentObject.stats.completedPercentage;
        if (progress < 60) {
          studentObject.stats.status = "below"; //Indicamos que esta debajo del 60%
        } else if (progress > 90) {
          studentObject.stats.status = "over"; //Indicamos que esta sobre el 90%
        } else {
          studentObject.stats.status = "average"; //Indicamos que esta en la media
        };
        const topics = Object.getOwnPropertyNames(student.progreso.temas);
        for (topic of topics) {
          //console.log(topic);
        }
        //studentObject.stats.topics = topics;
        //console.log(topics);
        //console.log(studentObject);
        studentsArray.push(studentObject); //Ingresa los objetos de cada estudiante al array final
        //console.log(studentsArray);
        /*const topics = Object.keys(student.progreso.temas);
        topics.forEach((topic) =>{
          studentObject.stats.topics = topic;
          console.log(studentObject);  
        })*/
      })
    });    
  }
  //console.log(studentsArray);
  return studentsArray;
  
};

window.computeGenerationsStats = (laboratoria) => {

  const generationsArray = [];
  const obj = {

    campus: '',
    generation: '',
    average: 0,
    count: 0,

  };
  
  let average = 0;
  for (key in laboratoria) {
  
    obj.campus = key;
    average = 0;
    const generations = Object.keys(laboratoria[key].generacion);
    //console.log(generations);
    generations.forEach((generation) => {
   
      obj.generation = generation;
      const students = laboratoria[key].generacion[generation].estudiantes;
      //console.log(students);
      
      for (student in students) {
   
        average += students[student].progreso.porcentajeCompletado;
        average = average / students.length;
        obj.average = average;
        obj.count = students.length;
        generationsArray.push(obj);
        
      }            
    })        
  }

  return generationsArray;
  
};

window.obtainCampus = (laboratoria) => {

  const venues = Object.getOwnPropertyNames(laboratoria);
  //console.log(venues); 
  return venues;

};

window.obtainGeneration = (laboratoria) => {
  //console.log(laboratoria);
  //const generations = Object.getOwnPropertyNames(laboratoriasedes);
  //console.log(generations);
  for (key in laboratoria) {
    const generationOption = Object.keys(laboratoria[key].generacion);
    //console.log(generationOption);
    return generationOption;
  }
};

window.checkLogin = () => {

  //console.log("Listo");
  let name = userName.value;
  let password = pwd.value;
  let venue = selectCampus.value;
  //console.log(name);
  //console.log(password);
  //console.log(venue);

  if(name === ""  || password === "" || venue === "Sede"){

    //Regresa una alerta si no se llenan todos los campos
    return alert(`Oops...
Debes ingresar todos los datos`);

  }else if(name === "usuario" && password === "1234"){
  
    loginContainer.style.display = "none";
    mainPage.style.display = "block";
    //console.log(name);
    //console.log(password);
    //console.log(venue);

    //Llama a la función que despliega el número de estudiantes activas
    welcomeDashboard(name,venue);

    //agregamos esta línea para poder llamar los valores después
    return [name,venue];

  }else{
  
    //Regresa una alerta si algún dato no es correcto
    return alert("Alguno de tus datos es incorrecto");
    
  }

};

//Función que despliega los datos a mostrar en la pantalla de inicio del Dashboard después del login
window.welcomeDashboard = (name,venue) =>{
  document.querySelector("#venue").innerHTML = venue;
  document.querySelector("#generation").innerHTML = "5a generación";
  document.querySelector("#user").innerHTML = name.toUpperCase();
  //drawCampusDashboard(sedes);
}

window.drawCampusDashboard = (sedes) => {
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
};

window.drawGenerationDashboard = (generations) => {
  //console.log(generations);
  //console.log("entramos");
  for(let i=0; i< generations.length; i++){
    const option = document.createElement('option');
    const textOption = generations[i];
    //console.log(textOption);
    option.innerHTML= textOption;
    // También se puede hacer de esta manera
    //document.getElementById("select-generation-dashboard-1").appendChild(option);
    //document.getElementById("select-generation-dashboard-2").appendChild(option);
    selectGenerationDashboard1.appendChild(option);
  }
  for(let i=0; i< generations.length; i++){
    const option = document.createElement('option');
    const textOption = generations[i];
    //console.log(textOption);
    option.innerHTML= textOption;
    selectGenerationDashboard2.appendChild(option);
  }  
};

/*const exitFunction = () => {
  confirm("¿Quieres salir de LAB-Dash?");
  if(true){
      window.location.reload();
  }else{
    alert("OK");
  }
};*/