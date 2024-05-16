import Booking from "../../components/Booking";
import BackButton from "../../components/BackButton";
import { useParams } from "react-router-dom";

export default function RestaurantBookList() {

    let { title } = useParams();

    return (
        <section>
            <div>
                <BackButton />
            </div>
            <div>
                <h2>{title}</h2>
            <Booking />

            </div>
        </section>
    );
}