import 'isomorphic-fetch';
import querystring from 'querystring';

export default class ApiClient {

  constructor(apiHost, token, req, store) {
    this.store = store;
    this.apiHost = apiHost;
    this.token = token;
    this.req = req;
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
    let uri = 'http://192.168.0.5:7780/vpcom/api/geo';
    let config = {
      method: 'post',
      body: JSON.stringify({geo: geoString}),
      ...this.config()
    }
    return await this.call(uri, config);
  }

  async fetchBalefirePage(splat) {
    let uri = `http://192.168.0.5:7780/proxy?url=http://localhost:7720/balefire/v1/valpak/pages/${splat}`;
    let config = {
      method: 'get',
      ...this.config()
    };
    return await this.call(uri, config);
  }

  async fetchCollection(collectionId) {
    let uri = `http://192.168.0.5:7780/proxy?url=http://localhost:3000/collections/${collectionId}`;
    let config = {
      method: 'get',
      ...this.config()
    };
    return await this.call(uri, config);
  }

  async fetchListings(ids) {
    let qs = {id: ids};
    let uri = `http://192.168.0.5:7780/proxy?url=http://localhost:3000/listings?${qs}`;
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
      console.log(uri);
      let response = await fetch(uri, config);
      return await this.handleResponse(response);
    } catch (error) {
      alert(error)
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
