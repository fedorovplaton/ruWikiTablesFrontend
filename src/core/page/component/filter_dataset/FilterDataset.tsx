import React from "react";
import {Col, Row, Slider} from "antd";
import {MySliderRange} from "./component/MySliderRange";
import {MyCheckbox} from "./component/MyCheckbox";
import {MyInput} from "./component/MyInput";
import {MyTagSelect} from "./component/MyTagSelect";
import {Filter} from "../../../types/Filter";
import {MySlider} from "./component/MySlider";
import {FilterProperties} from "./component/FilterProperties";
import {Download} from "../../../component/download/Download";
import {TitlesService} from "../../../service/TitlesService";
import {DownloadStore} from "../../../store/DownloadStore";

interface IProps {
    stepDescription: string;
    store: DownloadStore;
}

export class FilterDataset extends React.PureComponent<IProps> {
    render() {
        return (
            <div>
                <FilterProperties onSetFilter={() => {}}/>
                <Download
                    description={'Filtering dataset'}
                    store={this.props.store}
                    start={TitlesService.startDownload}
                    stop={TitlesService.stopDownload}
                />
            </div>
        );
    }
}
