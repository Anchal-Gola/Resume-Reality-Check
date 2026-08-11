import fs from "fs";
import { PDFParse } from "pdf-parse";

export const extractTextFromPDF = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);

  const parser = new PDFParse({ data: dataBuffer });
  const result = await parser.getText();

  await parser.destroy();

  return result.text;
};