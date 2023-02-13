// this line would be require('buzz-buzzers'); for you
const buzzBuzzers = require('../src/index');

const buzzers = buzzBuzzers(false);

console.info(`${buzzers.length} buzzers found`);

function blinkBuzzerLeds() {
    setInterval(function() {
        console.info('setInterval 5000');
        buzzers.forEach(dongle => {
            dongle.setLeds(true, true, true, true);
        });
        setTimeout(function() {
            console.info('setTimeout 500');
            buzzers.forEach(dongle => {
                dongle.setLeds(false, false, false, false);
            });
        }, 500);
    }, 5000);
}

buzzers.forEach((dongle, idx) => {
    dongle.onError(function(err) {
        console.log(`Error on dongle #${idx}: ${err}`);
    });

    dongle.onPress(function(ev) {
        console.log(`Dongle #${idx} PRESSED: { "Controller": ${ev.controller}, "Button": ${ev.button} }`);
    });
});


blinkBuzzerLeds();

