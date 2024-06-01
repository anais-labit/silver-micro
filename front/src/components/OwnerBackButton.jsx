import React from "react";
import back from "../assets/back.png";


class RetourArriere extends React.Component {
  handleClick = (event) => {
    event.preventDefault();
    const currentUrl = window.location.href;
    const newUrl = currentUrl.replace(/restaurants\/update\/[0-9]+$/, ""); // Remplace "/update/[numéro]" par une chaîne vide
    window.location.href = newUrl;
  };

  render() {
    return (
			<div>
				<a href="#" onClick={this.handleClick}>
					<img src={back} alt="" />
				</a>
			</div>
		);
  }
}

export default RetourArriere;
