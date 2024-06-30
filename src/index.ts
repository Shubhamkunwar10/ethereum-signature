import { generateKeyPair } from './utils/keyGeneration';
import { signData } from './utils/signing';
import { verifyData } from './utils/verification';
import { Keypair, DataObject } from './dataTypes/interfaces';

async function main() {
    try {
        // Generate keys
        const keypair: Keypair = await generateKeyPair();

        // Example data object to sign
        const data: DataObject = {
            id: 1,
            message: 'This is a message'
        };

        // Sign the data
        const { signature } = await signData({ data, privateKey: keypair.privateKey });

        // Output results
        console.log('Data:', data);
        console.log('Signature:', signature);

        // Verify the signature
        const isValid = await verifyData(data, signature, keypair.publicKey);
        console.log('Is the signature valid?', isValid);
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

main();
