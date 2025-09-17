"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-cards";
import "@/src/app/styles/userOpenionsliderStyle.css";

export default function UsersOpinions() {
  const [opinions] = useState([
    {
      id: 1,
      name: "أحمد سعيد",
      title: "البيضاء اليمن",
      avatar: "https://i.pravatar.cc/150?img=12",
      opinion:
        "لقد جربت خدمة سماهات لشراء منتجات من الصين وكانت تجربة مميزة جدًا. المنتجات وصلت بسرعة وكانت بحالة ممتازة، مع تغليف آمن واهتمام كبير بالتفاصيل. خدمة العملاء كانت متعاونة جدًا وأجابت على جميع استفساراتي، مما جعل عملية التسوق سهلة وسلسة من البداية وحتى وصول الطلب."
    },
    {
      id: 2,
      name: "فهد علي",
      title: "عدن، اليمن",
      avatar: "https://i.pravatar.cc/150?img=7",
      opinion:
        "خدمة سماهات رائعة ومريحة للغاية! التسوق من المواقع الصينية أصبح بسيطًا وسلسًا، مع خيارات متنوعة للمنتجات وأسعار مناسبة. التوصيل كان سريعًا والمنتجات وصلت بحالة ممتازة. أعجبني متابعة الطلب بشكل مستمر والتحديثات التي وصلتني على الهاتف، مما جعل التجربة ممتعة وآمنة."
    },
    {
      id: 3,
      name: "خالد عبدالله",
      title: "المكلا، اليمن",
      avatar: "https://i.pravatar.cc/150?img=15",
      opinion:
        "سماهات توفر خدمة ممتازة وموثوقة لجميع العملاء. تجربتي كانت رائعة، حيث وصلت المنتجات التي طلبتها بسرعة وجودة عالية، مع تغليف جيد يحمي المحتوى. أحببت طريقة التتبع والمتابعة المستمرة للطلبات، وخدمة العملاء كانت متجاوبة جدًا مع جميع استفساراتي. أنصح الجميع باستخدام هذه الخدمة بلا تردد."
    },
    {
      id: 4,
      name: "سلمان جمال",
      title: "تعز، اليمن",
      avatar: "https://i.pravatar.cc/150?img=8",
      opinion:
        "التجربة مع سماهات كانت ممتازة بكل المقاييس. كل المنتجات التي طلبتها من المواقع الصينية وصلت في الوقت المحدد وبجودة عالية جدًا. طريقة التوصيل سهلة وسريعة، وخدمة العملاء محترفة وتجيب على جميع الأسئلة. أشعر بالراحة عند التسوق معهم وأستمتع بالتجربة بشكل كبير."
    },
    {
      id: 5,
      name: "محمد القاضي",
      title: "حضرموت، اليمن",
      avatar: "https://i.pravatar.cc/150?img=2",
      opinion:
        "أحببت استخدام خدمة سماهات للتسوق من الصين، فقد جعلت العملية سهلة وسلسة جدًا. جميع المنتجات وصلت بحالة ممتازة ومع تغليف جيد. سرعة التوصيل كانت مرضية، وخدمة العملاء كانت ممتازة ومتعاونة. بالتأكيد سأستمر في استخدام سماهات في كل مشترياتي المستقبلية من المواقع الصينية."
    },
  ]);

  return (
    <div className="w-full">
      <h1 className="text-left text-2xl font-bold my-5 mx-7 text-yellow-400">
        آراء المستخدمين
      </h1>

      <div className="flex justify-center items-center">
        <div className="relative w-full max-w-full px-4 mt-12">
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards, Navigation]}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            className="mySwiper w-full relative !overflow-visible"
          >
            {opinions.map((user) => (
              <SwiperSlide key={user.id} className="w-full !overflow-visible">
                <div className="relative bg-white border border-gray-200 rounded-xl shadow-md px-6 pt-20 pb-6 text-center h-auto w-full">
                  {/* الصورة والدائرة */}
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
                    <div className="absolute w-20 h-20 md:w-32 md:h-32 bg-[#FEEA00] rounded-full -z-10"></div>
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-20 h-20 md:w-28 md:h-28 rounded-full border-4 border-white shadow-lg relative"
                    />
                  </div>

                  {/* المحتوى */}
                  <div className="mt-12">
                    <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
                    <p className="text-sm text-gray-500 mb-4">{user.title}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{user.opinion}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* الأسهم (تظهر فقط على الشاشات الكبيرة) */}
          <div className="custom-prev hidden lg:flex absolute top-1/2 left-30 -translate-y-1/2 cursor-pointer z-50">
            <div className="bg-[#FEEA00] rounded-full w-12 h-12 flex items-center justify-center shadow-md">
              <ChevronLeft className="text-white w-6 h-6" />
            </div>
          </div>
          <div className="custom-next hidden lg:flex absolute top-1/2 right-30 -translate-y-1/2 cursor-pointer z-50">
            <div className="bg-[#FEEA00] rounded-full w-12 h-12 flex items-center justify-center shadow-md">
              <ChevronRight className="text-white w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
