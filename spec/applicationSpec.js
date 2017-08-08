'use strict';

describe("application", function () {

    var container, application;

    beforeEach(function () {
        container = fixture(
            '<button id="decrement-break">&minus;</button>' +
            '<span id="break-length">5</span>' +
            '<button id="increment-break">+</button>' +
            '<button id="decrement-session">&minus;</button>' +
            '<span id="session-length">25</span>' +
            '<button id="increment-session">+</button>' +
            '<h3 id="clock-time">24:59</h3>'
        );
        document.body.appendChild(container);
        application = new Application(document);
    });

    afterEach(function () {
        document.body.removeChild(container);
    });

    it('should increment break break length by 1', function () {
        application.init();
        var breakLengthElement = document.getElementById('break-length');
        breakLengthElement.innerHTML = "5";

        document.getElementById('increment-break').click();

        expect(breakLengthElement.innerHTML).toEqual('6');
    });

    it('should increment break length by 2', function () {
        application.init();
        var breakLengthElement = document.getElementById('break-length');
        breakLengthElement.innerHTML = "5";

        document.getElementById('increment-break').click();
        document.getElementById('increment-break').click();

        expect(breakLengthElement.innerHTML).toEqual('7');
    });

    it('should decrement break length', function () {
        application.init();
        var breakLengthElement = document.getElementById('break-length');
        breakLengthElement.innerHTML = "5";

        document.getElementById('decrement-break').click();

        expect(breakLengthElement.innerHTML).toEqual('4');

        document.getElementById('decrement-break').click();

        expect(breakLengthElement.innerHTML).toEqual('3');
    });

    it('should increment session length by 1', function () {
        application.init();

        var sessionLengthElement = document.getElementById('session-length');
        sessionLengthElement.innerHTML = "25";

        document.getElementById('increment-session').click();

        expect(sessionLengthElement.innerHTML).toEqual('26');
    });

    it('should increment session length by 2', function () {
        application.init();

        var sessionLengthElement = document.getElementById('session-length');
        sessionLengthElement.innerHTML = "25";

        document.getElementById('increment-session').click();
        document.getElementById('increment-session').click();

        expect(sessionLengthElement.innerHTML).toEqual('27');
    });

    it('should decrement session length', function () {
        application.init();
        var sessionLengthElement = document.getElementById('session-length');
        sessionLengthElement.innerHTML = "25";

        document.getElementById('decrement-session').click();

        expect(sessionLengthElement.innerHTML).toEqual('24');

        document.getElementById('decrement-session').click();

        expect(sessionLengthElement.innerHTML).toEqual('23');
    });

    it('should update clock time to show session length', function () {
        application.init();

        document.getElementById('session-length').innerHTML = "25";
        document.getElementById('increment-session').click();

        expect(document.getElementById('clock-time').innerHTML).toEqual('26');
    });

});

function fixture(html) {
    var div = window.document.createElement('div');
    div.innerHTML = html;
    return div;
}
