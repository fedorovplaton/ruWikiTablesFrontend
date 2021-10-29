import React, {ChangeEvent} from "react";
import {Checkbox, Col, Input, Row} from "antd";
import {CheckboxChangeEvent} from "antd/es/checkbox";

interface IProps {
    description: string
    interactiveSpan?: number;
    textSpan?: number;

    value: string;
    onChange: (value: string) => void;
}

export class MyInput extends React.PureComponent<IProps> {
    onChange =  (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
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
                    <Input
                        onChange={this.onChange}
                        value={value}
                    />
                </Col>
            </Row>
        );
    }

}
