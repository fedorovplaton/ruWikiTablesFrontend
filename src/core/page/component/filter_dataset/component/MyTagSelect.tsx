import React, {ChangeEvent} from "react";
import {Checkbox, Col, Input, Row, Select} from "antd";
import {CheckboxChangeEvent} from "antd/es/checkbox";

interface IProps {
    description: string
    interactiveSpan?: number;
    textSpan?: number;

    value: string[];
    options: string[];
    onChange: (value: string[]) => void;
}

export class MyTagSelect extends React.PureComponent<IProps> {
    onChange =  (value: string[]) => {
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
                    <Select
                        mode={'tags'}
                        onChange={this.onChange}
                        value={value}
                        style={{width:'100%'}}
                    >
                        {
                            this.props.options.map((option) => {
                                return (<Select.Option value={option}>{option}</Select.Option>);
                            })
                        }
                    </Select>
                </Col>
            </Row>
        );
    }

}
