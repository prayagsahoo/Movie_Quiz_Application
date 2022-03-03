const start_btn = document.querySelector(".start_btn button");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const timeText = document.querySelector(".timer .time_text");
const timeCount = document.querySelector(".timer .timer_sec");


start_btn.onclick = () => {
	
	quiz_box.classList.add("activeQuiz");
	showQuestions(0);
	startTimer(30);
}

let timeValue =  15;
let que_numb = 1;
let userScore = 0;
let que_count = 0;
let counter;
let counter1;


//getting questions from array

function showQuestions(index) {

	const que_text = document.querySelector(".que_text");
	const option_list = document.querySelector(".option_list");
	let que_tag = '<span>'+ questions[index].numb + ". "  + questions[index].question + '</span>';
	let option_tag = '<div class = "option"><span>' + questions[index].options[0] + '</span></div>' 
	                  + '<div class = "option"><span>' + questions[index].options[1] + '</span></div>'
	                  + '<div class = "option"><span>' + questions[index].options[2] + '</span></div>' 
	                  + '<div class = "option"><span>' + questions[index].options[3] + '</span></div>';  
	que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

     const option = option_list.querySelectorAll(".option");
      for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickicon = '<div class="icon_tick">&#10003;</div>';
let crossicon = '<div class="icon_cross">&#10005;</div>';

function optionSelected(answer){
	clearInterval(counter);
	if(que_count < questions.length-1){
	counter1 = setInterval(next_question,3000);
	}
	else {
		counter2 = setInterval(showResult,1000);
	}
	let userAns = answer.textContent;
	let correctAns = questions[que_count].answer;
    const allOptions = option_list.children.length;
    const option1 = option_list.querySelectorAll(".option");

	if(userAns == correctAns)
	{
		userScore += 1;
		answer.classList.add("correct");
		answer.insertAdjacentHTML("beforeend", tickicon);

	}
	else{
		answer.classList.add("incorrect");
		answer.insertAdjacentHTML("beforeend", crossicon);

		for(k=0; k < option1.length; k++){
			if(option1[k].textContent == correctAns){
				option1[k].setAttribute("class", "option correct");
				option1[k].insertAdjacentHTML("beforeend", tickicon);

		}
			}
	}

    /*for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled");
        }*/
    
    for(j=0; j < option1.length; j++){
        option1[j].classList.add("disabled");
    }

}



function next_question(){
   clearInterval(counter); 
   clearInterval(counter1);
  if(que_count < questions.length - 1)
  {
  	que_count++;
  	que_numb++;
  	showQuestions(que_count);
  	startTimer(29);
  	timeText.textContent = "Time Left";
  	
  }
  else {
  	clearInterval(counter);
  	counter2 = setInterval(showResult,1000);
  }
}

function startTimer (time) {
	counter = setInterval(timer, 1000);
	function timer () {
		timeCount.textContent = time;
		time --;
	
	if (time < 0){
		clearInterval(counter);
		next_question();
	}
}
}

function showResult(){
	clearInterval(counter2);
	quiz_box.classList.remove("activeQuiz");
	result_box.classList.add("activeResult");
	const scoretext = result_box.querySelector(".score_text");
	const completetext = result_box.querySelector(".complete_text");
    scoretext.innerHTML = '<span>You got ' + userScore + ' out of ' + questions.length + '</span>';
    var playername = document.getElementById("player_name").value;
    completetext.innerHTML = '<span>Congratulations ' + playername + ', You have completed the Quiz. <br></span>';
    
    console.log(playername);
}
