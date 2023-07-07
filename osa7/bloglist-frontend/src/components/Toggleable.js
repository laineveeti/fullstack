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
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.showLabel}</button>
            </div>
            <div style={showWhenVisible} className='toggleableContent'>
                {props.children}
                <br></br>
                <button onClick={toggleVisibility}>{props.hideLabel}</button>
            </div>
        </div>
    );
});

Toggleable.displayName = 'Toggleable';

Toggleable.propTypes = {
    showLabel: PropTypes.string.isRequired,
    hideLabel: PropTypes.string.isRequired
};

export default Toggleable;