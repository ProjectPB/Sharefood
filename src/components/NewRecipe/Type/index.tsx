import React from 'react';

import Select from './../../forms/Select';

interface Props {
  options: {
    value: string;
    name: string;
    hidden: boolean;
  }[]
  label: string,
  value: string,
  handler: (e: React.ChangeEvent<HTMLSelectElement>) =>
    void,
}

const Type: React.FC<Props> = ({ value, handler, label, options }) => {
  const typeConfig = {
    handleChange: handler,
    label: label,
    options: options,
    required: true,
    defaultValue: value,
  };

  return (
    <Select {...typeConfig} />
  )
}

export default Type;