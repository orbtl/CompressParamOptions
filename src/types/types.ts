// Type definitions for compress-param-options

export type StringOptionMap = Record<string, string>;
export type NumberOptionMap = Record<number, string>;
export type ArrayOptionMap = string[];
export type OptionMap = StringOptionMap | NumberOptionMap | ArrayOptionMap;
export type SelectedOptions = Set<string>;