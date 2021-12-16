import Polyglot from 'node-polyglot';
export declare function setTranslation(strings: {
    [key: string]: string;
}): void;
export declare function translate(text: string, options?: number | Polyglot.InterpolationOptions): string;
