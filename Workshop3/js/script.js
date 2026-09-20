function showTable() {
    const animal = "Tiger";
    const habitat = "Forest";
    const diet = "Carnivore";

    const table = `
        <table class="display">
            <thead>
                <tr>
                    <th>Animal</th>
                    <th>Habitat</th>
                    <th>Diet</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${animal}</td>
                    <td>${habitat}</td>
                    <td>${diet}</td>
                </tr>
            </tbody>
        </table>
    `;

    document.querySelector("#tableContainer").innerHTML = table;
}
const exercise2Heading = document.querySelector("h2:nth-of-type(2)");

exercise2Heading.addEventListener("mouseover", function() {
    console.log("Stepped over me with a mouse!");
});
const exercise1Heading = document.querySelector("h2:nth-of-type(1)");

exercise1Heading.addEventListener("click", function() {
    exercise1Heading.style.color = "red";
    exercise1Heading.innerHTML = "Bye bye mouse!";
});

const feedback = document.querySelector("#feedback");

feedback.addEventListener("focus", function() {
    document.querySelector("#status").innerHTML = "You are writing feedback.";
});

feedback.addEventListener("blur", function() {
    document.querySelector("#status").innerHTML = "";
});

feedback.addEventListener("input", function() {
    const text = feedback.value;

    document.querySelector("#charcount").innerHTML = text.length + "/200";

    document.querySelector("#preview").innerHTML = text;
}); 


const feedbackForm = document.querySelector("#feedbackForm");


feedbackForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const text = feedback.value;
    const length = text.length;

    if (length < 10 || length > 200) {
        document.querySelector("#status").innerHTML =
            "Feedback must be between 10 and 200 characters.";
    } else {
        feedback.value = "";
        document.querySelector("#status").innerHTML =
            "Thank you for your feedback!";
    }
});

document.addEventListener("keydown", function(event) {
    console.log(event);

    document.querySelector("#keyinfo").innerHTML =
        "Key: " + event.key + " | Code: " + event.code;

    document.querySelector("#keybox").innerHTML = event.key;
});
navigator.geolocation.getCurrentPosition(
    (position) => {
        console.log("Latitude:", position.coords.latitude);
        console.log("Longitude:", position.coords.longitude);
    },
    (error) => {
        console.log("Could not get the location:", error.message);
    }
);