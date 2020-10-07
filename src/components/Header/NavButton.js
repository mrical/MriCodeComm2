import Link from "next/link";

export default function NavButton({ url, name, open, handleClick }) {
  return (
    <div
      className={`${
        !open && "hidden"
      } sm:inline-block text-lg bg-gray-300 h-full text-black py-1 px-2 rounded md:font-semibold hover:shadow-lg  hover:bg-black hover:text-white`}
      onClick={handleClick}
    >
      <Link href={url}>
        <a>{name}</a>
      </Link>
    </div>
  );
}
