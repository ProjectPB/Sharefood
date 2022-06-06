import React from 'react'
import Select from 'react-select';
import { Option } from '../../../shared/types';

import './styles.scss'

interface Props {
  options: Option[],
  label: string,
  placeholder: string,
  update: (option: Option[]) => void
}

const Special: React.FC<Props> = ({ label, options, update, placeholder }) => {
  return (
    <div className='special'>
      <label>{label}</label>

      <Select
        defaultValue={[]}
        onChange={update}
        classNamePrefix='select'
        isMulti
        name="special"
        options={options}
        placeholder={placeholder}
      />
    </div>
  )
}

export default Special;
