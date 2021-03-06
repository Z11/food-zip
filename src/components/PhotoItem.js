import React from "react";
class PhotoItem extends React.Component {
  state = { spans: 0 };
  imageRef = React.createRef();

  componentDidMount() {
    this.imageRef.current.addEventListener("load", this.setSpans);
  }

  setSpans = () => {
    const height = this.imageRef.current.clientHeight;
    const spans = Math.ceil(height / 10);
    this.setState({ spans });
  };

  render() {
    return (
      <div style={{ gridRowEnd: `span ${this.state.spans}` }}>
        <img
          ref={this.imageRef}
          height="275"
          alt=""
          src={this.props.image.photo_url}
        />
      </div>
    );
  }
}

export default PhotoItem;
