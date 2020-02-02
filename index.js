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
const secret = ' hola';

const valor_públic_key = ` -----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDHz8NVuztXCwpdMl80xaXQei+k
nUduRLXufCuxQSikQfhWRUmW9UgwAc3NNYV8qsM2HmcKSgCsmmUALu+ifsYzBvEj
Wo1wjahcbbW8s260JVTLgi5qZbLjSV1EIhBoclLnkk1WivUWGaPprvgKuS5aP8Gj
YuBgLO1eLEJg/w3h3QIDAQAB
-----END PUBLIC KEY-----`;
const valor_private_key = ` -----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQDHz8NVuztXCwpdMl80xaXQei+knUduRLXufCuxQSikQfhWRUmW
9UgwAc3NNYV8qsM2HmcKSgCsmmUALu+ifsYzBvEjWo1wjahcbbW8s260JVTLgi5q
ZbLjSV1EIhBoclLnkk1WivUWGaPprvgKuS5aP8GjYuBgLO1eLEJg/w3h3QIDAQAB
AoGAd43Ttb9CoTFE8UCLgLrmHNiPGzLUI6FPLjPzvKpdE/M5EP2CK6X1nGvn5Ooq
Rc6y4PXN93UR9DSpTDPJRHQQSDXQXrQWBF3un/Y8ClBr4fhr8cfT/DXPaoyStTY+
JPoqc/bifocDxB3lpaueGve1+kbDa8ofm0H2ZAngAkQPcMECQQD6G0L3GKddRKyi
l/h/2u/QOO0UAUCro/F/agIOrAT8U3o2HHSg3aswqQiaWTc2uQwB9EJJgNy2H0Ti
YZMGqCzNAkEAzIUaarlj8I3me69E1BWWzRN/ghv62Ou4nowkh0ALEFB7ySkpxQwS
AFjLM7XZJRULM9XWKDqwyz1h99JgM1aJUQJAXbszyIj7yC+Bh1nu7nOtplp/Nx0V
EH5bdkXTSY5cO/hI99iIOPV6P71JlRbUY3TMNDtHUGaz0Kk9Vp38zOTgDQJAQ9GP
ZPx863PijfkctcdC7lYc3iQxFmV0Hv8Rzdeq04ocwiPoOfM6tOq81zTiAK3tvQ6X
qVds8Lg2GFumkt+LQQJBAPNRtm7w2D/THqXfZ0L/VBlITJfE285llCHZjwlHPjFL
xlpm33izvdO66tW8atmMxLUyNzReChyRjoPEamIAflY=
-----END RSA PRIVATE KEY-----`;
// creacion de llaves publicas y privadas con datos ya poseidos
const public_key_rsa = new NodeRSA(valor_públic_key);
const private_key_rsa = new NodeRSA(valor_private_key);
// La libreria del front para encryptar los datos usa el pkcs1 y tenemos que establecer que nosotros en node-rsa usaremos su mismo mecanismo para poder encryptar y descrifrar
public_key_rsa.setOptions({encryptionScheme: 'pkcs1'});
private_key_rsa.setOptions({encryptionScheme: 'pkcs1'});

// encryptamiento por la llave publica
const encryptMessage = public_key_rsa.encrypt(secret, 'base64');
console.log('mensaje encryptado: ', encryptMessage);
// desencriptar por llave privada
const descriptionMessage = private_key_rsa.decrypt(encryptMessage, 'utf8');
console.log('Secreto desencriptado: ', descriptionMessage);

app.post('/Verificar', (req, res) => {
    console.log(req.body.data);
    const keyvalue = req.body.data;
    const descriptionMessage = private_key_rsa.decrypt(keyvalue, 'utf8');
    console.log('Valor enviado encryptado: ', descriptionMessage);

    res.status(200).json({
        data: req.body.data,
        descencrypted: descriptionMessage
    })
});

server.listen(3000, () => {
    console.log(`server listening in http://localhost:${server.address().port}`);
});