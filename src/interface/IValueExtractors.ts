

export interface IValueExtractor<T = any> {
    (str: string): T
}

export interface IValueExtractors {
    [key: string]: IValueExtractor;
}
