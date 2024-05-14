import React from 'react';

class RetourArriere extends React.Component {
  handleClick = (event) => {
    event.preventDefault();
    const currentUrl = window.location.href;
    const secondLastIndex = currentUrl.lastIndexOf(
      "/",
      currentUrl.lastIndexOf("/") - 1
    );
    const newUrl = currentUrl.substring(-1, secondLastIndex);
    window.location.href = newUrl;
  };

  render() {
    return (
      <a href="#" onClick={this.handleClick}>
        Retour
      </a>
    );
  }
}

export default RetourArriere;
