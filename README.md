# About

> A simple CPF library.

## Usage

### `Cpf`

Create an instance using `Cpf` constructor.

```js
const cpf = new Cpf('03221685971')
```

A string conversion returns the instance value.

```js
String(cpf) // 03221685971
```

##### `format`

Returns a formated `Cpf` instance value.

```js
cpf.format() // 032.216.859-71
```

##### `value`

Returns a `Cpf` instance value.

```js
cpf.value // 03221685971
```
