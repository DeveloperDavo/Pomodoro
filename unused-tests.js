    it('should not update clock time when break length is incremented', function () {
        application.init();

        document.getElementById('clock-time').innerHTML = "25";

        document.getElementById('break-length').innerHTML = "5";
        document.getElementById('increment-break').click();

        expect(document.getElementById('clock-time').innerHTML).toEqual('25');
    });

    it('should display break mode when session is over', function () {
        application.init();

        document.getElementById('session-length').innerHTML = "1";
        document.getElementById('decrement-session').click();

        document.getElementById('clock').click();

        expect(document.getElementById('clock-mode').innerHTML).toEqual("BREAK");
    });


