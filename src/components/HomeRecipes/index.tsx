import React from 'react'
import { useDispatch } from 'react-redux';
import { Recipe } from "../../shared/types";
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks';
import { setAllRecipes } from '../../redux/Recipes/recipes.actions';

import Loading from '../Loading';
import Recipes from '../Recipes';
import NoData from '../NoData';

import './styles.scss';

interface Props {
  loaded: boolean,
  data: Recipe[] | [],
  keepScroll: () => {
    type: string;
    payload: {
      distance: number;
      store: string;
    };
  },
  title: string,
  handleSortFilter: () => void;
}

const HomeRecipes = ({ data, keepScroll, loaded, title, handleSortFilter }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const LANG = useLanguage();

  const navToMoreRecipes = () => {
    dispatch(setAllRecipes({
      data: [],
      queryDoc: null,
      isLastPage: false,
    }));
    handleSortFilter();
    navigate('/all');
    keepScroll();
  }

  return (
    <div className="homeRecipes">
      <div className="homeRecipes__title">
        <h2>{title}</h2>
        <h3 onClick={navToMoreRecipes}>{LANG.HOMEPAGE.MORE}</h3>
      </div>

      <div className="homeRecipes__wrapper">
        {!loaded &&
          <div className="homeRecipes__loading">
            <Loading />
          </div>}

        {loaded && data.length === 0 &&
          <div className="homeRecipes__loading">
            <NoData />
          </div>}

        {loaded && <Recipes data={data} keepScroll={keepScroll} />}
      </div>

    </div>
  )
}

export default HomeRecipes;