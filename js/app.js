












const createHangman = {
    puzzleWordRando: function(){
        createHangman.puzzleWord = (createHangman.words[Math.floor(Math.random()*createHangman.words.length)])
        viewBuilder.puzzleWordBuild();
        hangController.handleUpdatePointDisplay();
    },


alphabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q','R','S','T','U','V','W','X','Y','Z'],
words:['MANDALORIAN', 'NABOO', 'SKYWALKER', 'VADER', 'TATOOINE', 'PALPATINE', 'CLONE', 'GALAXY', 'REBELLION', 'EMPIRE', 'DESTINY', 'ALLIANCE', 'JEDI', 'CANTINA', 'BLASTER', 'MILLENIUM', 'DISTURBANCE', 'DARKNESS', 'BATTLE', 'DEATHSTAR', 'NERFHERDER', 'DROIDS', 'IMPERIAL','CLONES', 'RAIDER', 'TRAP', 'KENOBI', 'SENATE', 'GALAXY', 'HYPERDRIVE'],
puzzleWord: "",
letter: "",
gameOver: true,
chances: 6,
correct: 0,
wrong: 0,
score: 0,
//Check the letter that has been picked against the puzzle word; track chances; add points
checkLetter: function(letter){

    
    createHangman.wrong = 0;

    for(i=0; i < createHangman.puzzleWord.length; i ++){
            //check if clicked value equals any of the letters in the puzzle array
        if(letter !== createHangman.puzzleWord[i]){
            createHangman.wrong ++;
            //grab letter and make visible; increment correct value;check win
        } else {
            $('span.'+ createHangman.puzzleWord[i]).css('visibility', 'visible');
            createHangman.correct ++;
            gameCountController.checkForWin()
        }
    }
// Subtract lives - decrease chances if wrong count === word length
    if(createHangman.wrong === createHangman.puzzleWord.length){
        createHangman.chances --;
        gameCountController.gameOverCheck();
        animateEvent.flyForrestFly();
    }

    
//Increment points - score count 
    if (createHangman.wrong < createHangman.puzzleWord.length){
        
        createHangman.score ++;
    }

    hangController.handleUpdatePointDisplay();

},

start: function(){
    if(this.puzzleWord.length === 0){ 
      createHangman.gameOver = false;   
      this.puzzleWordRando();
    }
},
//Eject - Complete Reset After Game Over

nextRound: function(){
    this.correct = 0;
    this.chances = 6;
    this.wrong = 0;
    this.gameOver = false;
    this.puzzleWord = "";
    $('#letter-box .btn.alpha').css('background-color' , 'rgb(240, 190, 190)').prop("disabled",false);
    $('#puzzle-box').html('')
    $('#spaceship').css({'top':'30vh','right': '80vw'});
    // viewBuilder.updatePointDisplay();
    this.puzzleWordRando();


},

reset: function(){
    this.nextRound();
    this.score = 0;
    $('div#letter-box .btn.alpha').css('background-color' , 'rgb(240, 190, 190)').prop("disabled",false);
    $('#puzzle-box').html('')
    // viewBuilder.updatePointDisplay();
    this.puzzleWordRando();
},

}; // letterSelect end section 








const viewBuilder = {

//Builds the letter buttons in the display - defines id and class.
letterBuild: function (){
    let alphaArray = createHangman.alphabet;
    
    alphaArray.forEach((letter, i)=>{
        let alphaIndex = 'alpha' + [i];
        $('#letter-box').append(`<button id="${alphaIndex}" class="btn mx-4 my-1 alpha">${alphaArray[i]}</button>`);
    })
},
//Builds puzzle word in the DOM
puzzleWordBuild: function(){
    let puzzle = createHangman.puzzleWord.split("");
    puzzle.forEach((letter, i)=>{
        $('#puzzle-box').append(`<div class="${puzzle[i]} letter-cell card card-body bg-light justify-content-center"><span class="${puzzle[i]}">${puzzle[i]}</span></div`)
    })
},
updatePointDisplay:function(score, chance, correct){

    $('#chances').text(ViewHelpers.zeroFill(chance, 2));
    $('#correct').text(ViewHelpers.zeroFill(correct, 2));
    $('#score').text(ViewHelpers.zeroFill(score, 2));

}
};







const ViewHelpers = {



    zeroFill: function(number, length){
      let numString = number.toString();
      for(let i = numString.length; i < length; i ++){
        numString = '0' + numString;
      }
      return numString
      }
      
    };









const hangController = {

handleClickLetter: function(){
    if(createHangman.gameOver === false){
    
createHangman.letter = $(this).text();
console.log(createHangman.letter);
//sets color to red on click as indicator
$(this).css('background-color' , 'red');
//disables button on click
$(this).prop("disabled", true);
//sends letter to checkLetter function on call
createHangman.checkLetter(createHangman.letter); 
    }

},

handleClickReset: function(){
    $('#c3po').css({'visibility': 'hidden', 'top':'35vh', 'right':'45vw'});
    createHangman.reset();
},

handleClickStart: function(){
if(createHangman.puzzleWord.length === 0){
    createHangman.start();
}

},
handleUpdatePointDisplay: function(){
    let score = createHangman.score;
    let chance = createHangman.chances;
    let correct = createHangman.correct ;

    viewBuilder.updatePointDisplay(score, chance, correct);

},

handleClickNextRound: function(){
    if((createHangman.gameOver === false) && (createHangman.correct === createHangman.puzzleWord.length)){
        $('#c3po').css({'visibility': 'hidden', 'top':'35vh', 'right':'45vw'});
    createHangman.nextRound();
    }
},

};






const animateEvent = {

flyForrestFly: function(){
    if(createHangman.chances === 5){
        $('#spaceship').css('visibility', 'visible');
    } else if (createHangman.chances === 4){
        $('#spaceship').css({'right': '70vw', 'transition': '3s'});
    } else if (createHangman.chances === 3){
        $('#spaceship').css({'right': '60vw'});
    } else if (createHangman.chances === 2){
        $('#spaceship').css({'right': '50vw'});
    } else if (createHangman.chances === 1){
        $('#spaceship').css({'top':'35vh','right': '45vw'});
    } else {
        $('#c3po').css({'visibility': 'visible', 'top': '68vh', 'transition':'2s'});
        $('#spaceship').css('visibility', 'hidden');
        
    }     

},





};






const gameCountController = {


gameOverCheck: function(){

    if(createHangman.chances === 0){
        createHangman.gameOver = true;
        //disable all buttons excluding the reset button
        //alert - your droid is dead!!!!
        alert('Your Droid has perished!');
        // setTimeout(alert('Your Droid has perished!'), 4000);
    }
},

checkForWin: function(){

    if(createHangman.correct >= createHangman.puzzleWord.length){
        setTimeout(alert('Your Droid will be forever grateful!'), 4000);
    }
}
};

$(".side-panel").on("click", function(){
    $(this).toggleClass("side-panel-close");
  });


window.onload = function (){
viewBuilder.letterBuild();
$('.alpha').on('click', hangController.handleClickLetter);
$('#start').on('click', hangController.handleClickStart);
$('#reset').on('click', hangController.handleClickReset);
$('#next-round').on('click' , hangController.handleClickNextRound);

};
