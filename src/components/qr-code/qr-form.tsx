"use client";

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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface QrFormProps {
  form: any;
}

export function QrForm({ form }: QrFormProps) {
  return (
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
            children={(field: any) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Content (URL or Text)</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={String(field.state.value)}
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
              children={(field: any) => {
                const sizeValue = Number(field.state.value) || 256;
                return (
                  <div className="space-y-2">
                    <Label>Size ({sizeValue}px)</Label>
                    <Slider
                      value={[sizeValue]}
                      onValueChange={(val) => field.handleChange(val[0])}
                      min={128}
                      max={1024}
                      step={32}
                    />
                  </div>
                );
              }}
            />
            <form.Field
              name="minLevel"
              children={(field: any) => (
                <div className="space-y-2">
                  <Label>Error Correction</Label>
                  <Select
                    value={String(field.state.value)}
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
              children={(field: any) => (
                <div className="space-y-2">
                  <Label htmlFor="fgColor">Foreground</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      className="w-12 p-1 h-9 cursor-pointer"
                      value={String(field.state.value)}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <Input
                      value={String(field.state.value)}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="font-mono"
                    />
                  </div>
                </div>
              )}
            />
            <form.Field
              name="bgColor"
              children={(field: any) => (
                <div className="space-y-2">
                  <Label htmlFor="bgColor">Background</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      className="w-12 p-1 h-9 cursor-pointer"
                      value={String(field.state.value)}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <Input
                      value={String(field.state.value)}
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
            children={(field: any) => (
              <div className="flex items-center justify-between rounded-lg border p-4 shadow-sm">
                <div className="space-y-0.5">
                  <Label className="text-base">Margins</Label>
                  <p className="text-sm text-muted-foreground">
                    Include quiet zone around the QR code.
                  </p>
                </div>
                <Switch
                  checked={!!field.state.value}
                  onCheckedChange={field.handleChange}
                />
              </div>
            )}
          />
        </form>
      </CardContent>
    </Card>
  );
}
