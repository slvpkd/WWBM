
//GET RANDOM NUMBER BETWEEN 2 VALUES
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkCutScene(x) {
    switch (x) {
        case 1:
        case 2:
        case 3:
        case 4:
            playMusic(x - 1);
            break;
        case 5:
            showScoreCutScene(x - 1);
            break;
        case 6:
        case 7:
        case 8:
        case 9:
            playMusic(x - 1);
            break;
        case 10:
            showScoreCutScene(x - 1);
            break;
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
            playMusic(x - 1);
            break;
        case 16:
            showGameOverCutScene(x - 1);
            break;
    }
}


// SET HEIGHTS OF AUDIENCE METERS
function setAudienceMeters(a, b, c, d) {

    $("#meter1").animate({
        width: a + "%"
    }, 1500);
    $("#meter2").animate({
        width: b + "%"
    }, 1500);
    $("#meter3").animate({
        width: c + "%"
    }, 1500);
    $("#meter4").animate({
        width: d + "%"
    }, 1500);


}

function disableClick() {
    $('#ans1B').off('click');
    $('#ans2B').off('click');
    $('#ans3B').off('click');
    $('#ans4B').off('click');
}

//Reset background colours on answer buttons.
function highlightAnswerReset() {
    $('#ans1B').removeClass('answerCorrect').addClass('answer').show();
    $('#ans2B').removeClass('answerCorrect').addClass('answer').show();
    $('#ans3B').removeClass('answerCorrect').addClass('answer').show();
    $('#ans4B').removeClass('answerCorrect').addClass('answer').show();
    $('#AsktheAudience').fadeOut();
}

//Increase currentLevel and refresh money counter.
function levelUp() {
    setTimeout($.proxy(function () {
        currentLevel += 1;
        actualLevel += 1;
        setLevel(actualLevel);
    }, this), 5000);
}

// END GAME FUNCTION
function gameOver(lvl) {
    setTimeout($.proxy(function () {

        showGameOverCutScene(lvl);
        console.log("Game Over");

    }, this), 4000);

    return false;
}

//HIGHLIGHT SELECTED ANSWER ORANGE.
function highLightAnswerOrange(id) {
    //$('#' + id).html('123');
    stopMusic(actualLevel - 1);
    playEffect("finalAnswer");
    $('#timer').TimeCircles().stop();
    $('#' + id).hide().removeClass('answer').addClass('answerCheck').fadeIn(1000);
}

//IF ANSWER CORRECT, HIGHLIGHT ANSWER AS GREEN (CORRECT)
function highLightAnswerGreen(id) {
    setTimeout($.proxy(function () {
        stopEffect(currentEffect);
        playEffect("correctAnswer");
        timerID = $('#timer');
        toggleShowHide(timerID);
        $(id).removeClass('answerCheck').addClass('answerCorrect').fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
        $('body').focus();
    }, this), 4000);
}

//HIGHLIGHT INCORRECT ANSWER
function highLightAnswerRed(id, ans) {
    setTimeout($.proxy(function () {
        playEffect("wrongAnswer");
        stopEffect("finalAnswer");
        $(id).removeClass('answerCheck').addClass('answerIncorrect').fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);

        highlightCorrectAnswer(ans);
    }, this), 3000);
}

//SEARCH FOR CORRECT ANSWER AND HIGHLIGHT
function highlightCorrectAnswer(ans) {
    $("#ans1B:contains('" + ans + "')").removeClass('answerCheck').addClass('answerCorrect');
    $("#ans2B:contains('" + ans + "')").removeClass('answerCheck').addClass('answerCorrect');
    $("#ans3B:contains('" + ans + "')").removeClass('answerCheck').addClass('answerCorrect');
    $("#ans4B:contains('" + ans + "')").removeClass('answerCheck').addClass('answerCorrect');
    $('#ans1B').prop('disabled', true);
    $('#ans2B').prop('disabled', true);
    $('#ans3B').prop('disabled', true);
    $('#ans4B').prop('disabled', true);


}

function setMoney(lvl) {
    var newScore = 0;

    switch (lvl) {
        case 0:
            newScore = 0;
            break;
        case 1:
            newScore = 100;
            break;
        case 2:
            newScore = 250;
            break;
        case 3:
            newScore = 500;
            break;
        case 4:
            newScore = 1000;
            break;
        case 5:
            newScore = 2000;
            break;
        case 6:
            newScore = 4000;
            break;
        case 7:
            newScore = 8000;
            break;
        case 8:
            newScore = 16000;
            break;
        case 9:
            newScore = 32000;
            break;
        case 10:
            newScore = 64000;
            break;
        case 11:
            newScore = 125000;
            break;
        case 12:
            newScore = 250000;
            break;
        case 13:
            newScore = 500000;
            break;
        case 14:
            newScore = 1000000;
            break;
        case 15:
            newScore = 1000000;
            break;

        default:
            newScore = 0;
    }
    return newScore;

}

