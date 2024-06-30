"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const keyGeneration_1 = require("../src/utils/keyGeneration");
const signing_1 = require("../src/utils/signing");
const verification_1 = require("../src/utils/verification");
test('should sign and verify data correctly', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Generating Key Pair...");
    const { publicKey, privateKey } = yield (0, keyGeneration_1.generateKeyPair)();
    console.log("Key Pair Generated::", publicKey, privateKey);
    const data = {
        id: 1,
        message: 'Test Data'
    };
    const { signature } = yield (0, signing_1.signData)({ data, privateKey });
    console.log("Signed Data by User:", signature);
    const isValid = yield (0, verification_1.verifyData)(data, signature, publicKey);
    console.log("Verification Result:");
    console.log("- Data:", data);
    console.log("- Signature:", `${signature.slice(0, 3)}...${signature.slice(-2)}`); // Truncate signature for display
    console.log("- Public Key:", publicKey);
    console.log("- Verification Result:", isValid ? 'Valid' : 'Invalid');
    expect(isValid).toBe(true);
}));
test('should fail verification with tampered data', () => __awaiter(void 0, void 0, void 0, function* () {
    const { publicKey, privateKey } = yield (0, keyGeneration_1.generateKeyPair)();
    const originalData = {
        id: 1,
        message: 'Test Data'
    };
    const { signature } = yield (0, signing_1.signData)({ data: originalData, privateKey });
    // Tamper the data
    const tamperedData = {
        id: 1,
        message: 'Tampered Data'
    };
    const isValid = yield (0, verification_1.verifyData)(tamperedData, signature, publicKey);
    expect(isValid).toBe(false);
}));
//# sourceMappingURL=signAndVerify.test.js.map