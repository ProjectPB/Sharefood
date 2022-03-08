import React from 'react'

import Input from '../../forms/Input';

interface Props {
  value: string,
  handler: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const Title: React.FC<Props> = ({ value, handler }) => {
  const titleConfig = {
    value: value,
    handleChange: handler,
    type: "text",
    required: true,
    spellCheck: false,
    label: "Title",
  };

  return (
    <Input {...titleConfig} />
  )
}

export default Title;