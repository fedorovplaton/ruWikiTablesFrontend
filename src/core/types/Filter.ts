export type Filter = {
    min_cols: number // ok
    max_cols: number // ok
    min_rows: number,// ok
    max_rows: number,
    min_empty: number,// ok
    max_empty: number,
    min_rus_ratio: number,// ok
    max_rus_ratio: number,// ok

    max_empty_ratio_table:[number, number],// ok
    max_empty_ratio_column: [number, number],// ok
    min_rus_cel_in_table_ratio: [number, number],// ok
    min_rus_cel_ratio: [number, number],// ok
    min_rus_cel_in_col_ratio: [number, number],// ok
    min_rus_col_ratio: [number, number],// ok

    dataset_name: string,// ok
    not_rus_symbols_pattern: string,// ok
    keep_only_pattern: string,// ok

    white_list_table: string[],// ok
    black_list_table: string[],// ok
    black_list_column: string[],// ok
    white_list_column: string[],// ok

    use_white_list_table: boolean,
    use_black_list_table: boolean,
    use_black_list_column: boolean,
    use_white_list_column: boolean,

    skip_only_numbers: boolean,// ok
    is_keep_only: boolean,// ok
}
