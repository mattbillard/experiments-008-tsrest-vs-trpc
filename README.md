# experiments-tsrest-vs-trpc

## Set Up

**NOTES:**

- Use npm not yarn. There's a dependency tree issue when installing with yarn

In a terminal, run

```
nvm use
cd apps/api
npm install
```

In a terminal, run

```
nvm use
cd apps/client
npm install
```

## Run

In a terminal, run

```
nvm use
cd apps/api
npm run dev
```

In a terminal, run

```
nvm use
cd apps/client
npm run dev
```

- Open in your browser  
  http://localhost:5173/
- Look at the network panel to compare regular REST vs tRPC vs TS-REST
- Start exploring the code from  
  apps/client/src/components/app/app.tsx
