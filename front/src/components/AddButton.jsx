export default function AddButton({ type, onClick }) {
  const label =
    type === "restaurant" ? "Ajouter un restaurant" : "Ajouter un utilisateur";

  return (
		<button
			className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition"
			onClick={onClick}>
			{label}
		</button>
	);
}
