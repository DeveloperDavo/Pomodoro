'use strict';

function playAudio(id) {
    document.getElementById(id).play();
}

function Application() {
    var DISABLED = true;
    var ENABLED = false;

    var SESSION_MODE = "Session";
    var BREAK_MODE = "Break";

    var START = "START";
    var PAUSE = "PAUSE";

    var INITIAL_SESSION_LENGTH_IN_MINUTES = 25;
    var INITIAL_BREAK_LENGTH_IN_MINUTES = 5;

    var LIGHT_GREEN = "#99CC00";
    var RED = "rgb(255, 68, 68)";

    var $INCREMENT_SESSION = $("#increment-session");
    var $DECREMENT_SESSION = $("#decrement-session");
    var $INCREMENT_BREAK = $("#increment-break");
    var $DECREMENT_BREAK = $("#decrement-break");

    var $SESSION_LENGTH = $("#session-length");
    var $BREAK_LENGTH = $("#break-length");

    var MAX_SESSION_LENGTH = 59;

    var $CLOCK_MODE = $("#clock-mode");
    var $CLOCK_TIME = $("#clock-time");

    var $START_PAUSE = $('#start-pause-button');
    var $RESET = $('#reset-button');

    var INCREMENT_BUTTON_VALUE = "increment";

    var sessionSecondsLeft = INITIAL_SESSION_LENGTH_IN_MINUTES * 60;
    var breakSecondsLeft = INITIAL_BREAK_LENGTH_IN_MINUTES * 60;

    var countdownRunning = false;
    var countdownId = -1;

    var session = true;

    function addTimeFormatterFunctionToString() {
        String.prototype.formatTime = function () {
            var totalSeconds = parseInt(this, 10);
            var minutes = Math.floor(totalSeconds / 60);
            var seconds = totalSeconds - (minutes * 60);

            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            return minutes + ':' + seconds;
        };
    }

    function updateLengthOnClick(crementButton, lengthElement) {
        crementButton.click(function () {
            var length = Number(lengthElement.text());
            var newLength = crementButton.val() === INCREMENT_BUTTON_VALUE ? ++length : --length;

            var attr = 'disabled';
            var disabled = true;
            if ($SESSION_LENGTH === MAX_SESSION_LENGTH) {
                $INCREMENT_SESSION.prop(attr, disabled);
            }

            lengthElement.text(newLength);

            if (lengthElement === $SESSION_LENGTH) {
                $CLOCK_TIME.text((newLength * 60).toString().formatTime());
                sessionSecondsLeft = newLength * 60;
            }

        })
    }

    function fillClock(color, lengthElement, secondsLeft) {
        var lengthInSeconds = Number(lengthElement.text()) * 60;
        var timeElapsedInSeconds = lengthInSeconds - secondsLeft;
        var percentageOfTimeElapsed = timeElapsedInSeconds / lengthInSeconds * 100;

        $('#clock').css('background', 'linear-gradient(to top, ' + color + ' ' + percentageOfTimeElapsed + '%, #333333 0%) bottom')
    }

    var executeCountdown = function (mode, secondsLeft, alarmId, color, lengthElement) {
        $CLOCK_MODE.text(mode); // TODO no need to do this every second

        if (secondsLeft === 0) {
            playAudio(alarmId);
            clearInterval(countdownId);
            session = !session;
            startCountdown();
        }

        fillClock(color, lengthElement, secondsLeft);

        $CLOCK_TIME.text(secondsLeft.toString().formatTime());
    };

    function startCountdown() {
        countdownId = setInterval(function () {
            if (session) {
                sessionSecondsLeft--;
                executeCountdown(SESSION_MODE, sessionSecondsLeft, "session-alarm", LIGHT_GREEN, $SESSION_LENGTH);
            } else {
                breakSecondsLeft--;
                executeCountdown(BREAK_MODE, breakSecondsLeft, "break-alarm", RED, $BREAK_LENGTH);
            }

        }, 1000)
    }

    function toggleCrementButtons(isDisabled) {
        var attr = 'disabled';
        $INCREMENT_SESSION.prop(attr, isDisabled);
        $DECREMENT_SESSION.prop(attr, isDisabled);
        $INCREMENT_BREAK.prop(attr, isDisabled);
        $DECREMENT_BREAK.prop(attr, isDisabled);
    }

    function startOrPauseCountdownOnClick() {
        $START_PAUSE.click(function () {
            countdownRunning = !countdownRunning;
            if (countdownRunning) {
                startCountdown();
                toggleCrementButtons(DISABLED);
                $START_PAUSE.text(PAUSE);
            } else {
                clearInterval(countdownId);
                $START_PAUSE.text(START);
            }
        });
    }

    function resetCountdownOnClick() {
        $RESET.click(function () {
            countdownRunning = false;
            clearInterval(countdownId);
            session = true;
            fillClock(LIGHT_GREEN, $SESSION_LENGTH, INITIAL_SESSION_LENGTH_IN_MINUTES * 60);
            toggleCrementButtons(ENABLED);
            sessionSecondsLeft = Number($SESSION_LENGTH.text()) * 60;
            breakSecondsLeft = Number($BREAK_LENGTH.text()) * 60;
            $CLOCK_TIME.text(sessionSecondsLeft.toString().formatTime());
            $START_PAUSE.text(START);
        });
    }

    this.init = function () {

        addTimeFormatterFunctionToString();

        $SESSION_LENGTH.text(INITIAL_SESSION_LENGTH_IN_MINUTES);
        $BREAK_LENGTH.text(INITIAL_BREAK_LENGTH_IN_MINUTES);

        $CLOCK_TIME.text((INITIAL_SESSION_LENGTH_IN_MINUTES * 60).toString().formatTime());
        $CLOCK_MODE.text(SESSION_MODE);

        $START_PAUSE.text(START);

        updateLengthOnClick($INCREMENT_SESSION, $SESSION_LENGTH);
        updateLengthOnClick($DECREMENT_SESSION, $SESSION_LENGTH);

        updateLengthOnClick($DECREMENT_BREAK, $BREAK_LENGTH);
        updateLengthOnClick($INCREMENT_BREAK, $BREAK_LENGTH);

        startOrPauseCountdownOnClick();
        resetCountdownOnClick();

    };

    this.setSessionSecondsLeft = function (seconds) {
        sessionSecondsLeft = seconds;
    };

    this.getSessionSecondsLeft = function () {
        return sessionSecondsLeft;
    };

    this.setBreakSecondsLeft = function (seconds) {
        breakSecondsLeft = seconds;
    };

    this.getBreakSecondsLeft = function () {
        return breakSecondsLeft;
    };

    this.setSession = function (bool) {
        session = bool;
    };

    this.isSession = function () {
        return session;
    };

}
