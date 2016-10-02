var quiz = [];
var totalQuizQuestions = 0;
var correctAnswers = 0;
var currentQuestion = 0;
var quizNumberPosition = 0;
var quizPassed = false;
var debugAlertText = "";

function main(){
    $(".quizview").hide();
    $(".completionview").hide();
    $(".welcomescreen").hide();
    
    //  load quiz data from json file
    loadJSONFile();
    
    //  show welcome screen
    $(".welcomescreen").show();
}

$(document).ready(main);



function updateScore()
{
    debugAlertText = debugAlertText + "updateScore()\n";
    $(".scoretext").text(correctAnswers + " / " + totalQuizQuestions);
}
// set the text of the question area and answer boxes
// based on the quizNumberPosition in the quiz the currentQuestion content.
function setQuestionAnswerText()
{
    debugAlertText = debugAlertText + "setQuestionAnswerText()\n";
    updateScore();
    
    debugAlertText = debugAlertText + "    quizNumberPosition: " + quizNumberPosition
            + "\n    currentQuestion" + currentQuestion
            + "\n    questiontext: " + JSON.stringify(quiz[quizNumberPosition].questions[currentQuestion].question
            + "\n");

    $(".questiontext").text(JSON.stringify(quiz[quizNumberPosition].questions[currentQuestion].question));
    $("#answer1").text(JSON.stringify(quiz[quizNumberPosition].questions[currentQuestion].answers[0].content));
    $("#answer2").text(JSON.stringify(quiz[quizNumberPosition].questions[currentQuestion].answers[1].content));
    $("#answer3").text(JSON.stringify(quiz[quizNumberPosition].questions[currentQuestion].answers[2].content));
    $("#answer4").text(JSON.stringify(quiz[quizNumberPosition].questions[currentQuestion].answers[3].content));
    // alert("setQuestionAnswerText complete");
}

//  on quiz button click...
//      set correctAnswers to 0
//      set currentQuestion to 0 (first question, but set as 0 to make the rest of the code more readable.)
//      set quizPassed = false;
//      set totalQuizQuestions to the number of quiz questions for this quiz
//      setQuestionAnswerText()
//      show quizview
function quizButtonClicked(clickedQuizButton_id)
{
    debugAlertText = debugAlertText + "quizButtonClicked()\n";
    intializeQuiz();
    
    if(clickedQuizButton_id === 'quiz1')
        quizNumberPosition = 0;
    else
        quizNumberPosition = 1;
    
    totalQuizQuestions = quiz[quizNumberPosition].questions.length;
    
    setQuestionAnswerText();
    $(".welcomescreen").hide();
    $(".quizview").show();
}


function intializeQuiz()
{
    $(".completionview").hide();
    correctAnswers = 0;
    currentQuestion = 0;
    quizPassed = false;
    resetButtonColors();
    
    //  show welcome screen
    $(".welcomescreen").show();
}

