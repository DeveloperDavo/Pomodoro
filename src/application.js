'use strict';

function Application() {
    var SESSION_MODE = "Session";
    var BREAK_MODE = "Break";
    var START = "START";
    var PAUSE = "PAUSE";

    var INITIAL_SESSION_LENGTH_IN_MINUTES = 25;
    var INITIAL_BREAK_LENGTH_IN_MINUTES = 5;

    var $INCREMENT_SESSION = $("#increment-session");
    var $DECREMENT_SESSION = $("#decrement-session");
    var $INCREMENT_BREAK = $("#increment-break");
    var $DECREMENT_BREAK = $("#decrement-break");

    var $SESSION_LENGTH = $("#session-length");
    var $BREAK_LENGTH = $("#break-length");

    var $CLOCK_MODE = $("#clock-mode");
    var $CLOCK_TIME = $("#clock-time");

    var $START_PAUSE = $('#start-pause-button');

    var INCREMENT_BUTTON_VALUE = "increment";

    var sessionLengthInMinutes = INITIAL_SESSION_LENGTH_IN_MINUTES;
    var breakLengthInMinutes = INITIAL_BREAK_LENGTH_IN_MINUTES;

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

    function updateClockTime(lengthElement, newLength) {
        if (lengthElement === $SESSION_LENGTH) {
            $CLOCK_TIME.text((newLength * 60).toString().formatTime());
            sessionLengthInMinutes = newLength;
        } else {
            breakLengthInMinutes = newLength;
        }
    }

    function updateLengthOnClick(crementButton, lengthElement) {
        crementButton.click(function () {
            var length = Number(lengthElement.text());
            var newLength = crementButton.val() === INCREMENT_BUTTON_VALUE ? ++length : --length;

            lengthElement.text(newLength);

            updateClockTime(lengthElement, newLength);

        })
    }

    function fillClock(color, percentage) {
        $('#clock').css('background', 'linear-gradient(to top, ' + color + ' ' + percentage + '%, #333333 0%) bottom')
    }

    function startCountdown(color, lengthInMinutes) {
        var lengthInSeconds = lengthInMinutes * 60;
        var secondsLeft = lengthInSeconds;
        var timeElapsedInSeconds = 0;

        var countdown = setInterval(function () {
            if (!isCountdownRunning) {
                clearInterval(countdown);
                return;
            }
            secondsLeft--;

            if (secondsLeft === 0) {
                startBreakCountdown();
                clearInterval(countdown);
                $CLOCK_TIME.text(breakLengthInMinutes.toString().formatTime());
                fillClock(color, 0);
                return;
            }

            timeElapsedInSeconds++;
            var percentageOfTimeElapsed = timeElapsedInSeconds / lengthInSeconds * 100;

            fillClock(color, percentageOfTimeElapsed);

            $CLOCK_TIME.text(secondsLeft.toString().formatTime());
        }, 1000);
    }

    function startBreakCountdown() {
        $CLOCK_MODE.text(BREAK_MODE);
        startCountdown("rgb(255, 68, 68)", breakLengthInMinutes);
    }


    function startCountdownOnClick() {
        $START_PAUSE.click(function () {
            isCountdownRunning = !isCountdownRunning;
            if (isCountdownRunning) {
                startCountdown("#99CC00", sessionLengthInMinutes);
                $INCREMENT_SESSION.prop('disabled', true);
                $DECREMENT_SESSION.prop('disabled', true);
                $INCREMENT_BREAK.prop('disabled', true);
                $DECREMENT_BREAK.prop('disabled', true);
                $START_PAUSE.text(PAUSE);
            } else {
                $INCREMENT_SESSION.prop('disabled', false);
                $DECREMENT_SESSION.prop('disabled', false);
                $INCREMENT_BREAK.prop('disabled', false);
                $DECREMENT_BREAK.prop('disabled', false);
                $START_PAUSE.prop('disabled', true);
                $START_PAUSE.text(START);
            }
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

        startCountdownOnClick();
    };

}
