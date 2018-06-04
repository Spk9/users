import React, { Component } from 'react';

export class UserFilters extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.reset =this.reset.bind(this);
    }

    handleClick(param){
        const users = this.props.originalUsers.filter(user => {
            return (param === 1) ? user.ticketsCreated.length > 5 : user.ticketsCreated.length < 5;
        });
        this.props.onClick(users);
    }
    reset(){
        this.props.onClick(this.props.originalUsers);
    }

    render() {
        return (
            <div className="filter-buttons">
                <button className="filter-button" type="button" onClick={()=>this.handleClick(1)}>Over 5</button>
                <button className="filter-button" type="button" onClick={()=>this.handleClick(0)}>Below 5</button>
                <button className="reset-button" type="button" onClick={this.reset}>Reset</button>
            </div>
        );
    }
}
