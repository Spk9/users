import React, { Component } from 'react';
import './UserPagination.css';

export class UserPagination extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        this.props.onClick(parseInt(e.target.id));
    }

    render() {
        const pages =[];
        for(let i=1; i<=Math.ceil(this.props.users.length/ this.props.usersPerPage); i++){
            pages.push(i);
        }

        const renderPages = pages.map(number => {
            return <button
                    className={(this.props.currentPage === number) ? "active": null}
                    type="button"
                    key={number}
                    id={number}
                    onClick={this.handleClick}>{number}</button>;
        });

        return (
            <div className="pagination-buttons">
                {renderPages}
            </div>
        );
    }
}