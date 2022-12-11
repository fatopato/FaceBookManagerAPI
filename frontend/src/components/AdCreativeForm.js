import {useState} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import MessageModal from "./MessageModal";


function AdCreativeForm() {
    const [name, setName] = useState("Gucci AdCreative for Link Ad.");
    const [adMessage, setAdMessage] = useState("try it out");
    const [link, setLink] = useState("https://www.ounass.ae/designers/gucci");
    const [pageId, setPageId] = useState(104413048775500);
    const [imageUrl, setImageUrl] = useState("https://ibb.co/pP9hNwV");
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
        "name": name,
        "message": adMessage,
        "link": link,
        "page_id": pageId,
        "image_url": imageUrl
    };

    let handleSubmit = async (e) => {
        e.preventDefault();
        const body = JSON.stringify(values);
        console.log(body)
        try {
            let res = await fetch("http://localhost:8000/ad-creatives", {
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
            if (res.status === 200 && resJson["errorMessage"] == null) {
                setName("");
                setAdMessage("");
                setLink("")
                setPageId(0)
                setImageUrl("")
                setMessage("Ad created successfully");
                setMessageDetail("The created Ad Creative Id: " + resJson['id'])
                handleShow()
            } else {
                setMessage("Some error occurred" );
                setMessageDetail("The error: " + resJson["errorMessage"])
                handleShow()
            }
        } catch (err) {
            console.log(err);
        }
    };

    const adCreativeForm = (
        <Form onSubmit={handleSubmit} style={{margin: 30}} className="sm">
            <Form.Group className="mb-3" controlId="formName" sm={2}>
                <Form.Label>Ad Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Ad name" value={name} onChange={(e) => setName(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formMessage">
                <Form.Label>Ad Message</Form.Label>
                <Form.Control type="text" placeholder="Enter Message"  value={adMessage} onChange={(e) => setAdMessage(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLink">
                <Form.Label>Ad Link</Form.Label>
                <Form.Control type="text" placeholder="Enter Link"  value={link} onChange={(e) => setLink(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPageId">
                <Form.Label>Page ID</Form.Label>
                <Form.Control type="number"  value={pageId} onChange={(e) => setPageId(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formImageUrl">
                <Form.Label>Image Url</Form.Label>
                <Form.Control type="text" placeholder="Enter Image Url"  value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}/>
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
                {completed ? messageModal : adCreativeForm}
            </div>
        </div>
    );

}

export default AdCreativeForm;