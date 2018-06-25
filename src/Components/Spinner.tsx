import * as React from 'react';
import './Spinner.css';

interface ISpinnerProps {
    visible: boolean
    noMargin: boolean
    button: boolean
}

class Spinner extends React.Component<ISpinnerProps, {}> {
    public render() {
        const { visible, noMargin, button } = this.props;
        return <div className={"spinner " + (visible ? "visible" : "invisible") + (noMargin ? "" : " margin") + (button ? " button" : "")} />;
    }
}

export default Spinner;