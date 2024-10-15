// Helper functions to use fetch with all types of REST routes

const restBasePath = '/api/';

// A helper for fetch that converts the response from json to js data
async function _fetch(url, options) {
  const response = await fetch(url, options);
  return await response.json();
}

// One function per request method

export async function get(entity, sort = 'name', size = 1000) {
  const data = await _fetch(`${restBasePath}${entity}?size=${size}&sort=${sort}`);
  return (data || {})._embedded ? data._embedded[entity] : data;
}
window.get = get;

export async function getOne(entity, id) {
  const data = await _fetch(`${restBasePath}${entity}/${id}`);
  return data;
}

export async function post(entity, dataToSend) {
  const status = await _fetch(`${restBasePath}${entity}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", },
    body: JSON.stringify(dataToSend),

  });
  return status;
}

export async function put(entity, id, dataToSend) {
  const status = await _fetch(`${restBasePath}${entity}${id ? '/' + id : ''}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", },
    body: JSON.stringify(dataToSend),

  });
  return status;
}

export async function remove(entity, id) {
  const status = await _fetch(`${restBasePath}${entity}${id ? '/' + id : ''}`, {
    method: 'DELETE'
  });
  return status;
}