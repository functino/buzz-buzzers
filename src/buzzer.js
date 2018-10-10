module.exports = (device, options) => {
    let previousStates = [
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

    function indexToObject(index) {
        const controller = Math.floor(index / 5);
        return {
            controller: controller + 1,
            button: index - controller * 5
        };
    }

    function addEventListener(type, callback) {
        listeners[type].push(callback);
    }

    function triggerEvent(eventType, payload) {
        listeners[eventType].forEach(listener => listener(payload));
    }
    const EVENTS = {
        PRESS: 'press',
        RELEASE: 'release',
        ERROR: 'error',
        CHANGE: 'change'
    };

    const listeners = {
        [EVENTS.PRESS]: [],
        [EVENTS.RELEASE]: [],
        [EVENTS.CHANGE]: [],
        [EVENTS.ERROR]: []
    };

    function sendKeepAlive() {
        try {
            console.log('sending....');
            device.setLeds([false, false, false, false]);
        } catch (e) {
            // older versions don't have an led
        }
    }
    sendKeepAlive();

    let keepAliveTimeout = null;

    function resetKeepAlive() {
        if (!options.keepAlive) {
            return;
        }
        clearTimeout(keepAliveTimeout);
        keepAliveTimeout = setTimeout(function() {
            sendKeepAlive();
            resetKeepAlive();
        }, 1000 * 60 * 19);
    }
    resetKeepAlive();

    device.onChange(function(states) {
        resetKeepAlive();
        states.forEach((state, index) => {
            const previousState = previousStates[index];
            if (state !== previousState) {
                const eventType = state ? EVENTS.PRESS : EVENTS.RELEASE;
                triggerEvent(eventType, indexToObject(index));
            }
        });
        triggerEvent(EVENTS.CHANGE, states);
        previousStates = states;
    });

    device.onError(function(err) {
        triggerEvent(EVENTS.ERROR, err);
    });

    return {
        setLeds(...states) {
            try {
                resetKeepAlive();
                device.setLeds(states);
            } catch (e) {
                triggerEvent(
                    EVENTS.ERROR,
                    'could not set led status. Older versions of the buzz buzzers do not support this.'
                );
            }
        },
        onChange: addEventListener.bind(this, EVENTS.CHANGE),
        onPress: addEventListener.bind(this, EVENTS.PRESS),
        onRelease: addEventListener.bind(this, EVENTS.RELEASE),
        onError: addEventListener.bind(this, EVENTS.ERROR),
        removeEventListener(type, callback) {
            listeners[type] = listeners[type].filter(function(listener) {
                return listener !== callback;
            });
        }
    };
};
