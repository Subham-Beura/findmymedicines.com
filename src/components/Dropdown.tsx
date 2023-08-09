import Link from "next/link";

export function Dropdown(props: { isOpen: boolean }) {
  return (
    <>
      <ul
        className={`${
          props.isOpen ? "h-screen" : "h-0"
        }  z-10 mx-0 w-screen items-center  justify-between overflow-hidden bg-white px-0  text-black   `}
      >
        <Link
          href={"/"}
          className="menu-button  font-mono  text-2xl text-darkbrown"
        >
          <li className="px-5">Men</li>
        </Link>
        <Link
          href={"/"}
          className="menu-button  font-mono  text-2xl text-darkbrown"
        >
          <li className="px-5">Women</li>
        </Link>
        <Link
          href={"/"}
          className="menu-button  font-mono  text-2xl text-darkbrown"
        >
          <li className="px-5">Children</li>
        </Link>
        <Link
          href={"/"}
          className="menu-button  font-mono  text-2xl text-darkbrown"
        >
          <li className="px-5">Explore</li>
        </Link>
        <Link
          href={"/orders"}
          className="menu-button font-mono text-2xl text-darkbrown"
        >
          <li className="px-5">My Orders</li>
        </Link>
        <div>Login</div>
      </ul>
    </>
  );
}
