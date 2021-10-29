import React from "react";
import {Col, Row, Slider} from "antd";

interface IProps {
    description: string
    interactiveSpan?: number;
    textSpan?: number;
    min?: number;
    max?: number;
    step?: number;

    value: [number, number];
    onChange: (value: [number, number]) => void;
}

export class MySliderRange extends React.PureComponent<IProps> {
    render() {
        /*
         * By default render [0, 1]
         */
        const interactiveSpan = this.props.interactiveSpan ? this.props.interactiveSpan : 12;
        const textSpan = this.props.textSpan ? this.props.textSpan : 12;
        const min = this.props.min ? this.props.min : 0;
        const max = this.props.max ? this.props.max : 1;
        const step = this.props.step ? this.props.step : 0.01;
        const value = this.props.value;

        return (
            <Row style={{marginBottom: '8px'}}>
                <Col span={textSpan}>
                    {this.props.description}
                </Col>
                <Col span={interactiveSpan}>
                    <Slider
                        min={min}
                        max={max}
                        step={step}
                        range={true}
                        onChange={this.props.onChange}
                        value={value}
                    />
                </Col>
            </Row>
        );
    }

}
