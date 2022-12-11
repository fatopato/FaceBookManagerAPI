import {useState} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import MessageModal from "./MessageModal";


function CampaignForm() {
    const [campaignName, setCampaignName] = useState("Conversions Campaign Fatih Koprucu");
    const [objective, setObjective] = useState("REACH");
    const [message, setMessage] = useState("");
    const [messageDetail, setMessageDetail] = useState("");
    const [show, setShow] = useState(false);
    const [completed, setCompleted] = useState(false);
    const handleClose = () => {
        setShow(false);
        setCompleted(false)
    }
    const handleShow = () => setShow(true);

    let values = {
        "name": campaignName,
        "objective": objective
    };

    let handleSubmit = async (e) => {
        e.preventDefault();
        const body = JSON.stringify(values);
        console.log(body)
        try {
            let res = await fetch("http://localhost:8000/campaigns", {
                method: "POST",
                body: body,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: body
            })
            let resJson = await res.json();
            console.log(resJson)
            setCompleted(true)
            if (res.status === 200) {
                setCampaignName("");
                setObjective("");
                setMessage("Campaign created successfully");
                setMessageDetail("The created campaignId: " + resJson['id'])
                handleShow()
            } else {
                setMessage("Some error occurred" );
                setMessageDetail("The error: " + resJson)
                handleShow()
            }
        } catch (err) {
            console.log(err);
        }
    };

    const campaignForm = (
        <Form onSubmit={handleSubmit} style={{margin: 30}} className="sm">
            <Form.Group className="mb-3" controlId="formCampaignName" sm={2}>
                <Form.Label>Campaign Name</Form.Label>
                <Form.Control type="text" placeholder="Enter campaign name" value={campaignName} onChange={(e) => setCampaignName(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formObjective">
                <Form.Label>Objective</Form.Label>
                <Form.Control type="text" placeholder="Enter objective"  value={objective} onChange={(e) => setObjective(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit" value="Submit">
                Submit
            </Button>
        </Form>
    )

    const messageModal = <MessageModal message={message} messageDetail={messageDetail} show={show}
                                       handleClose={handleClose}/>

    return (
        <div className="app">
            <div className="row">
                {completed ? messageModal : campaignForm}
            </div>
        </div>
    );

}

export default CampaignForm;