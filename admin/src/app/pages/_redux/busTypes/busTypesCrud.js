import axios from "axios";


export const BUSTYPES_URL = "http://localhost:8000";

// CREATE =>  POST: add a new busTypes to the server
export function createBusType(busType) {
  return axios.post(BUSTYPES_URL, { busType });
}

// READ
// Server should return filtered busTypes by productId
export function getAllProductBusTypesByProductId() {
  return axios.get(`${BUSTYPES_URL}`);
}

export function getBusTypeById(busTypeId) {
  return axios.get(`${BUSTYPES_URL}/${busTypeId}`);
}

// Server should return sorted/filtered busTypes and merge with items from state
// TODO: Change your URL to REAL API, right now URL is 'api/busTypesfind/{productId}'. Should be 'api/busTypes/find/{productId}'!!!
export function findBusTypes(queryParams) {
	console.log("dsdd");
  return axios.post(`${BUSTYPES_URL}/get-bus-types`, { queryParams });
}

// UPDATE => PUT: update the busType
export function updateBusType(busType) {
  return axios.put(`${BUSTYPES_URL}/${busType.id}`, {
    busType
  });
}

// DELETE => delete the busType
export function deleteBusType(busTypeId) {
  return axios.delete(`${BUSTYPES_URL}/${busTypeId}`);
}

// DELETE busTypes by ids
export function deleteBusTypes(ids) {
  return axios.post(`${BUSTYPES_URL}/deleteBusTypes`, { ids });
}
