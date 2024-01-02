"use client";
import React from "react";

export function useSnackbar() {
  const [isActive, setIsActive] = React.useState(false);
  const [message, setMessage] = React.useState<string>("");
  const [type, setType] = React.useState<"success" | "danger" | "info">("info");

  React.useEffect(() => {
    if (isActive === true) {
      setTimeout(() => {
        setIsActive(false);
      }, 3000);
    }
  }, [isActive]);

  const openSnackBar = (
    msg = "Something went wrong...",
    type: "success" | "danger" | "info"
  ) => {
    setMessage(msg);
    setType(type);
    setIsActive(true);
  };

  return { isActive, type, message, openSnackBar };
}
