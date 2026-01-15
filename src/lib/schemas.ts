import { z } from "zod";

export const qrCodeSchema = z.object({
  value: z
    .string()
    .min(1, "Content is required")
    .max(2000, "Content is too long"),
  size: z.number().min(128).max(1024),
  minLevel: z.enum(["L", "M", "Q", "H"]), // Error correction level
  bgColor: z
    .string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color"),
  fgColor: z
    .string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color"),
  includeMargin: z.boolean(),
});

export type QrCodeConfig = z.infer<typeof qrCodeSchema>;
