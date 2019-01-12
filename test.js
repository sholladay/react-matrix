import test from 'ava';
import React, { createContext, useState } from 'react';
import { render } from 'react-dom';
import { Simulate } from 'react-dom/test-utils';
import PropTypes from 'prop-types';
import { JSDOM } from 'jsdom';
import { withProps } from '.';

test.beforeEach(() => {
    global.window = (new JSDOM()).window;
    global.document = window.document;
    const appRoot = document.createElement('div');
    appRoot.id = 'app';
    document.body.appendChild(appRoot);
});

test.serial('withProps passes context values', (t) => {
    const Counter = ({ amount }) => {
        const [count, setCount] = useState(0);
        const decrement = () => {
            setCount((currentCount) => {
                return currentCount - amount;
            });
        };
        const increment = () => {
            setCount((currentCount) => {
                return currentCount + amount;
            });
        };
        return (
            <div>
                <span>{count}</span>
                <button type="button" onClick={decrement}>-</button>
                <button type="button" onClick={increment}>+</button>
            </div>
        );
    };
    Counter.propTypes = {
        amount : PropTypes.number.isRequired
    };

    const Amount = createContext();
    const CounterWithAmount = withProps(Counter, { amount : Amount });

    const AmountAdjuster = (props) => {
        const [amount, setAmount] = useState(1);
        const handleChange = ({ currentTarget }) => {
            setAmount(parseInt(currentTarget.value, 10));
        };
        return (
            <Amount.Provider value={amount}>
                <div>
                    {props.children}
                    <input type="number" value={amount} onChange={handleChange} />
                </div>
            </Amount.Provider>
        );
    };
    AmountAdjuster.propTypes = {
        children : PropTypes.element.isRequired
    };

    render(
        <AmountAdjuster>
            <div>
                <CounterWithAmount />
            </div>
        </AmountAdjuster>,
        document.getElementById('app')
    );
    const amountInput = document.querySelector('input');
    const [decrementButton, incrementButton] = document.querySelectorAll('button');
    const countSpan = document.querySelector('span');
    t.is(amountInput.value, '1');
    t.is(countSpan.textContent, '0');
    incrementButton.click();
    t.is(amountInput.value, '1');
    t.is(countSpan.textContent, '1');
    amountInput.value = '3';
    Simulate.change(amountInput);
    decrementButton.click();
    decrementButton.click();
    t.is(countSpan.textContent, '-5');
});
