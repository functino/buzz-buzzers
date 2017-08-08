module.exports = (nodeHid, mapDeviceDataToPressedButtons) => {
    const VENDOR_ID = '1356';
    const PRODUCT_ID = '4096';

    const device = new nodeHid.HID(VENDOR_ID, PRODUCT_ID);

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
