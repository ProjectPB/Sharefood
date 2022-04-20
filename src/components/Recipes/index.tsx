import React, { LegacyRef } from 'react'
import { useSelector } from 'react-redux'
import { fillWithHiddenCards } from '../../shared/functions'
import { Recipe, State } from '../../shared/types'

import Card from '../Card'

import './styles.css';

interface Props {
  data: Recipe[],
  keepScroll: () => {
    type: string;
    payload: {
      distance: number;
      store: string;
    };
  }
}

const mapState = ({ ui }: State) => ({
  sidebarOpen: ui.sidebarOpen,
});

const Recipes = React.forwardRef(({ data, keepScroll }: Props, ref: LegacyRef<HTMLDivElement>) => {
  const { sidebarOpen } = useSelector(mapState);

  return (
    <div ref={ref}
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