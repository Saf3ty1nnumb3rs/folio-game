$('body').append(`<h1>Hello, Cruel World!</h1>`)












const createHangman = {
    puzzleWordRando: function(){
        createHangman.puzzleWord.push(words[Math.floor(Math.random()*createHangman.words.length)])
    },


alphabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q','R','S','T','U','V','W','X','Y','Z'],
words:['MANDALORIAN', 'NABOO', 'SKYWALKER', 'VADER', 'TATOOINE', 'PALPATINE', 'CLONE', 'GALAXY', 'REBELLION', 'EMPIRE', 'DESTINY', 'ALLIANCE', 'JEDI', 'CANTINA', 'BLASTER', 'MILLENIUM', 'DISTURBANCE', 'DARKNESS', 'BATTLE', 'DEATHSTAR', 'NERFHERDER', 'DROIDS', 'IMPERIAL','CLONES'],
puzzleWord: [],
gameOver: false,
incorrect: 0,
correct: 0,

pickLetter: function(){
    checkPuzzleArray();




},












 }; // letterSelect end section 

const viewBuilder = {

//Builds the letter buttons in the display - defines id and class.
letterBuild: function (){
    let alphaArray = createHangman.alphabet;
    
    alphaArray.forEach((letter, i)=>{
        let alphaIndex = 'alpha' + [i];
        $('body').append(`<button id="letters" class="alpha ${alphaIndex}">${alphaArray[i]}</button>`);
    })
},
puzzleWordBuild: function(){}



};

const hangController = {

checkLetter: function(){

}





};


window.onload = function (){
viewBuilder.letterBuild();
$('.alpha').on('click', hangController.checkLetter);


};
