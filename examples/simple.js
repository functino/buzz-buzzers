const buzzBuzzers = require('../src/index');

const buzzers = buzzBuzzers();

function blinkBuzzerLeds() {
    setInterval(function() {
        buzzers.setLeds(true, true, true, true);
        setTimeout(function() {
            buzzers.setLeds(false, false, false, false);
        }, 500);
    }, 5000);
}

blinkBuzzerLeds();
buzzers.onError(function(err) {
    console.log('Error:', err);
});

buzzers.onPress(function(ev) {
    console.log(
        `PRESSED: { "Controller": ${ev.controller}, "Button": ${ev.button} }`
    );
});

buzzers.onRelease(function(ev) {
    console.log(
        `RELEASED: { "Controller": ${ev.controller}, "Button": ${ev.button} }`
    );
});

buzzers.onChange(function(ev) {
    console.log(`CHANGED: ${ev}`);
});
