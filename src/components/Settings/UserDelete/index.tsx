import React from 'react'
import Button from '../../forms/Button'
import Loading from '../../Loading'

import './styles.scss';

interface Props {
  deleting: boolean,
  handleDelete: () => void,
}

const userDelete = ({ deleting, handleDelete }: Props) => {

  return (
    <div className="settings__div">
      <h2 className='settings__title'>Delete account</h2>
      <div className="settings__handlers">
        {!deleting && <Button handleClick={handleDelete}>DELETE</Button>}
        {deleting && <Loading />}
      </div>
    </div>
  )
}

export default userDelete