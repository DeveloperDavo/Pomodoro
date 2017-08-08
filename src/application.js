'use strict';

function Application() {
    var DECREMENT = false;
    var INCREMENT = true;

    var $SESSION_LENGTH = $("#session-length");

    function updateClockTime(lengthElement, newLength) {
        if (lengthElement === $SESSION_LENGTH) {
            $("#clock-time").text(newLength);
        }
    }

    function updateLengthOnClick(crementButton, lengthElement, isIncrement) {
        crementButton.click(function () {
            var length = Number(lengthElement.text());
            var newLength = isIncrement ? length + 1 : length - 1;

            lengthElement.text(newLength);

            updateClockTime(lengthElement, newLength);
        })
    }

    this.init = function () {

        var $break = $("#break-length");
        updateLengthOnClick($("#decrement-break"), $break, DECREMENT);
        updateLengthOnClick($("#increment-break"), $break, INCREMENT);

        updateLengthOnClick($("#increment-session"), $SESSION_LENGTH, INCREMENT);
        updateLengthOnClick($("#decrement-session"), $SESSION_LENGTH, DECREMENT);
    };
}
