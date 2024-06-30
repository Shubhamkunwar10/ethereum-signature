import { generateKeyPair } from '../src/utils/keyGeneration';
import { signData } from '../src/utils/signing';
import {  verifyData } from '../src/utils/verification';
import { DataObject } from '../src//dataTypes/interfaces';

test('should sign and verify data correctly', async () => {
    console.log("Generating Key Pair...");
    const { publicKey, privateKey } = await generateKeyPair();
    console.log("Key Pair Generated::", publicKey,privateKey);
    
    const data: DataObject = {
        id: 1,
        message: 'Test Data'
    };

    const { signature } = await signData({ data, privateKey });
    console.log("Signed Data by User:", signature);

    
    const isValid = await verifyData(data, signature, publicKey);

    console.log("Verification Result:");
    console.log("- Data:", data);
    console.log("- Signature:", `${signature.slice(0, 3)}...${signature.slice(-2)}`); // Truncate signature for display
    console.log("- Public Key:", publicKey);
    console.log("- Verification Result:", isValid ? 'Valid' : 'Invalid');

    expect(isValid).toBe(true);
});

test('should fail verification with tampered data', async () => {
    const { publicKey, privateKey } = await generateKeyPair();
    const originalData: DataObject = {
        id: 1,
        message: 'Test Data'
    };
    const { signature } = await signData({ data: originalData, privateKey });

    // Tamper the data
    const tamperedData: DataObject = {
        id: 1,
        message: 'Tampered Data'
    };

    const isValid = await verifyData(tamperedData, signature, publicKey);
    expect(isValid).toBe(false);
});
