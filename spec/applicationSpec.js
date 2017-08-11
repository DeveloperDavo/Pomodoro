'use strict';

describe("application", function () {

    var container, application;

    beforeEach(function () {
        container = fixture(
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
            '<div id="clock">' +
            '<h3 id="clock-mode" class="clock-text"></h3>' +
            '<h3 id="clock-time" class="clock-text"></h3>' +
            '</div>' +
            '<div id="start">' +
            '<button id="start-button" class="btn">START</button>' +
            '</div>' +
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

});

function fixture(html) {
    var div = window.document.createElement('div');
    div.innerHTML = html;
    return div;
}
