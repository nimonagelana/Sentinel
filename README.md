# Sentinel

> **See the signal. Understand the situation.**

Sentinel is a civilian early-warning and humanitarian information interface designed to turn scattered reports into a clearer picture of what is happening.

The application brings reported signals, locations, source types, relationships, verification states, and situation timelines into one structured interface. It is designed to help users move from **individual observations → connected signals → understandable situations**.

## Overview

Information during a developing situation can arrive as separate observations from different sources. Sentinel provides an interface for organizing those observations and showing how they relate to one another.

The current application models:

* Individual signals and observations
* Signal locations
* Source types
* Related signals
* Verification states
* Situation states
* Evidence and summaries
* Situation timelines

A signal is not automatically treated as a confirmed situation. Information can remain reported, uncertain, or contradicted as it moves through the verification process.

## Key Features

### Signal Overview

View reported signals in a centralized interface, including their location, observation, source type, timestamp, and current status.

### Signal Relationships

Related signals can be connected to show when multiple observations may describe the same developing situation.

### Verification States

Sentinel distinguishes between different information states:

* **REPORTED**
* **CORROBORATED**
* **VERIFIED**
* **UNCERTAIN**
* **CONTRADICTED**

This makes the distinction between an initial report and more strongly supported information visible in the interface.

### Situation Tracking

Related signals can be organized into situations with their own status and supporting information.

Situation states include:

* **REPORTED**
* **UNDER REVIEW**
* **VERIFIED**
* **RESOLVED**

### Source Awareness

Signals are modeled according to source type:

* Civilian
* Health
* Field
* Organization

### Timeline and Evidence

Situation information can be presented through timelines and supporting evidence, helping users understand how a situation develops rather than viewing reports as isolated entries.

### Responsive Interface

Sentinel uses a structured, calm interface intended to make complex information easier to scan and understand.

## How It Works

```text
Individual observations
          ↓
       Signals
          ↓
Related signals + source context
          ↓
Verification states
          ↓
      Situations
          ↓
Timeline + evidence + summary
```

The application separates individual observations from the broader situation they may contribute to.

## Technology

Sentinel is built with:

* **Next.js 16**
* **React 19**
* **TypeScript**
* **Tailwind CSS**
* **shadcn/ui**
* **Lucide React**
* **Vercel Analytics**

## Repository Structure

```text
Sentinel/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── sentinel-app.tsx
│   └── ui/
│
├── lib/
│   └── utils.ts
│
├── public/
│   ├── apple-icon.png
│   ├── icon-dark-32x32.png
│   ├── icon-light-32x32.png
│   ├── icon.svg
│   └── ...
│
├── .gitignore
├── components.json
├── next.config.mjs
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── postcss.config.mjs
└── tsconfig.json
```

### Main Application

`components/sentinel-app.tsx` contains the primary Sentinel application interface and its current signal, situation, verification, evidence, and timeline models.

`app/page.tsx` serves the Sentinel application as the main page.

## Getting Started

### Prerequisites

* Node.js
* pnpm 12+

## Install Dependencies

```bash
pnpm install
```

## Run the Development Server

```bash
pnpm dev
```

Open http://localhost:3000 in your browser.

### Build for Production

```bash
pnpm build
```

### Start the Production Server

```bash
pnpm start
```

-Deployment

Sentinel is deployed as a Next.js application.

"Live application:"
https://trust-radar-platform-development.vercel.app

## Project Status

The current repository contains the working Sentinel interface and its modeled signal and situation experience.

The repository intentionally documents the functionality that is currently present rather than claiming backend services or integrations that are not included in this version.

 Screenshots & Demo

Screenshots and a demonstration walkthrough can be added here.

Suggested screenshots:

1. Sentinel signal overview
2. Situation details
3. Verification trail
4. Timeline and evidence

## Contributor

"Nimona Gelana"
Software Developer

GitHub: https://github.com/nimonagelana

## License

No open-source license is currently specified for this repository.
