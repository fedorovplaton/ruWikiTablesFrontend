import React from "react";
import {Checkbox, Col, Row} from "antd";
import {CheckboxChangeEvent} from "antd/es/checkbox";

interface IProps {
    description: string
    interactiveSpan?: number;
    textSpan?: number;

    value: boolean;
    onChange: (value: boolean) => void;
}

export class MyCheckbox extends React.PureComponent<IProps> {
    onChange =  (e: CheckboxChangeEvent) => {
        const value = e.target.checked;
        this.props.onChange(value);
    }

    render() {
        const interactiveSpan = this.props.interactiveSpan ? this.props.interactiveSpan : 12;
        const textSpan = this.props.textSpan ? this.props.textSpan : 12;
        const value = this.props.value;

        return (
            <Row style={{marginBottom: '8px'}}>
                <Col span={textSpan}>
                    {this.props.description}
                </Col>
                <Col span={interactiveSpan}>
                    <Checkbox
                        onChange={this.onChange}
                        checked={value}
                    />
                </Col>
            </Row>
        );
    }

}
