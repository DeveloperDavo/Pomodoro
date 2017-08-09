'use strict';

function Application() {
    var INITIAL_SESSION_LENGTH = 25;

    var $SESSION_LENGTH = $("#session-length");
    var $CLOCK = $("#clock-time");

    var sessionLength = INITIAL_SESSION_LENGTH;

    function updateClockTime(lengthElement, newLength) {
        if (lengthElement === $SESSION_LENGTH) {
            $CLOCK.text(newLength);
        }
    }

    function updateLengthOnClick(crementButton, lengthElement) {
        crementButton.click(function () {
            var length = Number(lengthElement.text());
            sessionLength = crementButton.val() === "increment" ? ++length : --length;

            lengthElement.text(sessionLength);

            updateClockTime(lengthElement, sessionLength);
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
        });
    }


    this.init = function () {

        $CLOCK.text(INITIAL_SESSION_LENGTH);
        $SESSION_LENGTH.text(INITIAL_SESSION_LENGTH);

        var $break = $("#break-length");
        updateLengthOnClick($("#decrement-break"), $break);
        updateLengthOnClick($("#increment-break"), $break);

        updateLengthOnClick($("#increment-session"), $SESSION_LENGTH);
        updateLengthOnClick($("#decrement-session"), $SESSION_LENGTH);

        startCountdownOnClick();
    };
}
