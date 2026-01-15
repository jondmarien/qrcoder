# QRCoder

**QRCoder** is a modern, responsive, and high-performance QR code generator application built with **Next.js 16** and **React 19**. It offers real-time previewing, extensive customization options, and high-quality export capabilities (PNG, SVG, PDF).

<img width="1868" height="1245" alt="image" src="https://github.com/user-attachments/assets/a8d90a5b-df54-4eab-8ab3-06bc9aaf4e5a" />

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.1-black)
![React](https://img.shields.io/badge/React-19-blue)

## ✨ Features

- **Real-Time Preview**: See your QR code update instantly as you type or adjust settings.
- **High-Quality Export**: Download your QR codes in **PNG**, **SVG**, or **PDF** (Vector) formats.
- **Customization**:
  - **Content**: URL or arbitrary text.
  - **Size**: Adjustable from 128px up to 1024px.
  - **Error Correction**: Selectable levels (L, M, Q, H) to balance density and resilience.
  - **Colors**: Fully customizable foreground and background colors (`#hex`).
  - **Margins**: Toggle quiet zone padding.
- **Modern UI**: Built with **Shadcn UI** and **Tailwind CSS v4** for a clean, accessible, and responsive design.
- **Dark Mode**: Fully supported out of the box.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (Radix UI)
- **State & Forms**:
  - [@tanstack/react-query](https://tanstack.com/query/latest)
  - [@tanstack/react-form](https://tanstack.com/form/latest)
  - [Zod](https://zod.dev/) (Validation)
- **QR Generation**: [qrcode.react](https://github.com/zpao/qrcode.react)
- **Processing & PDF**: [Sharp](https://sharp.pixelplumbing.com/), [pdf-lib](https://pdf-lib.js.org/)
- **Runtime & PM**: [Bun](https://bun.sh/)

## 🚀 Getting Started

This project is optimized for **Bun**.

### 1. Clone the repository

```bash
git clone https://github.com/jondmarien/qrcoder.git
cd qrcoder
```

### 2. Install dependencies

```bash
bun install
```

### 3. Run the development server

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📦 Build for Production

To create an optimized production build:

```bash
bun run build
bun start
```

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
