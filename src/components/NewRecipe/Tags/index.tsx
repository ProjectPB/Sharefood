import React from 'react'
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

const Tags: React.FC<Props> = ({ label, options, update, placeholder }) => {
  const LANG = useLanguage();

  return (
    <fieldset className='select'>
      <legend>{label}</legend>

      <Select
        defaultValue={[]}
        onChange={update}
        classNamePrefix='field'
        isMulti
        name="tags"
        options={options}
        placeholder={placeholder}
        noOptionsMessage={() => LANG.MISC.SELECT_NO_OPTIONS}
      />
    </fieldset>
  )
}

export default Tags;
