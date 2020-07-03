# About

> A simple CPF library.

## API

### Cpf.generate

```js
Cpf.generate() // '03221685971'
```

### Cpf.isValid

```js
Cpf.isValid('03221685971') // true

Cpf.isValid('00000000000') // false
```

### format

```js
const cpf = new Cpf('03221685971')

cpf.format() // 032.216.859-71
```
