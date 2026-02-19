import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { SessionPayload } from "@/lib/definitions";
import { cookies } from "next/headers";

const secretKey = process.env.SECRET_KEY;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey);
    return payload as SessionPayload;
  } catch {
    return null;
  }
}

export async function createSession(email: string) {
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000;
  const session = await encrypt({
    email,
    expiresAt,
  });
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(expiresAt),
    sameSite: "lax",
    path: "/",
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  return decrypt(session);
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
