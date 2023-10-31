"use client";
import React, { useState } from "react";
import { LinkIcon } from "@heroicons/react/20/solid";
const ShareLinkButton = () => {
  const [clicked, setClicked] = useState<boolean>(false);
  const handleClick = (): void => {
    navigator.clipboard.writeText(window.location.href);
    setClicked(true);
    setTimeout(() => setClicked(false), 1000);
  };
  // console.log("Rendering [ShareLinkButton]");
  return (
    <button
      onClick={handleClick}
      className="flex gap-1 items-center border px-2 py-1 rounded text-slate-500 text-sm hover:bg-orange-100 hover:text-slate-700"
    >
      <LinkIcon className="h-4 w-4" />
      {clicked ? "Link Copied!" : "Share Link"}
    </button>
  );
};

export default ShareLinkButton;
