import React from 'react';
import { Close } from '@material-ui/icons';
import { connectCurrentRefinements } from 'react-instantsearch-dom';

import './styles.css'

const ClearRefinements = connectCurrentRefinements(({ items, refine }) => {
  return (
    items.length > 0 &&
    <button onClick={() => refine(items)} className="clearRefinements">
      <Close className='clearRefinements__icon' />
    </button>
  )
});

export default ClearRefinements;