export default function Pill({ tags }) {
  return (
    <>
      {tags.map((tag, index) => (
        <div className="flex  flex-row bg-black rounded-md mt-3 justify-center items-center px-3 py-1">
          <p key={index} className="text-white text-xs font-extrabold ">
            {tag}
          </p>
        </div>
      ))}
    </>
  );
}
