// generate powers of two
const p2 = [];
for (let i = 0; i < 32; i++) {
    p2[i] = Math.pow(2, i);
}

function readByte(data) {
    const result = [false, false, false, false, false, false, false, false];
    for (let i = 7; i >= 0; i--) {
        if (data & p2[i]) {
            result[7 - i] = true;
        }
    }
    return result;
}

module.exports = function(data) {
    return Array.from(data).map(d => readByte(d));
};
