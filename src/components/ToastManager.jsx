import { toast } from "react-toastify";
import React from "react";
import SessionExpiredToast from "./SessionExpiredToast.jsx";

export function showSessionExpiredToast() {
  toast(<SessionExpiredToast />, {
    autoClose: false,
    closeOnClick: false,
    draggable: false,
    pauseOnHover: false,
    hideProgressBar: true,
    position: "top-center",
  });
}
