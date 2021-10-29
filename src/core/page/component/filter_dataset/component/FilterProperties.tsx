import React from "react";
import {MySliderRange} from "./MySliderRange";
import {MySlider} from "./MySlider";
import {MyCheckbox} from "./MyCheckbox";
import {MyInput} from "./MyInput";
import {MyTagSelect} from "./MyTagSelect";
import {Button, Modal} from "antd";
import {Bubble} from "./Bubble";
import {FilterService} from "../../../../service/FilterService";

interface IProps {
    onSetFilter: () => void;
}

interface IState {
    isOpen: boolean;
}

export class FilterProperties extends React.PureComponent<IProps, IState> {
    state: IState = {
        isOpen: false
    }

    myFilter: Map<string, any> = new Map();

    constructor(props: IProps) {
        super(props);

        this.myFilter.set('cols', [0, 200]);
        this.myFilter.set('rows', [0, 200]);
        this.myFilter.set('empty', [0, 200]);
        this.myFilter.set('rus_ratio', [0, 1]);

        this.myFilter.set('max_empty_ratio_table', 1);
        this.myFilter.set('max_empty_ratio_column', 1);
        this.myFilter.set('min_rus_cel_in_table_ratio', 0);
        this.myFilter.set('min_rus_cel_ratio', 0);
        this.myFilter.set('min_rus_cel_in_col_ratio', 0);
        this.myFilter.set('min_rus_col_ratio', 0);

        this.myFilter.set('dataset_name', 'New dataset');
        this.myFilter.set('not_rus_symbols_pattern', '!([А-Яа-яЁё]+|\\d+)');
        this.myFilter.set('keep_only_pattern', '[А-Яа-яЁё]+|\\d+');

        this.myFilter.set('white_list_table', []);
        this.myFilter.set('black_list_table', []);
        this.myFilter.set('black_list_column', []);
        this.myFilter.set('white_list_column', []);

        this.myFilter.set('skip_only_numbers', false);
        this.myFilter.set('is_keep_only', false);
    }

    onClick = () => {
        this.setState({isOpen: true});
    }

    onCancel = () => {
        this.setState({isOpen: false});
    }

    onOk = () => {
        const filter = this.myFilter;

        FilterService.setFilter({
            min_cols: filter.get('cols')[0],
            max_cols: filter.get('cols')[0],
            min_rows: filter.get('cols')[0],
            max_rows: filter.get('cols')[0],
            min_empty: filter.get('cols')[0],
            max_empty: filter.get('cols')[0],
            min_rus_ratio: filter.get('cols')[0],
            max_rus_ratio: filter.get('cols')[0],

            max_empty_ratio_table: filter.get('max_empty_ratio_table'),
            max_empty_ratio_column: filter.get('max_empty_ratio_column'),
            min_rus_cel_in_table_ratio: filter.get('min_rus_cel_in_table_ratio'),
            min_rus_cel_ratio: filter.get('min_rus_cel_ratio'),
            min_rus_cel_in_col_ratio: filter.get('min_rus_cel_in_col_ratio'),
            min_rus_col_ratio: filter.get('min_rus_col_ratio'),

            dataset_name: filter.get('dataset_name'),
            not_rus_symbols_pattern: filter.get('not_rus_symbols_pattern'),
            keep_only_pattern: filter.get('keep_only_pattern'),

            white_list_table: filter.get('white_list_table'),
            black_list_table: filter.get('black_list_table'),
            white_list_column: filter.get('white_list_column'),
            black_list_column: filter.get('black_list_column'),

            use_white_list_table: filter.get('white_list_table').length > 0,
            use_black_list_table: filter.get('black_list_table').length > 0,
            use_white_list_column: filter.get('white_list_column').length > 0,
            use_black_list_column: filter.get('black_list_column').length > 0,

            skip_only_numbers: filter.get('skip_only_numbers'),
            is_keep_only: filter.get('is_keep_only'),
        }).then(() => {
            this.setState({isOpen: false});
            this.props.onSetFilter();
        });
    }

    onChange = (name: string) => (value: [number, number] | string | boolean | string[] | number) => {
        this.myFilter.set(name, value);
        this.forceUpdate();
    }

