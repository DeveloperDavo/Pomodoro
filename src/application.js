'use strict';

function Application() {
    var SESSION_MODE = "Session";
    var BREAK_MODE = "Break";

    var INITIAL_SESSION_LENGTH = 25;
    var INITIAL_BREAK_LENGTH = 5;

    var $INCREMENT_SESSION = $("#increment-session");
    var $DECREMENT_SESSION = $("#decrement-session");
    var $INCREMENT_BREAK = $("#increment-break");
    var $DECREMENT_BREAK = $("#decrement-break");

    var $SESSION_LENGTH = $("#session-length");
    var $BREAK_LENGTH = $("#break-length");

    var $CLOCK_MODE = $("#clock-mode");
    var $CLOCK_TIME = $("#clock-time");

    var sessionLength = INITIAL_SESSION_LENGTH;
    var breakLength = INITIAL_BREAK_LENGTH;

    var INCREMENT_BUTTON_VALUE = "increment";

    function updateClockTime(lengthElement, newLength) {
        if (lengthElement === $SESSION_LENGTH) {
            $CLOCK_TIME.text(newLength);
            sessionLength = newLength;
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

    var startCountdown = function (length) {
        var lengthInSeconds = length * 60;
        // var lengthInSeconds = length;
        var timeElapsedInSeconds = -1;
        var percentageOfTimeElapsed = 0;
        $CLOCK_TIME.countdown({
            until: lengthInSeconds,
            onExpiry: startBreakCountdown,
            alwaysExpire: true,
            compact: true,
            format: 'MS',
            description: '',
            onTick: function () {
                timeElapsedInSeconds++;
                percentageOfTimeElapsed = timeElapsedInSeconds / lengthInSeconds * 100;
                $('#clock').css('background', 'linear-gradient(to top, #99CC00 ' + percentageOfTimeElapsed + '%, #333333 0%) bottom')
            }
        });
    };

    function startSessionCountdownOnClick() {
        $('#start-button').click(function () {
            startCountdown(sessionLength);
            $INCREMENT_SESSION.prop('disabled', true);
            $DECREMENT_SESSION.prop('disabled', true);
            $INCREMENT_BREAK.prop('disabled', true);
            $DECREMENT_BREAK.prop('disabled', true);
        });
    }

    function startBreakCountdown() {
        // reset clock
        $CLOCK_TIME.removeClass("is-countdown");

        $CLOCK_MODE.text(BREAK_MODE);

        startCountdown(breakLength);
    }

    this.init = function () {

        $SESSION_LENGTH.text(INITIAL_SESSION_LENGTH);
        $BREAK_LENGTH.text(INITIAL_BREAK_LENGTH);

        $CLOCK_TIME.text(INITIAL_SESSION_LENGTH);
        $CLOCK_MODE.text(SESSION_MODE);

        updateLengthOnClick($INCREMENT_SESSION, $SESSION_LENGTH);
        updateLengthOnClick($DECREMENT_SESSION, $SESSION_LENGTH);

        updateLengthOnClick($DECREMENT_BREAK, $BREAK_LENGTH);
        updateLengthOnClick($INCREMENT_BREAK, $BREAK_LENGTH);

        startSessionCountdownOnClick();
    };

}
