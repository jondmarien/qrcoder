"use server";

import sharp from "sharp";
import { PDFDocument } from "pdf-lib";

export async function generatePdf(svgString: string) {
  try {
    // 1. Convert SVG to PNG using Sharp
    const pngBuffer = await sharp(Buffer.from(svgString)).png().toBuffer();

    // 2. Create PDF and embed PNG
    const pdfDoc = await PDFDocument.create();
    const pngImage = await pdfDoc.embedPng(pngBuffer);

    const page = pdfDoc.addPage([pngImage.width, pngImage.height]);
    page.drawImage(pngImage, {
      x: 0,
      y: 0,
      width: pngImage.width,
      height: pngImage.height,
    });

    const pdfBase64 = await pdfDoc.saveAsBase64();

    // Return base64 string to client
    return { success: true, pfBase64: pdfBase64 };
  } catch (err) {
    console.error("PDF generation failed:", err);
    return { success: false, error: "Failed to generate PDF" };
  }
}
