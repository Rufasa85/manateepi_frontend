import React from 'react'

export default function ManateeForm(props) {
    return (
        <div>
            <h3>Add A Tee</h3>
            <form>
                <input name="manateeName" value={props.manateeName} onChange={props.handleChange} />
                <input type="submit" onClick={props.handleManateeCreate} />
            </form>
        </div>
    )
}
