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
        }, 1000);

        setTimeout(function () {
            expect(document.getElementById('clock-time').innerHTML).toEqual('14:58');
            // pause
            document.getElementById('start-pause-button').click();
            expect(document.getElementById('clock-time').innerHTML).toEqual('14:58');
            done()
        }, 2000);
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
            }, 1000);
        }, 1000);
    });

    it('should not update clock time when break length is incremented', function () {
        application.init();

        document.getElementById('clock-time').innerHTML = "25";

        document.getElementById('break-length').innerHTML = "5";
        document.getElementById('increment-break').click();

        expect(document.getElementById('clock-time').innerHTML).toEqual('25');
    });

    it('should fill the clock with light green while countdown is running', function (done) {
        application.init();
        document.getElementById('session-length').innerHTML = "2";
        document.getElementById('decrement-session').click();

        document.getElementById('start-pause-button').click();
        setTimeout(function () {
            console.log(document.getElementById('clock').style.backgroundColor);
            done();
        }, 1000);

    });

