import { React } from 'react'

// Routing
import { useParams } from 'react-router-dom'

function Recipe(props) {
    const { recipeid } = useParams();

    return (
        <div>
            {props.changeDocTitle("Create Recipe")}
            <h1>Create Recipe</h1>
            <Form>
                <Row>
                    <Col xs={6}>
                        <Form.Group className="mb-6" controlId="recipeTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type='text' placeholder="type recipe's title"></Form.Control>
                            <Form.Text className="text-muted">
                                e.g.: IKEA meatballs
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col xs={4}>
                        <Form.Group className="mb-6" controlId="recipeType">
                            <Form.Label>Type</Form.Label>
                            <Form.Select aria-label="Default select example">
                                <option className="text-muted">Open this select menu</option>
                                <option value="breakfast">Breakfast</option>
                                <option value="lunch">Lunch</option>
                                <option value="dinner">Dinner</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
                        <p></p>
                        <p></p>
                        <Form.Group className="mb-6" controlId="recipeForSell">
                            <Form.Check type="switch" id="custom-switch" label="For Sell" />
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
                            <Form.Control style={{ height: '350px' }} size="lg" aria-label="With textarea" as='textarea' placeholder="type recipe's instructions"></Form.Control>
                            <Form.Text className="text-muted">
                                seperated by commas (,)
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Row>
                            <Form.Group className="mb-6" controlId="recipeDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control style={{ height: '50px' }} type='text' placeholder="type recipe's description"></Form.Control>
                                <Form.Text className="text-muted">
                                    e.g.: fresh made horse meatballs
                                </Form.Text>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group className="mb-6" controlId="recipeIngredients">
                                <Form.Label>Ingredients</Form.Label>
                                <Form.Control style={{ height: '230px' }} size="lg" aria-label="With textarea" as='textarea' placeholder="type recipe's ingredients"></Form.Control>
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
                            <Form.Control size="lg" aria-label="With textarea" as='textarea' placeholder="type recipe's utensils"></Form.Control>
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
            </Form>
        </div>
    )
}

export default Recipe