import { useParams } from "react-router-dom";
import React from "react";
import BackButton from "../../components/BackButton";


export default function RestaurantDetails() {
    let { title } = useParams();



    return (

        <div>
            <BackButton />
            <h2>{title}</h2>
           
        </div>
    );
}