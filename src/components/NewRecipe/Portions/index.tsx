import React from 'react'
import { Handler } from '../../../shared/types';

import Input from './../../forms/Input';

interface Props {
  label: string,
  value: number,
  handler: (e: Handler["number"]) => void,
}

const Portions: React.FC<Props> = ({ value, handler, label }) => {
  const portionsConfig = {
    value: value,
    handleChange: handler,
    type: "number",
    min: 1,
    max: 20,
    required: true,
    label: label,
  };

  return (
    <Input {...portionsConfig} />
  )
}

export default Portions;