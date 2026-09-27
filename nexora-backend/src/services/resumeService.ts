import fs from "fs/promises";
import pdf from "pdf-parse";

export async function extractResumeText(filePath: string) {
  const buffer = await fs.readFile(filePath);
  const data = await pdf(buffer);
  return data.text.trim();
}