//SET LEVEL - Updates current level and points. (lvl = 1 to 15)
function setLevel(lvl) {
    var setLevel = lvl; // SET FUNCTION INPUT
    var levelID = $('#q' + lvl); // GET LEVEL ELEMENT ID
    var percent = levelID.data("id");


    levelDOM.html(currentLevel); // UPDATE LEVEL # ON DOM
    actualDOM.html("Question " + actualLevel);
    //ANIMATE PROGRESS BAR TO MATCH LEVEL HEIGHT
    $('.progressLevel').animate({
        height: percent
    }, 500);

    //SET HIGHLIGHT ON LEVEL
    levelID.addClass("outer checkPointHL");
    levelDOM.html(currentLevel);
    var score = setMoney(currentLevel - 1);

    var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
    $('#scoreValue').animateNumber({
        number: score,
        numberStep: comma_separator_number_step
    });
    $("#scoreValue").fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);

}

// showScoreCutScene(10);

function showScoreCutScene(lvl) {
    $('#scoreCutScene').fadeIn(1000);

    playEffect("beginGame1");

    var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
    $('#sceneScoreValue').animateNumber({
        number: setMoney(lvl),
        numberStep: comma_separator_number_step
    }, 5000);

    setTimeout($.proxy(function () {
        $('#displayScore').fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
    }, this), 5000);

    setTimeout($.proxy(function () {
        $('#scoreCutScene').fadeOut(1000);
        playMusic(actualLevel - 1);
    }, this), 6500);
}

function toggleShowHide(id) {
    var className = id.attr('class');
    if (className === "show") {
        id.removeClass("show");
        id.addClass("hide");
    }else {
        id.removeClass("hide");
        id.addClass("show");
    }
  }

function initTimer() {
    var timer = $('#timer');
    timer.TimeCircles().addListener(function () {
        var time = timer.TimeCircles().getTime()
        if (time < 1) {
            timer.TimeCircles().stop();
            timer.data('data-timer', 0);
            stopMusic(actualLevel - 1);
            playEffect("wrongAnswer");
            showGameOverCutScene(actualLevel);
            console.log("Out of Time - Game Over!");
        }

        if (time > 0 && time < 7.995) {
            playEffect("ticktock");
        }
    });
}

function showGameOverCutScene(lvl) {
    $('#endGameCutScene').fadeIn(fadeTime);
    // console.log("You reached level - " + lvl);
    $('#timer').TimeCircles().destroy();
    if (lvl >= 14) {
        var endGameHeader = "WINNER";
        stopMusic(actualLevel - 1);
        playEffect("winner");
    } else {
        endGameHeader = "GAME OVER";
    }
    $('#endGameHeader').text(endGameHeader);
    $('#name').focus();
    finalScore = setMoney(lvl);

    var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
    $('#endGameScore').animateNumber({
        number: finalScore,
        numberStep: comma_separator_number_step
    }, 1000);

    setTimeout($.proxy(function () {
        $('#endGameScoreHeader').fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
    }, this), 1200);

}




//SHUFFLES AN ARRAY - TO REORDER INCORRECT QUESTIONS
function shuffle(array) {
    var m = array.length,
        t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}

//load question from questions array and shuffle answers.
function loadQuestion(qObj) {


    highlightAnswerReset();
    console.log("Correct Answer - " + qObj.correct_answer);
    var qText = $('#question');
    var a1Text = $('#ans1');
    var a2Text = $('#ans2');
    var a3Text = $('#ans3');
    var a4Text = $('#ans4');

    var q = qObj.question; // set question
    var a = [qObj.correct_answer, qObj.incorrect_answers[0], qObj.incorrect_answers[1], qObj.incorrect_answers[2], ]

    aMix = shuffle(a);

    $('#card').fadeOut()

    setTimeout($.proxy(function () {
        qText.html(q);
        a1Text.html(aMix[0]);
        a2Text.html(aMix[1]);
        a3Text.html(aMix[2]);
        a4Text.html(aMix[3]);
        $('#card').fadeIn();
        timerID = $('#timer');
        timerID.TimeCircles().restart();
        timerID.removeClass('hide');
        timerID.addClass('show');
        initTimer();
    }, this), 500);
}

//CHECK SELECTED ANSWER AGAINST ACTUAL ANSWER.
function checkAnswer(r, a) {

    if (r === a) {

        return true;
    } else {
        return false;
    }

}

