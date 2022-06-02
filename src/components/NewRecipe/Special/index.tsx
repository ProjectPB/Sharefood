import React from 'react'
import Select from 'react-select';
import { Option } from '../../../shared/types';
import { options } from './config';

import './styles.scss'

interface Props {
  label: string,
  update: (option: Option[]) => void
}

const Special: React.FC<Props> = ({ label, update }) => {
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
      />
    </div>
  )
}

export default Special;
