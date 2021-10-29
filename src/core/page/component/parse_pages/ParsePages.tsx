import {DownloadStore} from "../../../store/DownloadStore";
import React, {ChangeEvent} from "react";
import {Alert, Button, Form, Input, InputNumber, Modal, Select} from "antd";
import {Download} from "../../../component/download/Download";
import {PagesService} from "../../../service/PagesService";
import {DeleteTitleFiles} from "./component/DeleteTitleFiles";

interface IProps {
    store: DownloadStore;
}

interface IState {
    isSplitOpen: boolean;
    machineCount: number;
    splitNames: string[];
    existFiles: string[];
    selectedFile: string | undefined;
    error: string | undefined;
}

export class ParsePages extends React.PureComponent<IProps, IState> {
    state: IState = {
        isSplitOpen: false,
        machineCount: 2,
        splitNames: ['titles_part_0', 'titles_part_1'],
        selectedFile: undefined,
        error: undefined,
        existFiles: []
    };

    async componentDidMount() {
        const filenames = await PagesService.getFilenames();

        this.setState({existFiles: filenames});
    }

    onDelete = () => {
        PagesService.getFilenames().then((filenames) => {
            this.setState({
                isSplitOpen: false,
                machineCount: 2,
                splitNames: ['titles_part_0', 'titles_part_1'],
                selectedFile: undefined,
                error: undefined,
                existFiles: filenames
            });
        });
    }

    onSplitClick = () => {
        this.setState({isSplitOpen: true});
    }

    onSplitClose = () => {
        this.setState({isSplitOpen: false});
    }

    onSplitOk = () => {
        const existFiles = this.state.existFiles;
        const splitNames = this.state.splitNames;
        const hasUniqueError = (new Set(splitNames)).size !== splitNames.length;
        const hasDuplicateWithExistFiles = splitNames.some((name) => existFiles.includes(name));
        const hasEmptyError = !splitNames.every((name) => name);

        if (hasEmptyError) {
            this.setState({error: `Names shouldn't be empty`});
        } else if (hasUniqueError) {
            this.setState({error: `Names should be unique`});
        } else if (hasDuplicateWithExistFiles) {
            this.setState({error: `Some of filenames already exist`})
        } else {
            const selectedFile = this.state.selectedFile;

            if (selectedFile) {
                PagesService.splitFile(selectedFile, this.state.machineCount, splitNames).then((filenames) => {
                    this.setState({
                        isSplitOpen: false,
                        machineCount: 2,
                        splitNames: ['titles_part_0', 'titles_part_1'],
                        selectedFile: undefined,
                        error: undefined,
                        existFiles: filenames
                    });
                });
            }

        }
    }

    onMachineCountChange = (machineCount: number) => {
        const value = parseInt(machineCount.toString());

        this.setState((prevState) => {
            let splitNames = [];

            if (value > prevState.splitNames.length) {
                splitNames = prevState.splitNames.slice();

                for (let i = prevState.splitNames.length; i < value; i++) {
                    splitNames.push(`titles_part_${i}`)
                }

            } else {
                splitNames = prevState.splitNames.slice(0, value);
            }

            return {
                machineCount: value,
                splitNames: splitNames
            }
        });
    }

    onChangeSplitName = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;

        this.setState((prevState) => {
            const head = prevState.splitNames.slice(0, index);
            const tail = prevState.splitNames.slice(index + 1, prevState.splitNames.length);

            return {
                splitNames: head.concat([value], tail)
            };
        });
    }

    onFileChange = (value: string) => {
        this.setState({selectedFile: value});
    }

    render() {
        const splitNames = this.state.splitNames;
        const selectedFile = this.state.selectedFile;
        const error = this.state.error;
        const existFiles = this.state.existFiles;

        return (
            <>
                <div>
                    Choose file with titles:
                    <Select value={selectedFile} style={{ width: '100%'}} onChange={this.onFileChange}>
                        {
                            existFiles.map((filename) => {
                                return <Select.Option key={filename} value={filename}>{filename}</Select.Option>
                            })
                        }
                    </Select>
                </div>
                {
                    selectedFile !== undefined && (
                        <>
                            Split downloading on N machines (not necessary):
                            <div><Button onClick={this.onSplitClick}>Split</Button></div>
                            <DeleteTitleFiles existFiles={existFiles} onDelete={this.onDelete}/>
                            <Download
                                description={'Pages parsing'}
                                store={this.props.store}
                                start={() => PagesService.startDownload(selectedFile)}
                                stop={PagesService.stopDownload}
                            />
                        </>
                    )
                }
                <Modal
                    visible={this.state.isSplitOpen}
                    onCancel={this.onSplitClose}
                    onOk={this.onSplitOk}
                >
                    <Alert
                        message="Split description"
                        description="Here you can split the loading of your pages into N machines. When you divide
                            the list ofpages into N parts, you will be able to select the necessary parts to download.
                            At one time,you can download only 1 part on one machine."
                        type="info"
                        showIcon
                        style={{marginBottom: '16px'}}
                    />
                    <Alert
                        message={'Exist files'}
                        description={existFiles.join(', ')}
                        type={'warning'}
                        style={{marginBottom: '16px'}}
                    />
                    <span>Number of machines: &nbsp;&nbsp;&nbsp;</span>
                    <InputNumber
                        onChange={this.onMachineCountChange}
                        value={this.state.machineCount}
                        min={2}
                        max={20}
                    />
                    <div style={{marginBottom: '8px'}}>Names:</div>
                    {
                        splitNames.map((splitName, index) => {
                            return (
                                <Input
                                    key={index}
                                    value={splitName}
                                    onChange={this.onChangeSplitName(index)}
                                    style={{marginBottom: '8px'}}
                                    required={true}
                                />
                            );
                        })
                    }
                    {error !== undefined && <Alert message={this.state.error} type={'error'}/>}
                </Modal>
            </>
        );
    }
}
