import * as requestFromServer from "./busTypesCrud";
import {busTypesSlice, callTypes} from "./busTypesSlice";
import axios from "axios";
import MockUtils from "../../../modules/ECommerce/__mocks__/mock.utils";

const {actions} = busTypesSlice;
let query_params = {};

export const fetchBusTypes = (queryParams) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));

  query_params = queryParams;

  return axios.get(`http://localhost:8000/get-bus-types`)
    .then(response => {
      const mockUtils = new MockUtils();
      const { totalCount, entities } = mockUtils.baseFilter(response.data.data, query_params);
      
      dispatch(actions.busTypesFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find bus types";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchBusType = id => dispatch => {
  if (!id) {
    return dispatch(
      actions.busTypeFetched({ busTypeForEdit: undefined })
    );
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getBusTypeById(id)
    .then(response => {
      const busType = response.data;
      dispatch(
        actions.busTypeFetched({ busTypeForEdit: busType })
      );
    })
    .catch(error => {
      error.clientMessage = "Can't find bus type";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteBusType = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteBusType(id)
    .then(response => {
      dispatch(actions.busTypeDeleted({ id }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete bus type";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createBusType = busTypeForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createBusType(busTypeForCreation)
    .then(response => {
      const { busType } = response.data;
      dispatch(actions.busTypeCreated({ busType }));
    })
    .catch(error => {
      error.clientMessage = "Can't create bus type";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateBusType = busType => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateBusType(busType)
    .then(() => {
      dispatch(actions.busTypeUpdated({ busType }));
    })
    .catch(error => {
      error.clientMessage = "Can't update bus type";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteBusTypes = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteBusTypes(ids)
    .then(() => {
      dispatch(actions.busTypesDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete bus types";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
