import React, { useState } from 'react';

import './styles.scss'

const LangSelector: React.FC = () => {
  const [selected, setSelected] = useState('english');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value);
  }

  return (
    <div className='langSelector'>
      <p className='langSelector__text'>Select your language</p>
      <form className="langSelector__languages">
        <div className="langSelector__language" onClick={() => handleChange}>
          <input type="radio" name="language" value="english" checked={selected === 'english'} onChange={handleChange} />
          <p>English</p>
        </div>

        <div className="langSelector__language" onClick={() => handleChange}>
          <input type="radio" name="language" value="polish" checked={selected === 'polish'} onChange={handleChange} />
          <p>Polski</p>
        </div>
      </form >
    </div >
  )
}

export default LangSelector;