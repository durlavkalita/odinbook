import {createStore} from 'vuex';

import authModule from './modules/auth/index';
import postModule from './modules/post/index';
import commentModule from './modules/comment/index';
import peopleModule from './modules/people/index';

const store = createStore({
  modules: {
    auth: authModule,
    post: postModule,
    comment: commentModule,
    people: peopleModule
  }
});

export default store;