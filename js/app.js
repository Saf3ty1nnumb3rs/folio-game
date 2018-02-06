












const createHangman = {
    puzzleWordRando: function(){
        createHangman.puzzleWord = (createHangman.words[Math.floor(Math.random()*createHangman.words.length)])
        viewBuilder.puzzleWordBuild();
    },


alphabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q','R','S','T','U','V','W','X','Y','Z'],
words:['MANDALORIAN', 'NABOO', 'SKYWALKER', 'VADER', 'TATOOINE', 'PALPATINE', 'CLONE', 'GALAXY', 'REBELLION', 'EMPIRE', 'DESTINY', 'ALLIANCE', 'JEDI', 'CANTINA', 'BLASTER', 'MILLENIUM', 'DISTURBANCE', 'DARKNESS', 'BATTLE', 'DEATHSTAR', 'NERFHERDER', 'DROIDS', 'IMPERIAL','CLONES'],
puzzleWord: "",
gameOver: false,
incorrect: 0,
correct: 0,

pickLetter: function(){
    checkPuzzleArray();




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
        $('#letter-box').append(`<button id="${alphaIndex}" class="btn mx-4 my-1">${alphaArray[i]}</button>`);
    })
},
puzzleWordBuild: function(){
    let puzzle = createHangman.puzzleWord;
    puzzle.split();
    puzzle.forEach((lett, i)=>{
        $('puzzle-box').append()


    })


},



};

const hangController = {

checkLetter: function(){

},

handleClickStart: function(){
if(createHangman.puzzleWord.length === 0){
    createHangman.start();
}

},



};


window.onload = function (){
viewBuilder.letterBuild();
$('.alpha').on('click', hangController.checkLetter);
$('#start').on('click', hangController.handleClickStart);

};
