let questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answer: "script",
        sort: 1,
        options: [
            "script",
            "scripting",
            "javascript",
            "js"
        ]
    },
    {
        question: "What is the correct JavaScript syntax to change the content of the HTML element below?",
        answer: "document.getElementById('demo').innerHTML = 'Hello World!'",
        sort: 2,
        options: [
            "document.getElementById('demo').innerHTML = 'Hello World!'",
            "document.getElementsByTagName('demo').innerHTML = 'Hello World!'",
            "document.getElementById('demo').value = 'Hello World!'",
            "document.getElementById('demo').text = 'Hello World!'"
        ]
    },
    {
        question: "JSON stands for ________________",
        answer: "JavaScript Object Notation",
        sort: 3,
        options: [
            "Java Standard Output Network",
            "JavaScript Output Name",
            "JavaScript Object Notation",
            "Java Source Open Network"
        ]
    },
    {
        question: "Which is correct format of writting JSON name/value pair",
        answer: "'name' : 'value'",
        sort: 4,
        options: [
            "'name : value'",
            "name = 'value'",
            "name = 'value'",
            "'name' : 'value'"
        ]
    },
    {
        question: "Who is the Father of JSON?",
        answer: "Douglas Crockford",
        sort: 5,
        options: [
            "Douglas Crockford",
            "Rasmus Lerdorf",
            "Douglas Michel",
            "Dennis Ritchie"
        ]
    },
    {
        question: "For What is a JSONStringer used for?",
        answer: "To quickly create JSON text",
        sort: 6,
        options: [
            "To quickly create number to JSON text.",
            "To create JSON ordered pairs.",
            "To converts JSON to Java strings",
            "To quickly create JSON text"
        ]
    }
];

function submitName(){
    let name = getId("name").value;
    if (name == '') {
        getId("nameError").classList.add("text-danger");
        getId("nameError").innerHTML = "Required full name!";
    } else {
        window.sessionStorage.setItem("name", name);
        window.location.href = "quiz.html";
    }
}

function removeError(e){
    getId("nameError").classList.remove("text-danger");
    getId("nameError").innerHTML = "";
}

function show(data){
    return console.log(data);
}

function getId(id){
    return document.getElementById(id);
}

function showQuestion(e){
    let showQuestion = getId("showQuestion");
    let totalQuestions = getId("totalQuestions");
    let currentQuestion = getId("currentQuestion");
    totalQuestions.innerHTML = questions.length;
    currentQuestion.innerHTML = e + 1;
    showQuestion.innerHTML = questions[e].question;

    let showOptions = document.getElementsByClassName("card-text");
    for (let i = 0; i < showOptions.length; i++) {
        showOptions[i].innerHTML = questions[e].options[i];   
    }    
}

let questionCount = 0;

function nextQuestion(e){
    getId("error").classList.remove("text-danger");
    getId("error").innerHTML = "";
    let clearAll = document.getElementsByClassName("card-text");
    for (let i = 0; i < clearAll.length; i++) {
        clearAll[i].setAttribute("onclick","activeClass(this)");
        clearAll[i].classList.remove("card-text-select");
        clearAll[i].classList.remove("card-text-right");
        clearAll[i].classList.remove("card-text-wrong");
    }
    questionCount++;
    showQuestion(questionCount);

    e.classList.remove("d-block");
    e.classList.add("d-none");

    e.previousElementSibling.classList.remove("d-none");
    e.previousElementSibling.classList.add("d-block");
}

let scoreCount = 0;

function save(e){
    let removeSelections = document.getElementsByClassName("card-text");
    let foundMatch = 0;
    for (let i = 0; i < removeSelections.length; i++) {
        if (removeSelections[i].classList.contains("card-text-select")) {
            foundMatch = 1;
            for (let i = 0; i < removeSelections.length; i++) {       
                removeSelections[i].removeAttribute("onclick");
            }
            questionCount;
            let selectValue = document.getElementsByClassName("card-text-select");
            if (selectValue[0].innerHTML == questions[questionCount].answer) {
                scoreCount += 10;
                getId("score").innerHTML = scoreCount;
                window.sessionStorage.setItem("score", scoreCount);
                selectValue[0].classList.add("card-text-right");
            } else {
                selectValue[0].classList.add("card-text-wrong");
            }
            
            if (questions[questionCount].sort == questions.length) {
                e.classList.remove("d-block");
                e.classList.add("d-none");

                e.nextElementSibling.classList.remove("d-block");
                e.nextElementSibling.classList.add("d-none");

                e.nextElementSibling.nextElementSibling.classList.remove("d-none");
                e.nextElementSibling.nextElementSibling.classList.add("d-block");
            } else {
                e.classList.remove("d-block");
                e.classList.add("d-none");
            
                e.nextElementSibling.classList.remove("d-none");
                e.nextElementSibling.classList.add("d-block");
            }
        }   
    }

    if (foundMatch == 0) {
        getId("error").classList.add("text-danger");
        getId("error").innerHTML = "Select atleast one answer!";
    }
}

function activeClass(e){
    removeActiveClass();
    getId("error").classList.remove("text-danger");
    getId("error").innerHTML = "";
    e.classList.add("card-text-select");
}

function removeActiveClass(){
    let activeClass = document.getElementsByClassName("card-text-select");
    for (let i = 0; i < activeClass.length; i++) {
        activeClass[i].classList.remove("card-text-select");
    }
}

function showResult(){
    getId("fullName").innerHTML = window.sessionStorage.getItem("name");
    getId("finalScore").innerHTML = window.sessionStorage.getItem("score");
}

function finish(){
    window.location.href = "final.html";
}

function sessionDestroy(){
    window.sessionStorage.clear();
    window.location.href = "index.html";
}

function expire(){
    window.sessionStorage.clear();
    window.location.href = "expire.html";
}

let min = 2;
let sec = 0;
let msec = 0;
let interval;


function counter() {    
    msec++;
    if (msec == 100) {
        sec--
        getId("sec").innerHTML = sec
        msec = "00"
    }
    else if (sec <= 0) {
        min--
        getId("min").innerHTML = min
        sec = 60
    }
    
    if(min == 0 && sec == 0 ){
        expire();
        clearInterval(interval)
        msec = "00"
        min = "00"
        sec = "00"
        getId("min").innerHTML = min
        getId("sec").innerHTML = sec 
    }
}

interval = setInterval(counter, 10);


