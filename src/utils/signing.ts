import * as crypto from 'crypto';
import { SignatureInput, SignatureOutput } from '../dataTypes/interfaces';

export async function signData({ data, privateKey }: SignatureInput): Promise<SignatureOutput> {
    try {
        const sign = crypto.createSign('SHA3-256');
        sign.update(JSON.stringify(data));
        sign.end();
        const signature = sign.sign(privateKey, 'base64');
        return { data, signature };
    } catch (error) {
        throw new Error(`Signing failed: ${error}`);
    }
}

