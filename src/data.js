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
  drawCampusDashboard(sedes);
}

window.drawCampusDashboard = (sedes) => {
  //const containerCampus = document.getElementById('campus');
  sedes.forEach((sede) => {
      const option = document.createElement('option');
      option.innerHTML = sede.toUpperCase();
      selectCampusDashboard1.appendChild(option);
  });
  sedes.forEach((sede) => {
    const option = document.createElement('option');
    option.innerHTML = sede.toUpperCase();
    selectCampusDashboard2.appendChild(option);
});
};