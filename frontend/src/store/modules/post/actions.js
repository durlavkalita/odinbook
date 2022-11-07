import axios from 'axios';

export default {
  async loadPosts(context){
    let bearerToken = context.rootState.auth.token ||  localStorage.getItem('token'); // remove localstorage later
    let url = `http://localhost:3000/api/posts`;
    let config = {
      headers: {
        'Authorization': 'Bearer ' + bearerToken
      }
    }
    try {
      await axios
      .get(url, config)
      .then((response) => {
        context.commit('setPosts', response.data);
      })
      .catch((error) => {
        console.log(error);
      }) 
    } catch (error) {
      console.log(error);
    }
  },
  async createPost(context, payload){
    let bearerToken = context.rootState.auth.token ||  localStorage.getItem('token'); // remove localstorage later
    let userId = context.rootState.auth.userId || localStorage.getItem('userId');
    let url = `http://localhost:3000/api/posts`;
    let config = {
      headers: {
        'Authorization': 'Bearer ' + bearerToken
      }
    }
    payload['userId'] = userId;
    // console.log(payload);
    try {
      await axios
      .post(url, payload, config)
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
  async likePost(context, payload){
    let bearerToken = context.rootState.auth.token ||  localStorage.getItem('token'); // remove localstorage later
    let userId = context.rootState.auth.userId || localStorage.getItem('userId');
    let url = `http://localhost:3000/api/posts/${payload.postId}/like`;
    let config = {
      headers: {
        'Authorization': 'Bearer ' + bearerToken
      }
    }
    const likePayload = {
      userId: userId
    }
    // console.log(payload);
    try {
      await axios
      .post(url, likePayload, config)
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