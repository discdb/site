import combineReducers from 'react-combine-reducers';

import { adminReducer, initialAdminState } from './reducers/admin';
import { blogReducer, initialBlogState } from './reducers/blog';

export const [userReducers, initialUserState] = combineReducers({
	blog: [blogReducer, initialBlogState],
	admin: [adminReducer, initialAdminState]
});
