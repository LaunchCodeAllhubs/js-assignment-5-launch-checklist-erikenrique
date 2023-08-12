// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let destinationHTML = document.getElementById("missionTarget").innerHTML = `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">`
}

function validateInput(testInput) {
   if (typeof testInput === "string") {
        if (testInput.length === 0) {
            return "Empty";
        } else if (isNaN(testInput)) {
            return "Not a Number";
        } else if (!isNaN(testInput)) {
            return "Is a Number";
        }
    } else {
        return "Invalid input - string required!";
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass) {
    // Validate input
    const pilotValidation = validateInput(pilot);
    const copilotValidation = validateInput(copilot);
    const fuelValidation = validateInput(fuelLevel);
    const cargoValidation = validateInput(cargoMass);

    // the below is the second time it's happening.... need to change
    if (pilotValidation === "Empty" || copilotValidation === "Empty" || fuelValidation === "Empty" || cargoValidation === "Empty") {
        alert("All fields are required!"); // Display an alert for missing fields
    } else if (pilotValidation !== "Not a Number" || copilotValidation !== "Not a Number" || fuelValidation !== "Is a Number" || cargoValidation !== "Is a Number") {
        alert("Make sure to enter valid information for each field!"); // Display an alert for invalid data types
    } else {
        // Update shuttle requirements
        document.getElementById("pilotStatus").innerHTML = `Pilot ${pilot} is ready`;
        document.getElementById("copilotStatus").innerHTML = `Co-pilot ${copilot} is ready`;

        if (fuelLevel < 10000) {
            list.style.visibility = "visible";
            document.getElementById("fuelStatus").innerHTML = "Fuel level too low for launch";
            document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
            document.getElementById("launchStatus").style.color = "red"; 
        } else if (cargoMass > 10000) {
            list.style.visibility = "visible";
            document.getElementById("cargoStatus").innerHTML = "Cargo mass too high for launch";
            document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
            document.getElementById("launchStatus").style.color = "#C7254E";
        } else {
            document.getElementById("launchStatus").innerHTML = "Shuttle is ready for launch";
            document.getElementById("launchStatus").style.color = "#419F6A";
            list.style.visibility = "visible";
        }
    }
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
            return response.json(); 
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    
    return planets[Math.floor(Math.random()*planets.length)];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
