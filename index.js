const express = require('express');
const app = express();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
// Generador De LLaves Publicas Y Privadas
const NodeRSA = require('node-rsa');
const key = new NodeRSA({ b: 1024 });
// const public_key = key.exportKey('public');
// const private_key = key.exportKey('private');

// console.log('llave publica: \n', public_key);
// console.log('llave privada: \n', private_key);
// mensaje a escriptar
const secret = ' hola';

const valor_públic_key = ` -----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDFNtc8kG2PYBz4IgBl3KK8cLvM
zrRxZ4aTGNUEdOxEGhvJIfC3tzi+zc2PuEtoNPkh3T0uDOrq6KH8wX3Fh0+UBIKh
h3BlNyQEMLRmqOeJjSIdx408xGUHvtD9x69DUA9YwhxOfdeFqQzXhhjgYPiITlUA
a07xXumzwUoOESLTDQIDAQAB
-----END PUBLIC KEY-----`;
const valor_private_key = ` -----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQDFNtc8kG2PYBz4IgBl3KK8cLvMzrRxZ4aTGNUEdOxEGhvJIfC3
tzi+zc2PuEtoNPkh3T0uDOrq6KH8wX3Fh0+UBIKhh3BlNyQEMLRmqOeJjSIdx408
xGUHvtD9x69DUA9YwhxOfdeFqQzXhhjgYPiITlUAa07xXumzwUoOESLTDQIDAQAB
AoGAYid7VK9leBiUEoOJwyje7f8F2Vd/w3mNJyUS0FcJSJPeBGsaDbXpTj3L8538
Ge9Tl6EvU/4l5ajHBq+e03MXDWlorutG1Vg+BQVACiOvkPxKmP6ZHQG42Z4/y/Ua
rv/fKI39vMeReBUbHP6QEvmdK6kFBpnik22zZ/Bq//O10cECQQD7SMbxfcAtYPI6
d/VrGAOe9YeSycAmYLBAHrNN1hydkPfjk50YINCn69MaFxyyQwujfIJ4ULq4cUca
zwxWcPA5AkEAyOpMs8IS4FPJBjkOfqQVrutLHmEKChNCS6elltHR5gJuxIWgQwWO
GmQ6/JkR6wPd+H4cy1Fdd2eZp5JoaZtRdQJBALtwwCWnPdEbvdRrYv/tu9W5JNYT
9GcsPIy32dw32MSYPLDfjZFP+RUpTiDqGJfId0gOOmxxG7c1mGqhA3z/ZdECQQCZ
1rV2aqLTe7QP/L45f+BOeEGjeEAcqNR5Y1uqWOx0RuaTuZGV3/oIATkdUwNiRSrA
a6gWki2UERKZOcSTIGdFAkA7/CDhpaP3REZtCc2hsq4XOn9PaD2I1BM/L1wD96sX
I1ahIjSgpabYLaCNbHT6hGG0zcd6W+8g3rgw+1S7e4Ma
-----END RSA PRIVATE KEY-----`

const public_key_rsa = new NodeRSA(valor_públic_key);
const private_key_rsa = new NodeRSA(valor_private_key);

// encryptamiento por la llave publica
const encryptMessage = public_key_rsa.encrypt(secret, 'base64');
console.log('mensaje encryptado: ', encryptMessage);
// desencriptar por llave privada
const descriptionMessage = private_key_rsa.decrypt(encryptMessage, 'utf8');
console.log('Secreto desencriptado: ', descriptionMessage);

app.use(bodyParser.json());

app.post('/Verificar', (req, res) => {
    console.log(req.body);

    res.status(200).json({
        data: req.body
    })
});

server.listen(3000, () => {
    console.log(`server listening in http://localhost:${server.address().port}`);
});