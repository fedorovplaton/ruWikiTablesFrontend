import React from "react";
import {Button, Steps, Layout} from 'antd'
import {DownloadStore} from "../store/DownloadStore";
import {TitlesService} from "../service/TitlesService";
import {PagesService} from "../service/PagesService";
import {Download} from "../component/download/Download";
import 'antd/dist/antd.css';
import './MainPage.css'
import {ParsePages} from "./component/parse_pages/ParsePages";
import {FilterDataset} from "./component/filter_dataset/FilterDataset";

const { Step } = Steps;

interface IState {
    step: number;
}

export  class MainPage extends React.PureComponent {
    state: IState = {
        step: 0
    };

    titlesDownloadStore: DownloadStore = new DownloadStore(
        TitlesService.getStatus
    );

    pagesDownloadStore: DownloadStore = new DownloadStore(
        PagesService.getStatus
    );

    private readonly steps = [
        {
            title: 'Titles'
        },
        {
            title: 'Tables'
        },
        {
            title: 'Dataset'
        },
    ];

    isNextDisabled = (): boolean => {
        return false;
    }

    next = ():void  => {
        this.setState((prevState: IState) => {
            return {step: prevState.step + 1}
        })
    }

    prev = (): void => {
        this.setState((prevState: IState) => {
            return {step: prevState.step - 1}
        })
    }

    render(): JSX.Element {
        const step = this.state.step;
        const steps = this.steps;

        return (
            <>
                <Layout.Header className={'main-header'}>
                    RuWikiTables
                </Layout.Header>
                <Layout.Content className={'main-content'}>
                    <div className={'main-description'}>
                        The extraction of tables from the Russian Wikipedia consists of two stages.
                        The first stage is extracting all page titles of the Russian Wikipedia.
                        The second stage is the downloading and parsing of pages html markup.
                        After that, it becomes possible to create a dataset by selecting what should or should
                        not be in it (The presence of numeric data and cells with text in English or Russian,
                        restrictions on the number of rows and columns, etc)
                    </div>
                    <div className={'main-steps'}>
                        <Steps current={this.state.step}>
                            {this.steps.map(item => (
                                <Step key={item.title} title={item.title} />
                            ))}
                        </Steps>
                        <div>
                            {this.state.step === 0 && (
                                <Download
                                    description={'Page titles downloading'}
                                    store={this.titlesDownloadStore}
                                    start={TitlesService.startDownload}
                                    stop={TitlesService.stopDownload}
                                />
                            )}
                            {this.state.step === 1 && <ParsePages store={this.pagesDownloadStore}/>}
                            {this.state.step === 2 && <FilterDataset store={this.titlesDownloadStore} stepDescription={'DATASET GENERATOR DESCRIPTION'}/>}
                        </div>
                        <div style={{marginLeft: 'auto'}}>
                            {step === steps.length - 1 && (
                                <Button type="primary">
                                    Done
                                </Button>
                            )}
                            {step > 0 && (
                                <Button style={{ margin: '0 8px' }} onClick={this.prev}>
                                    Previous
                                </Button>
                            )}
                            {step < steps.length - 1 && (
                                <Button type="primary" onClick={this.next} disabled={this.isNextDisabled()}>
                                    Next
                                </Button>
                            )}
                        </div>
                    </div>
                </Layout.Content>
                <Layout.Footer className={'main-footer'}>
                    Authors: Platon Fedorov, Alexey Mironov, George Chernishev
                </Layout.Footer>
            </>
        );
    }
}
