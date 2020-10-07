export const bgColorFn = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-400";
      break;
    case "payment pending":
      return "bg-green-400";
      break;
    case "payment done":
      return "bg-green-400";
      break;
    case "rejected":
      return "bg-red-400";
      break;
    case "delivered":
      return "bg-purple-500";
      break;
    default:
      return "bg-gray-400";
      break;
  }
};

export const statusColorFn = (status) => {
  switch (status) {
    case "pending":
      return "text-purple-600";
      break;
    case "payment pending":
      return "text-teal-800";
      break;
    case "payment done":
      return "text-teal-800";
      break;
    case "rejected":
      return "text-indigo-700";
      break;
    case "delivered":
      return "text-yellow-300";
      break;
    default:
      return "text-gray-400";
      break;
  }
};
