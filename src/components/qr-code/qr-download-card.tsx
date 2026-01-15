"use client";

import { useQrDownload } from "@/hooks/use-qr-download";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function QrDownloadCard() {
  const { handleDownloadPng, handleDownloadSvg, handleDownloadPdf } =
    useQrDownload();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Export</CardTitle>
        <CardDescription>
          Download your QR code in high definition.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col sm:flex-row gap-4">
        <Button
          className="flex-1"
          variant="outline"
          onClick={handleDownloadPng}
        >
          Download PNG
        </Button>
        <Button
          className="flex-1"
          variant="outline"
          onClick={handleDownloadSvg}
        >
          Download SVG
        </Button>
        <Button
          className="flex-1"
          variant="outline"
          onClick={handleDownloadPdf}
        >
          Download PDF
        </Button>
      </CardContent>
    </Card>
  );
}
