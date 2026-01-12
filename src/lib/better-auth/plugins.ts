import { nextCookies } from "better-auth/next-js";
import type { AuthOptions } from "./server";

type BetterAuthPlugins = NonNullable<AuthOptions["plugins"]>;

export const betterAuthPlugins: BetterAuthPlugins = [nextCookies()];
