
// WS05 student starter / opiskelijan aloituspohja

const animalForm = document.getElementById("animalForm");
const animalName = document.getElementById("animalName");
const animalSpecies = document.getElementById("animalSpecies");
const careNote = document.getElementById("careNote");
const nameError = document.getElementById("nameError");
const speciesError = document.getElementById("speciesError");
const noteError = document.getElementById("noteError");
const formResult = document.getElementById("formResult");

// Exercises 1 and 3 / Harjoitukset 1 ja 3

animalForm.addEventListener("submit", function (event) {
    event.preventDefault();

    nameError.textContent = "";
    speciesError.textContent = "";
    noteError.textContent = "";

    animalName.classList.remove("invalid");
    animalSpecies.classList.remove("invalid");
    careNote.classList.remove("invalid");

    const name = animalName.value.trim();
    const species = animalSpecies.value.trim();
    const note = careNote.value.trim();

    let isValid = true;

    if (name === "") {
        nameError.textContent = "Please enter an animal name.";
        animalName.classList.add("invalid");
        isValid = false;
    }

    if (species === "") {
        speciesError.textContent = "Please enter a species.";
        animalSpecies.classList.add("invalid");
        isValid = false;
    }

    if (note === "") {
        noteError.textContent = "Please enter a care note.";
        careNote.classList.add("invalid");
        isValid = false;
    } else if (note.length > 150) {
        noteError.textContent = "Care note must be 150 characters or less.";
        careNote.classList.add("invalid");
        isValid = false;
    }

    if (!isValid) {
        formResult.textContent = "Please correct the errors above.";
        return;
    }

    formResult.textContent =
        `Animal added: ${name} (${species}). Care note: ${note}`;

    const animal = {
        name: name,
        species: species,
        note: note
    };

    localStorage.setItem("ws05Animal", JSON.stringify(animal));

    console.log("Saved animal:", animal);

    loadAnimal();
});


// Exercise 2 / Harjoitus 2

const sponsorForm = document.getElementById("sponsorForm");
const animalType = document.getElementById("animalType");
const yearsInput = document.getElementById("years");
const cost = document.getElementById("cost");
const discountMessage = document.getElementById("discountMessage");

sponsorForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const annualFee = Number(animalType.value);
    const years = Number(yearsInput.value);

    if (yearsInput.value.trim() === "" || !Number.isInteger(years) || years <= 0) {
        cost.textContent = "Please enter a positive whole number of years.";
        discountMessage.textContent = "";
        return;
    }

    const originalTotal = annualFee * years;
    let total = originalTotal;

    if (years > 2) {
        total = total * 0.8;
    }

    if (years >= 5) {
        total = total - 5;
    }

    const discount = originalTotal - total;

    cost.textContent = `Total: €${total.toFixed(2)}`;

    if (years >= 5) {
        discountMessage.textContent =
            `20% discount and €5 extra discount applied. You saved €${discount.toFixed(2)}.`;
    } else if (years > 2) {
        discountMessage.textContent =
            `20% discount applied. You saved €${discount.toFixed(2)}.`;
    } else {
        discountMessage.textContent = "No discount applied.";
    }
});


// Exercise 4 / Harjoitus 4

const loadButton = document.getElementById("loadAnimal");
const clearButton = document.getElementById("clearAnimal");
const savedAnimal = document.getElementById("savedAnimal");

function loadAnimal() {
    const storedAnimal = localStorage.getItem("ws05Animal");

    if (storedAnimal === null) {
        savedAnimal.textContent = "No saved animal yet.";
        return;
    }

    try {
        const animal = JSON.parse(storedAnimal);

        savedAnimal.textContent =
            `Name: ${animal.name} | Species: ${animal.species} | Care note: ${animal.note}`;
    } catch (error) {
        savedAnimal.textContent = "Error loading saved animal.";
        console.error("Error:", error);
    }
}

loadButton.addEventListener("click", loadAnimal);

clearButton.addEventListener("click", function () {
    localStorage.removeItem("ws05Animal");
    loadAnimal();
});

loadAnimal();
