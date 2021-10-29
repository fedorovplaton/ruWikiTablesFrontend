import React from 'react';
import {Alert, Button, Checkbox, Modal} from 'antd';
import {CheckboxChangeEvent} from 'antd/es/checkbox';
import {PagesService} from '../../../../service/PagesService';

interface IProps {
    existFiles: string[];
    onDelete: () => void;
}

interface IState {
    isOpen: boolean;
    checked: boolean[];
}

export class DeleteTitleFiles extends React.PureComponent<IProps, IState> {
    state: IState = {
        isOpen: false,
        checked: new Array(this.props.existFiles.length).fill(false)
    }

    onDeleteClick = () => {
        this.setState({isOpen: true});
    }

    onDeleteCancel = () => {
        this.setState({isOpen: false});
    }

    onDeleteOk = () => {
        const checked = this.state.checked;
        const filenames = this.props.existFiles.filter((filename, index) => checked[index]);

        PagesService.deleteFiles(filenames).then(() => {
            this.setState({isOpen: false});
            this.props.onDelete();
        });
    }

    onChange = (index: number) => (e: CheckboxChangeEvent) => {
        const value = e.target.checked;

        this.setState((prevState) => {
            const head = prevState.checked.slice(0, index);
            const tail = prevState.checked.slice(index + 1, prevState.checked.length);

            return {
                checked: head.concat([value], tail)
            };
        });
    }

    render() {
        const checked = this.state.checked;

        return (
            <>
                Delete title files:
                <div><Button onClick={this.onDeleteClick}>Delete</Button></div>
                <Modal
                    visible={this.state.isOpen}
                    onCancel={this.onDeleteCancel}
                    onOk={this.onDeleteOk}
                >
                    <Alert
                        message='Delete title files'
                        description='If you missed with machines count or missed with split title files,
                        then you can delete files except the "titles" and do split again.'
                        type='info'
                        showIcon
                        style={{marginBottom: '16px'}}
                    />
                    {
                        this.props.existFiles.map((filename, index) => {
                            return (
                                <div>
                                    <Checkbox
                                        checked={checked[index]}
                                        key={filename}
                                        onChange={this.onChange(index)}
                                        disabled={filename === 'titles'}
                                    />&nbsp;&nbsp;&nbsp;
                                    {filename}
                                </div>
                            );
                        })
                    }
                </Modal>
            </>
        );
    }
}
