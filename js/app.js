












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
        if(letter !== createHangman.puzzleWord[i]){
            wrongCount ++;

        } else {
            $('span.'+ createHangman.puzzleWord[i]).css('visibility', 'visible');
        }
        // Subtract lives
    if(wrongCount === createHangman.puzzleWord.length){
        createHangman.chances --;
    }
 }     //Increment points  
    if (wrongCount < createHangman.puzzleWord.length){
        createHangman.correct ++;
        createHangman.score ++;
    }
},

start: function(){
    if(this.puzzleWord.length === 0){
      this.puzzleWordRando();
    }
},

reset: function(){
    this.correct = 0;
    this.chances = 6;
    this.gameOver = false;
    this.puzzleWord = "";
    $('#puzzle-box').html('')
    this.puzzleWordRando();
}


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



};

const hangController = {

handleClickLetter: function(){
    
createHangman.letter = $(this).text()
console.log(createHangman.letter)
$(this).addClass()
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



};


window.onload = function (){
viewBuilder.letterBuild();
$('.alpha').on('click', hangController.handleClickLetter);
$('#start').on('click', hangController.handleClickStart);
$('#reset').on('click', hangController.handleClickReset)

};
