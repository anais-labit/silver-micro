export default function AddButton({ type, onClick }) {
  const label =
    type === "restaurant" ? "Ajouter un restaurant" : "Ajouter un utilisateur";

  return (
    <button
      className="bg-black px-3 pb-1 text-white rounded-xl text-xl w-full"
      onClick={onClick}
    >
      {label}
    </button>
  );
}
