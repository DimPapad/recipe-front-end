import {React} from 'react'

function NoPage(props) {
    return (
        <div>
            {props.changeDocTitle("404")}
            <h1>404 filaraki</h1>
        </div>
    )
}

export default NoPage