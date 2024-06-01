import React from 'react';
import back from "../assets/back.png";


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
			<div>
				<a href="#" onClick={this.handleClick}>
					<img src={back} alt="" />
				</a>
			</div>
		);
  }
}

export default RetourArriere;
