import React from 'react';

import Select from './../../forms/Select';

interface Props {
  value: string,
  handler: (e: React.ChangeEvent<HTMLSelectElement>) =>
    void,
}

const Type: React.FC<Props> = ({ value, handler }) => {
  const typeOptions = [
    {
      value: "",
      name: "Type",
      hidden: true,
    },
    {
      value: "breakfast",
      name: "Breakfast",
      hidden: false,
    },
    {
      value: "appetizer",
      name: "Appetizer",
      hidden: false,
    },
    {
      value: "soup",
      name: "Soup",
      hidden: false,
    },
    {
      value: "main",
      name: "Main",
      hidden: false,
    },
    {
      value: "dessert",
      name: "Dessert",
      hidden: false,
    },
    {
      value: "drink",
      name: "Drink",
      hidden: false,
    },
    {
      value: "other",
      name: "Other",
      hidden: false,
    },
  ];

  const typeConfig = {
    handleChange: handler,
    label: "Type",
    options: typeOptions,
    required: true,
    defaultValue: value,
  };

  return (
    <Select {...typeConfig} />
  )
}

export default Type;