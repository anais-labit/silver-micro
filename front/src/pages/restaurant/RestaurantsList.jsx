import Card from '../../components/Card';
import passetemps from '../../assets/restoimg/passe-temps.jpg';
import bellavita from '../../assets/restoimg/bellavita.jpg';
import traditions from '../../assets/restoimg/traditions.jpg';
import { Link } from 'react-router-dom';
import UserMenu from '../../components/UserMenu';
import { useEffect } from 'react';


export default function RestaurantsList() {

  useEffect(()=> {

    const jwtToken = localStorage.getItem('jwtToken');
    if(jwtToken){
      fetch(PATH + "/panel/restaurants",{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`
        }

      })
      .then((response) => {
        if(!response){
          throw new Error("An error occured");
        }
      })
      
    }

  })



  return (
    <section>

      <div className='flex justify-end items-end p-5'>
        <UserMenu />

      </div>
      <div className='flex justify-center items-center m-10'>

        <h2 className='text-5xl font-bold'>Les HappyRest'O</h2>
      </div>
      <div className="flex justify-center items-center m-10 max-sm:flex-col">

        <div key="passe-temps" >
          <Link to="/restaurants/le%20passe-temps">
            <Card
              title="le passe-temps"
              img={passetemps}
              adresse="65 bd de Paris"
              codePostal="13003"
              
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
              
            />
          </Link>
        </div>

       
      </div>
    </section>
  )
}
