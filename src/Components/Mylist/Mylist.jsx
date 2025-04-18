import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import MyListRow from "./MyListRow";
import { Helmet } from "react-helmet-async";

const Mylist = () => {
    const { user } = useContext(AuthContext); 
    const [savedspots, setSavedspot] = useState([]); 
    const [loading, setLoading] = useState(true);
    const url = `https://my-server-black.vercel.app/saveSpotData?email=${user?.email}`;

    useEffect(() => {
        if (user?.email) {
            fetch(url)
                .then((res) => res.json())
                .then((data) => {
                    setSavedspot(data); 
                    setLoading(false); 
                })
                .catch((error) => {
                    console.error("Error fetching saved spots:", error);
                    setLoading(false); 
                });
        }
    }, [user?.email]);

    const handleDelete = (id) => {
        setSavedspot(savedspots.filter((savedspot) => savedspot._id !== id));
    };

    if (loading) {
        return <div className="text-center py-10 text-lg text-green-600 font-semibold">Loading...</div>;
    }

    return (
        <div className="flex-grow px-4 py-8">
            

               <Helmet>
                    <title>Travellette | Mylist</title>
                  </Helmet>
            <h2 className="text-center text-2xl mb-6 text-green-600 font-bold">
                Your Bookings ({savedspots.length})
            </h2>
            <div className="overflow-x-auto">
                <table className="table w-full text-sm md:text-base">
                    <thead className="bg-green-100 text-green-700">
                        <tr>
                            <th>Place Image</th>
                            <th>Customer Name</th>
                            <th>Tourist Spot Name</th>
                            <th>Country</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {savedspots.map((savedspot) => (
                            <MyListRow
                                key={savedspot._id}
                                savedspot={savedspot}
                                onDelete={handleDelete}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Mylist;
