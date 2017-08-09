'use strict';

function Application() {
    var INITIAL_SESSION_TIME = 25;

    var $SESSION_LENGTH = $("#session-length");
    var $CLOCK = $("#clock-time");

    function updateClockTime(lengthElement, newLength) {
        if (lengthElement === $SESSION_LENGTH) {
            $CLOCK.text(newLength);
        }
    }

    function updateLengthOnClick(crementButton, lengthElement) {
        crementButton.click(function () {
            var length = Number(lengthElement.text());
            var newLength = crementButton.val() === "increment" ? ++length : --length;

            lengthElement.text(newLength);

            updateClockTime(lengthElement, newLength);
        })
    }

    function startCountdownOnClick() {
        $('#clock').click(function () {
            $CLOCK.countdown({
                until: 25 * 60,
                compact: true,
                format: 'MS',
                description: ''
            });
        });
    }


    this.init = function () {

        $CLOCK.text(INITIAL_SESSION_TIME);

        var $break = $("#break-length");
        updateLengthOnClick($("#decrement-break"), $break);
        updateLengthOnClick($("#increment-break"), $break);

        updateLengthOnClick($("#increment-session"), $SESSION_LENGTH);
        updateLengthOnClick($("#decrement-session"), $SESSION_LENGTH);

        startCountdownOnClick();
    };
}
