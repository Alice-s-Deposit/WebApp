/*  */
import crypto from "crypto";

export const localStorageKey = 'privKey';
const max = BigInt("0x00FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141");

export function generatePrivKey(): string {
    return randomBigint(max).toString(16);
}

export const savePrivKey = (privKey: string) => {
    // save private key in local Storage
    localStorage.setItem(localStorageKey, privKey)
}

export const getPrivKey = () => {
    //get the key from local storage
    return localStorage.getItem(localStorageKey);

}


export function test(){
    // generate key 
    const priv = generatePrivKey();
    console.log(priv);
    // save key
    savePrivKey(priv);
    // get key
    const priv2 = getPrivKey();
    console.log(priv2);

}




export function randomBigint(max: bigint): bigint {
  const maxBytes = max.toString(16).length;
  const array = crypto.randomBytes(maxBytes);
  const randomHex = array.toString("hex");
  const randomBig = BigInt("0x" + randomHex);
  return randomBig % max;
}

