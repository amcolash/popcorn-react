import * as React from 'react';
import './Spinner.css';

class Spinner extends React.Component {
    render() {
        const { visible, noMargin, button } = this.props;
        return <div className={"spinner " + (visible ? "visible" : "invisible") + (noMargin ? "" : " margin") + (button ? " button" : "")}></div>;
    }
}

export default Spinner;