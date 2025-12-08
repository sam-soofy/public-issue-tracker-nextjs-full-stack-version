// lib/env-reader.ts
import fs from "node:fs";
import path from "node:path";

type EnvMap = Record<string, string>;

class EnvReader {
  private static instance: EnvReader | null;
  private cache: Map<string, EnvMap> = new Map();

  private constructor() {
    if (EnvReader.instance)
      throw new Error(
        'You should use the class "EnvReader.getInstance()" method.',
      );
  }

  public static getInstance(): EnvReader {
    if (!EnvReader.instance) {
      EnvReader.instance = new EnvReader();
    }
    return EnvReader.instance;
  }

  // Public API: get a value from a specific env file
  public getValue(rawKey: string, fileName: string = ".env") {
    const env = this.loadFile(fileName);
    const key = rawKey.toUpperCase(); // case-insensitive
    const rawValue = env[key];

    if (rawValue === undefined) return undefined;

    return this.coerceValue(rawValue);
  }

  // Load and parse env file, with simple in-memory cache for each file
  private loadFile(fileName: string): EnvMap {
    if (this.cache.has(fileName)) {
      return this.cache.get(fileName)!;
    }

    const fullPath = path.resolve(process.cwd(), fileName);

    let content: string;
    try {
      content = fs.readFileSync(fullPath, "utf-8");
    } catch {
      // If the file doesn't exist or can't be read, cache as empty to avoid retries
      this.cache.set(fileName, {});
      return {};
    }

    const parsed = this.parseEnvContent(content);
    this.cache.set(fileName, parsed);
    return parsed;
  }

  // Parse .env-style content into a map of UPPERCASE_KEY -> raw string value
  private parseEnvContent(content: string): EnvMap {
    const result: EnvMap = {};
    const lines = content.split(/\r?\n/);

    for (const line of lines) {
      const trimmed = line.trim();
      // console.log("\n[1] Trimmed Line: ", trimmed, "\n");

      // Skip empty lines and comments
      if (!trimmed || trimmed.startsWith("#")) {
        continue;
      }

      const equalsIndex = trimmed.indexOf("=");
      if (equalsIndex === -1) {
        continue; // not a KEY=VALUE line
      }

      const rawKey = trimmed.slice(0, equalsIndex).trim();
      let rawValue = trimmed.slice(equalsIndex + 1).trim();
      // console.log("[2] Raw Key: ", rawKey, "\n");
      // console.log("[3] Raw Value: ", rawValue, "\n");

      if (!rawKey) {
        continue;
      }

      // Strip optional "export " prefix (just in case)
      const keyWithoutExport = rawKey.toUpperCase().replace(/^EXPORT\s+/, "");
      // console.log("[4] Key Without Export: ", keyWithoutExport, "\n");

      // Remove surrounding double quotes if present
      if (
        rawValue.length >= 2 &&
        rawValue.startsWith('"') &&
        rawValue.endsWith('"')
      ) {
        rawValue = rawValue.slice(1, -1);
      }

      result[keyWithoutExport] = rawValue;
      // console.log("[5] Final Raw Value: ", rawValue, "\n");
    }

    return result;
  }

  // Convert string to number if it's a valid numeric literal, else return string
  private coerceValue(value: string): string | number {
    const trimmed = value.trim();

    // Match integer or float, with optional leading minus sign
    const numericPattern = /^-?\d+(\.\d+)?$/;

    if (!numericPattern.test(trimmed)) {
      return trimmed;
    }

    const num = Number(trimmed);
    if (Number.isNaN(num)) {
      return trimmed;
    }

    // Single JS number type supports ints and floats
    return num;
  }
}

// Convenience function if you prefer functions over directly using the class
export function getEnvValue(
  key: string,
  fileName: string = ".env",
): string | number | undefined {
  return EnvReader.getInstance().getValue(key, fileName);
}

export function getDevEnvValue(
  key: string,
  fileName: string = ".env",
): string | number | undefined {
  // Treat missing NODE_ENV as development (good for drizzle-kit CLI)
  const nodeEnv = (process.env.NODE_ENV ?? "development") as string;

  const isDev = ["dev", "develop", "development", "local"].includes(nodeEnv);

  if (isDev) {
    // Read from the provided file (e.g. ".env.local")
    return EnvReader.getInstance().getValue(key, fileName);
  }

  // Non-dev: prefer real env var (e.g. production hosting)
  const fromProcess = process.env[key];
  if (fromProcess !== undefined) {
    return fromProcess;
  }

  // Fallback: try main ".env"
  return EnvReader.getInstance().getValue(key, ".env");
}
