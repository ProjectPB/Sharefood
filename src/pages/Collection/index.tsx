import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchCollectionStart } from './../../redux/Collections/collections.actions';
import { State } from '../../shared/types';
import { useDispatch, useSelector } from 'react-redux';
import { setScrollDistanceStart } from '../../redux/Recipes/recipes.actions';
import { useRecipeData } from '../../hooks';

import Recipes from '../../components/Recipes';
import Loading from '../../components/Loading';
import NoData from '../../components/NoData';

import './styles.scss';
import { setLastDisplayedCollection } from '../../redux/UI/ui.actions';

const mapState = ({ ui, collections, loading }: State) => ({
  language: ui.language,
  lastDisplayedCollection: ui.lastDisplayedCollection,
  collection: collections.collection,
  loaded: loading.collectionLoaded,
});

const CollectionPage = () => {
  const dispatch = useDispatch();
  const collectionRef = useRef<HTMLDivElement>();
  const { collectionId } = useParams();
  const { language, collection, loaded, lastDisplayedCollection } = useSelector(mapState);
  const { data, scrollDistance } = useRecipeData("collection");
  const [distance, setDistance] = useState(0);
  const [rendered, setRendered] = useState(false);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    setRendered(true);
    if (rendered) {
      setChanged(true);
    }
    return () => {
      setRendered(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionId, language, lastDisplayedCollection]);

  useEffect(() => {
    if (data.length === 0 || changed) {
      dispatch(fetchCollectionStart({ collectionId: collectionId, language: language }))
    }
  }, [collectionId, language, dispatch, changed, data.length]);

  useEffect(() => {
    collectionRef.current.scrollTo(0, scrollDistance);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(setLastDisplayedCollection(collectionId));
  }, [collectionId, dispatch])

  return (
    <div className='collection' ref={collectionRef} onScroll={() => setDistance(collectionRef.current?.scrollTop)}>
      {language === 'english' && <h1 className='collection__title'>{collection?.eng_title}</h1>}
      {language === 'polish' && <h1 className='collection__title'>{collection?.pl_title}</h1>}

      {(loaded && data?.length > 0) && <div className="collection__container">
        <Recipes data={data} keepScroll={() => dispatch(setScrollDistanceStart({ distance: distance, store: 'collection' }))} />
      </div>}

      {!loaded && <Loading />}
      {(loaded && data?.length === 0) && <NoData />}
    </div >
  )
}

export default CollectionPage;