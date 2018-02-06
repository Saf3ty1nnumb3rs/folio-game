












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

pickLetter: function(letter){
    let wrongCount = 0;
    for(i=0; i < createHangman.puzzleWord.length; i ++){
        if(letter !== createHangman.puzzleWord[i]){
            wrongCount ++;

        } else {
            $('div.card.'+ createHangman.puzzleWord[i]).css('color', 'rgba(76, 175, 80, 1)');
        }
    if(wrongCount === createHangman.puzzleWord.length){
        createHangman.chances --;
    }
} 
    if (wrongCount < createHangman.puzzleWord.length){
        createHangman.correct ++;
    }

    
    // checkPuzzleArray();




},

start: function(){
    if(this.puzzleWord.length === 0){
      this.puzzleWordRando();
    }
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
puzzleWordBuild: function(){
    let puzzle = createHangman.puzzleWord.split("");
    puzzle.forEach((letter, i)=>{
        $('#puzzle-box').append(`<div class="${puzzle[i]} letter-cell card card-body bg-light justify-content-center">${puzzle[i]}</div`)
    })
},



};

const hangController = {

handleClickLetter: function(){
    
createHangman.letter = $(this).text()
console.log(createHangman.letter)
$(this).addClass()
createHangman.pickLetter(createHangman.letter); 


}


,

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

};
