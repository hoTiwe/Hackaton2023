import React, { useEffect, useState, useRef } from "react";
import styles from "./map.module.scss";
import Wash from "../Wash/wash";
import MapComponent from "../MapComponent/MapComponent";

// import MyMap from "../map/MyMap";

export default function HomePage(props) {
  useEffect(() => {
    // Запрещаем прокрутку на странице при монтировании компонента
    document.body.style.overflow = "hidden";
    // Возвращаем прокрутку при размонтировании компонента
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Запросим от бэка

  const [idContent, setIdContetnt] = useState(0);

  const mapRef = useRef(0);

  var coordinats = [
    //точки которые берем с бд (координаты и данные об автомойке)
    {
      id: 0,
      x: 47.208208,
      y: 38.937189,
      content: "Память Фаине",
      prise: 500,
      rating: 4.3,
      adres: "Ул. Автомоячная 1а",
      time: "9-00 до 21-00",
      reyting: "1",
      tel: "79501234541",
    },
    // {
    //   id: 1,
    //   x: 47.200551,
    //   y: 38.916079,
    //   content: "Автомойка - 2",
    //   prise: 1500,
    //   rating: 3.3,
    //   adres: "Ул. Автомоячная 2а",
    //   time: "8-00 до 20-00",
    //   reyting: "2",
    //   tel: "79501234542",
    // },
    // {
    //   id: 2,
    //   x: 47.217043,
    //   y: 38.920761,
    //   content: "Автомойка - 3",
    //   prise: 100,
    //   rating: 5.0,
    //   adres: "Ул. Автомоячная 3а",
    //   time: "10-00 до 22-00",
    //   reyting: "3",
    //   tel: "79501234543",
    // },
    // {
    //   id: 3,
    //   x: 47.224817,
    //   y: 38.922566,
    //   content: "Реал",
    //   prise: 300,
    //   rating: 4.3,
    //   adres: "Ул. Автомоячная 4а",
    //   time: "9-00 до 21-00",
    //   reyting: "4",
    //   tel: "79501234544",
    // },
    // {
    //   id: 4,
    //   x: 47.233268,
    //   y: 38.91589,
    //   content: "Автомойка 4",
    //   prise: 400,
    //   rating: 2.2,
    //   adres: "Ул. Автомоячная 5а",
    //   time: "7-00 до 19-00",
    //   reyting: "5",
    //   tel: "79501234545",
    // },
    // {
    //   id: 5,
    //   x: 47.256496,
    //   y: 38.895906,
    //   content: "Автомойка на стоянке",
    //   prise: 600,
    //   rating: 4.4,
    //   adres: "Ул. Автомоячная 6а",
    //   time: "7-00 до 21-00",
    //   reyting: "3",
    //   tel: "79501234546",
    // },
  ];

  var time = coordinats[idContent].time;
  var address = coordinats[idContent].adres;
  var name = coordinats[idContent].content;
  var arrPhoto = [];
  var reyting = coordinats[idContent].reyting;
  // }

  // ---------------------------------------

  window.scrollTo(0, 0);
  // document.body.classList.add('body__style');

  const [openMyWash, setOpenMyWash] = useState(false);

  function funOpenWash() {
    setOpenMyWash(true);
    console.log("open");
  }

  const screenHeight = window.screen.height;
  // console.log(screenHeight);
  const Map__Height = screenHeight - 50;

  //кнопка маршрут--------------------------------
  const [marshrut, setMarshrut] = useState(0);

  function funMarshrut() {
    console.log("handleClick", idContent, "koor", [marshrut[1], marshrut[0]]);

    const pointB = [coordinats[idContent].x, coordinats[idContent].y]; // координаты точки А
    const pointA = [marshrut[0], marshrut[1]]; // координаты точки Б
    const url = ` https://yandex.ru/maps/?rtext=${pointA}~${pointB}&rtt=auto`;

    window.open(url, "_blank");
  }
  // =================================

  return (
    <div className={styles.HomePage}>
      <div style={{ height: `${Map__Height + "px"}` }} className={styles.map}>
        <MapComponent
          marshrut={marshrut}
          setMarshrut={setMarshrut}
          h={Map__Height}
          mapRef={mapRef}
          coordinats={coordinats}
          setIdContetnt={setIdContetnt}
          funOpenWash={funOpenWash}
        />
      </div>
      <Wash
        coordinats={coordinats[idContent]}
        funMarshrut={funMarshrut}
        time={time}
        address={address}
        name={name}
        arrPhoto={arrPhoto}
        reyting={reyting}
        openMyWash={openMyWash}
        setOpenMyWash={setOpenMyWash}
      />
    </div>
  );
}