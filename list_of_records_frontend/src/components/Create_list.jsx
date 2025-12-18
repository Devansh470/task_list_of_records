import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const Create_list = () => {
    const [showToast, setShowToast] = useState(false);

    const [inputs,setinputs]=useState({
        name:"",
        email:"",
        status:"active",
    })
    const [errors, setErrors] = useState({ name: '', email: '' });


    const validate = () => {
        const newErrors = { name: '', email: '' };
        let ok = true;

        if (inputs.name.trim() === '') {
            newErrors.name = 'Name is required';
            ok = false;
        } 
        else if (!/^[A-Za-z\s]+$/.test(inputs.name.trim())) {
            newErrors.name = 'Name must contain only letters';
            ok = false;
        }

        if (inputs.email.trim() === '') {
            newErrors.email = 'Email is required';
            ok = false;
        } 
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.email.trim())) {
            newErrors.email = 'Invalid email format';
            ok = false;
        }

        setErrors(newErrors);
        return ok;
    };



    const handelinput=(e)=>{
        let name=e.target.name;
        let value=e.target.value;
        setinputs((values)=>({...values,[name]:value}))
        console.log(inputs);

    }

    const handelsubmit=(e)=>{
        e.preventDefault();
        if (!validate()) return;
        let api="http://127.0.0.1:8000/list-records/";

        const payload = {
        name: inputs.name,
        email: inputs.email,
        active: inputs.status === "active",
        inactive: inputs.status === "inactive",
        };

        axios.post(api,payload).then((res)=>{
            setShowToast(true);
            console.log(res.data);
        })
    }

    return(
        <>
        <Form>
            <h3 className="table-title">Enter the Records</h3>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
        <Form.Label column sm={2}> Name </Form.Label>
        <Col sm={10}> <Form.Control type="text" placeholder="Name" name='name' value={inputs.name} onChange={handelinput} isInvalid={!!errors.name}/>
        <Form.Control.Feedback type="invalid" style={{ fontSize: '12px' }}> {errors.name} </Form.Control.Feedback>
        </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}> Email </Form.Label>
        <Col sm={10}> <Form.Control type="email" placeholder="Email" name='email' value={inputs.email} onChange={handelinput} isInvalid={!!errors.email} /> 
        <Form.Control.Feedback type="invalid" style={{ fontSize: '12px' }}> {errors.email} </Form.Control.Feedback>
        </Col>
      </Form.Group>
        <Form.Group as={Row} className="mb-4"> <Form.Label as="legend" column sm={2}></Form.Label>
          <Col sm={10} className="radio-col">
            <b><Form.Check type="radio" label="Active" name="status" value="active" checked={inputs.status === 'active'} onChange={handelinput} className="bold-radio"/></b>
            <b><Form.Check type="radio" label="Inactive" name="status" value="inactive" checked={inputs.status === 'inactive'} onChange={handelinput} className="bold-radio"/></b>
          </Col>
        </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 10, offset: 2 }}>
          <Button type="submit" onClick={handelsubmit}>Submit</Button>
        </Col>
      </Form.Group>
    </Form>




    
    <ToastContainer position="top-center" className="p-3">
  <Toast
    bg="success"
    onClose={() => setShowToast(false)}
    show={showToast}
    delay={3000}
    autohide
  >
    <Toast.Header>
      <strong className="me-auto">Success</strong>
      <small>Just now</small>
    </Toast.Header>
    <Toast.Body className="text-white">
      Record created successfully.
    </Toast.Body>
  </Toast>
</ToastContainer>

        
        </>
    )
}

export default Create_list;