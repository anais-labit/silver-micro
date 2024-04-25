import React from 'react';

class RetourArriere extends React.Component {
  handleClick = (event) => {
    event.preventDefault();
    const currentUrl = window.location.href;
    const lastIndex = currentUrl.lastIndexOf("/");
    const newUrl = currentUrl.substring(-1, lastIndex);
    window.location.href = newUrl;
  }

  render() {
    return (
      <a href="#" onClick={this.handleClick}>Retour</a>
    );
  }
}

export default RetourArriere;
