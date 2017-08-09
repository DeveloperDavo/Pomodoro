'use strict';

function Application() {
    var INITIAL_SESSION_LENGTH = 25;
    var INITIAL_BREAK_LENGTH = 5;

    var $SESSION_LENGTH = $("#session-length");
    var $BREAK_LENGTH = $("#break-length");
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

    var startSessionCountdown = function () {
        $CLOCK_TIME.countdown({
            until: sessionLength * 60,
            onExpiry: startBreakCountdown,
            alwaysExpire: true,
            compact: true,
            format: 'MS',
            description: ''
        });
        $("#increment-session").prop('disabled', true);
        $("#decrement-session").prop('disabled', true);
    };

    function startSessionCountdownOnClick() {
        $('#clock').click(function () {
            startSessionCountdown();
        });
    }

    function startBreakCountdown() {
        // reset clock
        $CLOCK_TIME.removeAttr("class");

        $CLOCK_TIME.countdown({
            until: breakLength * 60,
            compact: true,
            format: 'MS',
            description: ''
        });
    }

    this.init = function () {

        $CLOCK_TIME.text(INITIAL_SESSION_LENGTH);
        $SESSION_LENGTH.text(INITIAL_SESSION_LENGTH);
        $BREAK_LENGTH.text(INITIAL_BREAK_LENGTH);

        updateLengthOnClick($("#increment-session"), $SESSION_LENGTH);
        updateLengthOnClick($("#decrement-session"), $SESSION_LENGTH);

        updateLengthOnClick($("#decrement-break"), $BREAK_LENGTH);
        updateLengthOnClick($("#increment-break"), $BREAK_LENGTH);

        startSessionCountdownOnClick();
    };

}
