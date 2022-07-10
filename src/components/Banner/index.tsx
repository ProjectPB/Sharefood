import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { bannerConfig } from '../../config';
import { useLanguage } from '../../hooks';
import { fetchBannerDataStart } from '../../redux/Collections/collections.actions';
import { State } from '../../shared/types';

import Loading from '../Loading';
import NoData from '../NoData';

import './styles.scss';

const mapState = ({ ui, collections, loading }: State) => ({
  language: ui.language,
  banner: collections.banner,
  loaded: loading.bannerLoaded,
});

interface Props {
  keepScroll: () => {
    type: string;
    payload: {
      distance: number;
      store: string;
    };
  },
}

const Banner = ({ keepScroll }: Props) => {
  const LANG = useLanguage();
  const dispatch = useDispatch();
  const { language, banner, loaded } = useSelector(mapState);

  useEffect(() => {
    if (banner.length === 0) {
      dispatch(fetchBannerDataStart(bannerConfig));
    }
  }, [dispatch, banner.length])

  return (
    <div className="banner">
      <h2>{LANG.HOMEPAGE.FEATURED}</h2>

      <div className="banner__wrapper">
        {(loaded && banner && banner.length > 0) && banner.map((i) => (
          <div className="banner__img" key={i?.id}>
            <Link to={`/collection/${i?.id}`} onClick={keepScroll}>
              <img src={i?.img} alt={language === 'english' ? i?.eng_title : i?.pl_title} />
              <p style={{ backgroundColor: `${i?.color}` }}>{language === 'english' ? i?.eng_title : i?.pl_title}</p>
            </Link>
            {(loaded && banner.length === 0) && <NoData />}
          </div>
        ))}
        {!loaded && <Loading />}
      </div>
    </div >
  )
}

export default Banner;