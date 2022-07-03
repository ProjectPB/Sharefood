import React from 'react';
import Select from 'react-select';
import { Option } from '../../../shared/types';

import './styles.scss';

interface Props {
  type: string,
  label: string,
  filters: {
    label: string;
    value: string;
  }[],
  update: (val: Option) => void
  value: Option
}

const CustomSelect: React.FC<Props> = ({ type, label, filters, update, value }) => {
  return (
    <div className='filter'>
      <p>{label}</p>

      <Select
        onChange={update}
        classNamePrefix='field'
        options={filters}
        name={type}
        value={value}
      />
    </div>
  )
}

export default CustomSelect;