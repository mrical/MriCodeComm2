import Link from "next/link";

export default function NavLink({ name, url, handleClick }) {
  return (
    <Link href={url} passHref>
      <li
        className="bg-blue-600 hover:bg-blue-500 my-5 p-2 border-b-2 rounded-b-md border-black border-opacity-50 text-center text-2xl text-white w-3/5 mx-auto cursor-pointer hover:shadow-md"
        onClick={handleClick}
      >
        <a>{name}</a>
      </li>
    </Link>
  );
}
