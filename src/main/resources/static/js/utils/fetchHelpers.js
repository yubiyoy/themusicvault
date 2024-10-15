// Helper functions to use fetch with all types of REST routes

const restBasePath = '/api/';

export async function get(entity, sort = 'name', size = 1000) {
  const response = await fetch(`${restBasePath}${entity}?size=${size}&sort=${sort}`);
  const data = await response.json();
  return ['login', 'register'].includes(entity) ? data : data._embedded[entity];
}

export async function getOne(entity, id) {
  const response = await fetch(`${restBasePath}${entity}/${id}`);
  const data = await response.json();
  return data;
}

export async function post(entity, dataToSend) {
  const response = await fetch(`${restBasePath}${entity}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", },
    body: JSON.stringify(dataToSend),

  });
  const status = await response.json();
  return status;
}

export async function put(entity, id, dataToSend) {
  const response = await fetch(`${restBasePath}${entity}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", },
    body: JSON.stringify(dataToSend),

  });
  const status = await response.json();
  return status;
}

export async function remove(entity, id) {
  const response = await fetch(`${restBasePath}${entity}${id ? '/' + id : ''}`, {
    method: 'DELETE'
  });
  const status = await response.json();
  return status;
}