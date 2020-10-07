import Axios from "axios";
import Link from "next/link";
import isAdmin from "../../helpers/ensureAdmin";
import { adminSignIn } from "../../actions/authActions";
import useAuth from "../../hooks/useAuth";
import BannerForm from "../../components/BannerForm";
import AdminRequestsList from "../../components/AdminRequestsList";
import AdminProductsList from "../../components/AdminProductsList";
import { useEffect, useState } from "react";
import { updateBanner } from "../../actions/bannerActions";
import useBanner from "../../hooks/useBanner";
import Head from "next/head";
function Dashboard() {
  const { authDispatch } = useAuth();
  const {
    bannerState: { bannerUrl },
    bannerDispatch,
  } = useBanner();

  useEffect(() => {
    adminSignIn(authDispatch);
  }, []);

  const initialValues = { file: null };

  const onBannerFormSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);

    const bannerUrl = await reader.onloadend(async () => {
      const { data } = await Axios.post("/api/uploadImage", {
        data: render.result,
      });
      return data.url;
    });
    await updateBanner(bannerUrl, bannerDispatch);
    setSubmitting(false);
    resetForm();
  };

  return (
    <div>
      <Head>
        <title>Admin | MriCodecomm</title>
      </Head>
      <BannerForm
        {...{
          onSubmit: onBannerFormSubmit,
          initialValues,
        }}
        bannerUrl={bannerUrl}
      />

      <AdminRequestsList />
      <AdminProductsList />
    </div>
  );
}
export async function getServerSideProps(ctx) {
  const admin = await isAdmin(ctx);
  if (!admin) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/admin/login" });
    res.end();
  }
  return { props: {} };
}
export default Dashboard;
