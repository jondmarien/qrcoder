"use client";

import { useDebouncedValue } from "@tanstack/react-pacer";
import { QRCodeSVG } from "qrcode.react";
import type { QrCodeConfig } from "@/lib/schemas";

interface QrPreviewProps {
  values: QrCodeConfig;
}

export function QrPreview({ values }: QrPreviewProps) {
  const [debouncedValues] = useDebouncedValue(values, { wait: 300 });

  return (
    <div
      id="qr-preview-wrapper"
      style={{
        background: debouncedValues.bgColor,
      }}
      className="transition-colors duration-200"
    >
      <QRCodeSVG
        value={debouncedValues.value || ""}
        size={debouncedValues.size}
        level={debouncedValues.minLevel}
        bgColor={debouncedValues.bgColor}
        fgColor={debouncedValues.fgColor}
        marginSize={debouncedValues.includeMargin ? 4 : 0}
        className="max-w-full h-auto"
      />
    </div>
  );
}
