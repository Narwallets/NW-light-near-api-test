NW Ligth NEAR-Api-ts TESTS
===

This repository contains TESTS for NW-ligth-near-api

NW-ligth-near-api is a a subset fo the near-api-js

### Differences:

* Smaller, just core functionality
* Written in ts, compiled to target EsNext

### What's included

* Transaction
* Borsh Serializer
* a .ts cut-down version fo TweetNacl (only sign/25519 curve)
* Big Number - BN.js
* json-rpc (minimal)
* near-rpc (minimal)

### What's not included

* KeyStores
* Providers
* Signers
* Connection, Account, NEAR-Wallet & Contracts Wrappers
* NEAR-Wallet navigate-to integration
* Validators abstractions
* Multisig abstractions

## Objective

This is a simpler API intended to analyze the minimal required API to interact with the NEAR blockchain while using ES2020 modules format.

## Prerequisites:

- Current version of [Node.js](https://nodejs.org/). >=v14.0.0

## Setup:

1) Install dependencies by running:
```bash
npm i
```

## Testing

This proyect contains BOTH libs and related packages:
* near-api-js
* NW-ligth-near-api (as files in src/lib)

In `/src/test` you'll find 3 files:
* send-tokens (from [transaction-examples](https://github.com/near-examples/transaction-examples), uses near-api-js)

* send-tokens2 (same but using NW-Ligth-Api)

* send-tokens3 (do both in parallel comparing outputs)

Put breakpoints and test from a VSCode Debug terminal:

```bash
node dist/send-tokens3.js
```

Happy coding! 🚀 
