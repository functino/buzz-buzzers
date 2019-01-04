module.exports = (nodeHid, mapDeviceDataToPressedButtons) => {

    const buzzDevice = nodeHid.devices().find(device => device.product.match(/Buzz/));
    const device = new nodeHid.HID(buzzDevice.vendorId, buzzDevice.productId);

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
