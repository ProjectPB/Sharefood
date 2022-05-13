import React from 'react';
import { Close } from '@material-ui/icons';
import { connectCurrentRefinements } from 'react-instantsearch-dom';
import { Refinement, RefinementValue } from 'react-instantsearch-core';

import './styles.css'

interface Props {
  items: Refinement[],
  refine: (refinement: Refinement[] | RefinementValue | RefinementValue[]) => void,
  close: () => void,
  visible: boolean,
}

const ClearRefinements = connectCurrentRefinements(({ items, refine, close, visible }: Props) => {
  const handleClick = () => {
    refine(items);
    close();
  }

  return (
    visible &&
    <button onClick={handleClick} className="clearRefinements">
      <Close className='clearRefinements__icon' />
    </button>
  )
});;

export default ClearRefinements;