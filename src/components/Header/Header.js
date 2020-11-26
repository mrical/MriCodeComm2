import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Link from "next/link";
import PageLinksIcons from "../PageLinksIcons";
import { icons, adminIcons } from "../../helpers/linkIcons";
import { useRouter } from "next/router";
import Banner from "../Banner";
import useBanner from "../../hooks/useBanner";
import tawkTo from "tawkto-react";
export default function Header() {
  const router = useRouter();
  const pathName = router.pathname.toLowerCase();
  const bannerUrl = useBanner().bannerState?.bannerUrl;
  const tawkToPropertyId = "5fbeebf1920fc91564cab9b4";

  useEffect(() => {
    tawkTo(tawkToPropertyId);
  }, []);
  return (
    <div>
      <div style={{ height: "50px" }}>
        <Navbar />
      </div>
      <div className="w-11/12 mx-auto sm:w-5/6 lg:w-3/5">
        <div
          className="grid grid-cols-4 gap-3 my-4 pb-3"
          style={{
            borderBottomWidth: `${
              pathName === "/wishlist" ||
              pathName === "/requests" ||
              pathName === "/address" ||
              pathName === "/offers" ||
              pathName === "/about" ||
              pathName === "/contact" ||
              pathName.includes("/products")
                ? ""
                : "1px"
            }`,
          }}
        >
          {pathName.includes("/admin") && pathName !== "/admin/login"
            ? adminIcons.map(({ name, icon, url }, i) => (
                <Link href={url} key={`icon-${i}`}>
                  <a>
                    <PageLinksIcons active={pathName === url} name={name}>
                      {icon}
                    </PageLinksIcons>
                  </a>
                </Link>
              ))
            : icons.map(({ name, icon, url }, i) => (
                <Link href={url} key={`icon-${i}`}>
                  <a>
                    <PageLinksIcons active={pathName === url} name={name}>
                      {icon}
                    </PageLinksIcons>
                  </a>
                </Link>
              ))}
        </div>
        {pathName === "/" && <Banner bannerUrl={bannerUrl} />}
      </div>
    </div>
  );
}
