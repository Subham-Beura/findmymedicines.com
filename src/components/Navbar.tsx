import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";

import HomeNavbar from "./HomeNavbar";
import { Dropdown } from "./Dropdown";

import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";

export default function Navbar() {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`fixed z-10 flex h-fit  min-h-[50px] w-screen flex-col bg-white text-black`}
    >
      <div className="relative flex  h-[50px] items-center justify-center   ">
        {isOpen ? (
          <AiOutlineClose
            className="absolute left-0  my-3 mx-2 h-5 w-5 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          />
        ) : (
          <AiOutlineMenu
            className="absolute left-0 my-2 mx-2 h-7 w-7 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          />
        )}
        {
          <div className="absolute left-0  my-3 mx-8 hidden h-fit w-fit  md:block">
            <ul className="flex justify-between space-x-10">
              <li>
                <Link href="#">Medicines</Link>
              </li>
              <li>
                <Link href="#">Shops</Link>
              </li>
            </ul>
          </div>
        }
        <Link href="/" className="flex h-[50px]  items-center">
          <h1 className=" h-fit  w-[100vw] text-center  text-3xl font-bold ">
            Find My Medicines
          </h1>
        </Link>

        <div className="absolute right-0 mr-8 flex h-[50px] w-28 flex-row items-center justify-around ">
          <button className="button  ">
            <Link href={"/search/"}>
              <AiOutlineSearch size={22.5} />
            </Link>
          </button>
          <button className="button  ">
            <Link href={"/cart"}>
              <AiOutlineShoppingCart size={22.5} />
            </Link>
          </button>
          <button className="button">
            <Link href={"/user"}>
              <AiOutlineUser size={22.5} />
            </Link>
          </button>
        </div>
      </div>

      <Dropdown isOpen={isOpen} />
    </div>
  );
}
