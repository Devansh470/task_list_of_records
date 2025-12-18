import axios from "axios"
import { useEffect, useState } from "react"
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const Display_list = () => {
    const navigate = useNavigate();

    const [disp,setdisplay]=useState([])
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [showToast, setShowToast] = useState(false);

    const loaddata=()=>{
        let api="http://127.0.0.1:8000/list-records/"
        axios.get(api).then((res)=>{
            console.log(res.data)
            setdisplay(res.data)
        })
    }

    useEffect(()=>{
        loaddata()
    },[])

    const entry_del=(id)=>{
        setDeleteId(id);
        setShowDeleteModal(true);
        }

        const confirmDelete = () => {
        let api = `http://127.0.0.1:8000/list-records/${deleteId}/`;
        axios.delete(api).then(() => {
        setShowDeleteModal(false);
        setShowToast(true); // show success popup
        loaddata();
        });
    };

    const entry_edit=(myid)=>{
        navigate(`/edit/${myid}`);
    }

    let sno=0;
    const ans=disp.map((items)=>{
        const statusText = items.active ? "active" : "inactive";
        sno++
        return(
            <>
            <tr>
            <td>{sno}</td>
            <td>{items.name}</td>
            <td>{items.email}</td>
            <td> <span className={items.active ? "status-badge active" : "status-badge inactive"}>{statusText}</span ></td>
            <td style={{display:"flex", justifyContent:"space-evenly"}}>
            <td><Button size="sm" className="action-btn" variant="warning" onClick={()=>entry_edit(items.id)}>Edit</Button></td>
            <td><Button size="sm" className="action-btn" variant="danger" onClick={()=>entry_del(items.id)}>Delete</Button></td>
            </td>
          </tr>
            </>
        )

    })

    return(
        <>
        <div className="table-wrapper">
            <h3 className="table-title">List of Records</h3>
        <Table responsive="sm" bordered hover className="records-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th style={{textAlign:"center"}}>Actions</th>
          </tr>
        </thead>
        <tbody>
            {disp.length === 0 ? (
            <tr> <td colSpan={5} style={{ textAlign: "center", padding: "20px", color: "#888" }}> No records found </td> </tr>
            ) : ( ans )}
            
        </tbody>

      </Table>
      </div>




       <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this record? This action cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="top-center" className="p-3">
        <Toast
          bg="success"
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={2000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Success</strong>
            <small>Just now</small>
          </Toast.Header>
          <Toast.Body className="text-white">
            Record deleted successfully.
          </Toast.Body>
        </Toast>
      </ToastContainer>
        

        </>
    )
}
export default Display_list