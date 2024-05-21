import Pill from "./Pill";
export default function Card({ title, img, adresse, note, prixMoyen, tags }) {
    return (
        <div className="m-5 flex max-sm:flex-row lg:flex-col lg:hover:shadow-lg max-sm:border-2 max-sm:rounded-xl lg:rounded-lg lg:p-2 ">
         
            <div className="max-sm:w-1/2 lg:h-1/2">
                <img src={img} alt="img" className="object-fill w-48 h-40 max-sm:rounded-l-lg lg:rounded-md" />
            </div>
            <div className="lg:h-1/2 w-48 max-sm:w-1/2 p-2  flex flex-col justify-between my-2 ">
                <div className="flex justify-between ">
                    <p className="uppercase text-xl font-bold  ">{title}</p>
                </div>
                <div className="flex flex-col">
                    <p className="text-balance text-l ">{adresse}</p>
                </div>
                <div className="flex justify-between ">
                    <p>{note}</p>
                    <p>{prixMoyen}</p>
                </div>
                <div className="flex flex-row justify-center gap-2">
                <Pill tags = {tags} />

                </div>
            </div>
        </div>

        
    );
}