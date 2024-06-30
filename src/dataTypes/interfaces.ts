import * as crypto from 'crypto';

export interface Keypair {
    publicKey: string;
    privateKey: string;
}

export interface SignatureInput {
    data: any;
    privateKey:string;
}

export interface SignatureOutput {
    data: string;
    signature: string;
}
export interface DataObject {
    id: number;
    message: string;
}

