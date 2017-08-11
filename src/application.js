'use strict';

function Application() {
    var SESSION_MODE = "Session";

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

    var INCREMENT_BUTTON_VALUE = "increment";

    function updateLengthOnClick(crementButton, lengthElement) {
        crementButton.click(function () {
            var length = Number(lengthElement.text());
            var newLength = crementButton.val() === INCREMENT_BUTTON_VALUE ? ++length : --length;

            lengthElement.text(newLength);

        })
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

    };

}
