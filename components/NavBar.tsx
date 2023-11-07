import React from "react";
import NavLink from "./NavLink";

const NavBar = () => {
  return (
    <nav>
      <ul className="flex gap-2">
        <li className="font-orbitron font-bold">
          <NavLink href="/">Indie Gamer</NavLink>
        </li>
        <li className="ml-auto">
          <NavLink href="/reviews">Reviews</NavLink>
        </li>
        <li>
          <NavLink href="/about" prefetch={false}>
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
