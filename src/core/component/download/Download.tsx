import React from 'react';
import {Status} from '../../types/Status';
import {Button, Progress} from 'antd';
import {DownloadStore} from '../../store/DownloadStore';
import './Donwload.css';
import {TimeUtil} from '../../utils/TimeUtil';
import {TitlesService} from '../../service/TitlesService';

interface IProps {
    description: string;
    store: DownloadStore;
    start: () => Promise<Status>;
    stop: () => Promise<Status>;
}

interface IState {
    isLoading: boolean;
    isFinished: boolean;
    isDisabled: boolean;
    totalCount: number;
    downloadedCount: number;
    approximateTime: number;
}

export class Download extends React.PureComponent<IProps, IState> {
    state: IState = {
        isLoading: false,
        isFinished: false,
        isDisabled: false,
        totalCount: 0,
        downloadedCount: 0,
        approximateTime: 0
    };

    async componentDidMount(): Promise<void> {
        const status = await this.props.store.status();

        this.onStatusUpdate(status);
    }

    onStatusUpdate = (status: Status): void => {
        this.setState({
            isLoading: status.isLoading,
            isFinished: status.isFinished,
            totalCount: status.totalCount,
            downloadedCount: status.downloadedCount,
            approximateTime: status.approximateTime !== undefined ? status.approximateTime : 99999999
        });
    }

    onButtonClick = (): void => {
        if (this.state.isLoading) {
            this.props.stop().then((status) => {
                this.onStatusUpdate(status);
                this.props.store.unsubscribe();
            });
        } else {
            this.props.start().then((status) => {
                this.onStatusUpdate(status);
                this.props.store.subscribe(this.onStatusUpdate);
            })
        }
    }

    render(): JSX.Element {
        const totalCount = this.state.totalCount;
        const downloadedCount = this.state.downloadedCount;
        const approximateTime = TimeUtil.formatTimeFromSeconds(this.state.approximateTime);
        const progress = totalCount === 0 ?
            0 : parseFloat((downloadedCount / totalCount * 100).toFixed(3));

        return (
            <div>
                <h3>
                    {this.props.description}
                </h3>
                <div className={'content'}>
                    <div>
                        <div>
                            Total:&nbsp;{totalCount}
                        </div>
                        <div>
                            Done:&nbsp;{downloadedCount}
                        </div>
                        <div>
                            Approximate waiting time:&nbsp;{approximateTime}
                        </div>

                        <Button
                            style={{marginTop: '20px'}}
                            onClick={this.onButtonClick}
                            disabled={this.state.isDisabled}
                        >
                            {this.state.isLoading ? 'Stop' : 'Start'}
                        </Button>
                    </div>
                    <div className={'progressContainer'}>
                        <Progress type='circle' percent={progress}/>
                    </div>
                </div>
            </div>
        );
    }
}
