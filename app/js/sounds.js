//sounds.js

// text to speech - https://codepen.io/SteveJRobertson/pen/emGWaR

/*
------------------------------------
Music Tracks (use playMusic(<track #) stopMusic(<track #) )
------------------------------------
Track 0 - 0 to 1,000
Track 1 - 2,000 to 32,000
Track 2 - 64,000
Track 3 - 125,000 to 250,000
Track 4 - 500,000
Track 5 - 1,000,000
------------------------------------
Sound Effects (use playEffect("") stopEffect("") )
------------------------------------
Correct Answer - correctAnswer
Final Answer - finalAnswer
Begin Game - beginGame1
Begin Game(2) - beginGame2
Phone A Friend - phoneFriend
Wrong Answer - wrongAnswer
------------------------------------
*/
var currentEffect;



//   sound.play();



function audioVolume(x) {
    var backgroundMusic = $('audio#music');
    var soundEffects = $('audio#effects');
    backgroundMusic.prop("volume",x);
    soundEffects.prop("volume",x);
}

function playMusic(track) {
    var backgroundMusic = $('audio#music');


    var music;
    switch (track) {
        case 0: // $0
        case 1: // $100
        case 2: // $250
        case 3: // $500
        case 4: // $1,000
            music = 0;
            break;
        case 5: // $2,000
        case 6: // $4,000
        case 7: // $8,000
        case 8: // $16,000
        case 9: // $32,000
            music = 1;
            break;
        case 10: // $64,000
            music = 2;
            break;
        case 11: // $125,000
        case 12: // $250,000
            music = 3;
            break;
        case 13: // $500,000
            music = 4;
            break;
        case 14: // $1,000,000
            music = 5;
            break;
        case 15:
            music = 5;
            break;
        case 16:
            music = 5;
            break;
        default:
            music = 0;
    }
    // console.log("Playing Track - " + music);

    backgroundMusic[music].play();

}

function playEffect(track) {
    var soundEffects = $('audio#effects');
    currentEffect = track;
    switch (track) {
        case "correctAnswer":
            soundEffects[0].play();
            break;
        case "finalAnswer":
            soundEffects[1].play();
            break;
        case "beginGame2":
            soundEffects[2].play();
            break;
        case "phoneFriend":
            soundEffects[3].play();
            break;
        case "wrongAnswer":
            soundEffects[4].play();
            break;
        case "beginGame1":
            soundEffects[5].play();
            break;
        case "blast":
            soundEffects[6].play();
            break;
        case "winner":
            soundEffects[7].play();
            break;
        case "ticktock":
            soundEffects[8].play();
            break;
        default:
    }
    //console.log(currentEffect);

}

function stopMusic(track) {
    var backgroundMusic = $('audio#music');

    var music;
    switch (track) {
        case 0: // $0
        case 1: // $100
        case 2: // $250
        case 3: // $500
        case 4: // $1,000
            music = 0;
            break;
        case 5: // $2,000
        case 6: // $4,000
        case 7: // $8,000
        case 8: // $16,000
        case 9: // $32,000
            music = 1;
            break;
        case 10: // $64,000
            music = 2;
            break;
        case 11: // $125,000
        case 12: // $250,000
            music = 3;
            break;
        case 13: // $500,000
            music = 4;
            break;
        case 14: // $1,000,000
            music = 5;
            break;
        default:
            music = 0;
    }
    // console.log("Stoppping Track - " + music);
    backgroundMusic[music].pause();
    backgroundMusic[music].currentTime = 0;
}

function stopEffect(track) {
    currentEffect = "";
    var soundEffects = $('audio#effects');
    switch (track) {
        case "correctAnswer":
            soundEffects[0].pause();
            soundEffects[0].currentTime = 0;
            break;
        case "finalAnswer":
            soundEffects[1].pause();
            soundEffects[1].currentTime = 0;
            break;
        case "beginGame2":
            soundEffects[2].pause();
            soundEffects[2].currentTime = 0;
            break;
        case "phoneFriend":
            soundEffects[3].pause();
            soundEffects[3].currentTime = 0;
            break;
        case "wrongAnswer":
            soundEffects[4].pause();
            soundEffects[4].currentTime = 0;
            break;
        case "beginGame1":
            soundEffects[5].pause();
            soundEffects[5].currentTime = 0;
            break;
        case "winner":
            soundEffects[7].pause();
            soundEffects[7].currentTime = 0;
            break;
        case "ticktock":
            soundEffects[8].pause();
            soundEffects[8].currentTime = 0;
            break;


        default:
    }
}