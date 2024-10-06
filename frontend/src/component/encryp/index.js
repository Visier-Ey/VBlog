function encrypt(text, key) {
    // convert text to binary
    let binaryText = '';
    for (let i = 0; i < key.length; i++) {
        binaryText += key[i].charCodeAt(0).toString(2).padStart(8, '0');
    }
    // convert binary to encrypted text
    let encryptedText = '';
    for (let i = 0; i < binaryText.length; i++) {
        if (binaryText[i] === '1') {
            encryptedText += String.fromCharCode(0x200B);
        } else {
            encryptedText += String.fromCharCode(0x200C);
        }
    }
    return text + encryptedText;
}


function decrypt(encryptedText) {
    // decode encrypted text to binary
    let binaryText = '';
    for (let i = 0; i < encryptedText.length; i++) {
        if (encryptedText[i].charCodeAt(0) === 0x200B) {
            binaryText += '1';
        } else if (encryptedText[i].charCodeAt(0) === 0x200C) {
            binaryText += '0';
        }
        else {
            binaryText += encryptedText[i].charCodeAt(0).toString(2).padStart(8, '0');
        }
    }
    // decode binary text to original text
    let decryptedText = '';
    for (let i = 0; i < binaryText.length; i += 8) {
        decryptedText += String.fromCharCode(parseInt(binaryText.substr(i, 8), 2));
    }
    return decryptedText;
}

export {encrypt, decrypt};