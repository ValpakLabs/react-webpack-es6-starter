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

      try {
        if (page.zones.hasOwnProperty('collections'))
          page.zones.collections = await resolveCollections(page.zones.collections.value.items, client);
      } catch (error) {
        return page;
      }

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

/**
 * Fetch all collections and resolve its listings if present.
 */
async function resolveCollections(collectionIds, client) {
  let collections = await* collectionIds.map(id =>
    fetchCollectionWithoutFail(id, client));

  let listingIds = getAllListingIds(collections);
  let listings = await client.fetchListings(listingIds);

  return await joinCollectionListings(collections, listings);
}

/**
 * Fetch and return single collection. Return `undefined` if collection
 * can't be found. Should catch rejected fetch and always resolve.
 */
async function fetchCollectionWithoutFail(id, client) {
  try {
    return await client.fetchCollection(id);
  } catch (e) {
    return undefined;
  }
}

/**
 * Consolidate all listing IDs in all collections.
 */
function getAllListingIds(collections) {
  return collections.reduce((listingIds, collection) => {
    if (!collection)
      return listingIds;

    for (let item of collection.items) {
      if (item.type === 'LOCAL_OFFER' || item.type === 'NATL_OFFER')
        listingIds.push(item.offerId);
    }

    return listingIds;
  }, []);
}

/**
 * Place each listing into the collection it was referenced from.
 */
async function joinCollectionListings(collections, listings) {
  return collections.map(collection => {
    if (!collection) return;
    collection.items.forEach(item => {
      if (item.type === 'LOCAL_OFFER' || item.type === 'NATL_OFFER') {
        item.listing = listings.find(listing => listing.id == item.offerId);
      }
    });
    return collection;
  });
}
