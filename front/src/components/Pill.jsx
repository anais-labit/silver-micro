export default function Pill({ tags }) {


    return (
        <div className="flex flex-row bg-black rounded-full justify-center items-center px-3 py-1">
        <p className=" text-white" >{tags}</p>
        </div>
        
    );
    }