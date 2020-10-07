import Axios from "axios";
import {
  APPROVE_REQUEST,
  FETCH_REQUESTS,
  REJECT_REQUEST,
  DELIVER_REQUEST,
} from "../types/requestsTypes";

export const fetchRequests = async (requestsDispatch) => {
  const { data } = await Axios.get(`/api/requests`);
  requestsDispatch({ type: FETCH_REQUESTS, payload: data });
};
export const approveRequest = async (requestId, requestsDispatch) => {
  requestsDispatch({ type: APPROVE_REQUEST, payload: requestId });
};
export const rejectRequest = async (requestId, requestsDispatch) => {
  requestsDispatch({ type: REJECT_REQUEST, payload: requestId });
};

export const deliverRequest = async (requestId, requestsDispatch) => {
  requestsDispatch({ type: DELIVER_REQUEST, payload: requestId });
};
