import * as CryptoJS from "crypto-js";

type EncryptAbleData = string | number | boolean | object | null | undefined;

//const APP_SECRET = "secret@123";
const APP_SECRET = import.meta.env.VITE_APP_SECRET;
//console.log("APP_SECRET:", import.meta.env.VITE_APP_SECRET);

if (!APP_SECRET) {
  throw new Error("APP_SECRET is not defined in .env file");
}

function isJSON(data: string): boolean {
  try {
    JSON.parse(data);
    return true;
  } catch (err) {
    return false;
  }
}

function encrypt(data: EncryptAbleData): string {
  const object = typeof data === "object" ? JSON.stringify(data) : String(data);

  return CryptoJS.AES.encrypt(object, APP_SECRET).toString();
}

function decrypt<T = string | object>(data?: string): T | null {
  if (!data) return null;

  try {
    const decrypted = CryptoJS.AES.decrypt(data, APP_SECRET).toString(
      CryptoJS.enc.Utf8
    );

    return isJSON(decrypted) ? (JSON.parse(decrypted) as T) : (decrypted as T);
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
}

export function setSession(data: EncryptAbleData): void {
  localStorage.setItem("userSession", encrypt(data));
}

export function getSession<T = object>(): T | null {
  const userSession = localStorage.getItem("userSession");
  return decrypt<T>(userSession || undefined);
}

export function clearSession(): void {
  localStorage.removeItem("userSession");
}
