import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import { ContextProvider } from "./context/ContextProvider";
import DefaultLayout from "./components/DefaultLayout";
import Dashboard from "./Dashboard";
import Users from "./views/Users";
import EditProduct from "./components/products/edit.component";
import CreateProduct from "./components/products/create.component";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/Login";
import Signup from "./views/Signup";
import ProductList from "./components/products/list.component";
import Order from "./components/order/Order";
import CreateCustomer from "./components/customer/CreateCustomer";
import EditCustomer from "./components/customer/EditCustomer";
import CustomerList from "./components/customer/Customer";
import UserForm from "./views/UserForm";



function App() {
    return (
        <Router>
            <Container className="mt-5">
                <Row>
                    <Col md={12}>
                        <ContextProvider>
                            <Routes>
                                <Route path="/" element={<DefaultLayout />}>
                                    <Route
                                        path="/"
                                        element={<Navigate to="/dashboard" />}
                                    />
                                    <Route
                                        path="/dashboard"
                                        element={<Dashboard />}
                                    />
                                    <Route path="/users" element={<Users />} />
                                    <Route path="/users/new" element={<UserForm />} />
                                    <Route
                                        exact
                                        path="/products"
                                        element={<ProductList />}
                                    />
                                    
                                     <Route
                                        exact
                                        path="/orders"
                                        element={<Order />}
                                    />
                                    <Route
                                        path="/product/edit/:id"
                                        element={<EditProduct />}
                                    />
                                    <Route
                                        path="/product/create"
                                        element={<CreateProduct />}
                                    />
                                     <Route
                                        exact
                                        path="/customers"
                                        element={<CustomerList />}
                                    />
                                       <Route
                                        exact
                                        path="/customer/edit/:id"
                                        element={<EditCustomer />}
                                    />
                                       <Route
                                        exact
                                        path="/customer/create"
                                        element={<CreateCustomer />}
                                    />
                                </Route>
                                <Route path="/" element={<GuestLayout />}>
                                    <Route path="/login" element={<Login />} />
                                    <Route
                                        path="/signup"
                                        element={<Signup />}
                                    />
                                </Route>
                            </Routes>
                        </ContextProvider>
                    </Col>
                </Row>
            </Container>
        </Router>
    );
}

export default App;
