console.log('test');

const CONTENT={
        questions: [
          {
          question:'In what year was the college football playoff implemented?',
          answers:['2014-2015', '2015-2016', '2016-2017', 'This is the first year\.'],
          correctAnswer: '2014-2015'
          },
          {
          question:'Which of these teams made it to the first college football playoff?',
          answers:['Stanford','NC State','Alabama','Georgia'],
          correctAnswer: 'Alabama'
          },
          {
          question:'What two teams have made it to the CFP Champsionship game twice?',
          answers:['Oregon and Georgia','Alabama and Clemson','Oklahoma and Clemson','South Carolina and Tennessee'],
          correctAnswer:'Alabama and Clemson'
          },
          {
          question:'Where will the championship game be played this year?',
          answers:['New Orleans','Pasadena','Glendale','Atlanta'],
          correctAnswer: 'Atlanta'
          },
          {
          question:'Which conference has two teams in the CFP for the 2017-2018 season(current)?',
         answers:['SEC', 'ACC', 'Big-10', 'Pac-12'],
         correctAnswer: 'SEC'
          },
          {
          question:'How many games are in the current CFP format?',
          answers:['3','1','4','7'],
          correctAnswer: '3'
          },
          {
          question:'Who won last season\'s CFP Champsionship Game?',
          answers:['Clemson','Alabama','Oklahoma','Notre Dame'],
          correctAnswer: 'Clemson'
          },
          {
          question: 'In which state was the first CFP Champsionship played?',
          answers:['Florida','Arizona','Texas','Georgia'],
          correctAnswer: 'Texas'
          },
          {
          question:'What conference has had the most cumulative team appearances, including this year, in the CFP?',
          answers:['SEC','Pac-12','ACC','Sunbelt'],
          correctAnswer: 'SEC'
          },
          {
          question:'What Heisman trophy winner will be playing in the CFP this year?',
          answers:['Deshaun Watson','Johnny Manziel','Baker Mayfield','Jalen Hurts'],
          correctAnswer:'Baker Mayfield'
          }],
          currentQuestionNumber: 0,
          correct: 0,
          incorrect: 0,
};



function hidePages() {
  $('#feedback-correct').hide();
  $('#feedback-incorrect').hide();
  $('#question-page').hide();
  $('#results-page').hide();
}

function startQuiz(){
  $('#start-quiz').on('click', function(event){
   event.preventDefault();
   $('#start-page').hide();
  runQuiz();
  console.log('startQuiz ran,connection good');
  });
}

function runQuiz(){
  $('#feedback-correct').hide();
  $('#feedback-incorrect').hide();
  $('#question-page').show();
  $('#question-form').html('');
  let currentQuestion = CONTENT.questions[CONTENT.currentQuestionNumber]; 
  console.log(currentQuestion);
  console.log('runQuiz a go');
  $('#question-form').text(currentQuestion.question);
  $('#question-form').append('<br>');
  // let newCounter = CONTENT.questions.currentQuestionNumber;
  currentQuestion.answers.forEach(function(answer, index){
    $('#question-form').append(
      `
      <label id="response-${index}" class="answer">
						<input type="radio" name="options" class="answer-selection" value="${answer}" required>
						<span role="radio" aria-labelledby="response-${index}" class="js-quiz-option">"${answer}"</span>
					</label>
          <br>
      `      
      )   
  });
}
// have the id be not just a number, sting and number..element needs to match with ID.
// add to the span, role= , or the input itself
// add counter to forEach or, search nmber of inputs of type radio with name options and take that length and incorporate that 
// 

function handleAnswer(){  
  $('#submit').on('click', function(event){
    event.preventDefault();
    let currentQuestion = CONTENT.questions[CONTENT.currentQuestionNumber];
    let correctCount = CONTENT.correct+1;
    let incorrectCount = CONTENT.correct;
    let val = $('input[name=options]:checked').val();
    let currentQuestionCounter = CONTENT.currentQuestionNumber;
    let correctVal = currentQuestion.correctAnswer;
      if (val == CONTENT.questions[currentQuestionCounter].correctAnswer){
      console.log('that is correct, quiz ran, feedback needed');
        $('#question-page').hide();
        $('#feedback-correct').show();
        $('#js-question-count').html("");
        $('#js-question-count').append(`<p>You have answered ${correctCount} of ${currentQuestionCounter+1} correctly.</p>`);
        CONTENT.correct++;
      }
    else {
      console.log('feedbackStateIncorrect should run');
      $('#question-page').hide();
      $('#feedback-incorrect').show();
      $('#js-in-correction').html("");
      $('#js-in-correction').append(`<p>${correctVal}</p>`);
      $('#js-question-count').html("");
      $('#js-question-count').append(`<p>You have answered ${incorrectCount} of ${currentQuestionCounter+1} correctly.</p>`);
      CONTENT.incorrect++;
    }
  CONTENT.currentQuestionNumber++;
  });
  console.log('handleAnswer ran++!');
}


function resultState(){
  $('.js-next-q').on('click', function(event){

    if (CONTENT.currentQuestionNumber === CONTENT.questions.length){
      $('#feedback-correct').hide();
      $('#feedback-incorrect').hide();
      $('#js-result-number').append(`<p>Your score is ${CONTENT.correct} of 10!I hope you enjoyed the quiz!</p>`);
      $('#results-page').show();
    }
    else{
      runQuiz();
      console.log('test1');
    }
  });
  $('#restart-quiz').on('click', function(){
    $('#results-page').hide();

    CONTENT.currentQuestionNumber = 0;
    CONTENT.correct = 0;
    CONTENT.incorrect = 0; 
    correctCount = 0;
   
    $('#question-page').show();
    $('#js-question-count').html("");
    runQuiz();
      })
}

handleAnswer();
resultState();
hidePages();
startQuiz();