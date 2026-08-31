## Quiz App

Quiz app for create and pass tests

## Features

- login as user or admin
- create and edit tests with 3 kinds of question: single, multiple, number
- pass test

## Tech stack

- Next.js
- TypeScript
- React context for data storage

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Setup environment variables

Create `.env` file:

```env
NEXT_PUBLIC_SERVER_URL=https://interns-test-fe.snp.agency
```

### 3. Run development server:

```bash
npm run dev
```

## Project Structure

    src
    ├── app
    │   ├── api     # Api layer
    │   └── (pages) # App Router pages
    ├── components
    │   ├── commons # UI components
    │   └── pages   # pages components
    ├── lib         # hooks, utils, schemas
    ├── models      # test, user types
    ├── providers   # providers for data storage
    └── styles      # SCSS global styles
