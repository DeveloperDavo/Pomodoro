'use strict';

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

    var $INCREMENT_SESSION = $("#increment-session");
    var $DECREMENT_SESSION = $("#decrement-session");
    var $INCREMENT_BREAK = $("#increment-break");
    var $DECREMENT_BREAK = $("#decrement-break");

    var $SESSION_LENGTH = $("#session-length");
    var $BREAK_LENGTH = $("#break-length");

    var $CLOCK_MODE = $("#clock-mode");
    var $CLOCK_TIME = $("#clock-time");

    var $START_PAUSE = $('#start-pause-button');
    var $RESET = $('#reset-button');

    var INCREMENT_BUTTON_VALUE = "increment";

    var sessionSecondsLeft = INITIAL_SESSION_LENGTH_IN_MINUTES * 60;

    var isCountdownRunning = false;

    function addTimeFormatterFunctionToString() {
        String.prototype.formatTime = function () {
            var totalSeconds = parseInt(this, 10);
            var hours = Math.floor(totalSeconds / 3600);
            var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
            var seconds = totalSeconds - (hours * 3600) - (minutes * 60);

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

            lengthElement.text(newLength);

            if (lengthElement === $SESSION_LENGTH) {
                $CLOCK_TIME.text((newLength * 60).toString().formatTime());
                sessionSecondsLeft = newLength * 60;
            }

        })
    }

    function fillClock(color, percentage) {
        $('#clock').css('background', 'linear-gradient(to top, ' + color + ' ' + percentage + '%, #333333 0%) bottom')
    }

    function startCountdown(color) {
        var countdown = setInterval(function () {
            if (!isCountdownRunning) {
                clearInterval(countdown);
                return;
            }

            sessionSecondsLeft--;

            var sessionLengthInSeconds = Number($SESSION_LENGTH.text()) * 60;
            var timeElapsedInSeconds = sessionLengthInSeconds - sessionSecondsLeft;
            var percentageOfTimeElapsed = timeElapsedInSeconds / sessionLengthInSeconds * 100;

            fillClock(color, percentageOfTimeElapsed);

            $CLOCK_TIME.text(sessionSecondsLeft.toString().formatTime());
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
            isCountdownRunning = !isCountdownRunning;
            if (isCountdownRunning) {
                startCountdown(LIGHT_GREEN);
                toggleCrementButtons(DISABLED);
                $START_PAUSE.text(PAUSE);
            } else {
                $START_PAUSE.text(START);
            }
        });
    }

    function resetCountdownOnClick() {
        $RESET.click(function () {
            isCountdownRunning = false;
            fillClock(LIGHT_GREEN, 0);
            toggleCrementButtons(ENABLED);
            sessionSecondsLeft = Number($SESSION_LENGTH.text()) * 60;
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

}
