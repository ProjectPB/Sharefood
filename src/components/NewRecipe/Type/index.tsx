import React, { useRef } from 'react';
import Select from 'react-select';
import { Option } from '../../../shared/types';

import './styles.scss';

interface Props {
  options: Option[],
  label: string,
  placeholder: string
  update: (option: Option) => void;
}

const Type: React.FC<Props> = ({ label, options, placeholder, update }) => {
  const selectRef = useRef<any>();

  return (
    <fieldset className="select" tabIndex={1} onFocus={() => selectRef.current.focus()}>
      <legend>{label}</legend>

      <Select
        onChange={update}
        defaultValue={[]}
        name="type"
        options={options}
        classNamePrefix='field'
        placeholder={placeholder}
        ref={selectRef}
      />
    </fieldset>
  )
}

export default Type;