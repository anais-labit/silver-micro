import React from "react";

class RetourArriere extends React.Component {
  handleClick = (event) => {
    event.preventDefault();
    const currentUrl = window.location.href;
    const newUrl = currentUrl.replace(/restaurants\/update\/[0-9]+$/, ""); // Remplace "/update/[numéro]" par une chaîne vide
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
