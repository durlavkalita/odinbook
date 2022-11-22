import axios from 'axios';

export default {
  async loadFriends(context){
    let bearerToken = context.rootState.auth.token ||  localStorage.getItem('token'); // remove localstorage later
    let userId = context.rootState.auth.userId || localStorage.getItem('userId');
    let url = `http://localhost:3000/api/friends/${userId}`;
    let config = {
      headers: {
        'Authorization': 'Bearer ' + bearerToken
      }
    }
    try {
      await axios
      .get(url, config)
      .then((response) => {
        context.commit('setFriends', response.data);
      })
      .catch((error) => {
        console.log(error);
      }) 
    } catch (error) {
      console.log(error);
    }
  },
  async loadFriendRequests(context){
    let bearerToken = context.rootState.auth.token ||  localStorage.getItem('token'); // remove localstorage later
    let userId = context.rootState.auth.userId || localStorage.getItem('userId');
    let url = `http://localhost:3000/api/friends/${userId}/requests`;
    let config = {
      headers: {
        'Authorization': 'Bearer ' + bearerToken
      }
    }
    try {
      await axios
      .get(url, config)
      .then((response) => {
        context.commit('setFriendRequests', response.data);
      })
      .catch((error) => {
        console.log(error);
      }) 
    } catch (error) {
      console.log(error);
    }
  },
  async respondFriendRequest(context, payload){
    let bearerToken = context.rootState.auth.token ||  localStorage.getItem('token'); // remove localstorage later
    let userId = context.rootState.auth.userId || localStorage.getItem('userId');
    let url = `http://localhost:3000/api/friends/${payload.friendId}/response`;
    let config = {
      headers: {
        'Authorization': 'Bearer ' + bearerToken
      }
    }
    let responsePayload = {
      'response': payload.response
    }
    try {
      await axios
      .post(url, responsePayload, config)
      .then((response) => {
        // context.commit('setPosts', response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      }) 
    } catch (error) {
      console.log(error);
    }
  },
  async loadPeople(context){
    let bearerToken = context.rootState.auth.token ||  localStorage.getItem('token'); // remove localstorage later
    let userId = context.rootState.auth.userId || localStorage.getItem('userId');
    let url = `http://localhost:3000/api/findPeople`;
    let config = {
      headers: {
        'Authorization': 'Bearer ' + bearerToken
      }
    }
    try {
      await axios
      .get(url, config)
      .then((response) => {
        context.commit('setPeople', response.data);
      })
      .catch((error) => {
        console.log(error);
      }) 
    } catch (error) {
      console.log(error);
    }
  },
  async sendFriendRequest(context, payload){
    let bearerToken = context.rootState.auth.token ||  localStorage.getItem('token'); // remove localstorage later
    let userId = context.rootState.auth.userId || localStorage.getItem('userId');
    let url = `http://localhost:3000/api/friends/${payload.receiverUserId}`;
    let config = {
      headers: {
        'Authorization': 'Bearer ' + bearerToken
      }
    }
    let responsePayload = {
      'userId': userId
    }
    try {
      await axios
      .post(url, responsePayload, config)
      .then((response) => {
        // context.commit('setPosts', response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      }) 
    } catch (error) {
      console.log(error);
    }
  },
  async changeProfilePic(context, payload){
    let bearerToken = context.rootState.auth.token ||  localStorage.getItem('token'); // remove localstorage later
    let userId = context.rootState.auth.userId || localStorage.getItem('userId');
    let url = `http://localhost:3000/api/updateProfilePic/${userId}`;
    let config = {
      headers: {
        'Authorization': 'Bearer ' + bearerToken
      }
    }
    let responsePayload = {
      'profilePic': payload.profilePic
    }
    try {
      await axios
      .post(url, responsePayload, config)
      .then((response) => {
        // context.commit('setPosts', response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      }) 
    } catch (error) {
      console.log(error);
    } 
  }
}