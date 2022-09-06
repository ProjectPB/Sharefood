import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLanguage } from '../../hooks';
import { changeLanguageStart } from '../../redux/UI/ui.actions';
import { State } from '../../shared/types';

import './styles.scss'

interface Props {
  close: () => void;
}

const mapState = ({ ui }: State) => ({
  language: ui.language
})

const LangSelector: React.FC<Props> = ({ close }) => {
  const dispatch = useDispatch();
  const { language } = useSelector(mapState);
  const LANG = useLanguage();

  const handleChange = (value: string) => {
    dispatch(changeLanguageStart(value));
    close();
  }

  return (
    <div className='langSelector'>
      <p className='langSelector__text'>{LANG.HEADER.SELECT_LANG}</p>
      <form className="langSelector__languages">
        <div className="langSelector__language">
          <input type="radio" name="language" value="english" checked={language === 'english'} onChange={() => handleChange('english')} />
          <p onClick={() => handleChange('english')}>{LANG.HEADER.LANG_ENG}</p>
        </div>

        <div className="langSelector__language">
          <input type="radio" name="language" value="polish" checked={language === 'polish'} onChange={() => handleChange('polish')} />
          <p onClick={() => handleChange('polish')}>{LANG.HEADER.LANG_PL}</p>
        </div>
      </form >
    </div >
  )
}

export default LangSelector;