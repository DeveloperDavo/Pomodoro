'use strict';

function Application() {
    var SESSION_MODE = "Session";
    var BREAK_MODE = "Break";

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

    var INCREMENT_BUTTON_VALUE = "increment";

    var sessionLengthInMinutes = INITIAL_SESSION_LENGTH_IN_MINUTES;
    var breakLengthInMinutes = INITIAL_BREAK_LENGTH_IN_MINUTES;

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

    function startCountdown(lengthInMinutes) {
        var count = lengthInMinutes * 60;
        // var count = breakLengthInMinutes;

        var countdown = setInterval(function () {
            count--;
            if (count === 0) {
                startBreakCountdown();
                clearInterval(countdown);
                $CLOCK_TIME.text(breakLengthInMinutes.toString().formatTime());
                return;
            }

            $CLOCK_TIME.text(count.toString().formatTime());
        }, 1000);
    }

    function startBreakCountdown() {
        $CLOCK_MODE.text(BREAK_MODE);
        startCountdown(breakLengthInMinutes)
    }


    function startCountdownOnClick() {
        $('#start-button').click(function () {
            startCountdown(sessionLengthInMinutes);
            $INCREMENT_SESSION.prop('disabled', true);
            $DECREMENT_SESSION.prop('disabled', true);
            $INCREMENT_BREAK.prop('disabled', true);
            $DECREMENT_BREAK.prop('disabled', true);
        });
    }

    this.init = function () {

        addTimeFormatterFunctionToString();

        $SESSION_LENGTH.text(INITIAL_SESSION_LENGTH_IN_MINUTES);
        $BREAK_LENGTH.text(INITIAL_BREAK_LENGTH_IN_MINUTES);

        $CLOCK_TIME.text((INITIAL_SESSION_LENGTH_IN_MINUTES * 60).toString().formatTime());
        $CLOCK_MODE.text(SESSION_MODE);

        updateLengthOnClick($INCREMENT_SESSION, $SESSION_LENGTH);
        updateLengthOnClick($DECREMENT_SESSION, $SESSION_LENGTH);

        updateLengthOnClick($DECREMENT_BREAK, $BREAK_LENGTH);
        updateLengthOnClick($INCREMENT_BREAK, $BREAK_LENGTH);

        startCountdownOnClick();

    };

}
