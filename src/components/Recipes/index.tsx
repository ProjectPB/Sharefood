import React, { useEffect, useRef, } from 'react'
import { useSelector } from 'react-redux'
import { fillWithHiddenCards } from '../../shared/functions'
import { Recipe, State } from '../../shared/types'

import Card from '../Card'

import './styles.scss';

interface Props {
  data: Recipe[],
  keepScroll: () => {
    type: string;
    payload: {
      distance: number;
      store: string;
    };
  },
  updateHeight?: (height: number) => void,
}

const mapState = ({ ui }: State) => ({
  sidebarOpen: ui.sidebarOpen,
});

const Recipes = (({ data, keepScroll, updateHeight }: Props) => {
  const { sidebarOpen } = useSelector(mapState);
  const recipesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    updateHeight && updateHeight(recipesRef.current.clientHeight);
  }, [updateHeight])

  return (
    <div ref={recipesRef}
      className={`recipes ${sidebarOpen ? "recipes--narrow" : "recipes--wide"}`}
    >
      {data?.map(({ id, data }) => (
        <Card
          key={id}
          id={id}
          username={data?.username}
          profilePic={data?.profilePic}
          image={data?.image}
          timestamp={data?.timestamp}
          title={data?.title}
          type={data?.type}
          keepScrollHeight={keepScroll}
        />
      ))}
      {fillWithHiddenCards(data)}
    </div>
  )
});

export default Recipes;