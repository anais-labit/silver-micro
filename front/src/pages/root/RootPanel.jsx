import { Link } from "react-router-dom"
export default function RootPanel() {


    const data = [
        { id: 1, name: 'passe-temps beaucoup trop vite on fait comment', owner: 'jeremy nowak' },
        { id: 2, name: 'bella vita', owner: 'anais labit' },
        { id: 3, name: 'traditions', owner: 'guangquan ye' },
    ];
    return (
        <section>
            <div className='flex justify-center items-center m-10'>
                <h2 className='text-3xl'>Les Rest'O</h2>
            </div>
            <div className="overflow-x-auto m-5">
                <table className="w-full table-auto">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Owner</th>
                            <th className="border px-4 py-2">Gestion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td className="border px-4 py-2">{item.name}</td>
                                <td className="border px-4 py-2">{item.owner}</td>
                                <td className="border px-4 py-2">
                                    {/* Ici, vous pouvez ajouter des boutons pour la gestion */}
                                    <button >Edit</button>
                                    <button >Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

