const nodeHid = require('node-hid');
const ids = require('./ids');
const buzzer = require('./buzzer');
const device = require('./device');
const connectDevice = require('./connectDevice');
const readBytes = require('./parser/readBytes');
const mapDeviceDataToPressedButtons = require('./parser/mapDeviceDataToPressedButtons')(
    readBytes
);

module.exports = (singleMode = true) => {
    if (singleMode) {
        return buzzer(device(connectDevice, mapDeviceDataToPressedButtons));
    }
    const buzzers = [];
    const devices = nodeHid.devices();
    const buzzDevices = devices.filter(d => d.vendorId === ids.VENDOR_ID && d.productId === ids.PRODUCT_ID);
    buzzDevices.forEach(bd => {
        buzzers.push(buzzer(device(() => new nodeHid.HID(bd.path), mapDeviceDataToPressedButtons)));
    });
    return buzzers;
};
