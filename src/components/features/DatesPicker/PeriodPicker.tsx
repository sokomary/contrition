import React from 'react';
import { useLogic, Options } from './PeriodPicker.useLogic';
import { Picker } from './Picker';

export const PeriodPicker = (props: Options) => <Picker {...useLogic(props)} />;
