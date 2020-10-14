import Head from "next/head";
import Link from "next/link";
import AboutUs from "../components/AboutUs";
import DivideHeading from "../components/DivideHeading";

export default function about() {
  return (
    <div>
      <Head>
        <title>About|MriCodecomm</title>
      </Head>
      <DivideHeading title="About" />
      <AboutUs />
    </div>
  );
}
