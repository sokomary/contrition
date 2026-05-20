import React from 'react';
import { Options, useLogic } from './DatePicker.useLogic';
import { Picker } from './Picker';

export const DatePicker = (props: Options) => <Picker {...useLogic(props)} />;
