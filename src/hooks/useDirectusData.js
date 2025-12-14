// src/hooks/useDirectusData.js

import { useState, useEffect } from 'react';
import { getСollections, getHeaderText, getCollectionItems } from '../api/articles'; // Добавлен новый endpoint

// Cache для данных
const cache = {
  collections: null,
  headerText: null,
  collectionItems: null,
  timestamp: null,
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 минут

export const useDirectusData = () => {
  const [collections, setCollections] = useState(null);
  const [headerText, setHeaderText] = useState(null);
  const [collectionItems, setCollectionItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Проверяем кэш
        const now = Date.now();
        if (cache.timestamp && (now - cache.timestamp) < CACHE_DURATION) {
          setCollections(cache.collections);
          setHeaderText(cache.headerText);
          setCollectionItems(cache.collectionItems);
          setLoading(false);
          return;
        }
        // Загружаем все данные параллельно
        const [collectionsData, headerData, itemsData] = await Promise.all([
          getСollections(),
          getHeaderText(),
          getCollectionItems(),

        ]);

        // Сохраняем в кэш
        cache.collections = collectionsData;
        cache.headerText = headerData.props.global;
        cache.collectionItems = itemsData.props.items;
        cache.timestamp = now;
        
        setCollections(collectionsData);
        setHeaderText(headerData.props.global);
        setCollectionItems(itemsData.props.items);
      } catch (err) {
        console.error('Error fetching Directus data:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { collections, headerText, collectionItems, loading, error };
};

// Функция для предзагрузки данных
export const preloadDirectusData = async () => {
  try {
    const [collectionsData, headerData, itemsData] = await Promise.all([
      getСollections(),
      getHeaderText(),
      getCollectionItems(),
    ]);

    cache.collections = collectionsData;
    cache.headerText = headerData;
    cache.collectionItems = itemsData;
    cache.timestamp = Date.now();

        console.log(cache.collectionItems)

    return {
      collections: collectionsData,
      headerText: headerData.props.global,
      collectionItems: itemsData.props.items,

    };
  } catch (err) {
    console.error('Error preloading Directus data:', err);
    return null;
  }
};