import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Swal from "sweetalert2";

export default function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        await axios
            .get(`https://api.jeabcesewil.com/api/products`)
            .then(({ data }) => {
                setProducts(data);
            });
    };

    const deleteProduct = async (id) => {
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
            .delete(`https://api.jeabcesewil.com/api/products/${id}`)
            .then(({ data }) => {
                Swal.fire({
                    icon: "success",
                    text: data.message,
                });
                fetchProducts();
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
                <div className="col-12">
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <h1>Products</h1>
                        <Link className="btn-add" to="/product/create">
                            Add new Product
                        </Link>
                    </div>
                </div>
                <div className="col-12">
                    <div className="card card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered mb-0 text-center">
                                <thead >
                                    <tr>
                                        <th className="text-center">Product Name</th>
                                        <th className="text-center">Description</th>
                                        <th className="text-center">Image</th>
                                        <th className="text-center">Price</th>
                                        <th className="text-center">Category</th>
                                        <th className="text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {products.length > 0 &&
                                        products.map((row, key) => (
                                            <tr key={key}>
                                                <td>{row.title}</td>
                                                <td>{row.description}</td>
                                                <td>
                                                    <img
                                                        width="50px"
                                                        src={`https://api.jeabcesewil.com/storage/product/image/${row.image}`}
                                                    />
                                                </td>
                                                <td>{row.price}</td>
                                                <td>{row.category}</td>
                                                <td>
                                                    <Link
                                                        to={`/product/edit/${row.id}`}
                                                        className="btn-edit"
                                                    >
                                                        Edit
                                                    </Link>
                                                    &nbsp;
                                                    <Button
                                                        className="btn-delete"
                                                        onClick={() =>
                                                            deleteProduct(
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
