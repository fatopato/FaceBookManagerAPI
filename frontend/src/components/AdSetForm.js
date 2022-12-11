import {useState} from "react";
import Form from 'react-bootstrap/Form';
import {Col} from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import MessageModal from "./MessageModal";

function CampaignForm() {
    const [name, setName] = useState("My First Adset Fatih Koprucu");
    const [dailyBudget, setDailyBudget] = useState(2000);
    const [endsAfter, setEndsAfter] = useState(10);
    const [bidAmount, setBidAmount] = useState(5);
    const [targetMinAge, setTargetMinAge] = useState(20);
    const [targetMaxAge, setTargetMaxAge] = useState(35);
    const [campaignId, setCampaignId] = useState(0);
    const [billingEvent, setBillingEvent] = useState("IMPRESSIONS");
    const [optimizationGoal, setOptimizationGoal] = useState("REACH");
    const [targetCountries, setTargetCountries] = useState(["US", "KW", "UA"]);
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
        const body = JSON.stringify({
            "name": name,
            "daily_budget": dailyBudget,
            "ends_after": endsAfter,
            "bid_amount": bidAmount,
            "target_min_age": targetMinAge,
            "target_max_age": targetMaxAge,
            "campaign_id": campaignId,
            "billing_event": billingEvent,
            "optimization_goal": optimizationGoal,
            "target_countries": targetCountries
        });
        console.log(body)
        try {
            let res = await fetch("http://localhost:8000/adsets", {
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
                setName("")
                setDailyBudget(0)
                setEndsAfter(0)
                setBidAmount(0)
                setTargetMinAge(0)
                setTargetMaxAge(35)
                setCampaignId(-1)
                setBillingEvent("")
                setOptimizationGoal("")
                setTargetCountries([])
                setMessage("Ad Set created successfully");
                setMessageDetail("The created adSetId: " + resJson["id"])
                handleShow()
            } else {
                setMessage("Some error occured");
                setMessageDetail("The error: " + resJson)
                handleShow()
            }
        } catch (err) {
            console.log(err);
        }
    };

    const adSetForm = (
        <Form onSubmit={handleSubmit} style={{margin: 30}} className="sm">
            <Form.Group className="mb-3" controlId="formCampaignName" sm={2}>
                <Form.Label>Campaign Name</Form.Label>
                <Form.Control type="text" placeholder="Enter campaign name" value={name} onChange={(e) => setName(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDailyBudget">
                <Form.Label>Daily Budget</Form.Label>
                <Form.Control type="number"  value={dailyBudget} onChange={(e) => setDailyBudget(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEndsAfter">
                <Form.Label>Campaign Ends after (days) </Form.Label>
                <Form.Control type="number" value={endsAfter} onChange={(e) => setEndsAfter(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBidAmount">
                <Form.Label>Bid Amount</Form.Label>
                <Form.Control type="number"  value={bidAmount} onChange={(e) => setBidAmount(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTMinAge">
                <Form.Label>Target Min Age</Form.Label>
                <Form.Control type="number"  value={targetMinAge} onChange={(e) => setTargetMinAge(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTMaxAge">
                <Form.Label>Target Max Age</Form.Label>
                <Form.Control type="number"  value={targetMaxAge} onChange={(e) => setTargetMaxAge(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCampaignId">
                <Form.Label>Campaign ID</Form.Label>
                <Form.Control type="number"  value={campaignId} onChange={(e) => setCampaignId(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBillingEvent" sm={2}>
                <Form.Label>Billing Event</Form.Label>
                <Form.Control type="text" placeholder="Enter Billing Event" value={billingEvent} onChange={(e) => setBillingEvent(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formOptimizationGoal" sm={2}>
                <Form.Label>Optimization Goal</Form.Label>
                <Form.Control type="text" placeholder="Enter Optimization Goal" value={optimizationGoal} onChange={(e) => setOptimizationGoal(e.target.value)}/>
            </Form.Group>
            <Form.Group as={Col} controlId="targetCountries">
                <Form.Label>Target Countries</Form.Label>
                <Form.Control as="select" multiple value={targetCountries} onChange={e => setTargetCountries([].slice.call(e.target.selectedOptions).map(item => item.value))}>
                    <option value="UA">UA</option>
                    <option value="US">US</option>
                    <option value="KW">KW</option>
                </Form.Control>
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
                {completed ? messageModal : adSetForm}
            </div>
        </div>
    );

}

export default CampaignForm;