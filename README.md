# About

> A simple CPF library.

## Usage

### `Cpf`

Create an instance using `Cpf` constructor.

```js
const cpf = new Cpf('03221685971')
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

### `CpfGenerator`

Create an instance using `CpfGenerator` constructor.

```js
const cpfGenerator = new CpfGenerator()
```

##### `generate`

Returns a randomic instance of `Cpf`.

```js
const cpf = cpfGenerator.generate() // { _value: '78135507496' }

cpf instanceof Cpf // true
```
