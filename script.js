var questions = [
    {
        title: "Commonly used data types DO Not include:",
        choices: ["1. Strings", "2. Booleans", "3. Alerts", "4. Numbers"],
        answer: "Alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed with ____.",
        choices: ["1. Quotes", "2. Curly Brackets", "3. Parenthesis", "4. Square Brackets"],
        answer: "Parentheses"
    },
    {
        title: "Arrays in Javascript can be used to store ____.",
        choices: ["1. Numbers and Strings", "2. Other Arrays", "3. Booleans", "4. All of the Above"],
        answer: "All of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["1. Commas", "2. Curly brackets", "3. Quotes", "4. Parenthesis"],
        answer: "Quotes"
    },
    {
        title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["1. Javascript", "2. Terminal / Bash", "3. For Loops", "4. Console Log"],
        answer: "Console Log"
    },

];
var score = 0;
var questionIndex = 0;

var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");

// Seconds left is 15 seconds per question:
var secondsLeft = 75;
// Holds interval time
var holdInterval = 0;
// Holds penalty time
var penalty = 10;
// Creates new element
var ulCreate = document.createElement("ul");


timer.addEventListener("click", function () {
   
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

// Renders questions and choices to page //
function render(questionIndex) {
    // Clears existing data //
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";

    // For loops to loop through all info in array //
    for (var i = 0; i < questions.length; i++) {
        
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }

        userChoices.forEach(function (newItem) {
        ?? ?? ?? ??var choiceButton = document.createElement('button');
        ?? ?? ?? ??choiceButton.setAttribute('class', 'choiceButton');
        ?? ?? ?? ??choiceButton.setAttribute('value', newItem);
       
        ?? ?? ?? ??choiceButton.textContent = newItem;
        ?? ?? ?? ??questionsDiv.appendChild(ulCreate);
        ?? ?? ?? ??ulCreate.appendChild(choiceButton);
        ?? ?? ?? ??choiceButton.addEventListener("click", (compare));
        ?? ??});
}

function compare(event) {
    var element = event.target;

    if (element.matches("button")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // Correct condition 
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct!  " + questions[questionIndex].answer;
            // Correct condition 
        } else {
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong!   " + questions[questionIndex].answer;
        }
    }

    // Question Index determines number question user is on
    questionIndex++;

    if (questionIndex >= questions.length) {
        // All done will append last page with user stats
        allDone();
    } else {
        render(questionIndex);
    }
   questionsDiv.appendChild(createDiv);

}
// All done will append last page
function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!";

    questionsDiv.appendChild(createH1);

    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);


    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is " + timeRemaining;

        questionsDiv.appendChild(createP2);
    }

    // Label
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter initials: ";

    questionsDiv.appendChild(createLabel);

    // input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    // submit
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);

    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            };
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
           
            window.location.replace("./HighScores.html");
        }
    });
}
