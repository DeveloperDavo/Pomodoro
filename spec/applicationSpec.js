'use strict';

describe("application", function () {

    var container, application;

    beforeEach(function () {
        container = fixture(
            '<audio id="session-alarm">' +
            '<source src="media/alarm.mp3" type="audio/mpeg">' +
            '</audio>' +
            '<div class="container">' +
            '<div class="length-setter" id="break-length-setter"> ' +
            '<h5>BREAK LENGTH</h5>' +
            '<button id="decrement-break" value="decrement" class="crement-button">&minus;</button>' +
            '<span id="break-length"></span>' +
            '<button id="increment-break" value="increment" class="crement-button">+</button>' +
            '</div>' +
            '<div class="length-setter" id="session-length-setter">' +
            '<h5>SESSION LENGTH</h5>' +
            '<button id="decrement-session" value="decrement" class="crement-button">&minus;</button>' +
            '<span id="session-length"></span>' +
            '<button id="increment-session" value="increment" class="crement-button">+</button>' +
            '</div>' +
            '<div id="clock-border">' +
            '<div id="clock">' +
            '<h3 id="clock-mode" class="clock-text"></h3>' +
            '<h3 id="clock-time" class="clock-text"></h3>' +
            '</div>' +
            '</div>' +
            '<div id="clock-buttons">' +
            '<button id="start-pause-button" class="clock-button"></button>' +
            '<button id="reset-button" class="clock-button">RESET</button>' +
            '</div>' +
            '' +
            '</div>'
        );
        document.body.appendChild(container);
        application = new Application(document);
    });

    afterEach(function () {
        document.body.removeChild(container);
    });

    it('should display an initial session length of 25', function () {
        application.init();

        expect(document.getElementById('session-length').innerHTML).toEqual('25');
    });

    it('should increment session length by 1', function () {
        application.init();

        document.getElementById('session-length').innerHTML = "25";

        document.getElementById('increment-session').click();

        expect(document.getElementById('session-length').innerHTML).toEqual('26');
    });

    it('should increment session length by 2', function () {
        application.init();

        document.getElementById('increment-session').click();
        document.getElementById('increment-session').click();

        expect(document.getElementById('session-length').innerHTML).toEqual('27');
    });

    it('should decrement session length', function () {
        application.init();
        document.getElementById('session-length').innerHTML = "25";

        document.getElementById('decrement-session').click();

        expect(document.getElementById('session-length').innerHTML).toEqual('24');

        document.getElementById('decrement-session').click();

        expect(document.getElementById('session-length').innerHTML).toEqual('23');
    });

    it('should increment break length by 1', function () {
        application.init();
        document.getElementById('break-length').innerHTML = "5";

        document.getElementById('increment-break').click();

        expect(document.getElementById('break-length').innerHTML).toEqual('6');
    });

    it('should increment break length by 2', function () {
        application.init();
        document.getElementById('break-length').innerHTML = "5";

        document.getElementById('increment-break').click();
        document.getElementById('increment-break').click();

        expect(document.getElementById('break-length').innerHTML).toEqual('7');
    });

    it('should decrement break length', function () {
        application.init();
        document.getElementById('break-length').innerHTML = "5";

        document.getElementById('decrement-break').click();

        expect(document.getElementById('break-length').innerHTML).toEqual('4');

        document.getElementById('decrement-break').click();

        expect(document.getElementById('break-length').innerHTML).toEqual('3');
    });

    it('should not decrement if length is 1', function () {
        application.init();
        document.getElementById('break-length').innerHTML = "1";

        document.getElementById('decrement-break').click();

        expect(document.getElementById('break-length').innerHTML).toEqual('1');
    });

    it('should display session mode upon initialisation', function () {
        application.init();

        expect(document.getElementById('clock-mode').innerHTML).toEqual("Session");
    });

    it('should display a clock time of 25:00 upon initialisation', function () {
        application.init();

        expect(document.getElementById('clock-time').innerHTML).toEqual('25:00');
    });

    it('should update clock time when session length is incremented by 1', function () {
        application.init();

        document.getElementById('session-length').innerHTML = "25";
        document.getElementById('increment-session').click();

        expect(document.getElementById('clock-time').innerHTML).toEqual('26:00');
    });

    it('should update clock time when session length is incremented by 2', function () {
        application.init();

        document.getElementById('session-length').innerHTML = "25";
        document.getElementById('increment-session').click();
        document.getElementById('increment-session').click();

        expect(document.getElementById('clock-time').innerHTML).toEqual('27:00');
    });

    it('should update break time when crementing break length', function () {
        application.init();

        document.getElementById('break-length').innerHTML = "4";
        document.getElementById('increment-break').click();

        expect(application.getBreakSecondsLeft()).toEqual(5 * 60);

        document.getElementById('decrement-break').click();

        expect(application.getBreakSecondsLeft()).toEqual(4 * 60);

    });

    it('should not update session length when incrementing after the countdown has started', function () {
        application.init();
        document.getElementById('start-pause-button').click();

        document.getElementById('increment-session').click();

        expect(document.getElementById('session-length').innerHTML).toEqual('25');
    });

    it('should not update session length when decrementing after the countdown has started', function () {
        application.init();
        document.getElementById('start-pause-button').click();

        document.getElementById('decrement-session').click();

        expect(document.getElementById('session-length').innerHTML).toEqual('25');
    });

    it('should not update break length when incrementing after the countdown has started', function () {
        application.init();
        document.getElementById('start-pause-button').click();

        document.getElementById('increment-break').click();

        expect(document.getElementById('break-length').innerHTML).toEqual('5');
    });

    it('should not update break length when decrementing after the countdown has started', function () {
        application.init();
        document.getElementById('start-pause-button').click();

        document.getElementById('decrement-break').click();

        expect(document.getElementById('break-length').innerHTML).toEqual('5');
    });

    it('should display start button upon initialisation', function () {
        application.init();

        expect(document.getElementById('start-pause-button').innerHTML).toEqual('START');
    });

    it('should display pause button when countdown starts', function () {
        application.init();

        document.getElementById('start-pause-button').click();

        expect(document.getElementById('start-pause-button').innerHTML).toEqual('PAUSE');
    });

    it('should display start button when paused', function () {
        application.init();

        document.getElementById('start-pause-button').click();
        document.getElementById('start-pause-button').click();

        expect(document.getElementById('start-pause-button').innerHTML).toEqual('START');
    });

    it('should show start button after resetting', function () {
        application.init();

        document.getElementById('start-pause-button').click();
        document.getElementById('reset-button').click();

        document.getElementById('increment-session').click();

        expect(document.getElementById('session-length').innerHTML).toEqual('26');

    });

    it('should enable crement buttons after resetting', function () {
        application.init();

        document.getElementById('start-pause-button').click();
        document.getElementById('reset-button').click();

        expect(document.getElementById('start-pause-button').innerHTML).toEqual('START');
    });

    it('should start countdown upon clicking start', function (done) {
        application.init();
        document.getElementById('session-length').innerHTML = "21";
        document.getElementById('decrement-session').click();

        document.getElementById('start-pause-button').click();

        setTimeout(function () {
            expect(document.getElementById('clock-time').innerHTML).toEqual('19:59');
            done();
        }, 1000);
    });

    it('should pause countdown upon clicking pause', function (done) {
        application.init();
        document.getElementById('session-length').innerHTML = "21";
        document.getElementById('increment-session').click();

        document.getElementById('start-pause-button').click();

        setTimeout(function () {
            document.getElementById('start-pause-button').click();
            setTimeout(function () {
                expect(document.getElementById('clock-time').innerHTML).toEqual('21:59');
                done();
            }, 1000);
        }, 1000);

    });

    it('should continue countdown after pausing', function (done) {
        application.init();

        document.getElementById('session-length').innerHTML = "16";
        document.getElementById('decrement-session').click();

        // start
        document.getElementById('start-pause-button').click();

        setTimeout(function () {
            // pause
            document.getElementById('start-pause-button').click();
            // start
            document.getElementById('start-pause-button').click();
            expect(document.getElementById('clock-time').innerHTML).toEqual('14:59');
            setTimeout(function () {
                expect(document.getElementById('clock-time').innerHTML).toEqual('14:58');
                // pause
                document.getElementById('start-pause-button').click();
                expect(document.getElementById('clock-time').innerHTML).toEqual('14:58');
                done()
            }, 1500);
        }, 1000);
    });

    it('should stop countdown upon reset', function (done) {
        application.init();
        document.getElementById('session-length').innerHTML = "1";
        document.getElementById('increment-session').click();

        document.getElementById('start-pause-button').click();

        setTimeout(function () {
            document.getElementById('reset-button').click();
            setTimeout(function () {
                expect(document.getElementById('clock-time').innerHTML).toEqual('02:00');
                done();
            }, 1000);
        }, 1000);

    });

    it('should not continue countdown after resetting', function (done) {
        application.init();
        document.getElementById('session-length').innerHTML = "4";
        document.getElementById('increment-session').click();

        document.getElementById('start-pause-button').click();

        setTimeout(function () {
            expect(document.getElementById('clock-time').innerHTML).toEqual('04:59');
            document.getElementById('reset-button').click();
            expect(document.getElementById('clock-time').innerHTML).toEqual('05:00');
            document.getElementById('start-pause-button').click();
            setTimeout(function () {
                expect(document.getElementById('clock-time').innerHTML).toEqual('05:00');
                done();
            }, 500);
        }, 1000);
    });

    it('should be able to display a clock time of of 60 minutes', function () {
        application.init();

        document.getElementById('session-length').innerHTML = "59";

        document.getElementById('increment-session').click();

        expect(document.getElementById('clock-time').innerHTML).toEqual('60:00');
    });

    it('should call playAudio when session is over', function (done) {
        application.init();

        application.setSessionSecondsLeft(1);

        spyOn(window, 'playAudio');

        document.getElementById('start-pause-button').click();

        setTimeout(function () {
            expect(playAudio).toHaveBeenCalledWith('session-alarm');
            done();
        }, 1000);
    });

    it('should display clock time of 00:00 when session is over', function (done) {
        application.init();

        application.setSessionSecondsLeft(1);

        spyOn(window, 'playAudio');

        document.getElementById('start-pause-button').click();

        setTimeout(function () {
            expect(document.getElementById('clock-time').innerHTML).toEqual('00:00');
            done();
        }, 1000);
    });

    it('should display break mode and time 1 second after session is over', function (done) {
        application.init();

        application.setSessionSecondsLeft(1);

        spyOn(window, 'playAudio');

        document.getElementById('start-pause-button').click();

        setTimeout(function () {
            expect(document.getElementById('clock-mode').innerHTML).toEqual('Break');
            expect(document.getElementById('clock-time').innerHTML).toEqual('04:59');
            done();
        }, 2500);

    });

    it('should reset break and session mode', function () {
        application.init();

        application.setSessionSecondsLeft(0);
        application.setBreakSecondsLeft(34);
        application.setSession(false);

        document.getElementById('reset-button').click();
        expect(application.isSession()).toEqual(true);
        expect(application.getSessionSecondsLeft()).toEqual(25 * 60);
        expect(application.getBreakSecondsLeft()).toEqual(5 * 60);
    });

    it('should call playAudio when session is over', function (done) {
        application.init();

        application.setSession(false);
        application.setBreakSecondsLeft(1);

        spyOn(window, 'playAudio');

        document.getElementById('start-pause-button').click();

        setTimeout(function () {
            expect(playAudio).toHaveBeenCalledWith('break-alarm');
            done();
        }, 1000);
    });

    it('should display clock time of 00:00 when break is over', function (done) {
        application.init();

        application.setSession(false);
        application.setBreakSecondsLeft(1);

        spyOn(window, 'playAudio');

        document.getElementById('start-pause-button').click();

        setTimeout(function () {
            expect(document.getElementById('clock-time').innerHTML).toEqual('00:00');
            done();
        }, 1000);
    });

    it('should display session mode and time 1 second after break is over', function (done) {
        application.init();

        application.setSession(false);
        application.setBreakSecondsLeft(1);

        spyOn(window, 'playAudio');

        document.getElementById('start-pause-button').click();

        setTimeout(function () {
            expect(document.getElementById('clock-mode').innerHTML).toEqual('Session');
            expect(document.getElementById('clock-time').innerHTML).toEqual('24:59');
            done();
        }, 2500);

    });

    it('should reset time left of session after session is over', function (done) {
        application.init();
        application.setSessionSecondsLeft(1);

        spyOn(window, 'playAudio');

        document.getElementById('start-pause-button').click();

        setTimeout(function () {
            expect(application.getSessionSecondsLeft()).toEqual(25 * 60);
            done();
        }, 1000);
    });

    it('should reset time left of break after break is over', function (done) {
        application.init();

        application.setSession(false);
        application.setBreakSecondsLeft(1);

        spyOn(window, 'playAudio');

        document.getElementById('start-pause-button').click();

        setTimeout(function () {
            expect(application.getBreakSecondsLeft()).toEqual(5 * 60);
            done();
        }, 1000);
    });

});

function fixture(html) {
    var div = window.document.createElement('div');
    div.innerHTML = html;
    return div;
}
