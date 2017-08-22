'use strict';

function playAudio(id) {
    document.getElementById(id).play();
}

function Application() {
    const DISABLED = true;
    const ENABLED = false;

    const SESSION_MODE = "Session";
    const BREAK_MODE = "Break";

    const START = "START";
    const PAUSE = "PAUSE";

    const INITIAL_SESSION_LENGTH_IN_MINUTES = 25;
    const INITIAL_BREAK_LENGTH_IN_MINUTES = 5;

    const LIGHT_GREEN = "#99CC00";
    const RED = "rgb(255, 68, 68)";

    const $INCREMENT_SESSION = $("#increment-session");
    const $DECREMENT_SESSION = $("#decrement-session");
    const $INCREMENT_BREAK = $("#increment-break");
    const $DECREMENT_BREAK = $("#decrement-break");

    const $SESSION_LENGTH = $("#session-length");
    const $BREAK_LENGTH = $("#break-length");

    const $CLOCK_MODE = $("#clock-mode");
    const $CLOCK_TIME = $("#clock-time");

    const $START_PAUSE = $('#start-pause-button');
    const $RESET = $('#reset-button');

    const INCREMENT_BUTTON_VALUE = "increment";
    const DECREMENT_BUTTON_VALUE = "decrement";

    let sessionSecondsLeft = INITIAL_SESSION_LENGTH_IN_MINUTES * 60;
    let breakSecondsLeft = INITIAL_BREAK_LENGTH_IN_MINUTES * 60;

    let countdownRunning = false;
    let countdownId = -1;

    let session = true;

    function addTimeFormatterFunctionToString() {
        String.prototype.formatTime = function() {
            const totalSeconds = parseInt(this, 10);
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = totalSeconds - (minutes * 60);

            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            return minutes + ':' + seconds;
        };
    }

    function updateLengthOnClick(crementButton, lengthElement) {
        crementButton.click(() => {
            if (lengthElement.text() <= 1 && crementButton.val() === DECREMENT_BUTTON_VALUE) {
                return;
            }

            let length = Number(lengthElement.text());
            const newLength = crementButton.val() === INCREMENT_BUTTON_VALUE ? ++length : --length;

            lengthElement.text(newLength);

            const secondsLeft = newLength * 60;
            if (lengthElement === $SESSION_LENGTH) {
                $CLOCK_TIME.text((secondsLeft).toString().formatTime());
                sessionSecondsLeft = secondsLeft;
            } else {
                breakSecondsLeft = secondsLeft;
            }

        })
    }

    function fillClock(color, lengthElement, secondsLeft) {
        const lengthInSeconds = Number(lengthElement.text()) * 60;
        const timeElapsedInSeconds = lengthInSeconds - secondsLeft;
        const percentageOfTimeElapsed = timeElapsedInSeconds / lengthInSeconds * 100;

        $('#clock').css('background',
            `linear-gradient(to top, ${color} ${percentageOfTimeElapsed}%, #333333 0%) bottom`
        )
    }

    function executeCountdown(mode, secondsLeft, alarmId, color, lengthElement) {
        if ($CLOCK_MODE.text() !== mode) {
            $CLOCK_MODE.text(mode);
        }

        if (secondsLeft === 0) {
            playAudio(alarmId);
            clearInterval(countdownId);
            session = !session;
            startCountdown();
        }

        fillClock(color, lengthElement, secondsLeft);

        $CLOCK_TIME.text(secondsLeft.toString().formatTime());
    }

    function startCountdown() {
        countdownId = setInterval(() => {
            if (session) {
                sessionSecondsLeft--;
                executeCountdown(SESSION_MODE, sessionSecondsLeft, "session-alarm", LIGHT_GREEN, $SESSION_LENGTH);
                if (sessionSecondsLeft === 0) {
                    sessionSecondsLeft = $SESSION_LENGTH.text() * 60;
                }
            } else {
                breakSecondsLeft--;
                executeCountdown(BREAK_MODE, breakSecondsLeft, "break-alarm", RED, $BREAK_LENGTH);
                if (breakSecondsLeft === 0) {
                    breakSecondsLeft = $BREAK_LENGTH.text() * 60;
                }
            }

        }, 1000)
    }

    function toggleCrementButtons(isDisabled = DISABLED) {
        const attr = 'disabled';
        $INCREMENT_SESSION.prop(attr, isDisabled);
        $DECREMENT_SESSION.prop(attr, isDisabled);
        $INCREMENT_BREAK.prop(attr, isDisabled);
        $DECREMENT_BREAK.prop(attr, isDisabled);
    }

    function startOrPauseCountdownOnClick() {
        $START_PAUSE.click(() => {
            countdownRunning = !countdownRunning;
            if (countdownRunning) {
                startCountdown();
                toggleCrementButtons();
                $START_PAUSE.text(PAUSE);
            } else {
                clearInterval(countdownId);
                $START_PAUSE.text(START);
            }
        });
    }

    function resetCountdownOnClick() {
        $RESET.click(() => {
            countdownRunning = false;
            clearInterval(countdownId);
            session = true;
            fillClock(LIGHT_GREEN, $SESSION_LENGTH, INITIAL_SESSION_LENGTH_IN_MINUTES * 60);
            toggleCrementButtons(ENABLED);
            sessionSecondsLeft = Number($SESSION_LENGTH.text()) * 60;
            breakSecondsLeft = Number($BREAK_LENGTH.text()) * 60;
            $CLOCK_TIME.text(sessionSecondsLeft.toString().formatTime());
            $START_PAUSE.text(START);
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

        startOrPauseCountdownOnClick();
        resetCountdownOnClick();

    };

    this.setSessionSecondsLeft = (seconds) => {
        sessionSecondsLeft = seconds;
    };

    this.getSessionSecondsLeft = () => {
        return sessionSecondsLeft;
    };

    this.setBreakSecondsLeft = (seconds) => {
        breakSecondsLeft = seconds;
    };

    this.getBreakSecondsLeft = () => {
        return breakSecondsLeft;
    };

    this.setSession = (bool) => {
        session = bool;
    };

    this.isSession = () => {
        return session;
    };

}
