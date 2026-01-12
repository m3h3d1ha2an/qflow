import { type Algorithm, hash, type Options, verify } from "@node-rs/argon2";
import type { AuthOptions } from "./server";

const Hashing = {
  Argon2d: 0,
  Argon2i: 1,
  Argon2id: 2,
} as const satisfies Record<string, Algorithm>;

type StrictOmit<T, K extends keyof T> = Omit<T, K>;
type ArgonOptions = StrictOmit<Required<Options>, "version" | "salt" | "secret">;

const argonOptions: ArgonOptions = {
  algorithm: Hashing.Argon2id,
  memoryCost: 524288,
  timeCost: 3,
  parallelism: 4,
  outputLen: 32,
};

type PasswordOptions = NonNullable<AuthOptions["emailAndPassword"]>["password"];
type StrictPasswordOptions = Required<NonNullable<PasswordOptions>>;

export const passwordOptions: StrictPasswordOptions = {
  hash: async (password: string) => await hash(password, argonOptions),
  verify: async ({ hash, password }) => await verify(hash, password, argonOptions),
};
