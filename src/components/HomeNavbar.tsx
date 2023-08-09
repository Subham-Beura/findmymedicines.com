import Link from "next/link";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineShoppingCart,
  AiOutlineSearch,
} from "react-icons/ai";
import { useEffect, useState } from "react";
import { Dropdown } from "./Dropdown";
import { signOut } from "next-auth/react";

const Navbar = () => {
  let [isOpen, setIsOpen] = useState(false);
  const transparent = "bg-transparent text-white";
  const white = "bg-white text-black";
  let [navBG, setNavBG] = useState<typeof white | typeof transparent>(
    transparent
  );

  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 50;
      setNavBG(show ? white : transparent);
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed z-10 flex h-fit  min-h-[50px] w-screen flex-col text-white ${
        isOpen ? "bg-white text-black" : navBG
      }    `}
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
                <Link href="#">Mens</Link>
              </li>
              <li>
                <Link href="#">Womens</Link>
              </li>
              <li>
                <Link href="#">Children</Link>
              </li>
              <li>
                <Link href="#">Explore</Link>
              </li>
            </ul>
          </div>
        }
        <Link href="/" className="flex h-[50px]  items-center">
          <h1 className=" h-fit  w-[100vw] text-center  text-3xl font-bold ">
            UTSAV
          </h1>
        </Link>

        <div className="absolute right-0 mr-8 flex h-[50px] w-20 flex-row items-center justify-around ">
          <button className="button  ">
            <AiOutlineSearch size={20} />
          </button>
          <button className="button  ">
            <AiOutlineShoppingCart size={20} />
          </button>
          <button className="button" onClick={() => signOut()}>
            <Link href="/profile">Profile</Link>
          </button>
        </div>
      </div>

      <Dropdown isOpen={isOpen} />
    </div>
  );
};
export default Navbar;
