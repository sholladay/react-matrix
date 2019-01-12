# react-matrix [![Build status for React Matrix](https://travis-ci.com/sholladay/react-matrix.svg?branch=master "Build Status")](https://travis-ci.com/sholladay/react-matrix "Builds")

> State conduit for modern React apps

## Why?

 - You want to pass state around as props, without prop drilling.
 - You want a clean, minimal API.
 - You want to avoid excess boilerplate.

## Install

```sh
npm install react-matrix --save
```

## Usage

```jsx
import React, { createContext, useState } from 'react';
import { render } from 'react-dom';
import { withProps } from 'react-matrix';

const Counter = ({ amount }) => {
    const [count, setCount] = useState(0);
    const decrement = () => setCount(count => count - amount);
    const increment = () => setCount(count => count + amount);
    return (
        <div>
            <span>{count}</span>
            <button onClick={decrement}>-</button>
            <button onClick={increment}>+</button>
        </div>
    );
};

const Amount = React.createContext();
const CounterWithAmount = withProps(Counter, { amount : Amount });

const AmountAdjuster = (props) => {
    const [amount, setAmount] = useState(1);
    const handleChange = event => setAmount(parseInt(event.currentTarget.value, 10));
    return (
        <Amount.Provider value={amount}>
            <div>
                {props.children}
                <input type="number" value={amount} onChange={handleChange} />
            </div>
        </Amount.Provider>
    );
};

render(
    <AmountAdjuster>
        <div>
            <CounterWithAmount />
        </div>
    </AmountAdjuster>,
    document.getElementById('root')
);
```

## Guide

Here is an example of a counter component that keeps track of the current count in its own state and changes the count by the amount given in the props.

```jsx
const Counter = ({ amount }) => {
    const [count, setCount] = useState(0);
    const decrement = () => setCount(count => count - amount);
    const increment = () => setCount(count => count + amount);
    return (
        <div>
            <span>{count}</span>
            <button onClick={decrement}>-</button>
            <button onClick={increment}>+</button>
        </div>
    );
};
```

So far, this is just plain React. We are using the new Hooks API to keep track of the count, but it's not necessary for any of the examples to work. It's just nice to have.

What's not so nice is when `amount` comes from far away. As in, maybe your `Counter` component is nested deep in your app and it is cumbersome to get access to `amount` - e.g. you have to pass it through many intermediate components. In these examples, we represent the intermediaries with otherwise meaningless `<div>`s. You can imagine `amount` being the current user, or a theme, or other data that is needed practically everywhere in the app.

Thanks to `react-matrix`, we _receive_ the far away data by using the `withProps()` function. It's like [quantum entanglement](https://wikipedia.org/wiki/Quantum_entanglement) or something. Actually, it's just the [Context](https://reactjs.org/docs/context.html) API plus some sugar for wiring up a component to one or more contexts.

```jsx
const Amount = React.createContext();
const CounterWithAmount = withProps(Counter, { amount : Amount });
```

Of course, the data needs to come from somewhere! We _send_ some data by giving it to a context's `Provider`.

```jsx
const AmountAdjuster = (props) => {
    const [amount, setAmount] = useState(1);
    const handleChange = event => setAmount(parseInt(event.currentTarget.value, 10));
    return (
        <Amount.Provider value={amount}>
            <div>
                {props.children}
                <input type="number" value={amount} onChange={handleChange} />
            </div>
        </Amount.Provider>
    );
};
```

That's basically it. We can now render the provider of the `amount` and the component that depends on it in very different places, separated by as many other elements/components as we want (e.g. `<div>`s).

```jsx
render(
    <AmountAdjuster>
        <div>
            <CounterWithAmount />
        </div>
    </AmountAdjuster>,
    document.getElementById('root')
);
```

## API

### withProps(Component, contextMap)

Returns e component that wraps the given `Component` with props for each of the values provided by the contexts in `contextMap`, effectively making `Component` a consumer of those contexts.

This is conceptually similar to the `connect()` function in `react-redux`, if you are familiar with that.

#### Component

Type: `string`<br>

The React component that will receive the context values as props.

#### contextMap

Type: `object`<br>

An object whose keys are prop names to provide to the `Component`, with the values being `Context` objects returned by [`React.createContext()`](https://reactjs.org/docs/context.html#reactcreatecontext).

## Contributing

See our [contributing guidelines](https://github.com/sholladay/react-matrix/blob/master/CONTRIBUTING.md "Guidelines for participating in this project") for more details.

1. [Fork it](https://github.com/sholladay/react-matrix/fork).
2. Make a feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. [Submit a pull request](https://github.com/sholladay/react-matrix/compare "Submit code to this project for review").

## License

[MPL-2.0](https://github.com/sholladay/react-matrix/blob/master/LICENSE "License for react-matrix") © [Seth Holladay](https://seth-holladay.com "Author of react-matrix")

Go make something, dang it.
