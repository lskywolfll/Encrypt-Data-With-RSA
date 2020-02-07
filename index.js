const express = require('express');
const app = express();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const cors = require('cors');
// configuraciones de la app express
app.use(bodyParser.json());
app.use(cors());
// Generador De LLaves Publicas Y Privadas
const NodeRSA = require('node-rsa');
const key = new NodeRSA({ b: 1024 });
// La libreria del front para encryptar los datos usa el pkcs1 y tenemos que establecer que nosotros en node-rsa usaremos su mismo mecanismo para poder encryptar y descrifrar jsencrypt
key.setOptions({encryptionScheme: 'pkcs1'});
// Creacion de las llaves
const public_key = key.exportKey('public');
const private_key = key.exportKey('private');
// Valores de las llaves al crearse
console.log('llave publica: \n', public_key);
console.log('llave privada: \n', private_key);
// mensaje a escriptar
const secret = {
    hola:'hola'
}

// const valor_públic_key = `-----BEGIN PUBLIC KEY-----
// MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCGrXqxPchOqgkYnMClqkEFYlI7
// C+ixKWHKqAdySefpt2j15ukty2eGwd9ea1D7p5oY6E1q732Scrnqy5G4nkib0qdU
// rJUrgENVQj97V6r/VsUk9F+v2H8QUkmAS2QB9M7bkRPNNpv7p4ehSu0Wo0CK1Wh0
// TT4jkH6DZMCRHxhs3QIDAQAB
// -----END PUBLIC KEY-----`;
// const valor_private_key = `-----BEGIN RSA PRIVATE KEY-----
// MIICXQIBAAKBgQCGrXqxPchOqgkYnMClqkEFYlI7C+ixKWHKqAdySefpt2j15ukt
// y2eGwd9ea1D7p5oY6E1q732Scrnqy5G4nkib0qdUrJUrgENVQj97V6r/VsUk9F+v
// 2H8QUkmAS2QB9M7bkRPNNpv7p4ehSu0Wo0CK1Wh0TT4jkH6DZMCRHxhs3QIDAQAB
// AoGAC8NDIA/hWt2HBdtLCC0imLHJtNaJcE/I9sZOQDEsTEF0rWWJoDJPzHlKZRjC
// bfhpgRtpB5n7Qbs7ecJl69YHSVRNL9xUYeLYCoxdYEp/DqMyynNCEJBD6Z5h/fwg
// tEqKvHJRftAqLOGIpYnly/koDrVmjgS7UZ5W41wMyANmEgECQQDHEl7u5kBosJMj
// eet+BsZ1EKafPoDSU5lpwXS4KuMvxkztkNnYywB6kvR3+E5y79XezmQYH3mLgeN0
// Z7DsZN4hAkEArTDzKygcUrOc5EayBmUFcArTkwErV4vOG1ryb1LcynGdQtImoqWk
// PsbrUuV9/mblYP0EykJWlHBLXlyhN/mfPQJAY1x5A9brGRXhKxjkgK/TCIU6FUu2
// MsTFUvLbVj0ZzjO1G/JruXiBkayd1u+aAGZTInVzolK7cPVw2R4UQbmK4QJBAKdu
// JBc7rq3xACLbiW2PKgOYI9QBFGKNQJLHiIpAxDxeO9cGjN0+XxtleMhqHjTcSrJJ
// yOCz4zmbmfE+gYk4pE0CQQCMku0ulZSYlvNO9hdGegBkb55sJBEPrWEkN44mo75j
// aMD9JjK/6cmRLObAPuMcU2Mi/HN95CYDZADkycfoTZrk
// -----END RSA PRIVATE KEY-----`;
// // creacion de llaves publicas y privadas con datos ya poseidos
// const public_key_rsa = new NodeRSA(valor_públic_key);
// const private_key_rsa = new NodeRSA(valor_private_key);
// // La libreria del front para encryptar los datos usa el pkcs1 y tenemos que establecer que nosotros en node-rsa usaremos su mismo mecanismo para poder encryptar y descrifrar
// public_key_rsa.setOptions({encryptionScheme: 'pkcs1'});
// private_key_rsa.setOptions({encryptionScheme: 'pkcs1'});

// // encryptamiento por la llave publica
// const encryptMessage = public_key_rsa.encrypt(secret, 'base64');
// console.log('mensaje encryptado: ', encryptMessage);
// // desencriptar por llave privada
// const descriptionMessage = private_key_rsa.decrypt(encryptMessage, 'utf8');
// console.log('Secreto desencriptado: ', descriptionMessage);
// console.log(JSON.parse(descriptionMessage).hola);

app.post('/Verificar', (req, res) => {
    console.log(req.body);
    const keyvalue = req.body.data;
    const descriptionMessage = private_key_rsa.decrypt(keyvalue, 'utf8');
    console.log(descriptionMessage);
    console.log('Valor enviado encryptado: ', JSON.parse(descriptionMessage));

    res.status(200).json({
        data: req.body.data,
        descencrypted: JSON.parse(descriptionMessage)
    })
});

server.listen(3001, () => {
    console.log(`server listening in http://localhost:${server.address().port}`);
});