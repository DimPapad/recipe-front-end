import { React, useState } from 'react'
import axios from "axios";


// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

function CreateRecipe({ changeDocTitle, loggedinuser, jwtToken }) {
    const navigate = useNavigate();
    // Functionality
    const [recipe, setRecipe] = useState(
        {
            id: null,
            name: null,
            instructions: null,
            utensils: null,
            description: null,
            ingredients: null,
            photo: null,
            video: null,
            type: null,
            paid: false,
            ownerId: null
        }
    )

    const api = axios.create({
        baseURL: "http://localhost:8080/recipe",
        headers: { Authorization: `Bearer ${jwtToken}` }
    })

    const handleAddFormSubmit = (e) => {
        e.preventDefault();
        const newRecipe = { ...recipe };
        newRecipe.ownerId = loggedinuser.id
        api.post('/', newRecipe)
            .then(navigate(`/profile/${loggedinuser.name}`,{state: loggedinuser, replace:true}))
            .catch(err => {
                console.log(err)
            })
            .finnaly(
                setRecipe({
                    id: null,
                    name: "",
                    instructions: "",
                    utensils: "",
                    description: "",
                    ingredients: "",
                    photo: null,
                    video: null,
                    type: "",
                    paid: false,
                    ownerId: null
                }))
    }

    const handleAddFormChange = (e) => {
        e.preventDefault();

        const fieldName = e.target.getAttribute("name");
        const fieldValue = e.target.value;

        const newRecipe = { ...recipe }

        newRecipe[fieldName] = fieldValue;
        setRecipe(newRecipe);

        console.log(fieldValue);
    }

    const handleAddFormChangeCheckBox = e => {

        const fieldName = e.target.getAttribute("name");
        const fieldValue = e.target.checked;

        const newRecipe = { ...recipe }

        newRecipe[fieldName] = fieldValue;
        setRecipe(newRecipe);

        console.log(fieldValue);

    }

    return (
        <div>
            {changeDocTitle("Create Recipe")}
            <h2 style={{ textAlign: 'center' }}>create your Recipe</h2>
            <p />
            <Form>
                <Row>
                    <Col xs={6}>
                        <Form.Group className="mb-6" controlId="recipeTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type='text' placeholder="type recipe's title" name='name' onChange={(e) => handleAddFormChange(e)}></Form.Control>
                            <Form.Text className="text-muted">
                                e.g.: IKEA meatballs
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col xs={4}>
                        <Form.Group className="mb-6" controlId="recipeType">
                            <Form.Label>Type</Form.Label>
                            <Form.Select aria-label="Default select example" name='type' onChange={(e) => handleAddFormChange(e)}>
                                <option className="text-muted" selected disabled>Open this select menu</option>
                                <option value="breakfast">Breakfast</option>
                                <option value="lunch">Lunch</option>
                                <option value="dinner">Dinner</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
                        <p />
                        <Form.Group className="mb-6" controlId="recipeForSell">
                            <Form.Check type="switch" id="custom-switch" label="For Sell" name='paid' onChange={(e) => handleAddFormChangeCheckBox(e)} />
                        </Form.Group>
                    </Col>
                </Row>
                <Col>
                    <div className="d-grid gap-2" style={{ height: '300px' }}>
                        <Button variant="primary" size="lg">
                            Add photo for your recipe
                        </Button>
                    </div>
                </Col>
                <Row>
                    <Col>
                        <Form.Group className="mb-6" controlId="recipeInstructions">
                            <Form.Label>Instructions</Form.Label>
                            <Form.Control style={{ height: '350px' }} size="lg" aria-label="With textarea" as='textarea' placeholder="type recipe's instructions" name='instructions' onChange={(e) => handleAddFormChange(e)}></Form.Control>
                            <Form.Text className="text-muted">
                                seperated by commas (,)
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Row>
                            <Form.Group className="mb-6" controlId="recipeDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control style={{ height: '50px' }} type='text' placeholder="type recipe's description" name='description' onChange={(e) => handleAddFormChange(e)}></Form.Control>
                                <Form.Text className="text-muted">
                                    e.g.: fresh made horse meatballs
                                </Form.Text>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group className="mb-6" controlId="recipeIngredients">
                                <Form.Label>Ingredients</Form.Label>
                                <Form.Control style={{ height: '230px' }} size="lg" aria-label="With textarea" as='textarea' placeholder="type recipe's ingredients" name='ingredients' onChange={(e) => handleAddFormChange(e)}></Form.Control>
                                <Form.Text className="text-muted">
                                    seperated by commas (,)
                                </Form.Text>
                            </Form.Group>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-6" controlId="recipeUtensils">
                            <Form.Label>Utensils</Form.Label>
                            <Form.Control size="lg" aria-label="With textarea" as='textarea' placeholder="type recipe's utensils" name='utensils' onChange={(e) => handleAddFormChange(e)}></Form.Control>
                            <Form.Text className="text-muted">
                                seperated by commas (,)
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col>
                        <div className="d-grid gap-2" style={{ height: '135px' }}>
                            <Button variant="primary" size="lg">
                                Add video for your recipe
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <div className="d-grid gap-2">
                        <Button variant="success" size="lg" onClick={handleAddFormSubmit}>
                            Create Recipe
                        </Button>
                    </div>
                </Row>
            </Form>
            {/* <CustomForm /> */}
        </div>
    )
}

export default CreateRecipe