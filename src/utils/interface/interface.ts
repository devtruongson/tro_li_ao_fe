export interface IResponse<T> {
    code: number;
    match_query: number;
    match_ai: number;
    is_table: boolean;
    is_mark_down: boolean;
    msg: string;
    data: T;
    is_ai: true;
    is_point: boolean;
    is_video: boolean;
}

export interface IMarkDown {
    title: string;
    content_mark_down: string;
    content_html: string;
}
