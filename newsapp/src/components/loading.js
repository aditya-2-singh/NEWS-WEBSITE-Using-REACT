import React, { Component } from 'react'
import loading from './loading.gif'
export class Loading extends Component {
  render() {
    return (
        <>
            <center>
                <img src={loading} alt='.' style={{height:"100px", width:"280px"}}></img>
                <h4>loading...</h4>
            </center>
        </>
    )
  }
}

export default Loading