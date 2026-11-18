import { stdin, stdout } from "node:process";
import { createInterface } from "node:readline/promises";
import { Writable } from "node:stream";
import { hashPassword } from "../src/server/admin/password.ts";

if (!stdin.isTTY || !stdout.isTTY) {
  console.error("Execute num terminal interativo.");
  process.exitCode = 1;
} else {
  const silent = new Writable({ write(_chunk, _encoding, done) { done(); } });
  const terminal = createInterface({ input: stdin, output: silent, terminal: true, historySize: 0 });
  terminal.on("SIGINT", () => { stdout.write("\n"); process.exit(130); });

  async function readSecret(label) {
    stdout.write(label + " ");
    const value = await terminal.question("");
    stdout.write("\n");
    return value;
  }

  try {
    const password = await readSecret("Nova password (entrada oculta)");
    if (Buffer.byteLength(password) < 16 || Buffer.byteLength(password) > 256 ||
        password !== await readSecret("Confirme a password")) {
      console.error("Use 16–256 bytes e confirme a mesma password.");
      process.exitCode = 1;
    } else {
      console.log("\nCopie o valor abaixo para ADMIN_PASSWORD_HASH na Vercel.\n");
      console.log(await hashPassword(password));
    }
  } finally {
    terminal.close();
  }
}
