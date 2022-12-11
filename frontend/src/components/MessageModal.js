import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import CollapsibleNavbar from "./CollapsibleNavbar";
import CampaignForm from "./CampaignForm";
import Button from "react-bootstrap/Button";

class MessageModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: "",
            messageDetail: ""
        };
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.message}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{this.props.messageDetail}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

}


export default MessageModal;