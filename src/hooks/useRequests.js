import { useContext } from "react";
import { RequestsContext } from "../context/RequestsContext";

export default function useRequests() {
  return useContext(RequestsContext);
}
