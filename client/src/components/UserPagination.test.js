import React from 'react';
import ReactDOM from 'react-dom';
import {UserPagination} from './UserPagination';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<UserPagination />, div);
    ReactDOM.unmountComponentAtNode(div);
});
