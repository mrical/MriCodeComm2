import Head from "next/head";
import DivideHeading from "../components/DivideHeading";

export default function contact() {
  return (
    <div>
      <Head>
        <title>Contact|MriCodecomm</title>
      </Head>
      <DivideHeading title="Contact" />
      <div className="rounded-lg shadow-lg p-2 md:p-4 mb-4">
          <div className="grid grid-cols-2 grid-rows-2 place-items-center">
              <div className="col-span-1">
                <a href="https://www.facebook.com/mrical.singhal" target="_blank">
                <svg className="sm:w-32 sm:h-32 w-24 h-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M448 0H64C28.704 0 0 28.704 0 64v384c0 35.296 28.704 64 64 64h384c35.296 0 64-28.704 64-64V64c0-35.296-28.704-64-64-64z" fill="#1976d2"/><path d="M432 256h-80v-64c0-17.664 14.336-16 32-16h32V96h-64c-53.024 0-96 42.976-96 96v64h-64v80h64v176h96V336h48l32-80z" fill="#fafafa"/></svg>
                </a>
              
              </div>
              <div className="col-span-1">
              <a href="https://www.instagram.com/mrical_singhal" target="_blank">
              <svg className="sm:w-32 sm:h-32 w-24 h-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><linearGradient id="a" gradientUnits="userSpaceOnUse" x1="-46.004" y1="634.121" x2="-32.933" y2="647.192" gradientTransform="matrix(32 0 0 -32 1519 20757)"><stop offset="0" stop-color="#ffc107"/><stop offset=".507" stop-color="#f44336"/><stop offset=".99" stop-color="#9c27b0"/></linearGradient><path d="M352 0H160C71.648 0 0 71.648 0 160v192c0 88.352 71.648 160 160 160h192c88.352 0 160-71.648 160-160V160C512 71.648 440.352 0 352 0zm112 352c0 61.76-50.24 112-112 112H160c-61.76 0-112-50.24-112-112V160C48 98.24 98.24 48 160 48h192c61.76 0 112 50.24 112 112v192z" fill="url(#a)"/><linearGradient id="b" gradientUnits="userSpaceOnUse" x1="-42.297" y1="637.828" x2="-36.64" y2="643.485" gradientTransform="matrix(32 0 0 -32 1519 20757)"><stop offset="0" stop-color="#ffc107"/><stop offset=".507" stop-color="#f44336"/><stop offset=".99" stop-color="#9c27b0"/></linearGradient><path d="M256 128c-70.688 0-128 57.312-128 128s57.312 128 128 128 128-57.312 128-128-57.312-128-128-128zm0 208c-44.096 0-80-35.904-80-80 0-44.128 35.904-80 80-80s80 35.872 80 80c0 44.096-35.904 80-80 80z" fill="url(#b)"/><linearGradient id="c" gradientUnits="userSpaceOnUse" x1="-35.546" y1="644.579" x2="-34.792" y2="645.333" gradientTransform="matrix(32 0 0 -32 1519 20757)"><stop offset="0" stop-color="#ffc107"/><stop offset=".507" stop-color="#f44336"/><stop offset=".99" stop-color="#9c27b0"/></linearGradient><circle cx="393.6" cy="118.4" r="17.056" fill="url(#c)"/></svg>

              </a>
              
              </div>
              <div className="col-span-2">
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=mynameismric@gmail.com" target="_blank">
                <svg className="sm:w-32 sm:h-32 w-24 h-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#eceff1" d="M64 64h384v384H64z"/><path fill="#cfd8dc" d="M256 296.384L448 448V148.672z"/><path d="M464 64h-16L256 215.616 64 64H48C21.504 64 0 85.504 0 112v288c0 26.496 21.504 48 48 48h16V148.672l192 147.68L448 148.64V448h16c26.496 0 48-21.504 48-48V112c0-26.496-21.504-48-48-48z" fill="#f44336"/></svg>
                </a>
              </div>
          </div>
      </div>
    </div>
  );
}
