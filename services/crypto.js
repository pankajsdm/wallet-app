const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const password = 'iReminder@2020@)}@%F';
exports.decryptString = function (text) {
    let decipher = crypto.createDecipher(algorithm, password)
    let dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;

};
exports.encryptString = function (text) {
    let cipher = crypto.createCipher(algorithm, password)
    let crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}
