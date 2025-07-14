import { fileURLToPath } from "url";
import { dirname,resolve } from "path";
import fs from "fs"


export const loadFile = (path: string): string[] => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const filePath = resolve(__dirname, path);
    const file = fs.readFileSync(filePath,'utf-8');
    const data: string[] = JSON.parse(file);

    return data
}
