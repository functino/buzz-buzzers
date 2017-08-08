const test = require('ava');
const sinon = require('sinon');
const createBuzzer = require('../src/buzzer');

const device = {
    onError: sinon.stub(),
    onChange: sinon.stub(),
    setLeds: sinon.spy()
};

function getBuzzer() {
    return createBuzzer(device);
}
function getButtonStates() {
    return [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
    ];
}

test('setLeds', t => {
    const buzzer = getBuzzer();
    buzzer.setLeds(true, false, true, false);
    t.true(device.setLeds.calledWith([true, false, true, false]));
});

test('onChange should register an onChange listener', t => {
    const buzzer = getBuzzer();
    const callback = sinon.spy();
    const buttonStates = getButtonStates();
    buzzer.onChange(callback);

    device.onChange.yield(buttonStates);

    t.pass(device.onChange.calledWith(buttonStates));
});

test('onError should register an error callback', t => {
    const buzzer = getBuzzer();
    const callback = sinon.spy();
    buzzer.onError(callback);

    device.onError.yield('my error');

    t.true(callback.calledWith('my error'));
});

test('onPress should fire when button is pressed', t => {
    const buzzer = getBuzzer();
    const callback = sinon.spy();
    buzzer.onPress(callback);
    const buttonStates = getButtonStates();
    buttonStates[4] = true;

    device.onChange.yield(buttonStates);
    t.true(
        callback.calledWith({
            controller: 1,
            button: 4
        })
    );
});

test('onRelease should fire when button is released', t => {
    const buzzer = getBuzzer();
    const callback = sinon.spy();
    buzzer.onRelease(callback);
    const buttonStates = getButtonStates();
    buttonStates[4] = true;

    device.onChange.yield(buttonStates);
    const newButtonStates = getButtonStates();
    newButtonStates[4] = false;
    device.onChange.yield(newButtonStates);
    t.true(
        callback.calledWith({
            controller: 1,
            button: 4
        })
    );
});

test('removeEventListener should remove added event listeners', t => {
    const buzzer = getBuzzer();
    const callback = sinon.spy();
    buzzer.onChange(callback);
    buzzer.removeEventListener('change', callback);
    const buttonStates = getButtonStates();
    buttonStates[4] = true;

    device.onChange.yield(buttonStates);

    t.is(callback.callCount, 0);
});
