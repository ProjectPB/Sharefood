import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLanguage } from '../../hooks';
import { setLanguage } from '../../redux/UI/ui.actions';
import { State } from '../../shared/types';

import './styles.scss'

const mapState = ({ ui }: State) => ({
  language: ui.language
})

const LangSelector: React.FC = () => {
  const dispatch = useDispatch();
  const { language } = useSelector(mapState);
  const LANG = useLanguage();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setLanguage(e.target.value));
  }

  return (
    <div className='langSelector'>
      <p className='langSelector__text'>{LANG.HEADER.SELECT_LANG}</p>
      <form className="langSelector__languages">
        <div className="langSelector__language" onClick={() => handleChange}>
          <input type="radio" name="language" value="english" checked={language === 'english'} onChange={handleChange} />
          <p>{LANG.HEADER.LANG_ENG}</p>
        </div>

        <div className="langSelector__language" onClick={() => handleChange}>
          <input type="radio" name="language" value="polish" checked={language === 'polish'} onChange={handleChange} />
          <p>{LANG.HEADER.LANG_PL}</p>
        </div>
      </form >
    </div >
  )
}

export default LangSelector;