import { PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import config from '../../../config';

function getDefaultValue(v: any) {
  let defaultValue: any = 0;
  if (typeof v === 'boolean') {
    defaultValue = false;
  } else if (typeof v === 'string') {
    defaultValue = '';
  } else if (v === null) {
    defaultValue = null;
  }
  return defaultValue;
}

function clean(obj: any, prop?: string) {
  if (!prop) {
    return Object.keys(obj).forEach(key => {
      clean(obj, key);
    });
  }
  const value = _.get(obj, prop);
  if (_.isObject(value)) {
    if (_.isEmpty(value)) {
      delete obj[prop];
    }
    for (let i in value) {
      clean((value as any)[i], i);
    }
  }
}

export default {
  clean(state: any, action: PayloadAction<string | undefined>) {
    clean(state, action.payload);
  },
  removeM(state: any, action: PayloadAction<string[]>) {
    action.payload.forEach(key => {
      _.unset(state, key);
    });
  },
  set(_: any, action: PayloadAction<any>) {
    const defaultValue = getDefaultValue(action.payload);
    return action.payload || defaultValue;
  },
  setM(state: any, action: PayloadAction<{ [key: string]: any }>) {
    for (const key in action.payload) {
      if (typeof action.payload[key] === 'undefined') {
        _.set(state, key, undefined);
      } else {
        const defaultValue = getDefaultValue(action.payload[key]);
        _.set(state, key, action.payload[key] || defaultValue);
      }
    }
  },
  addM(state: any, action: PayloadAction<{ [key: string]: any }>) {
    for (const key in action.payload) {
      _.set(
        state,
        key,
        Math.min(Math.max(_.get(state, key, 0) +
          (action.payload[key] || 0), 0), config.Engine.MAX_STORE)
      );
    }
  },
};
