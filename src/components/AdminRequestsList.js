import React from "react";
import DivideHeading from "./DivideHeading";
import RequestCard from "./RequestCard";
import Skeleton from "react-loading-skeleton";
import useRequests from "../hooks/useRequests";
export default function AdminRequestsList() {
  const { requestsState } = useRequests();

  const firstFourRequest = requestsState?.slice(0, 4);
  return (
    <div>
      <DivideHeading
        title="Requests"
        href="/admin/requests"
        buttonText="View All"
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-3">
        {requestsState?.length > 0 ? (
          firstFourRequest.map((request) => (
            <RequestCard key={request._id} {...request} />
          ))
        ) : requestsState?.length === 0 ? (
          <div className="text-lg font-semibold text-center">
            No Requests to display
          </div>
        ) : (
          <>
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <Skeleton height={300} />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
