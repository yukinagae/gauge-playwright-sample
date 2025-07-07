# gauge-playwright-sample

This repository sample tests using [Gauge](https://github.com/getgauge/gauge) and Playwright.

## Overview

This project uses:
- Gauge as the BDD (Behavior Driven Development) testing framework
- TypeScript as the programming language

## Prerequisites

- Node 1.22 or later
- Gauge framework

## Project Structure

```
.
├── env/             # Environment configurations
├── specs/           # Gauge test files
├── tests/           # Step implementation files (TypeScript)
└── reports/         # Test execution reports
```

## Setup Instructions

1. Install dependencies:

```bash
$ npm install
```

2. Install Gauge:

- For macOS:

```bash
$ brew install gauge
# or
$ curl -Ssl https://downloads.gauge.org/stable | sh
```

- For other platforms, visit: https://docs.gauge.org/getting_started/installing-gauge.html

3. Setup Go for Gauge:

```bash
$ gauge install ts
$ gauge --version
Gauge version: 1.6.18
Commit Hash: d6e10a4

Plugins
-------
html-report (4.3.2)
screenshot (0.3.2)
ts (0.3.5)
```

4. Setup playwright dependencies:

```bash
$ npx playwright install
```

## Running Tests

To run all tests:

```bash
$ gauge run specs
```

To run the tests with the specified tags (e.g. successful):

```bash
$ gauge run --tags successful
```

To validate tests syntax:

```bash
$ gauge validate specs
```
