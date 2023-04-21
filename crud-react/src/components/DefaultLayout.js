import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import { useEffect } from "react";

export default function DefaultLayout() {
    const { user, token, setUser, setToken, notification } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    const onLogout = (ev) => {
        ev.preventDefault();

        axiosClient.post("/logout").then(() => {
            setUser({});
            setToken(null);
        });
    };

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, []);

    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">
                    <span className="material-icons-outlined">dashboard</span>{" "}
                    Dashboard
                </Link>
                <br />
                <Link to="/users">
                    <span class="material-icons-outlined">account_circle</span> Users
                </Link>
                <br />
                <Link to="/products">
                    <span className="material-icons-outlined">inventory_2</span>{" "}
                    Products
                </Link>
                <br />
                <Link to="/customers"><span class="material-icons-outlined">group</span> Customers</Link>
                <br />
                <Link to="/orders">
                    <span className="material-icons-outlined">
                        add_shopping_cart
                    </span>{" "}
                    Orders
                </Link>
            </aside>
            <div className="content">
                <header>
                    <div><h1>JeabCeseWil Pharmacy</h1></div>

                    <div>
                        {user.name} &nbsp; &nbsp;
                        <a onClick={onLogout} className="btn-edit" href="#">
                            Logout
                        </a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
                {notification && (
                    <div className="notification">{notification}</div>
                )}
            </div>
        </div>
    );
}
