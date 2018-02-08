












const createHangman = {
    puzzleWordRando: function(){
        createHangman.puzzleWord = (createHangman.words[Math.floor(Math.random()*createHangman.words.length)])
        viewBuilder.puzzleWordBuild();
    },


alphabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q','R','S','T','U','V','W','X','Y','Z'],
words:['MANDALORIAN', 'NABOO', 'SKYWALKER', 'VADER', 'TATOOINE', 'PALPATINE', 'CLONE', 'GALAXY', 'REBELLION', 'EMPIRE', 'DESTINY', 'ALLIANCE', 'JEDI', 'CANTINA', 'BLASTER', 'MILLENIUM', 'DISTURBANCE', 'DARKNESS', 'BATTLE', 'DEATHSTAR', 'NERFHERDER', 'DROIDS', 'IMPERIAL','CLONES'],
puzzleWord: "",
letter: "",
gameOver: false,
chances: 6,
correct: 0,
score: 0,
//Check the letter that has been picked against the puzzle word; track chances; add points
checkLetter: function(letter){

    let wrongCount = 0;

    for(i=0; i < createHangman.puzzleWord.length; i ++){
            //check if clicked value equals any of the letters in the puzzle array
        if(letter !== createHangman.puzzleWord[i]){
            wrongCount ++;
            //grab letter and make visible; increment correct value;check win
        } else {
            $('span.'+ createHangman.puzzleWord[i]).css('visibility', 'visible');
            createHangman.correct ++;
            gameCountController.checkForWin()
        }
    }
// Subtract lives - decrease chances if wrong count === word length
    if(wrongCount === createHangman.puzzleWord.length){
        createHangman.chances --;
        gameCountController.gameOverCheck();
    }

    
//Increment points - score count 
    if (wrongCount < createHangman.puzzleWord.length){
        
        createHangman.score ++;
    }

    hangController.handleUpdatePointDisplay();

},

start: function(){
    if(this.puzzleWord.length === 0){  
      this.puzzleWordRando();
    }
},
//Eject - Complete Reset After Game Over

nextRound: function(){
    this.correct = 0;
    this.chances = 6;
    this.gameOver = false;
    this.puzzleWord = "";
    $('#puzzle-box').html('')
    this.puzzleWordRando();


},

reset: function(){
    this.correct = 0;
    this.chances = 6;
    this.gameOver = false;
    this.puzzleWord = "";
    this.score = 0;
    $('#puzzle-box').html('')
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
    
createHangman.letter = $(this).text();
console.log(createHangman.letter);
$(this).css('background-color' , 'red')
createHangman.checkLetter(createHangman.letter); 


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

}


};

const gameCountController = {


gameOverCheck: function(){

    if(createHangman.chances === 0){
        //disable all buttons excluding the reset button
        //alert - your droid is dead!!!!

        alert('Your Droid has perished!');
    }
},

checkForWin: function(){

    if(createHangman.correct >= createHangman.puzzleWord.length){
        alert('Your Droid will be forever grateful!');
    }
}
};


window.onload = function (){
viewBuilder.letterBuild();
$('.alpha').on('click', hangController.handleClickLetter);
$('#start').on('click', hangController.handleClickStart);
$('#reset').on('click', hangController.handleClickReset);
$('eject').on('click' , )

};
