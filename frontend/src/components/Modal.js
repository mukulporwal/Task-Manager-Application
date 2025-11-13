import { Component } from "react";

import{
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup
    
} from 'react-bootstrap';

class CustomModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeItem: this.props.activeItem
        };
    }

handleChange = e => {
    let {name, value} = e.target;
    if(e.target.type === "checkbox"){
        value = e.target.checked;
    }
    const activeItem = {...this.state.activeItem, [name]: value};
    this.setState({activeItem});
}; 


render(){
    const {toggle, onSave} = this.props;
    return(
        <Modal className="modal" show={true} onHide={toggle} >
            <ModalHeader className="modal-header" closeButton>Task Item</ModalHeader>
            <ModalBody className="modal-body">

                <Form className="d-flex flex-column gap-3">
                    {/* Title */}
                    <FormGroup>
                        <label className="form-label" htmlFor="title">Title</label>
                        <input className="form-control"
                            type="text"
                            name="title"
                            value={this.state.activeItem.title}
                            onChange={this.handleChange}
                            placeholder="Enter Task Title"
                        />
                    </FormGroup>  

                    {/* Description */}
                    <FormGroup>
                        <label className="form-label" htmlFor="description">Description</label>
                        <input className="form-control"
                            type="text"
                            name="description"
                            value={this.state.activeItem.description}
                            onChange={this.handleChange}
                            placeholder="Enter Task Description"
                        />
                    </FormGroup>

                    {/* Completed */}
                    <FormGroup check className="form-check">
                        <label htmlFor="completed" className="form-check-label ">
                            <input className="form-check-input "
                            type="checkbox"
                            name="completed"
                            checked={this.state.activeItem.completed}
                            onChange={this.handleChange}
                            />
                            Completed
                        </label>
                    </FormGroup>
                </Form>

            </ModalBody>

            <ModalFooter>
                <Button onClick={()=> onSave(this.state.activeItem)}>
                    Save
                </Button> 
            </ModalFooter>

        </Modal>
    )
}



}

export default CustomModal;