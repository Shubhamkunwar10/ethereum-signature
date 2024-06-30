import * as crypto from 'crypto';
import { Keypair } from '../dataTypes/interfaces';

export async function generateKeyPair(): Promise<Keypair> {
    return new Promise((resolve, reject) => {
        crypto.generateKeyPair('ec', {
            namedCurve: 'secp256k1',
        }, (err, publicKey, privateKey) => {
            if (err) {
                return reject(err);
            }
            resolve({
                publicKey: publicKey.export({ type: 'spki', format: 'pem' }).toString(),
                privateKey: privateKey.export({ type: 'pkcs8', format: 'pem' }).toString(),
            });
        });
    });
}
