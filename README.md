`defineModel` default factories break type checking in vue-tsc 3.3.12 (fine in 3.3.11). Run `npm start`, which type-checks two small projects and prints the expected and actual output:

- **A**: a typed model with `default: (props) => ...` reports TS2769.
- **B**: without parentheses (`props => ...`) the generated code has a syntax error (TS1005), so tsc skips semantic checks and the real error in `src/other.ts` disappears.
