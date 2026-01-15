"use client";

import * as React from "react";
import { useForm } from "@tanstack/react-form";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FormDevtoolsPanel } from "@tanstack/react-form-devtools";
import { ZodError } from "zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { qrCodeSchema, type QrCodeConfig } from "@/lib/schemas";

import { QrForm } from "./qr-code/qr-form";
import { QrPreview } from "./qr-code/qr-preview";
import { QrDownloadCard } from "./qr-code/qr-download-card";

export default function QrGenerator() {
  const form = useForm({
    defaultValues: {
      value: "",
      size: 256,
      minLevel: "M",
      bgColor: "#ffffff",
      fgColor: "#000000",
      includeMargin: true,
      marginSize: 4,
    } as QrCodeConfig,
    validators: {
      onChange: ({ value }) => {
        try {
          qrCodeSchema.parse(value);
          return undefined;
        } catch (e) {
          if (e instanceof ZodError) {
            return "Invalid configuration";
          }
          return undefined;
        }
      },
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Configuration Form */}
      <QrForm form={form} />

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
                <QrPreview values={values as QrCodeConfig} />
              )}
            />
          </CardContent>
        </Card>

        <QrDownloadCard />
      </div>

      <ReactQueryDevtools initialIsOpen={false} />
      {process.env.NODE_ENV === "development" && <FormDevtoolsPanel />}
    </div>
  );
}
