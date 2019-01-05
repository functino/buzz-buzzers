function findDeviceByName(nodeHid) {
    const buzzDevice = nodeHid.devices().find(d => d.product.match(/Buzz/));
    return new nodeHid.HID(buzzDevice.vendorId, buzzDevice.productId);
}
module.exports = function(nodeHid) {
    const VENDOR_ID = '1356';
    const PRODUCT_ID = '4096';
    try {
        return new nodeHid.HID(VENDOR_ID, PRODUCT_ID);
    } catch (e) {
        return findDeviceByName(nodeHid);
    }
};
