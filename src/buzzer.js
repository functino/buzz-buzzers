module.exports = device => {
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

    device.setLeds([false, false, false, false]);

    device.onChange(function(states) {
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
            device.setLeds(states);
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
