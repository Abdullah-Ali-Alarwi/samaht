import React from "react";
import { FaPhoneVolume } from "react-icons/fa6";
import { useTranslations } from "next-intl";

import Image from "next/image";
import logo from "@/public/logo.svg";

export default function MainFooter() {
  const t = useTranslations("Index");
  return (
    <div className="bg-yellow-600/10  ">

      <div className=" flex-col w-[90%] m-auto text-black py-4 mt-5 pb-10  flex   ">
           <Image src={logo} alt="Logo" width={179} height={100} />
    
   <div className="contentfooter   flex  flex-col lg:flex-row  gap-5  lg:items-center">
     <div className="left   lg:w-1/2">
          <p className="text-sm my-10 leading-10  lg:m-10">
          {t("our_website")}
          </p>
        
       
      </div>

      <div className="right  ">
         <div className=" flex items-center justify-center ">
          <div className=" flex-col  w-full lg:flex-row flex gap-5 mb-10">
            <div className="flex  gap-2 items-center ">
              <div className="text-2xl bg-yellow-400 text-white rounded-full p-2 w-fit">
                <FaPhoneVolume />
              </div>
              <div>
                <p>Do you have a question</p>
                <p>778826655</p>
              </div>
            </div>
            <div className="flex  gap-2 items-center">
              <div className="text-2xl bg-yellow-400 text-white rounded-full p-2 w-fit">
                <FaPhoneVolume />
              </div>
              <div>
                <p>Do you have a question</p>
                <p>778826655</p>
              </div>
            </div>
          </div>
        </div>
      </div>
   </div>
       







     
      <ul className="flex  justify-center  lg:justify-start flex-wrap w-[90%] gap-3 ">
        <li>{t("section")}</li>
        <li>{t("common_question")}</li>
        <li>{t("subscription")}</li>
        <li>{t("contact_us")}</li>
      </ul>

       <div className="flex justify-center my-3 items-center">
        <p>{t("all_rights_reserved")}</p>
      </div>
    </div>
    </div>
  );
}
