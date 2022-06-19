import React, { useRef } from 'react'
import Select from 'react-select';
import { Option } from '../../../shared/types';

import './../../forms/Select/styles.scss';

interface Props {
  options: Option[],
  label: string,
  placeholder: string,
  update: (option: Option[]) => void
}

const Special: React.FC<Props> = ({ label, options, update, placeholder }) => {
  const selectRef = useRef<any>();

  return (
    <fieldset className='select' tabIndex={1} onFocus={() => selectRef.current.focus()}>
      <legend>{label}</legend>

      <Select
        defaultValue={[]}
        onChange={update}
        classNamePrefix='field'
        isMulti
        name="special"
        options={options}
        placeholder={placeholder}
      />
    </fieldset>
  )
}

export default Special;
