    function fillClock(color, percentage) {
        $('#clock').css('background', 'linear-gradient(to top, ' + color + ' ' + percentage + '%, #333333 0%) bottom')
    }

function startCountdown(color) {
        var countdown = setInterval(function () {
            if (!isCountdownRunning) {
                clearInterval(countdown);
                return;
            }
            sessionSecondsLeft--;

            if (sessionSecondsLeft === 0) {
                // startBreakCountdown();
                clearInterval(countdown);
                $CLOCK_TIME.text(breakLengthInMinutes.toString().formatTime());
                fillClock(color, 0);
                return;
            }

            var sessionLengthInSeconds = sessionLengthInMinutes * 60;
            var timeElapsedInSeconds = sessionLengthInSeconds - sessionSecondsLeft;
            var percentageOfTimeElapsed = timeElapsedInSeconds / sessionLengthInSeconds * 100;

            fillClock(color, percentageOfTimeElapsed);

            $CLOCK_TIME.text(sessionSecondsLeft.toString().formatTime());
        }, 1000);
    }

    function startBreakCountdown() {
        $CLOCK_MODE.text(BREAK_MODE);
        startCountdown("rgb(255, 68, 68)");
    }

    function resetCountdownOnClick() {
        $RESET.click(function () {
            isCountdownRunning = false;
            fillClock(LIGHT_GREEN, 0);
            toggleCrementButtons(ENABLED);
            $CLOCK_TIME.text((sessionLengthInMinutes * 60).toString().formatTime());
            $START_PAUSE.text(START);
        });
    }

