"use client";

import * as React from "react";
import { useForm } from "@tanstack/react-form";
import { QRCodeSVG } from "qrcode.react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useDebouncer } from "@tanstack/react-pacer";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { qrCodeSchema, type QrCodeConfig } from "@/lib/schemas";

export default function QrGenerator() {
  const form = useForm({
    defaultValues: {
      value: "",
      size: 256,
      minLevel: "M", // Type inference should match Zod's enum
      bgColor: "#ffffff",
      fgColor: "#000000",
      includeMargin: true,
    } as QrCodeConfig,
    validators: {
      onChange: qrCodeSchema,
    },
    onSubmit: async ({ value }) => {
      // Handle export/save logic here
      console.log(value);
    },
  });

  // Subscribe to form state for live preview
  // We can use form.Subscribe or just separate hooks if needed, but 'useStore' pattern is common in TanStack Form
  // For simplicity v1, we'll access state directly in render or sub-components.
  // Ideally, valid functionality is extracted.

  // NOTE: TanStack Form is headless. We need to wire up fields manually.

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Configuration Form */}
      <Card>
        <CardHeader>
          <CardTitle>Configuration</CardTitle>
          <CardDescription>Customize your QR code settings.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-6"
          >
            <form.Field
              name="value"
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Content (URL or Text)</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="https://example.com"
                  />
                  {field.state.meta.errors ? (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  ) : null}
                </div>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <form.Field
                name="size"
                children={(field) => (
                  <div className="space-y-2">
                    <Label>Size ({field.state.value}px)</Label>
                    <Slider
                      value={[field.state.value]}
                      onValueChange={(val) => field.handleChange(val[0])}
                      min={128}
                      max={1024}
                      step={32}
                    />
                  </div>
                )}
              />
              <form.Field
                name="minLevel"
                children={(field) => (
                  <div className="space-y-2">
                    <Label>Error Correction</Label>
                    <Select
                      value={field.state.value}
                      onValueChange={(val) =>
                        field.handleChange(val as "L" | "M" | "Q" | "H")
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="L">Low (7%)</SelectItem>
                        <SelectItem value="M">Medium (15%)</SelectItem>
                        <SelectItem value="Q">Quartile (25%)</SelectItem>
                        <SelectItem value="H">High (30%)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <form.Field
                name="fgColor"
                children={(field) => (
                  <div className="space-y-2">
                    <Label htmlFor="fgColor">Foreground</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        className="w-12 p-1 h-9 cursor-pointer"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <Input
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="font-mono"
                      />
                    </div>
                  </div>
                )}
              />
              <form.Field
                name="bgColor"
                children={(field) => (
                  <div className="space-y-2">
                    <Label htmlFor="bgColor">Background</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        className="w-12 p-1 h-9 cursor-pointer"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <Input
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="font-mono"
                      />
                    </div>
                  </div>
                )}
              />
            </div>

            <form.Field
              name="includeMargin"
              children={(field) => (
                <div className="flex items-center justify-between rounded-lg border p-4 shadow-sm">
                  <div className="space-y-0.5">
                    <Label className="text-base">Margins</Label>
                    <p className="text-sm text-muted-foreground">
                      Include quiet zone around the QR code.
                    </p>
                  </div>
                  <Switch
                    checked={field.state.value}
                    onCheckedChange={field.handleChange}
                  />
                </div>
              )}
            />

            {/* 
            // We don't need a submit button for the preview to work, 
            // but we might want one for "Download PDF" logic later.
            */}
          </form>
        </CardContent>
      </Card>

      {/* Live Preview & Actions */}
      <div className="flex flex-col gap-6">
        <Card className="flex-1 flex flex-col">
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>Real-time visual feedback.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center bg-muted/20 min-h-[300px] rounded-md mx-6 mb-6 border-dashed border-2">
            <form.Subscribe
              selector={(state) => state.values}
              children={(values) => (
                <div
                  style={{
                    background: values.bgColor,
                    padding: values.includeMargin ? "20px" : "0",
                  }}
                >
                  <QRCodeSVG
                    value={values.value || "https://chron0.tech"}
                    size={values.size}
                    level={values.minLevel}
                    bgColor={values.bgColor}
                    fgColor={values.fgColor}
                    includeMargin={false} // Managed by container padding for better visual control or passed true if needed
                    className="max-w-full h-auto"
                  />
                </div>
              )}
            />
          </CardContent>
        </Card>

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
              onClick={() => alert("PNG Download Logic ToDo")}
            >
              Download PNG
            </Button>
            <Button
              className="flex-1"
              variant="outline"
              onClick={() => alert("SVG Download Logic ToDo")}
            >
              Download SVG
            </Button>
            <Button className="flex-1" onClick={() => alert("PDF Logic ToDo")}>
              Download PDF
            </Button>
          </CardContent>
        </Card>
      </div>

      <TanStackFormDevTools initialIsOpen={false} />
    </div>
  );
}
