const changeHeadingButton = document.querySelector("#changeHeadingButton");
const taskOneHeading = document.querySelector("#taskOneHeading");

changeHeadingButton.addEventListener("click", function () {
    taskOneHeading.textContent = "Updated heading!";
});

const animalButton = document.querySelector("#animalButton");
const animalTable = document.querySelector("#animalTable");

animalButton.addEventListener("click", function () {
    animalTable.hidden = !animalTable.hidden;
});

const changeStyleButton = document.querySelector("#changeStyleButton");

changeStyleButton.addEventListener("click", function () {
    taskOneHeading.classList.toggle("highlight");
});

const changeTextButton = document.querySelector("#changeTextButton");
const animalText = document.querySelector("#animalText");

changeTextButton.addEventListener("click", function () {
    animalText.textContent = "Elephants use their trunks to drink water.";
});

const animalContent = document.querySelector("#animalContent");

const dailyHeading = document.createElement("h3");
dailyHeading.textContent = "Animal of the Day";
dailyHeading.classList.add("animal-heading");

const dailyDescription = document.createElement("p");
dailyDescription.textContent =
    "Elephants are large animals with long trunks and big ears.";

const dailyImage = document.createElement("img");
dailyImage.src = "images/elephant.png";
dailyImage.alt = "Elephant";

animalContent.append(dailyHeading, dailyDescription, dailyImage);

const hideAnimalButton = document.querySelector("#hideAnimalButton");
const showAnimalButton = document.querySelector("#showAnimalButton");

hideAnimalButton.addEventListener("click", function () {
    animalContent.hidden = true;
});

showAnimalButton.addEventListener("click", function () {
    animalContent.hidden = false;
});

const animalSelect = document.querySelector("#animalSelect");
const animalName = document.querySelector("#animalName");
const animalImage = document.querySelector("#animalImage");
const animalDescription = document.querySelector("#animalDescription");

animalSelect.addEventListener("change", function () {
    const selectedAnimal = animalSelect.value;

    if (selectedAnimal === "elephant") {
        animalName.textContent = "Elephant";
        animalDescription.textContent =
            "Elephants are the world's largest land animals.";
    } else if (selectedAnimal === "tiger") {
        animalName.textContent = "Tiger";
        animalDescription.textContent =
            "Tigers are large cats with orange fur and dark stripes.";
    } else if (selectedAnimal === "penguin") {
        animalName.textContent = "Penguin";
        animalDescription.textContent =
            "Penguins are flightless birds that are excellent swimmers.";
    } else if (selectedAnimal === "panda") {
        animalName.textContent = "Panda";
        animalDescription.textContent =
            "Giant pandas have black and white fur and mainly eat bamboo.";
    }

    animalImage.src = "images/" + selectedAnimal + ".png";
    animalImage.alt = animalName.textContent;
});

animalImage.addEventListener("mouseenter", function () {
    animalImage.classList.add("image-highlight");
});

animalImage.addEventListener("mouseleave", function () {
    animalImage.classList.remove("image-highlight");
});

const animalForm = document.querySelector("#animalForm");
const observationAnimal = document.querySelector("#observationAnimal");
const observationLocation = document.querySelector("#observationLocation");
const observationDate = document.querySelector("#observationDate");
const observationTableBody = document.querySelector("#observationTableBody");

animalForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const animal = observationAnimal.value.trim();
    const location = observationLocation.value.trim();
    const date = observationDate.value;

    if (animal === "" || location === "" || date === "") {
        alert("Please fill in all three fields.");
        return;
    }

    const row = document.createElement("tr");

    const animalCell = document.createElement("td");
    animalCell.textContent = animal;

    const locationCell = document.createElement("td");
    locationCell.textContent = location;

    const dateCell = document.createElement("td");
    dateCell.textContent = date;

    const actionCell = document.createElement("td");
    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "Remove";

    removeButton.addEventListener("click", function () {
        row.remove();
    });

    actionCell.append(removeButton);
    row.append(animalCell, locationCell, dateCell, actionCell);
    observationTableBody.append(row);

    animalForm.reset();
});

observationTableBody.querySelectorAll("tr").forEach(function (row) {
    const actionCell = document.createElement("td");
    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "Remove";

    removeButton.addEventListener("click", function () {
        row.remove();
    });

    actionCell.append(removeButton);
    row.append(actionCell);
});