import React from 'react';

import Textarea from './../../forms/Textarea';

interface Props {
  value: string,
  handler: (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    void,
}

const Method: React.FC<Props> = ({ value, handler }) => {
  const methodConfig = {
    value: value,
    placeholder: "Use return buttons to separate steps",
    handleChange: handler,
    spellCheck: false,
    label: "Method",
    required: true,
  };

  return (
    <Textarea {...methodConfig} />
  )
}

export default Method;