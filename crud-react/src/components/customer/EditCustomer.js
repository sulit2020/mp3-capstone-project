import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';

export default function EditCustomer() {
  const navigate = useNavigate();

  const { id } = useParams()

  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [image, setImage] = useState(null)
  const [validationError,setValidationError] = useState({})

  useEffect(()=>{
    fetchCustomer()
  },[])

  const fetchCustomer = async () => {
    await axios.get(`https://api.jeabcesewil.com/api/customers/${id}`).then(({data})=>{
      const { firstname, lastname } = data.customer
      setFirstname(firstname)
      setLastname(lastname)
    }).catch(({response:{data}})=>{
      Swal.fire({
        text:data.message,
        icon:"error"
      })
    })
  }

  const changeHandler = (event) => {
		setImage(event.target.files[0]);
	};

  const updateCustomer = async (e) => {
    e.preventDefault();

    const formData = new FormData()
    formData.append('_method', 'PATCH');
    formData.append('firstname', firstname)
    formData.append('lastname', lastname)
    formData.append('address', address)
    formData.append('phone', phone)
    if(image!==null){
      formData.append('image', image)
    }

    await axios.post(`https://api.jeabcesewil.com/api/customers/${id}`, formData).then(({data})=>{
      Swal.fire({
        icon:"success",
        text:data.message
      })
      navigate("/customers")
    }).catch(({response})=>{
      if(response.status===422){
        setValidationError(response.data.errors)
      }else{
        Swal.fire({
          text:response.data.message,
          icon:"error"
        })
      }
    })
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Update Customer</h4>
              <hr />
              <div className="form-wrapper">
                {
                  Object.keys(validationError).length > 0 && (
                    <div className="row">
                      <div className="col-12">
                        <div className="alert alert-danger">
                          <ul className="mb-0">
                            {
                              Object.entries(validationError).map(([key, value])=>(
                                <li key={key}>{value}</li>   
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  )
                }
                <Form onSubmit={updateCustomer}>
                  <Row> 
                      <Col>
                        <Form.Group controlId="Name">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" value={firstname} onChange={(event)=>{
                              setFirstname(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row className="my-3">
                      <Col>
                        <Form.Group controlId="LastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" value={lastname} onChange={(event)=>{
                              setLastname(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="Image" className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" onChange={changeHandler} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="my-3"> 
                      <Col>
                        <Form.Group controlId="Address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" value={address} onChange={(event)=>{
                              setAddress(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row > 
                      <Col>
                        <Form.Group controlId="Phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" value={phone} onChange={(event)=>{
                              setPhone(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  
                  <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                    Update
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}