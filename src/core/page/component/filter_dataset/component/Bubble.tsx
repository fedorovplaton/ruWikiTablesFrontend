import React from "react";

export class Bubble extends React.PureComponent {
    render() {
        return (
            <div style={{marginBottom: '10px'}}>
                {this.props.children}
            </div>
        );
    }
}
