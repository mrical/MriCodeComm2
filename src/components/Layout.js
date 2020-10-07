import React from "react";
import AuthProvider from "../context/AuthContext";
import BannerProvider from "../context/BannerContext";
import ProductsProvider from "../context/ProductsContext";
import RequestsProvider from "../context/RequestsContext";
import ReviewsProvider from "../context/ReviewsContext";
import UserProductsProvider from "../context/UserProductsContext";
import Header from "./Header/Header";
export default function Layout({ children }) {
  return (
    <AuthProvider>
      <ProductsProvider>
        <UserProductsProvider>
          <ReviewsProvider>
            <RequestsProvider>
              <BannerProvider>
                <Header />
                <div className="w-11/12 mx-auto sm:w-4/5 lg:w-3/5">
                  {children}
                </div>
              </BannerProvider>
            </RequestsProvider>
          </ReviewsProvider>
        </UserProductsProvider>
      </ProductsProvider>
    </AuthProvider>
  );
}
