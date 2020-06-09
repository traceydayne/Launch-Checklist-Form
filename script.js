// Write your JavaScript code here!
window.addEventListener("load",function(){
   validateAndPopulate();
})
  
function validateAndPopulate() {
   let submitForm = document.getElementById("formSubmit");
   submitForm.addEventListener("click", function(event){
      event.preventDefault();
      let pilotName = document.querySelector("input[name=pilotName]");
      let coPilotName = document.querySelector("input[name=copilotName]");
      let fuelLevel = document.querySelector("input[name=fuelLevel]");
      let cargoMass = document.querySelector("input[name=cargoMass]");
      if (pilotName.value === "" || coPilotName.value === "" ||fuelLevel.value === "" ||cargoMass.value === "") {
         alert("All fields are required!");
      } else if (!isNaN(Number(pilotName.value)) ||!isNaN(Number(coPilotName.value))||isNaN(Number(fuelLevel.value))||isNaN(Number(cargoMass.value))) {
         alert("Please check input.");
      } else {
         let makeDivVisible = document.getElementById("faultyItems");
         makeDivVisible.style.visibility = "visible";

         let addPilot = document.getElementById("pilotStatus");
         addPilot.innerHTML = `${pilotName.value} ready`;

         let addCoPilot = document.getElementById("copilotStatus");
         addCoPilot.innerHTML = `${coPilotName.value} ready`;

         if(Number(fuelLevel.value) < 10000){
            let getFuelStatus = document.getElementById("fuelStatus");
            getFuelStatus.innerHTML = `Fuel level  too low for launch.`;
         }

         if (Number(cargoMass.value) > 10000) {
            let getCargoMass = document.getElementById("cargoMass");
            getCargoMass.innerHTML = `Cargo mass too heavy for launch.`;
         }

         if ((Number(cargoMass.value) < 10000)&& (Number(fuelLevel.value)> 10000)){
            let launchStatus = document.getElementById("launchStatus");
            launchStatus.innerHTML = `Shuttle ready for launch.`;
            launchStatus.style.color = "green";
         } else {
            let launchStatus = document.getElementById("launchStatus");
            launchStatus.innerHTML = `Shuttle not ready for launch.`;
            launchStatus.style.color = "red";
         }

         fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
            response.json().then(function(json){
               let randJSON = (Math.floor(Math.random()* json.length))
               const missionTarget = document.getElementById("missionTarget");
               missionTarget.innerHTML = `<h2>Mission Destination</h2>
               <ol>
                  <li>Name: ${json[randJSON].name}</li>
                  <li>Diameter: ${json[randJSON].diameter}</li>
                  <li>Star: ${json[randJSON].star}</li>
                  <li>Distance from Earth: ${json[randJSON].distance}</li>
                  <li>Number of Moons: ${json[randJSON].moons}</li>
               </ol>
               <img src="${json[randJSON].image}">`
            })
         })
      }
   })
}








