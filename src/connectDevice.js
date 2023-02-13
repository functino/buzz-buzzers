const ids = require('./ids');

function findDeviceByName(nodeHid) {
    const buzzDevice = nodeHid.devices().find(d => d.product.match(/Buzz/));
    return new nodeHid.HID(buzzDevice.vendorId, buzzDevice.productId);
}
module.exports = function(nodeHid) {
    try {
        return new nodeHid.HID(ids.VENDOR_ID, ids.PRODUCT_ID);
    } catch (e) {
        return findDeviceByName(nodeHid);
    }
};
