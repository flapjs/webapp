import React from 'react';
import PropTypes from 'prop-types';
import Style from './FlexibleOrientationLayout.module.css';

const RESIZE_MEDIA_QUERY = '(max-width: 500px)';

/**
 * A React component that takes a function as its child and
 * orientate itself on resize based on the passed-in media query.
 */
class FlexibleOrientationLayout extends React.Component
{
    constructor(props)
    {
        super(props);

        // Makes sure the first state is always correctly orientated.
        const orientation = FlexibleOrientationLayout.computeOrientation();

        this.state = {
            orientation,
            resize: false,
        };
        
        //Used to manage resize updates
        this._resizeTimeout = null;

        this.onWindowResize = this.onWindowResize.bind(this);
    }

    /** @override */
    componentDidMount()
    {
        window.addEventListener('resize', this.onWindowResize, false);
    }

    /** @override */
    componentWillUnmount()
    {
        window.removeEventListener('resize', this.onWindowResize);
    }

    onWindowResize(e)
    {
        if (!this._resizeTimeout)
        {
            if (!this.state.resize) this.setState({ resize: true });
            this._resizeTimeout = setTimeout(() =>
            {
                this._resizeTimeout = null;
                if (this.state.resize) this.setState({ resize: false });
            },
            this.props.resizeDelay);
        }

        const orientation = FlexibleOrientationLayout.computeOrientation();
        if (orientation !== this.state.orientation)
        {
            this.setState({ orientation });
        }
    }

    static computeOrientation()
    {
        if (window.matchMedia(RESIZE_MEDIA_QUERY).matches)
        {
            return 'column';
        }
        else
        {
            return 'row';
        }
    }

    /** @override */
    render()
    {
        const props = this.props;
        const state = this.state;

        return (
            <div className={Style.container
                + (props.className || '')
                + (state.resize ? ' resizing' : '')}>
                {props.children.call(null, state.orientation)}
            </div>
        );
    }
}

FlexibleOrientationLayout.propTypes = {
    className: PropTypes.string,
    children: PropTypes.func.isRequired,
    resizeDelay: PropTypes.number,
};
FlexibleOrientationLayout.defaultProps = {
    resizeDelay: 300,
};

export default FlexibleOrientationLayout;
