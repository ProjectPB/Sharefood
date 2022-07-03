import React, { useRef } from 'react'
import Select from 'react-select';
import { useLanguage } from '../../../hooks';
import { Option } from '../../../shared/types';

import './styles.scss';

interface Props {
  options: Option[],
  label: string,
  placeholder: string,
  update: (option: Option[]) => void
}

const Special: React.FC<Props> = ({ label, options, update, placeholder }) => {
  const selectRef = useRef<any>();
  const LANG = useLanguage();

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
        noOptionsMessage={() => LANG.MISC.SELECT_NO_OPTIONS}
      />
    </fieldset>
  )
}

export default Special;
