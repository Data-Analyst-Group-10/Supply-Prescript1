import { useEffect, useState } from "react";
import API from "../services/api";


function Dashboard() {

    const [totalOrders, setTotalOrders] = useState(0);
    const [inventory, setInventory] = useState(0);
    const [suppliers, setSuppliers] = useState(0);
    const [prediction, setPrediction] = useState("Loading...");


    useEffect(() => {

        const fetchDashboardData = async () => {

            try {

                // Get Orders
                const ordersResponse = await API.get("/orders/");
                setTotalOrders(ordersResponse.data.length);


                // Get Inventory
                const inventoryResponse = await API.get("/inventory/");
                setInventory(inventoryResponse.data.length);


                // Get Suppliers
                const suppliersResponse = await API.get("/suppliers/");
                setSuppliers(suppliersResponse.data.length);


                // Prediction (temporary)
                setPrediction("Second Class");


            } catch (error) {

                console.error(
                    "Dashboard API Error:",
                    error
                );

            }

        };


        fetchDashboardData();

    }, []);



    return (

        <div className="p-6">

            <h1 className="text-3xl font-bold mb-6">
                SupplyPrescript Dashboard
            </h1>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


                <div className="bg-white shadow rounded-lg p-5">

                    <h2 className="text-xl font-semibold">
                        Total Orders
                    </h2>

                    <p className="text-3xl mt-3">
                        {totalOrders}
                    </p>

                </div>



                <div className="bg-white shadow rounded-lg p-5">

                    <h2 className="text-xl font-semibold">
                        Inventory
                    </h2>

                    <p className="text-3xl mt-3">
                        {inventory}
                    </p>

                </div>




                <div className="bg-white shadow rounded-lg p-5">

                    <h2 className="text-xl font-semibold">
                        Suppliers
                    </h2>

                    <p className="text-3xl mt-3">
                        {suppliers}
                    </p>

                </div>


            </div>



            <div className="mt-6 bg-white shadow rounded-lg p-5">

                <h2 className="text-xl font-semibold">
                    Prediction
                </h2>


                <p className="text-2xl mt-3">
                    {prediction}
                </p>

            </div>


        </div>

    );

}


export default Dashboard;