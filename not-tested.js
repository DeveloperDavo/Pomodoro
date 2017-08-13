    it('should not update clock time when break length is incremented', function () {
        application.init();

        document.getElementById('clock-time').innerHTML = "25";

        document.getElementById('break-length').innerHTML = "5";
        document.getElementById('increment-break').click();

        expect(document.getElementById('clock-time').innerHTML).toEqual('25');
    });

    it('should fill the clock with light green while session is running', function (done) {
        application.init();
        document.getElementById('session-length').innerHTML = "2";
        document.getElementById('decrement-session').click();

        document.getElementById('start-pause-button').click();
        setTimeout(function () {
            console.log(document.getElementById('clock').style.backgroundColor);
            done();
        }, 1000);

    });

// TODO: should empty the fill upon clicking reset
// TODO: should not have multiple countdowns running
// TODO: should play alarm when session is over
// TODO: should fill the clock with red while break is running
// TODO: should play alarm at end of session
// TODO: should play alarm at end of break

