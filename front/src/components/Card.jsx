export default function Card({ title, img, adresse, codePostal, note, prixMoyen }) {
    return (
        
        <div className="flex flex-row m-10 mx-5 h-44 border-2 border-gray-300 rounded-xl">
            <div className="flex w-1/2">
                <img src={img} alt="img" className="w-full object-fill object-center rounded-l-lg" />
            </div>
            <div className="flex flex-col justify-center items-start w-1/2 pl-5">
                <div>
                    <p className="uppercase">{title}</p>
                </div>
                <div className="flex flex-col justify-center">
                    <p>{adresse}</p>
                    <p>{codePostal}</p>
                </div>
                <div className="flex flex-row gap-6">
                    <p>{note}</p>
                    <p>{prixMoyen}</p>
                </div>
            </div>
        </div>

        
    );
}