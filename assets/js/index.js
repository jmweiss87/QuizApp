
//put questions and answers in storeage as an object, I should be able to access it here without having to type it over and over. AKA not doing spaghetti code. Make sure to be able to access every part of the object easily.

// .show() and .hide() are going to be very clutch here.
// set the content so it can be referred to using template literals, and then using objects in an array to access.
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
  // currentQuestion is accessing the array (question) using the number(index) from currentQuestionNumber 
  console.log(currentQuestion);
  console.log('runQuiz a go');
  // $('#question-form').text(currentQuestion.question);
  $('#question-form').text(currentQuestion.question); // hmmm test without .question.
  $('#question-form').append('<br>');
  currentQuestion.answers.forEach(function(answer){
    $('#question-form').append(
      `
      <label class="answer">
						<input type="radio" name="options" class="answer-selection" value="${answer}" required>
						<span class="js-quiz-option">"${answer}"</span>
					</label>
          <br>
      `      
      )   
  });
}

function handleAnswer(){  
  $('#submit').on('click', function(event){
    event.preventDefault();
    //determine if the answer is correct or not
    let currentQuestion = CONTENT.questions[CONTENT.currentQuestionNumber];
    let correctCount = CONTENT.correct+1;
    let incorrectCount = CONTENT.correct;
    let val = $('input[name=options]:checked').val();
    let currentQuestionCounter = CONTENT.currentQuestionNumber;
    // let correctCount = CONTENT.correctAnswer+1;
    let correctVal = currentQuestion.correctAnswer;
    // if (val == CONTENT.questions[CONTENT.currentQuestionNumber].correctAnswer){
      if (val == CONTENT.questions[currentQuestionCounter].correctAnswer){
      console.log('that is correct, quiz ran, feedback needed');
      // so they got it right, let them move on to the next, with feedback first.
      // CONTENT.currentQuestionNumber++; // this is not the right place.
      // currentQuestionCounter++;
      // feedbackStateCorrect(val);
        $('#question-page').hide();
        $('#feedback-correct').show();
        $('#js-question-count').html("");
        // .html"" clears out the HTML, in quotations write the same as you has in .append();
        $('#js-question-count').append(`<p>You have answered ${correctCount} of ${currentQuestionCounter+1} correctly.</p>`);
        CONTENT.correct++;
      }
    else {
      console.log('feedbackStateIncorrect should run');
      // feedbackStateIncorrect(val);
      $('#question-page').hide();
      $('#feedback-incorrect').show();
      $('#js-in-correction').html("");
      $('#js-in-correction').append(`<p>${correctVal}</p>`);
      $('#js-question-count').html("");
      $('#js-question-count').append(`<p>You have answered ${incorrectCount} of ${currentQuestionCounter+1} correctly.</p>`);
      // $('#js-incorrect-question-count').html("");
      // $('#js-incorrect-question-count').append(`<p>Incorrect: ${incorrectCount}</p>`);
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
      // reset the quiz here, reset the question counter, the correct and incorrect counters
      // create a button event that restarts the quiz, and the incrementing numbers.
      

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
    // $('#js-in-correction').hide();
    // $('js-question-count').hide();

    // wipeout the questionCount.....aka set it to zero.
    // hide the questionCount on the first question.s
    $('#js-question-count').html("");
    runQuiz();
    // $('#js-in-correction').hide();
    // $('#js-question-count').hide();
    // so I hid the count...but now it does not reappear when the quiz runs, so commented out for now.

    // need to show first question ( so run the quiz again)
    // need to reset the numbers of questions, correct, incorrect (back to zero);

      })
}

// MAYBE...simply rewrite the result state again for the incorrect. both leading back
// to runQuiz if they're not correct


//THINGS I NEED CURRENTLY:

// FIX THE INCORRECT BUTTON QUIZ CONTINUATION!!

// AFTER I click the feedback page, EVENT NEEDS to trigger HIDE.
// INCORRECT button needs to be hooked in.
// I need the current number of questions corretly answered
// I need those append methods to work, review the api on jQuery...it may be 
// targeting the children of the id now that I think about it.
// I stopped the questions from showing immediately, that's good.
// Need to fix: incorrect feedback button does nothing
// Feedback pages NEED TO GO AWAY once I click to go to new question
// Why in the world is it cycling hundreds of times? (notice at end,)
// fix the reset button at the end.


// cutting out feedbackStateCorrect & it's Incorrect counter-part - well, but killing or
// deleting them, but doing the same thing inside of quiz answer function...
// having that many functions was causing repetition of hide(), and click events, 
// as well as incontinuity in variable count.

// find out -- does .append really need .html first on line before? NO
// they have similar effect. .html('') wipes the html;

// if value of 146 is equal to 1st question's answer, then we push....

  // add a required atribute to line 110...can't submit form until input they've selected something
  // catch, event listing for, ...target the form element, listen to the submit event....
  // submit radio button option on button...

  // use a global variable, increment questions as you go.
// }

// function feedbackStateCorrect(val){
// console.log(val, "that's the one");
//   // $('#question-page').hide();
//   // $('#feedback-correct').show();
//   if (CONTENT.currentQuestionNumber < 9){
//       CONTENT.currentQuestionNumber++;
//       nextQuestionCorrect();
//     }
//     else {
//       $('#js-next-q').on('click', function(){
//         $('#question-page').hide();
//         $('#results-page').show();
//       })
//     }
//   }  

// function nextQuestionCorrect(){
//   $('#js-next-q').on('click', function(){
//     $('#feedback-correct').hide();
//     $('#question-page').show();

//     });
// }

// function feedbackStateIncorrect(){
//   $('#question-page').hide();
//   $('#feedback-incorrect').show();
//   nextQuestionIncorrect();
// }
// fix correct and incorrect buttons

// function nextQuestionIncorrect(){
//   $('#js-next-q').on('click', function(){
//     $('#feedback-incorrect').hide();
//     $('#question-page').show();
//     });
// }

// need to remove the click listeners from the nextQuestionCorrect, feedbackstate, etc.
// think through algorithm with pencil and paper....
// draw app out on paper, pretend to walk through it, step after step through the motions
// of the applicaiton....
// simulate yourself walking through the execution of the qpp...what happens when you hit
// a wrong answer, a right one, the very next step, next scrren, next button.
// you'' find really quickly on pen and paper where the increment needs to go.
// you don't have to keep track of the index....
// what's the bigger question, the thing that needs to happen
// *you need to move from one question to the next.*
// at the point I need to move to the next question, and that is where your ++increment++ 
// should be
//





// take it from step to step...for each state, where do u need to go..
// question 1, ....feedback state after the question.....
// then back to question step, increment question number...
// back to feedback.....



handleAnswer();
resultState();
hidePages();
startQuiz();






