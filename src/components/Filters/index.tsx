import React from 'react';

import './styles.scss';

interface Props {
  type: string,
  name: string,
  filters: {
    name: string;
    value: string;
  }[],
  update: (val: string) => void
  activeFilter: string,
}

const Filters: React.FC<Props> = ({ type, name, filters, update, activeFilter }) => {
  return (
    <div className='filters'>
      <p>{name}</p>

      <div className="filters__buttons">
        {filters.map((({ value, name }, id) => (
          <button
            key={id}
            className={activeFilter === value ? "active" : undefined}
            onClick={() => update(value)}
          >
            {name}
          </button>
        )))}
      </div>
    </div>
  )
}

export default Filters;