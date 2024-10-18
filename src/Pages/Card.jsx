import React from "react";

const Card = ({ users }) => {
  return (
    <>
      <div className="row row-cols row-cols-md-4 g-5 m-5">
        {users?.map((user, index) => (
          <div className="col">
            <div className="card" style={{ width: "18rem" }} key={index}>
              <img
                src={user.image}
                style={{ width: "auto", height: "120px" }}
                className="card-img-top"
                alt={user.name}
              />
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p
                  className="card-text"
                  style={{
                    color: "black",
                    fontSize: "10px",
                    fontWeight: "bolder",
                  }}
                >
                  ${user.current_price}
                </p>
                <a href="#" className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Card;
