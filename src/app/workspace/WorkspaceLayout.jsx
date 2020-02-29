import React from 'react';
import PropTypes from 'prop-types';
import Style from './WorkspaceLayout.module.css';

/**
 * A React component that separates into 2 layers: foreground and background.
 * This is usally used with other layouts to provide an overlay over a
 * background, which will usually contain the editor playground.
 */
export default class WorkspaceLayout extends React.PureComponent
{
    /** @override */
    render()
    {
        const { renderForeground, renderBackground } = this.props;
        
        return (
            <section className={Style.container}>
                <div className={Style.background}>
                    {renderBackground()}
                </div>
                {this.props.children}
                <div className={Style.foreground}>
                    {renderForeground()}
                </div>
            </section>
        );
    }
}

WorkspaceLayout.propTypes = {
    children: PropTypes.node,
    renderForeground: PropTypes.func,
    renderBackground: PropTypes.func,
};
WorkspaceLayout.defaultProps = {
    renderBackground: () => '== _____.Back ==',
    renderForeground: () => '== Fore._____ ==',
};
