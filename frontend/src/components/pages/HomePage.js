import {useState} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import MessageModal from "../MessageModal";


function HomePage() {
    const [choice, setChoice] = useState("1");
    const [message, setMessage] = useState("");
    const [messageDetail, setMessageDetail] = useState("");
    const [show, setShow] = useState(false);
    const [completed, setCompleted] = useState(false);
    const handleClose = () => {
        setShow(false);
        setCompleted(false)
    }
    const handleShow = () => setShow(true);


    let handleSubmit = async (e) => {
        e.preventDefault();
        console.log(choice)
        switch (choice) {
            case '1': {
                try {
                    console.log("Started")
                    let res = await fetch("http://localhost:8000/tasks/create_campaign", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    let resJson = await res.json();
                    console.log(resJson)
                    console.log(resJson["errorMessage"])
                    setCompleted(true)
                    if (res.status === 200 && resJson["errorMessage"] == null) {
                        setMessage("Campaign created successfully");
                        setMessageDetail("The created campaignId: " + resJson['id'])
                        handleShow()
                    } else {
                        setMessage("Some error occurred" );
                        setMessageDetail("The error: " + resJson["errorMessage"])
                        handleShow()
                    }
                } catch (err) {
                    console.log(err);
                }
            } break;
            case '2': {
                try {
                    let res = await fetch("http://localhost:8000/tasks/create_ad_set", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    let resJson = await res.json();
                    console.log(resJson)
                    console.log(resJson["errorMessage"])
                    setCompleted(true)
                    if (res.status === 200 && resJson["errorMessage"] == null) {
                        setMessage("Ad Set created successfully");
                        setMessageDetail("The created Ad Set ID: " + resJson['id'])
                        handleShow()
                    } else {
                        setMessage("Some error occurred" );
                        setMessageDetail("The error: " + resJson["errorMessage"])
                        handleShow()
                    }
                } catch (err) {
                    console.log(err);
                }
            }break;
            case '3': {
                try {
                    let res = await fetch("http://localhost:8000/tasks/create_ad_creative", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    let resJson = await res.json();
                    console.log(resJson)
                    console.log(resJson["errorMessage"])
                    setCompleted(true)
                    if (res.status === 200 && resJson["errorMessage"] == null) {
                        setMessage("Ad created successfully");
                        setMessageDetail("The created Ad Creative ID: " + resJson['id'])
                        handleShow()
                    } else {
                        setMessage("Some error occurred" );
                        setMessageDetail("The error: " + resJson["errorMessage"])
                        handleShow()
                    }
                } catch (err) {
                    console.log(err);
                }
            }break;
            default: return;
        }
    }

    const taskForm = (
        <div className="align-content-center flex-row">
            <Form onSubmit={handleSubmit} style={{margin: 30}} className="sm">
                <Form.Label className="title">Default Tasks to Execute</Form.Label>
                <br></br>
                <Form.Group className="mb-3" controlId="formCampaignName" sm={2}>
                    <Form.Select aria-label="Select Default Task to Execute" value={choice} onChange={(e) => setChoice(e.target.value)}>
                        <option>Default Tasks</option>
                        <option value="1">Create a campaign named "Conversions Campaign Fatih Koprucu"</option>
                        <option value="2">Create an adset named "My first Adset Fatih Koprucu"</option>
                        <option value="3">Create an ad with message "try it out"</option>
                    </Form.Select>
                </Form.Group>
                <Button variant="primary" type="submit" value="Submit">
                    Execute
                </Button>
            </Form>
        </div>
    )

    const messageModal = <MessageModal message={message} messageDetail={messageDetail} show={show}
                                       handleClose={handleClose}/>

    return (
        <div className="app">
            <div className="row">
                {completed ? messageModal : taskForm}
            </div>
        </div>
    );

}

export default HomePage;