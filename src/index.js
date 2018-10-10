const buzzer = require('./buzzer');
const device = require('./device');
const nodeHid = require('node-hid');
const readBytes = require('./parser/readBytes');
const mapDeviceDataToPressedButtons = require('./parser/mapDeviceDataToPressedButtons')(
    readBytes
);

module.exports = (options = {}) => {
    return buzzer(device(nodeHid, mapDeviceDataToPressedButtons), options);
};
