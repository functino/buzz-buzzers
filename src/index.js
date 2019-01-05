const buzzer = require('./buzzer');
const device = require('./device');
const connectDevice = require('./connectDevice');
const readBytes = require('./parser/readBytes');
const mapDeviceDataToPressedButtons = require('./parser/mapDeviceDataToPressedButtons')(
    readBytes
);

module.exports = () => buzzer(device(connectDevice, mapDeviceDataToPressedButtons));
