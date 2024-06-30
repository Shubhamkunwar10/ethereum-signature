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
const keyGeneration_1 = require("./utils/keyGeneration");
const signing_1 = require("./utils/signing");
const verification_1 = require("./utils/verification");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Generate keys
            const keypair = yield (0, keyGeneration_1.generateKeyPair)();
            // Example data to sign
            const data = 'This is some data to be signed';
            // Sign the data
            const { signature } = yield (0, signing_1.signData)({ data, privateKey: keypair.privateKey });
            // Output results
            console.log('Data:', data);
            console.log('Signature:', signature);
            // Verify the signature
            const isValid = yield (0, verification_1.verifyData)(data, signature, keypair.publicKey);
            console.log('Is the signature valid?', isValid);
        }
        catch (error) {
            console.error('An error occurred:', error);
        }
    });
}
main();
//# sourceMappingURL=index.js.map