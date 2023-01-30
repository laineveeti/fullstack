import { useState, useImperativeHandle, forwardRef } from 'react';
import PropTypes from 'prop-types';

const Toggleable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = { display: visible ? 'none' : '' };
    const showWhenVisible = { display: visible ? '' : 'none' };

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    useImperativeHandle(ref, () => {
        return { toggleVisibility };
    });

    return (
        <>
            <span style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.showLabel}</button>
            </span>
            <span style={showWhenVisible}>
                <button onClick={toggleVisibility}>{props.hideLabel}</button>
            </span>
            <div style={showWhenVisible}>
                {props.children}
            </div>
        </>
    );
});

Toggleable.displayName = 'Toggleable';

Toggleable.propTypes = {
    showLabel: PropTypes.string.isRequired
};

export default Toggleable;