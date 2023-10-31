import React from "react";
import Carousel from "react-elastic-carousel";
import Announc_cont from "../../components/Announc";
// import item from "./item";
import pic1 from "../../assets/news_ann/Pic 1.jpg";
import pic2 from "../../assets/news_ann/Pic 2.jpg";
import pic3 from "../../assets/news_ann/Pic 3.jpg";
// import ann_pic1 from "../../assets/news_ann/ann_pic_1.jpg";
// import ann_pic2 from "../../assets/news_ann/ann_pic_2.jpg";
// import ann_pic3 from "../../assets/news_ann/ann_pic_3.jpg";
import Nav from "../../components/Nav_bar";
import Footer from "../../components/footer";

export default function Home() {
  const [obj_comp, setComp] = React.useState([
    {
      id: 1,
      img: "./ann_pic_1.jpg",
      Announcment:
        "people residing in wereda 8 please schedule an appointment a two weeks from now",
    },
    {
      id: 2,
      img: "./ann_pic_2.jpg",
      Announcment:
        "people residing in wereda 14 please schedule an appointment a week from now",
    },
    {
      id: 3,
      img: "./ann_pic_3.jpg",
      Announcment:
        "people residing in wereda 7 please schedule an appointment in this week",
    },
  ]);
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    // { width: 768, itemsToShow: 3 },
    // { width: 1200, itemsToShow: 4 },
  ];

  const maped = obj_comp.map((item) => {
    return (
      <item key={item.id}>
        <Announc_cont image={item.img} Ann={item.Announcment} />
      </item>
    );
  });
  return (
    <div>
      <Nav />
      <div className="home_div">
        <div className="news_div">
          <input type="radio" name="radio1" id="radio1" />
          <input type="radio" name="radio2" id="radio2" />
          <input type="radio" name="radio3" id="radio3" />
          <img src={pic1} className="first_img" />
          <img src={pic2} className="second_img" />
          <img src={pic3} className="third_img" />

          <div className="news_info">
            <h3>Ethiopia Promises no power outages from now on</h3>
            <p>
              {" "}
              "Ethiopia has started exporting electricity to neighboring Kenya
              following a week of testing of a new transmission line, Ethiopian
              Electric Power said.<br></br> The $500 million line has capacity
              to transmit 2,000 megawatts of electricity, potentially earning
              Ethiopia as much as $100 million annually. "<br></br>
            </p>
          </div>
        </div>
        <div className="Announcment_div">
          <h2>Announcments</h2>
          <div className="Announc_list">
            <Carousel breakPoints={breakPoints}>{maped}</Carousel>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
