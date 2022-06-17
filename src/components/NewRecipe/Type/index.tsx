import React from 'react';
import Select from 'react-select';
import { Option } from '../../../shared/types';

interface Props {
  options: Option[],
  label: string,
  placeholder: string
  update: (option: Option) => void;
}

const Type: React.FC<Props> = ({ label, options, placeholder, update }) => {

  return (
    <div className="type">
      <label>{label}</label>

      <Select
        onChange={update}
        defaultValue={[]}
        options={options}
        classNamePrefix='select'
        placeholder={placeholder}
      />
    </div>
  )
}

export default Type;