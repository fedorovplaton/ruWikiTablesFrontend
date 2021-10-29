import React from "react";

export class Bubble extends React.PureComponent {
    render() {
        return (
            <div style={{marginBottom: '10px', backgroundColor: '#bae7ff', borderRadius: '6px'}}>
                {this.props.children}
            </div>
        );
    }
}
