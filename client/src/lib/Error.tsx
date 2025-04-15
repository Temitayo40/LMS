import { toast } from "react-toastify";

export const handleError = (error: unknown): string => {
  if (error instanceof Error) {
    toast.error(error.message);
    return error.message;
  } else if (typeof error === "string") {
    return error;
  } else if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    toast.error(error.message);

    return error.message;
  } else {
    toast.error("An unknown error occurred");
    return "An unknown error occurred";
  }
};
