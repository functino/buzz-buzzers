const nodeHid = require('node-hid');

module.exports = (connectDevice, mapDeviceDataToPressedButtons) => {
    const device = connectDevice(nodeHid);
    return {
        setLeds(states) {
            device.write(
                [0x00, 0x00].concat(
                    states.map(function(state) {
                        return state ? 0xff : 0x00;
                    })
                )
            );
        },
        onChange(callback) {
            device.on('data', function(data) {
                callback(mapDeviceDataToPressedButtons(data));
            });
        },
        onError(callback) {
            device.on('error', callback);
        }
    };
};
