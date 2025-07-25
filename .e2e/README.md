### Setup different APP_URL

Let's say that you have your app running on port **_3001_**, the before running the tests you should setup `APP_URL` env variable like this:

- macOS/Linux:

```bash
export APP_URL=http://localhost:3001
```

- Windows (PowerShell)

```bash
$env:APP_URL = 'http://localhost:3001'
```

### Advanced Test Modes

- Headed browser (for debugging)

```bash
npm run test:headed
```

- UI mode (simialr to headed but with more control)

```bash
npm run test:ui
```
