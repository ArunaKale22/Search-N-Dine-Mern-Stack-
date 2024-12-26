import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";

export default function Home() {
  const [foodCat, setfoodCat] = useState([]);
  const [foodItem, setfoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();

    setfoodItem(response[0]);
    setfoodCat(response[1]);
    //console.log(response[0],response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Carousel />
      </div>
      {/* <div className="container">
        {
            foodCat !== []
            ? foodCat.map((data) => {
              return(
                <div>Hello World</div>
             
              )
            })
            : <div>""""""""""""""</div>
        }
        <Card />
      </div> */}

      <div className="container">
        {foodCat.length > 0
          ? foodCat.map((data) => {
              return (
                <div>
                  <div key={data.id} className="fs-3 m-3">
                    {" "}
                    {/*Assuming each item has a unique id*/}
                    {data.categoryName}
                  </div>
                  <hr />
                  {foodItem.length > 0 ? (
                    foodItem
                      .filter((item) => item.categoryName === data.CategoryName)
                      .map((filterItems) => {
                        return (
                          <div key={filterItems._id}>
                            <Card></Card>
                          </div>
                        );
                      })
                  ) : (
                    <div>No such data found</div>
                  )}
                </div>
              );
            })
          : " "}
        <Card />
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
