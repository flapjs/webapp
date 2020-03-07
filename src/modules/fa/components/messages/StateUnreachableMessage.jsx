import React from 'react';
import PropTypes from 'prop-types';

import LocaleString from '@flapjs/util/localization/LocaleString.jsx';
import ErrorMessage from '@flapjs/deprecated/services/notification/components/messages/ErrorMessage.jsx';

class StateUnreachableMessage extends React.Component
{
    constructor(props)
    {
        super(props);

        this.targetIndex = 0;
        this.targetLabel = '';
        const targets = props.content;
        for (const target of targets)
        {
            if (this.targetLabel.length > 0)
            {
                this.targetLabel += ', ';
            }
            this.targetLabel += target.getNodeLabel();
        }

        this.onClick = this.onClick.bind(this);
    }

    onClick(e)
    {
        /*
        const notification = this.props.notification;
        const message = this.props.message;
        const app = this.props.app;
        const graphController = this.props.graphController;

        switch (e.target.value)
        {
            case 'locate':
                {
                //Locate the target node
                    const target = message[this.targetIndex++];
                    if (this.targetIndex >= message.length)
                    {
                        this.targetIndex = 0;
                    }

                    //Move pointer to target
                    // const graphView = app.getSession().getCurrentModule().getGraphView();
                    // graphView.moveViewToPosition(target.x, target.y);
                }
                break;
            case 'deleteall':
                {
                    // const targets = message;
                    //Delete all target nodes
                    // graphController.deleteTargetNodes(targets);

                    //Sort the nodes after deleting if enabled...
                    // graphController.applyAutoRename();

                    //Exit the message
                    // notification.close();
                }
                break;
        }
        */
    }

    /** @override */
    render()
    {
        const props = this.props;
        return (
            <ErrorMessage
                notification={props.notification}
                content="message.warning.unreachable"
                onClose={props.onClose}>
                <p>
                    {this.targetLabel}
                </p>
                <button value="locate" onClick={this.onClick}>
                    <LocaleString entity="message.action.locate" />
                </button>
                <button value="deleteall" onClick={this.onClick}>
                    <LocaleString entity="message.action.deleteall" />
                </button>
            </ErrorMessage>
        );
    }
}
StateUnreachableMessage.propTypes = {
    notification: PropTypes.object.isRequired,
    content: PropTypes.array,
    onClose: PropTypes.func,
};

export default StateUnreachableMessage;
