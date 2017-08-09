'use strict';

function Application() {
    var INITIAL_SESSION_LENGTH = 25;
    var INITIAL_BREAK_LENGTH = 5;

    var $SESSION_LENGTH = $("#session-length");
    var $BREAK_LENGTH = $("#break-length");
    var $CLOCK = $("#clock-time");

    var sessionLength = INITIAL_SESSION_LENGTH;

    var INCREMENT_BUTTON_VALUE = "increment";

    function updateClockTime(lengthElement, newLength) {
        if (lengthElement === $SESSION_LENGTH) {
            $CLOCK.text(newLength);
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

    function startCountdownOnClick() {
        $('#clock').click(function () {
            $CLOCK.countdown({
                until: sessionLength * 60,
                compact: true,
                format: 'MS',
                description: ''
            });
            $("#increment-session").prop('disabled', true);
            $("#decrement-session").prop('disabled', true);
        });
    }


    this.init = function () {

        $CLOCK.text(INITIAL_SESSION_LENGTH);
        $SESSION_LENGTH.text(INITIAL_SESSION_LENGTH);
        $BREAK_LENGTH.text(INITIAL_BREAK_LENGTH);

        updateLengthOnClick($("#increment-session"), $SESSION_LENGTH);
        updateLengthOnClick($("#decrement-session"), $SESSION_LENGTH);

        updateLengthOnClick($("#decrement-break"), $BREAK_LENGTH);
        updateLengthOnClick($("#increment-break"), $BREAK_LENGTH);

        startCountdownOnClick();
    };
}
