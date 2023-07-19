var currentQuestion = 0;
var duration = 75;
var quizQuestions = [
    { questionText: "Commonly used data types DO not include:", questionAnswers: [
        { answerText: 'strings', answerCorrect: false },
        { answerText: 'booleans', answerCorrect: false },
        { answerText: 'alerts', answerCorrect: true },
        { answerText: 'numbers', answerCorrect: false },
    ]},
    { questionText: "The condition in an if / else statement is enclosed with ___", questionAnswers: [
        { answerText: 'quotes', answerCorrect: false },
        { answerText: 'curly brackets', answerCorrect: true },
        { answerText: 'parenthesis', answerCorrect: false },
        { answerText: 'square brackets', answerCorrect: false },
    ]},
    { questionText: "Arrays in JavaScript can be used to store ___", questionAnswers: [
        { answerText: 'numbers and strings', answerCorrect: false },
        { answerText: 'other arrays', answerCorrect: false },
        { answerText: 'booleans', answerCorrect: false },
        { answerText: 'all of the above', answerCorrect: true },
    ]},
    { questionText: "String values must be enclosed within ___ when being assigned to variables.", questionAnswers: [
        { answerText: 'commas', answerCorrect: false },
        { answerText: 'curly brackets', answerCorrect: false },
        { answerText: 'quotes', answerCorrect: true },
        { answerText: 'parenthesis', answerCorrect: false },
    ]}
];

function startQuiz() {
    $("#screen-home").addClass('not-visible');
    $("#screen-quiz").removeClass('not-visible');

    initTimer();
    renderQuestions();  
}


function initTimer() {
    $("#timer").html(duration);
    tick();
}

function tick(){
    setTimeout(function() {
        duration--;
        $("#timer").html(duration);

        tick();
    }, 1000);
}

function renderQuestions(){
    var questionsHtml = '';
    for(var i = 0; i < quizQuestions.length; i++) {
        var quizQuestion = quizQuestions[i];
        questionsHtml += getQuestionHtml(quizQuestion, i);
    }

    $("#content").html(questionsHtml);
}

function getQuestionHtml(quizQuestion, questionIndex){
    var htmlCode = '<div class="quiz ';
    if(currentQuestion !== questionIndex)
        htmlCode += 'not-visible';

    htmlCode += '"><h2>' + quizQuestion.questionText + '</h2><div>';
        for(var i = 0; i < quizQuestion.questionAnswers.length; i++ ){
            htmlCode += '<button class="btn" onclick="javascrip:sendAnswer(' + quizQuestion.questionAnswers[i].answerCorrect + ')">' + 
                quizQuestion.questionAnswers[i].answerText + '</button></br>';
        }
        htmlCode += "</div></div>";
        return htmlCode;
}

function sendAnswer(isCorrect){
    if(!isCorrect){
        duration = duration - 10;
    }

    currentQuestion++;
    if(currentQuestion >= quizQuestions.length){
        localStorage.setItem("final-score", duration);
       showScore();
    }
    renderQuestions();
}

function sendInitials(){
    var scoreValue = localStorage.getItem("final-score");
    var name = $("#txtInitials").val();
    var scores = localStorage.getItem("scores");
    if(scores === '' || scores === 'undefined' || typeof(scores) === "undefined" || scores === null){
        scores = [{initials: name, score: scoreValue}];
    }
    else {
        scores = JSON.parse(scores);
        scores.push({initials: name, score: scoreValue});
    }

    localStorage.setItem("scores", JSON.stringify(scores));
    showHome();
}

function showScore() {
    $("#screen-quiz").addClass('not-visible');
    $("#screen-quiz-end").removeClass('not-visible');

    var score = localStorage.getItem("final-score");
    $("#finalScore").html(score);
}

function showHome() {
    $("#screen-quiz-end").addClass('not-visible');
    $("#screen-home").removeClass('not-visible');

    $("#txtInitials").val('');
    currentQuestion = 0;
    duration = 75;
}

function showHighScores(){
    $("#screen-home").addClass('not-visible');
    $("#screen-scorelist").removeClass('not-visible');

    var html = '';
    var scores = JSON.parse(localStorage.getItem("scores"));
    scores.forEach(score => {
        html += '<li>Initial: ' + score.initials + ', score: ' + score.score + '</li>';
    });

    $("#score-list").html(html);
}

function loadScores(){
    var scores = localStorage.getItem("scores");
    if (typeof(scores) !== "undefined" && scores !== null) {
        console.info(JSON.parse(scores));
    }
}