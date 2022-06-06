import React from 'react'

import Input from '../../forms/Input';

interface Props {
  label: string,
  value: string,
  handler: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const Title: React.FC<Props> = ({ value, handler, label }) => {
  const titleConfig = {
    value: value,
    handleChange: handler,
    type: "text",
    required: true,
    spellCheck: false,
    label: label,
  };

  return (
    <Input {...titleConfig} />
  )
}

export default Title;