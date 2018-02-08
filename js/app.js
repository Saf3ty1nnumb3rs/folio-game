












const createHangman = {
    puzzleWordRando: function(){
        createHangman.puzzleWord = (createHangman.words[Math.floor(Math.random()*createHangman.words.length)])
        viewBuilder.puzzleWordBuild();
    },


alphabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q','R','S','T','U','V','W','X','Y','Z'],
words:['MANDALORIAN', 'NABOO', 'SKYWALKER', 'VADER', 'TATOOINE', 'PALPATINE', 'CLONE', 'GALAXY', 'REBELLION', 'EMPIRE', 'DESTINY', 'ALLIANCE', 'JEDI', 'CANTINA', 'BLASTER', 'MILLENIUM', 'DISTURBANCE', 'DARKNESS', 'BATTLE', 'DEATHSTAR', 'NERFHERDER', 'DROIDS', 'IMPERIAL','CLONES'],
puzzleWord: "",
letter: "",
gameOver: true,
chances: 6,
correct: 0,
wrong: 0,
score: 0,
//Check the letter that has been picked against the puzzle word; track chances; add points
checkLetter: function(letter){

    

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
    this.gameOver = false;
    this.puzzleWord = "";
    $('#letter-box .btn.alpha').css('background-color' , 'rgb(240, 190, 190)').prop("disabled",false);
    $('#puzzle-box').html('')
    viewBuilder.updatePointDisplay();
    this.puzzleWordRando();


},

reset: function(){
    this.nextRound();
    this.score = 0;
    $('div#letter-box .btn.alpha').css('background-color' , 'rgb(240, 190, 190)').prop("disabled",false);
    $('#puzzle-box').html('')
    viewBuilder.updatePointDisplay();
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

    $('#chances').text(ViewHelpers.zeroFill(createHangman.chances, 2));
    $('#correct').text(ViewHelpers.zeroFill(createHangman.correct, 2));
    $('#score').text(ViewHelpers.zeroFill(createHangman.score, 2));

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
$(this).css('background-color' , 'red')
//disables button on click
$(this).prop("disabled",true);
//sends letter to checkLetter function on call
createHangman.checkLetter(createHangman.letter); 
    }

},

handleClickReset: function(){
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
    if((createHangman.gameOver === false) && ((createHangman.correct + createHangman.wrong) === createHangman.puzzleWord.length)){

    createHangman.nextRound();
    }
}


};

const gameCountController = {


gameOverCheck: function(){

    if(createHangman.chances === 0){
        createHangman.gameOver = true;
        //disable all buttons excluding the reset button
        //alert - your droid is dead!!!!

        setTimeout(alert('Your Droid has perished!'), 4000);
    }
},

checkForWin: function(){

    if(createHangman.correct >= createHangman.puzzleWord.length){
        setTimeout(alert('Your Droid will be forever grateful!'), 4000);
    }
}
};


window.onload = function (){
viewBuilder.letterBuild();
$('.alpha').on('click', hangController.handleClickLetter);
$('#start').on('click', hangController.handleClickStart);
$('#reset').on('click', hangController.handleClickReset);
$('#next-round').on('click' , hangController.handleClickNextRound);

};
