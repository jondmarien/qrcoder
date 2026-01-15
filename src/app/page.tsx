import QrGenerator from "@/components/qr-generator";

export default function Home() {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          QR Coder
        </h1>
        <p className="text-muted-foreground text-lg">
          Generate, customize, and export professional QR codes instantly.
        </p>
      </div>

      <QrGenerator />
    </div>
  );
}