    render() {
        return (
            <>
                <div>
                    <Button onClick={this.onClick}> Set filter properties</Button>
                </div>
                <Modal
                    visible={this.state.isOpen}
                    onOk={this.onOk}
                    onCancel={this.onCancel}
                    width={1000}
                >
                    <div style={{padding: '40px'}}>
                        <h3 style={{marginBottom: '16px'}}>
                            Here you can set dataset filter properties
                        </h3>
                        <Bubble>
                            <MySliderRange value={this.myFilter.get('cols')} step={1} onChange={this.onChange('cols')}
                                           description={'columns in table to accept'} min={1} max={200}/>
                            <MySliderRange value={this.myFilter.get('rows')} step={1} onChange={this.onChange('rows')}
                                           description={'rows in table to accept'} min={1} max={200}/>
                            <MySliderRange value={this.myFilter.get('empty')} step={1} onChange={this.onChange('empty')}
                                           description={'empty count in column to accept column'} min={1} max={200}/>
                        </Bubble>

                        <MySliderRange value={this.myFilter.get('rus_ratio')} onChange={this.onChange('rus_ratio')}
                                       description={'russian characters and digits ratio in table to whole length'}/>
                        <MySlider value={this.myFilter.get('max_empty_ratio_table')}
                                  onChange={this.onChange('max_empty_ratio_table')}
                                  description={'skip table with empty cells ratio more than expected'}/>
                        <MySlider value={this.myFilter.get('max_empty_ratio_column')}
                                  onChange={this.onChange('max_empty_ratio_column')}
                                  description={'skip column with empty cells ratio more than expected'}/>
                        <MySlider value={this.myFilter.get('min_rus_cel_in_table_ratio')}
                                  onChange={this.onChange('min_rus_cel_in_table_ratio')}
                                  description={'skip table with russian cells ratio less than expected'}/>
                        <MySlider value={this.myFilter.get('min_rus_cel_ratio')} onChange={this.onChange('min_rus_cel_ratio')}
                                  description={'min russian cell ratio to say that cell is russian'}/>
                        <MySlider value={this.myFilter.get('min_rus_cel_in_col_ratio')}
                                  onChange={this.onChange('min_rus_cel_in_col_ratio')}
                                  description={'skip column with russian cells ratio in column less than expected'}/>
                        <MySlider value={this.myFilter.get('min_rus_col_ratio')} onChange={this.onChange('min_rus_col_ratio')}
                                  description={'skip column with russian ratio more than expected'}/>

                        <MyCheckbox value={this.myFilter.get('is_keep_only')} onChange={this.onChange('is_keep_only')}
                                    description={'need to filter chars in table'}/>
                        <MyCheckbox value={this.myFilter.get('skip_only_numbers')} onChange={this.onChange('skip_only_numbers')}
                                    description={'if true, then will skip columns which contains only numbers'}/>

                        <MyInput value={this.myFilter.get('dataset_name')} onChange={this.onChange('dataset_name')}
                                 description={'dataset name'}/>
                        <MyInput value={this.myFilter.get('not_rus_symbols_pattern')}
                                 onChange={this.onChange('not_rus_symbols_pattern')}
                                 description={'pattern of russian symbols'}/>
                        <MyInput value={this.myFilter.get('keep_only_pattern')} onChange={this.onChange('keep_only_pattern')}
                                 description={'pattern of symbols which need to be persisted'}/>
                        <Bubble>
                            <MyTagSelect value={this.myFilter.get('white_list_table')} onChange={this.onChange('white_list_table')}
                                         options={this.myFilter.get('white_list_table')}
                                         description={'white list of table headers'}/>
                            <MyTagSelect value={this.myFilter.get('black_list_table')} onChange={this.onChange('black_list_table')}
                                         options={this.myFilter.get('black_list_table')}
                                         description={'black list of table headers'}/>
                            <MyTagSelect value={this.myFilter.get('white_list_column')}
                                         onChange={this.onChange('white_list_column')}
                                         options={this.myFilter.get('white_list_column')}
                                         description={'white list of column headers'}/>
                            <MyTagSelect value={this.myFilter.get('black_list_table')} onChange={this.onChange('black_list_table')}
                                         options={this.myFilter.get('black_list_table')}
                                         description={'black list of column headers'}/>
                        </Bubble>
                    </div>

                </Modal>
            </>
        );
    }
}
