"use client";

export function useQrDownload(previewId: string = "qr-preview-wrapper") {
  const handleDownloadSvg = () => {
    const wrapper = document.getElementById(previewId);
    const svg = wrapper?.querySelector("svg");
    if (!wrapper || !svg) return;

    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `qrcode-${Date.now()}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPng = () => {
    const wrapper = document.getElementById(previewId);
    const svg = wrapper?.querySelector("svg");
    if (!wrapper || !svg) return;

    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    // Set canvas size to match SVG or desired export size.
    // Using actual SVG attributes for size.
    const width = parseInt(svg.getAttribute("width") || "256", 10);
    const height = parseInt(svg.getAttribute("height") || "256", 10);

    canvas.width = width;
    canvas.height = height;

    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
    img.onload = () => {
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      const pngUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = pngUrl;
      link.download = `qrcode-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  };

  const handleDownloadPdf = async () => {
    const wrapper = document.getElementById(previewId);
    const svg = wrapper?.querySelector("svg");
    if (!wrapper || !svg) return;

    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);

    try {
      const { generatePdf } = await import("@/app/actions");
      const result = await generatePdf(source);

      if (result.success && result.pfBase64) {
        const byteCharacters = atob(result.pfBase64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `qrcode-${Date.now()}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } else {
        alert("Failed to generate PDF");
      }
    } catch (e) {
      console.error(e);
      alert("Error generating PDF");
    }
  };

  return {
    handleDownloadSvg,
    handleDownloadPng,
    handleDownloadPdf,
  };
}
