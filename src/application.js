'use strict';

function Application() {
    var SESSION_MODE = "Session";

    var INITIAL_SESSION_LENGTH_IN_MINUTES = 25;
    var INITIAL_SESSION_LENGTH_IN_SECONDS = INITIAL_SESSION_LENGTH_IN_MINUTES * 60;
    var INITIAL_BREAK_LENGTH = 5;

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

    function startCountdown() {
        var count = sessionLengthInMinutes * 60;

        setInterval(function () {
            count--;
            $CLOCK_TIME.text(count.toString().formatTime())
        }, 1000);
    }

    function startCountdownOnClick() {
        $('#start-button').click(function () {
            startCountdown();
        });
    }

    this.init = function () {

        addTimeFormatterFunctionToString();

        $SESSION_LENGTH.text(INITIAL_SESSION_LENGTH_IN_MINUTES);
        $BREAK_LENGTH.text(INITIAL_BREAK_LENGTH);

        $CLOCK_TIME.text(INITIAL_SESSION_LENGTH_IN_SECONDS.toString().formatTime());
        $CLOCK_MODE.text(SESSION_MODE);

        updateLengthOnClick($INCREMENT_SESSION, $SESSION_LENGTH);
        updateLengthOnClick($DECREMENT_SESSION, $SESSION_LENGTH);

        updateLengthOnClick($DECREMENT_BREAK, $BREAK_LENGTH);
        updateLengthOnClick($INCREMENT_BREAK, $BREAK_LENGTH);

        startCountdownOnClick();

    };

}
