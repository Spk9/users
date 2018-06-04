import React from 'react';
import ReactDOM from 'react-dom';
import {UserFilters} from './UserFilters';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<UserFilters />, div);
    ReactDOM.unmountComponentAtNode(div);
});
