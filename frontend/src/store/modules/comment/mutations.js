import store from '../../index';

export default {
  setComments(state, payload){
    let peopleDict = store.state.people.peopleDict;
    for (let index = 0; index < payload.length; index++) {
      const post = payload[index];
      post['userDetails'] = peopleDict[post.userId]
    }
    state.comments = payload;
  }
}