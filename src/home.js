import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./card";
import "./home.css";

const Home = () => {
  const [data, setData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get("https://my-json-server.typicode.com/Codeinwp/front-end-internship-api/posts")
      .then((response) => {
        setData(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className={`home ${isModalOpen ? "disable-scroll" : ""}`}>
      <div className="card-container">
        {data.length > 0 &&
          data.map((cardData, index) => {
            return (
              <div className="author-work" key={cardData.id}>
                <Card cardData={cardData} isCard={true} addHover={index === data.length - 1} openModal={toggleModal} />
              </div>
            );
          })}
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <p className="close-icon" onClick={toggleModal}>
                X
              </p>
            </div>
            <Card cardData={data[data.length - 1]} isCard={false} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
