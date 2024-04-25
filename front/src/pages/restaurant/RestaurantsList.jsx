import Card from '../../components/Card';
import passetemps from '../../assets/restoimg/passe-temps.jpg';
import bellavita from '../../assets/restoimg/bellavita.jpg';
import traditions from '../../assets/restoimg/traditions.jpg';
import { Link } from 'react-router-dom';
import UserCard from '../../components/UserCard';


export default function RestaurantsList() {

  return (
    <section>
     
         <div className='flex justify-end items-end p-5'>
        <UserCard />
         </div>
      <div className='flex justify-center items-center m-10'>
      
        <h2 className='text-3xl'>Les Rest'O</h2>
      </div>
      <div key="passe-temps">
        <Link to="/restaurants/le%20passe-temps">
          <Card
            title="le passe-temps"
            img={passetemps}
            adresse="65 bd de Paris"
            codePostal="13003"
            note="4.5"
            prixMoyen="20€"
          />
        </Link>
      </div>

      <div key="bellavita">
        <Link to="/restaurants/bellavita">
          <Card
            title="bellavita"
            img={bellavita}
            adresse="65 bd de Paris"
            codePostal="13003"
            note="4.5"
            prixMoyen="20€"
          />
        </Link>
      </div>

      <div key="traditions">
        <Link to="/restaurants/traditions">
          <Card
            title="traditions"
            img={traditions}
            adresse="65 bd de Paris"
            codePostal="13003"
            note="4.5"
            prixMoyen="20€"
          />
        </Link>
      </div>


    </section>
  )
}