//  on answer button click...
//      if associated value is true
//          > add one to correct Answers
//      if currentQuestion < totalQuizQuestions
//          > currentQuestion+1
//          /*
//              special feature if time:
//                  reset button color scheme
//          */
//          > setQuestionAnswerText()
//          > 
//      else if currentQuestion === totalQuizQuestions
//          > if correctAnswers/totalQuizQuestions > 0.5
//              >>  set pass/fail text to pass
//          >  else
//              >>  set pass/fail text to fail
//          > display score (correctAnswers " / " totalQuizQuestions)
//          > show completionview
function answerButtonClick(clickedAnswerButton_id)
{
    debugAlertText = debugAlertText + "answerButtonClick("+ clickedAnswerButton_id + ")\n";
    var buttonClickedPosition = 0;
    
    switch( clickedAnswerButton_id) {
        case 'answer1':  buttonClickedPosition = 0; break;
        case 'answer2':  buttonClickedPosition = 1; break;
        case 'answer3':  buttonClickedPosition = 2; break;
        case 'answer4':  buttonClickedPosition = 3; break;
        default:         buttonClickedPosition = 0; break;
    }
    
    checkAnswer();
    
    if( JSON.stringify(quiz[quizNumberPosition].questions[currentQuestion].answers[buttonClickedPosition].value) === "true")
    {
        correctAnswers = correctAnswers + 1;
        updateScore();
    }
        
    //      /*
    //          special feature if time:
    //          - rotate over x axis 360 degrees / fade out & in over 1000ms to "reveal" each answer one by one
    //              (randomly choose which false answer to "reveal" first until correct answer shown
    //          - If false and not chosen, outer edge red, background light red
    //          - If false and chosen, outer edge light red, background red
    //          - If true and chosen, outer edge light green, background green
    //          - If true and not chosen, outer edge green, background light green          
    //      */ 
    
    
    //      if currentQuestion < totalQuizQuestions
    //          > go to the next question
    //          > setQuestionAnswerText()      
    //      
    //      else if currentQuestion === totalQuizQuestions
    //          > if correctAnswers/totalQuizQuestions > 0.5
    //              >>  set pass/fail text to pass
    //          >  else
    //              >>  set pass/fail text to fail
    //          > display score (correctAnswers " / " totalQuizQuestions)
    //          > show completionview
    
    debugAlertText = debugAlertText 
            + "\n\n---> checking if currentQuestion is < totalQuizQuestions ";
    
    if( currentQuestion < totalQuizQuestions-1) // made adjustment earlier to make reading easier, but it is missed in this context.
    {
    debugAlertText = debugAlertText 
            + "\n\n---> yes! set the next question ";
        currentQuestion = currentQuestion + 1;
        
        debugAlertText = debugAlertText + "currentQuestion:"+ currentQuestion + "\n";
        //          /*
        //              special feature if time:
        //                  reset button color scheme
        //          */
        
        setTimeout(function(){setQuestionAnswerText()}, 2000);
        resetButtonColors();
    }
    else if( currentQuestion === totalQuizQuestions-1 )
    {
        debugAlertText = debugAlertText 
            + "\n\n---> nope, we are equal now. time to show pass/fail ";
        if( correctAnswers/totalQuizQuestions > 0.5)
            quizPassed = "Pass";
        else
            quizPassed = "Fail";
        
        
        debugAlertText = debugAlertText 
            + "\n\n" + quizPassed;
            
        $(".finalscoretext").text(correctAnswers +" / " + totalQuizQuestions);
        $(".results").text(quizPassed);
                
        $(".quizview").hide();
        $(".completionview").show();
    }
}

function checkAnswer()
{
    if( JSON.stringify(quiz[quizNumberPosition].questions[currentQuestion].answers[0].value === "true"))
        $("#answer1").css('background-color', '#99ff99'); //true
    else
        $("#answer1").css('background-color', '#ff6666'); //false
    
    if( JSON.stringify(quiz[quizNumberPosition].questions[currentQuestion].answers[1].value === "true"))
        $("#answer2").css('background-color', '#99ff99'); //true
    else
        $("#answer2").css('background-color', '#ff6666'); //false
    
    if( JSON.stringify(quiz[quizNumberPosition].questions[currentQuestion].answers[2].value === "true"))
        $("#answer3").css('background-color', '#99ff99'); //true
    else
        $("#answer3").css('background-color', '#ff6666'); //false
    
    if( JSON.stringify(quiz[quizNumberPosition].questions[currentQuestion].answers[3].value === "true"))
        $("#answer4").css('background-color', '#99ff99'); //true
    else
        $("#answer4").css('background-color', '#ff6666'); //false

}

function resetButtonColors()
{
   $("#answer1").css('background-color', '');
   $("#answer2").css('background-color', '');
   $("#answer3").css('background-color', '');
   $("#answer4").css('background-color', '');
}
// load the JSON file into the quiz data set
// initialize the question and answer lists
// for each of the quizzes, using "i" as the index,
//   for each of the questions at level "i", using "j" as an index
//       for each of the sets of answers [content, value] pairs
//           add the [content, value] pair to the current set of answers
//       match each question, with a list of answers and add to the questionList
//       and then clear the answerList for the next iteration
//   match the title with a list of questions, and add to te quiz
//   and then clear the questionList for the next iteration
function loadJSONFile()
{
   var questionList = [];
   var answerList = [];
   
   $.getJSON('src/quiz.json', function(data) {
      $.each(data.quizzes, function(i) {
        $.each(data.quizzes[i].questions, function(j) { 
            $.each(data.quizzes[i].questions[j].answers, function(k) {
                answerList.push({"content": this.content, "value": this.value});
            });
            questionList.push({"question": data.quizzes[i].questions[j].question, "answers": answerList});
            answerList= [];
        });
        quiz.push({"title": data.quizzes[i].title, "questions": questionList});
        questionList= [];
      });
    });
}


function debugAlert()
{
    alert(debugAlertText);
}