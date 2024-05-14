import { useParams } from "react-router-dom";
import React from "react";
import BackButton from "../../components/BackButton";
import { Link } from 'react-router-dom';


export default function RestaurantDetails() {
    let { title } = useParams();



    return (

        <div>
            <BackButton />
            <h2>{title}</h2>
            <Link to={`/restaurants/${title}/books`}>Book</Link>
        </div>
    );
}