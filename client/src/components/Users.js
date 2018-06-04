import React, { Component } from 'react';
import './Users.css';
import {UserFilters} from "./UserFilters";
import {UserPagination} from "./UserPagination";

export class Users extends Component {
    constructor(){
        super();
        this.state = {
            users :[],
            originalUsers:[],
            avgTickets: 0,
            avgBackups: 0,
            currentPage: 1,
            usersPerPage:10,
            sorted:0,
            sortAsc:0
        };
        this.changePage = this.changePage.bind(this);
        this.sortAsc = this.sortAsc.bind(this);
        this.sortDesc = this.sortDesc.bind(this);
        this.filterUsers = this.filterUsers.bind(this);
    }

    async componentDidMount(){
        const res = await fetch('/api/users');
        const data = await res.json();
        this.setState({users: data.users, avgTickets: data.avgTickets, avgBackups: data.avgBackups, originalUsers: data.users});
    }

    changePage(page){
        this.setState({currentPage:page});
    }

    sortAsc(){
        const users = this.state.users.sort((a,b)=>{
            return (a.joinDate > b.joinDate) ? 1 : ((b.joinDate > a.joinDate) ? -1 : 0);
        });
        this.setState({users, sorted: 1, sortAsc:1});
    }

    sortDesc(){
        const users = this.state.users.sort((a,b)=>{
            return (a.joinDate < b.joinDate) ? 1 : ((b.joinDate < a.joinDate) ? -1 : 0);
        });
        this.setState({users, sorted: 1, sortAsc:0});
    }

    filterUsers(users) {
        this.setState({users, currentPage:1});
    }

    render() {
        const {users, currentPage, usersPerPage} = this.state;
        const lastUser = currentPage*usersPerPage;
        const firstUser = lastUser - usersPerPage;
        const currentUsers = users.slice(firstUser, lastUser);

        const renderTable = currentUsers.map(user => {
            return <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.company}</td>
                <td>{user.email}</td>
                <td>{user.ticketsCreated.length}</td>
                <td>{user.backups.length}</td>
                <td>{user.joinDate}</td>
            </tr>;
        });

        const sorter = () =>{
          if(this.state.sorted===0 || this.state.sortAsc===0 ){
              return this.sortAsc();
          }else{
              return this.sortDesc();
          }
        };

        return (
            <div className="Users">
                <h4>Average tickets: {this.state.avgTickets}</h4>
                <h4>Average backups: {this.state.avgBackups}</h4>
                <div className="responsiveTable">
                    <table>
                        <thead><tr><th>Name</th><th>Company</th><th>Email</th><th>Tickets</th><th>Backups</th><th onClick={sorter}>Join date</th></tr></thead>
                        <tbody>{renderTable}</tbody>
                    </table>
                </div>
                <UserFilters
                    originalUsers={this.state.originalUsers}
                    onClick={this.filterUsers} />
                <UserPagination
                    currentPage={this.state.currentPage}
                    users={this.state.users}
                    onClick={this.changePage}
                    usersPerPage={this.state.usersPerPage} />
            </div>
        );
    }
}