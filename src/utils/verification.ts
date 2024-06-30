import * as crypto from 'crypto';


export async function verifyData(data: any, signature: string, publicKey: string): Promise<boolean> {
    try {
        const verify = crypto.createVerify('SHA3-256');
        verify.update(JSON.stringify(data));
        verify.end();
        return verify.verify(publicKey, signature, 'base64');
    } catch (error) {
        throw new Error(`Verification failed: ${error}`);
    }
}

/**
 * Decode an Ethereum-style base64-encoded signature into r, s, v components.
 */

interface EthereumSignature {
    r: string;
    s: string;
    v: string;
}

export function decodeEthereumSignature(signature: string): EthereumSignature {
    const base64Signature = Buffer.from(signature, 'base64');
    const r = base64Signature.slice(0, 32).toString('hex');
    const s = base64Signature.slice(32, 64).toString('hex');
    const v = base64Signature.slice(64, 65).toString('hex');
    return { r, s, v };
}
