import 'isomorphic-fetch';
import querystring from 'querystring';

export default class ApiClient {

  constructor(config) {
    this.clientConfig = config;
    this.host = config.host;
  }

  config() {
    return {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    };
  }

  async setUserGeo(geoString) {
    let uri = `${this.host}/vpcom/api/geo`;
    let config = {
      method: 'post',
      body: JSON.stringify({geo: geoString}),
      ...this.config()
    }
    return await this.call(uri, config);
  }

  async fetchBalefirePage(splat) {
    let uri = `${this.host}/proxy?url=${this.clientConfig.balefireApiHost}/pages/${splat}`;
    let config = {
      method: 'get',
      ...this.config()
    };
    return await this.call(uri, config);
  }

  async fetchCollection(collectionId) {
    let uri = `${this.host}/proxy?url=${this.clientConfig.collectionApiHost}/collections/${collectionId}`;
    let config = {
      method: 'get',
      ...this.config()
    };
    return await this.call(uri, config);
  }

  async fetchListings(ids) {
    let qs = {id: ids};
    let uri = `${this.host}/proxy?url=${this.clientConfig.collectionApiHost}/listings?${qs}`;
    let config = {
      method: 'get',
      ...this.config()
    };
    return await this.call(uri, config);
  }

  async get(resource, id, opts) {
    if (typeof id === 'object') {
      opts = id;
      id = undefined;
    }

    let uri = `${this.apiHost}/${resource}${id ? '/' + id : ''}`;
    if (opts)
      uri += `?${querystring.stringify(opts)}`;

    const config = {
      method: 'get',
      ...this.config()
    };
    return await this.call(uri, config);
  }

  async send(resource, postData) {
    const uri = `${this.apiHost}/${resource}${postData._id ? '/' + postData._id : ''}`;
    const method = typeof postData._id !== 'undefined' ? 'put' : 'post';
    const config = {
      method: method,
      body: JSON.stringify(postData),
      ...this.config()
    };
    return await this.call(uri, config);
  }

  async remove(resource, id) {
    const uri = `${this.apiHost}/${resource}/${id}`;
    const config = {
      method: 'delete',
      ...this.config()
    };
    return await this.call(uri, config);
  }

  async call(uri, config) {
    try {
      let response = await fetch(uri, config);
      return await this.handleResponse(response);
    } catch (error) {
      throw error;
    }
  }

  async handleResponse(response) {
    const json = await response.json();
    const location = response.headers.get('location');
    if (location)
      json.location = location;
    if (response.status >= 200 && response.status < 300)
      return json;
    throw json;
  }

}
