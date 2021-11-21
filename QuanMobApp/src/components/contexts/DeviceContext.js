import * as React from 'react';

const DeviceContext = React.createContext();

const DeviceProvider = (props) => {

    const device = props.value; // stores the values sent without the extra wrapper that's added

    /*
    React.useEffect(()  => { // uncomment to see what passed values look like
        console.log('CONTEXT: ', device)
    })
    */

    return (
        <DeviceContext.Provider value={device}>
            {props.children}
        </DeviceContext.Provider>
    );
}

export { DeviceContext, DeviceProvider };
