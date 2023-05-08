import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Swal from "sweetalert2";

export default function CustomerList() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        await axios
            .get(`https://api.jeabcesewil.com/api/customers`)
            .then(({ data }) => {
                setCustomers(data);
            });
    };

    const deleteCustomer = async (id) => {
        const isConfirm = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            return result.isConfirmed;
        });

        if (!isConfirm) {
            return;
        }

        await axios
            .delete(`https://api.jeabcesewil.com/api/customers/${id}`)
            .then(({ data }) => {
                Swal.fire({
                    icon: "success",
                    text: data.message,
                });
                fetchCustomers();
            })
            .catch(({ response: { data } }) => {
                Swal.fire({
                    text: data.message,
                    icon: "error",
                });
            });
    };

    return (
        <div className="container">
            <div className="row">
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <h1>Customers</h1>
                    <Link className="btn-add" to="/customer/create">
                        Add new Customer
                    </Link>
                </div>
                <div className="col-12">
                    <div className="card card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered mb-0 text-center">
                                <thead>
                                    <tr>
                                        <th className="text-center">
                                            Customer ID
                                        </th>
                                        <th className="text-center">
                                            First Name
                                        </th>
                                        <th className="text-center">
                                            Last Name
                                        </th>
                                        <th className="text-center">Photo</th>
                                        <th className="text-center">Address</th>
                                        <th className="text-center">
                                            Contact Number
                                        </th>
                                        <th className="text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customers.length > 0 &&
                                        customers.map((row, key) => (
                                            <tr key={key}>
                                                <td>{row.id}</td>
                                                <td>{row.firstname}</td>
                                                <td>{row.lastname}</td>
                                                <td>
                                                    <img
                                                        width="50px"
                                                        src={`https://api.jeabcesewil.com/storage/customer/image/${row.image}`}
                                                    />
                                                </td>
                                                <td>{row.address}</td>
                                                <td>{row.phone}</td>
                                                <td>
                                                    <Link
                                                        to={`/customer/edit/${row.id}`}
                                                        className="btn-edit"
                                                    >
                                                        Edit
                                                    </Link>
                                                    &nbsp;
                                                    <Button
                                                        className="btn-delete"
                                                        onClick={() =>
                                                            deleteCustomer(
                                                                row.id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
