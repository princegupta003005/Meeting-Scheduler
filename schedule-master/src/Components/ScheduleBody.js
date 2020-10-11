import React, { Component } from 'react';
import './index.css';


class ScheduleBody extends Component
{
    render ()

    {
        return (
            <div id="mystyle">
                <p >{ this.props.data.start_time } - { this.props.data.end_time } </p>
                <p>{ this.props.data.description }</p><br></br>
            </div>
        );
    }
}

export default ScheduleBody;