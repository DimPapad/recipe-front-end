import { React } from 'react'

function Home(props) {

    return (
        <div>
            {props.changeDocTitle("Home")}
            <h1>Home</h1>
        </div>
    )
}

export default Home