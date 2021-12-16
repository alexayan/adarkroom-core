import config from './config';
import Polyglot from 'node-polyglot';
import _ from 'lodash';

_.templateSettings.interpolate = /{([\s\S]+?)}/

type Tester = {
    match: RegExp,
    template: string,
    interpolcation: (text: string, templateKeys: string[], keys: string[]) => string,
    keys: string[]
}

let translation = new Polyglot();
let superInterpolation = [] as Tester[];
let cache = {} as { [key: string]: string };

const R_Match_Super_Interpolcation_raw = /\\{\w+\\}/g;

function escapeStringRegexp(string: string) {
    if (typeof string !== 'string') {
        throw new TypeError('Expected a string');
    }
    return string
        .replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
        .replace(/-/g, '\\x2d');
}

export function setTranslation(strings: { [key: string]: string }) {
    translation = new Polyglot();
    translation.extend(strings);
    superInterpolation = [];
    cache = {};
    Object.keys(strings).forEach((key) => {
        const r = /{(.+?)}/g;
        let match = r.exec(key);
        const keys = [];
        while (match) {
            keys.push(match[1])
            match = r.exec(key)
        }
        if (keys.length > 0) {
            const reg = escapeStringRegexp(key).replace(R_Match_Super_Interpolcation_raw, '(.+?)');
            superInterpolation.push({
                match: new RegExp(`^${reg}$`),
                interpolcation: (template: string, templateKeys: string[], keys: string[]) => {
                    const ctx = {} as any;
                    templateKeys.forEach(function (key, index) {
                        ctx[key] = translate(keys[index]);
                    });
                    return template.replace(/{(.+?)}/g, (_, key) => {
                        return typeof ctx[key] === 'undefined' ? key : ctx[key];
                    })
                },
                template: strings[key],
                keys: keys
            })
        }
    })
    superInterpolation.sort((a, b) => {
        return b.template.length - a.template.length;
    })
}

export function translate(text: string, options?: number | Polyglot.InterpolationOptions) {
    if (cache[text]) {
        return cache[text];
    }
    if (!isNaN(Number(text))) {
        return text;
    }
    if (config.items[text]) {
        text = config.items[text].name;
    } else if (config.Outside.INCOME[text as keyof typeof config.Outside.INCOME]) {
        text = config.Outside.INCOME[text as keyof typeof config.Outside.INCOME].name;
    } else {
        for (let i = 0, len = superInterpolation.length; i < len; i++) {
            const tester = superInterpolation[i];
            const match = tester.match.exec(text);
            tester.match.lastIndex = 0;
            if (match) {
                const res = tester.interpolcation(tester.template, tester.keys, match.slice(1));
                cache[text] = res;
                return res;
            }
        }
    }
    const res = translation.t(text, options);
    cache[text] = res;
    return res;
}