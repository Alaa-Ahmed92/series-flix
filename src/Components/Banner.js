import React from "react";

export default function Banner({ children, banner }) {
  return <header className={banner}>{children}</header>;
}
