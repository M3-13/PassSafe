const CryptoJS = require("crypto-js");

class HashTools{

    passphrase: string = "secret"

    encrypt(message: string){
        return CryptoJS.AES.encrypt(message, this.passphrase).toString()
    }

    decrypt(message: string){
        var bytes = CryptoJS.AES.decrypt(message, this.passphrase)
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText;
    }

}

const hashTools = new HashTools();
export default hashTools;