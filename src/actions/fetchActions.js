import {
  FETCH_BALEFIRE_PAGE,
  FETCH_BALEFIRE_PAGE_SUCCESS,
  FETCH_BALEFIRE_PAGE_FAIL,
  FETCH_COLLECTION,
  FETCH_COLLECTION_SUCCESS,
  FETCH_COLLECTION_FAIL,
  FETCH_LISTINGS,
  FETCH_LISTINGS_SUCCESS,
  FETCH_LISTINGS_FAIL
} from  './actionTypes';

export function fetchBalefirePage(splat) {
  return {
    types: [FETCH_BALEFIRE_PAGE, FETCH_BALEFIRE_PAGE_SUCCESS, FETCH_BALEFIRE_PAGE_FAIL],
    promise: async client => {
      const page = await client.fetchBalefirePage(splat);

      page.zones = Object.values(page.zones).reduce((zones, zone) => {
        zones[zone.identifier] = zone;
        return zones;
      }, {});

      if (page.zones.hasOwnProperty('collections'))
        page.zones.collections = await resolveCollections(page.zones.collections.value.items, client);

      return page;
    }
  };
}

export function fetchCollection(collectionId) {
  return {
    types: [FETCH_COLLECTION, FETCH_COLLECTION_SUCCESS, FETCH_COLLECTION_FAIL],
    promise: async client => {
      const collection = await client.fetchCollection(collectionId);
      return collection;
    }
  };
}

async function resolveCollections(collectionIds, client) {
  let collections = await* collectionIds.map(id => client.fetchCollection(id));
  collections = await resolveCollectionListings(collections, client);
  return collections;
}

async function resolveCollectionListings(collections, client) {
  const listingIds = collections.reduce((listingIds, collection) => {
    for (let item of collection.items) {
      if (item.type === 'LOCAL_OFFER' || item.type === 'NATL_OFFER')
        listingIds.push(item.offerId);
    }
    return listingIds;
  }, []);

  if (listingIds.length) {
    let listings = await client.fetchListings(listingIds);
    collections.forEach(collection => {
      collection.items.forEach(item => {
        if (item.type === 'LOCAL_OFFER' || item.type === 'NATL_OFFER') {
          item.listing = listings.find(listing => listing.id == item.offerId);
        }
      })
    });
  }

  return collections;
}
