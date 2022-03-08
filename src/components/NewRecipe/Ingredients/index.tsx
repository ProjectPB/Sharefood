import React from 'react';

import Textarea from './../../forms/Textarea';

interface Props {
  value: string,
  handler: (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    void,
}

const Ingredients: React.FC<Props> = ({ value, handler }) => {
  const ingredientsConfig = {
    value: value,
    placeholder: "Use return buttons to separate ingredients",
    handleChange: handler,
    spellCheck: false,
    label: "Ingredients",
    required: true,
  };
  return (
    <Textarea {...ingredientsConfig} />
  )
}

export default Ingredients;