import React, { useContext } from 'react';

export const withProps = (Component, contextMap) => {
    return (props) => {
        const contextProps = Object.entries(contextMap).reduce((accum, [key, Context]) => {
            accum[key] = useContext(Context);
            return accum;
        }, {});
        return (
            <Component
                {...contextProps}
                {...props}
            />
        );
    };
};
