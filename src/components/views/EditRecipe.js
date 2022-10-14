import { React, useState } from 'react'
import axios from "axios";

// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function EditRecipe({ oldrecipe, changeDocTitle, loggedinuser, jwtToken }) {

    // Functionality
    const [recipe, setRecipe] = useState(
        {
            id: oldrecipe.id,
            name: oldrecipe.name,
            instructions: oldrecipe.instructions,
            utensils: oldrecipe.utensils,
            description: oldrecipe.description,
            ingredients: oldrecipe.ingredients,
            photo: oldrecipe.photo,
            video: oldrecipe.video,
            type: oldrecipe.type,
            paid: oldrecipe.paid,
            ownerId: oldrecipe.ownerId
        }
    )

    const api = axios.create({
        baseURL: "http://localhost:8080/recipe",
        headers: { Authorization: `Bearer ${jwtToken}` }
    })

    const handleEditFormSubmit = (e) => {
        e.preventDefault();
        const newRecipe = { ...recipe };
        api.put(`/${oldrecipe.id}`, newRecipe)
            .then(res => console.log(res))
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

    const handleEditFormChange = (e) => {
        e.preventDefault();

        const fieldName = e.target.getAttribute("name");
        const fieldValue = e.target.value;

        const newRecipe = { ...recipe }

        newRecipe[fieldName] = fieldValue;
        setRecipe(newRecipe);

        console.log(fieldValue);
    }

    // const handleEditFormChangeCheckBox = (e) => {

    //     // const fieldName = e.target.getAttribute("name");
    //     const fieldValue = e.target.checked;

    //     const newRecipe = { ...recipe }

    //     // newRecipe[fieldName] = fieldValue;
    //     setRecipe({newRecipe:{paid:fieldValue}});

    //     console.log(fieldValue);

    // }

    return (
        <div>
            {changeDocTitle("Edit Recipe")}
            <h2 style={{ textAlign: 'center' }}>edit your Recipe</h2>
            <p />
            <Form>
                <Row>
                    <Col xs={6}>
                        <Form.Group className="mb-6" controlId="recipeTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type='text' defaultValue={oldrecipe.name} name='name' onChange={(e) => handleEditFormChange(e)}></Form.Control>
                            <Form.Text className="text-muted">
                                e.g.: IKEA meatballs
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col xs={4}>
                        <Form.Group className="mb-6" controlId="recipeType">
                            <Form.Label>Type</Form.Label>
                            <Form.Select aria-label="Default select example" defaultValue={oldrecipe.type} name='type' onChange={(e) => handleEditFormChange(e)}>
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
                            <Form.Check type="switch" id="custom-switch" label="For Sell" name='paid' defaultChecked={oldrecipe.paid} disabled/>
                        </Form.Group>
                    </Col>
                </Row>
                <Col>
                    <div className="d-grid gap-2" style={{ height: '300px' }}>
                        <Button variant="primary" size="lg">
                            Edit photo for your recipe
                        </Button>
                    </div>
                </Col>
                <Row>
                    <Col>
                        <Form.Group className="mb-6" controlId="recipeInstructions">
                            <Form.Label>Instructions</Form.Label>
                            <Form.Control style={{ height: '350px' }} size="lg" defaultValue={oldrecipe.instructions} aria-label="With textarea" as='textarea' name='instructions' onChange={(e) => handleEditFormChange(e)}></Form.Control>
                            <Form.Text className="text-muted">
                                seperated by commas (,)
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Row>
                            <Form.Group className="mb-6" controlId="recipeDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control style={{ height: '50px' }} type='text' defaultValue={oldrecipe.description} name='description' onChange={(e) => handleEditFormChange(e)}></Form.Control>
                                <Form.Text className="text-muted">
                                    e.g.: fresh made horse meatballs
                                </Form.Text>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group className="mb-6" controlId="recipeIngredients">
                                <Form.Label>Ingredients</Form.Label>
                                <Form.Control style={{ height: '230px' }} size="lg" aria-label="With textarea" as='textarea' defaultValue={oldrecipe.ingredients} name='ingredients' onChange={(e) => handleEditFormChange(e)}></Form.Control>
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
                            <Form.Control size="lg" aria-label="With textarea" as='textarea' defaultValue={oldrecipe.utensils} name='utensils' onChange={(e) => handleEditFormChange(e)}></Form.Control>
                            <Form.Text className="text-muted">
                                seperated by commas (,)
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col>
                        <div className="d-grid gap-2" style={{ height: '135px' }}>
                            <Button variant="primary" size="lg">
                                Edit video for your recipe
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <div className="d-grid gap-2">
                        <Button variant="success" size="lg" onClick={handleEditFormSubmit}>
                            Edit Recipe
                        </Button>
                    </div>
                </Row>
            </Form>
            {/* <CustomForm /> */}
        </div>



    )
}

export default EditRecipe