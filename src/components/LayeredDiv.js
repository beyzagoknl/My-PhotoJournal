import React from "react";
//import AppContext from "./AppContext";
import ContentAreaContext from "./ContentAreaContext";

class LayeredDiv extends React.Component {
  render() {
    return <Layer1 />;
  }
}

class Layer1 extends React.Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: "red",
          color: "black",
          marginLeft: "10rem",
          marginRight: "10rem",
        }}
      >
        <p>Love</p>
        <Layer2 />
        <p>Love</p>
      </div>
    );
  }
}

class Layer2 extends React.Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: "white",
          color: "black",
          marginLeft: "2rem",
          marginRight: "2rem",
        }}
      >
        <p>Enjoy</p>
        <Layer3 />
        <p>Enjoy</p>
      </div>
    );
  }
}

class Layer3 extends React.Component {
  static contextType = ContentAreaContext;

  render() {
    console.log("Layer3.render( )");

    return (
      <div
        style={{
          backgroundColor: "blue",
          color: "white",
          marginLeft: "2rem",
          marginRight: "2rem",
          padding: "0.5rem",
        }}
      >
        <p>Hey</p>
        <p>
          {this.context.userName}
          <br />
          Follow your heart!{" "}
        </p>
      </div>
    );
  }
}

export default LayeredDiv;
