import axios from 'axios';
import React, { Component } from 'react';
import uuid from "uuid/dist/v1";
import ScheduleBody from "./ScheduleBody";
import './index.css';
import {withRouter} from 'react-router-dom';
class Home extends Component
{

    state = {
        selectedDate: null,
        meetingData: {},
        isLoaded: false,
        searchDate: "",
    };

    componentDidMount ()
    {
        this.setDate();
    }

    setDate = (newDate) =>
    {
        const date = newDate || new Date();
        this.setState({
            selectedDate:
                date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate(),
            searchDate:
                date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
        });
        this.fetchData();
        console.log(typeof (this.state.searchDate));

    };

    fetchData = () =>
    {
        axios.get(`https://cors-anywhere.herokuapp.com/http://fathomless-shelf-5846.herokuapp.com/api/schedule?date=${this.state.searchDate}`)
            .then(res =>
            {
                this.setState({
                    meetingData: res.data,
                    isLoaded: true
                });
            })
            .catch(err => console.log(err));
    };

    getPreviousDate = () =>
    {
        const selectedDate = this.state.selectedDate;

        const currentDayInMilli = new Date(selectedDate).getTime();
        const oneDay = 1000 * 60 * 60 * 24;
        const previousDayInMilli = currentDayInMilli - oneDay;
        const previousDate = new Date(previousDayInMilli);

        this.setDate(previousDate);

    };

    getNextDate = () =>
    {
        const selectedDate = this.state.selectedDate;

        const currentDayInMilli = new Date(selectedDate).getTime();
        const oneDay = 1000 * 60 * 60 * 24;
        const nextDayInMilli = currentDayInMilli + oneDay;
        const nextDate = new Date(nextDayInMilli);

        this.setDate(nextDate);

    };
    handleClick() {
        this.props.history.push(`/newmeeting`);
      }

    render ()
    {const mystyle = {
        
        color: "white",
        backgroundColor: "DodgerBlue",
        padding: "10px",
        fontFamily: "Arial",
        textAlign:"center"
      };
        return (
            <div style={mystyle} >
                <div id="styleit">
                    <h3>Date: { this.state.searchDate }</h3>
                    <button onClick={ this.getPreviousDate }>Previous</button>
                    <button onClick={ this.getNextDate }>Next</button>
                </div><br></br><br></br><br></br>
                { this.state.isLoaded ? this.state.meetingData.map(data => <ScheduleBody data={ data } key={ uuid() } />) : "Oops...check your internet connection" }
            <div>
            <button onClick={() => this.handleClick()}>Add new meeting shedule</button></div>
            </div>
        );
    }
    
}



export default Home;