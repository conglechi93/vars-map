
// import { sha256 } from 'js-sha256';
// const generateCodeChallengeFromVerifier = async(codeVerifier) => {
//     const digest= await crypto.subtle.digest("SHA-256",new TextEncoder().encode(codeVerifier));
//     return btoa(String.fromCharCode(...new Uint8Array(digest))).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
// }

function sha256(plain) {
    // returns promise ArrayBuffer
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest("SHA-256", data);
  }
  
  function base64urlencode(a) {
    var str = "";
    var bytes = new Uint8Array(a);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      str += String.fromCharCode(bytes[i]);
    }
    return btoa(str)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }
  
  const generateCodeChallengeFromVerifier = async (codeVerifier) => {
    var hashed = await sha256(codeVerifier);
    var base64encoded = base64urlencode(hashed);
    return base64encoded;
  }

const randomVerifier = () => {
    const length = 128;
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
export { generateCodeChallengeFromVerifier, randomVerifier };