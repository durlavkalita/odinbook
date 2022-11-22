import store from '../../index';

export default {
  setFriends(state, payload){
    let peopleDict = store.state.people.peopleDict;
    let userId = store.getters.userId;
    for (let index = 0; index < payload.length; index++) {
      const post = payload[index];
      if(post.receiverId == userId){
        post['userDetails'] = peopleDict[post.senderId];
      }else if (post.senderId == userId){
        post['userDetails'] = peopleDict[post.receiverId];
      }
    }
    // console.log(payload);
    state.friends = payload;
  },
  setFriendRequests(state, payload){
    let peopleDict = store.state.people.peopleDict;
    let userId = store.getters.userId;
    for (let index = 0; index < payload.length; index++) {
      const post = payload[index];
      if(post.receiverId == userId){
        post['userDetails'] = peopleDict[post.senderId];
      }else if (post.senderId == userId){
        post['userDetails'] = peopleDict[post.receiverId];
      }
    }
    // console.log(payload);
    state.friendRequests = payload;
  },
  setPeople(state, payload){
    // for(let index in payload){
    //   if(payload[index]._id == store.getters.userId){
    //     payload.splice(index, 1);
    //   }
    // }
    let peopleList = payload;
    let peopleDict = {}
    peopleList.forEach(people => {
      peopleDict[people._id] = people
    });
    state.peopleDict = peopleDict;
    state.people = payload;
  }
}