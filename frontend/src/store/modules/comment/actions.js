import axios from 'axios';

export default {
  async loadComments(context, payload){
    let bearerToken = context.rootState.auth.token ||  localStorage.getItem('token'); // remove localstorage later
    let url = `http://localhost:3000/api/posts/${payload.postId}/comments`;
    let config = {
      headers: {
        'Authorization': 'Bearer ' + bearerToken
      }
    }
    try {
      await axios
      .get(url, config)
      .then((response) => {
        // console.log(response);
        context.commit('setComments', response.data.comments);
      })
      .catch((error) => {
        console.log(error);
      }) 
    } catch (error) {
      console.log(error);
    }
  },
  async createComment(context, payload){
    let bearerToken = context.rootState.auth.token ||  localStorage.getItem('token'); // remove localstorage later
    let userId = context.rootState.auth.userId || localStorage.getItem('userId');
    let url = `http://localhost:3000/api/posts/${payload.postId}/comments`;
    let config = {
      headers: {
        'Authorization': 'Bearer ' + bearerToken
      }
    }
    payload['userId'] = userId;
    console.log(payload);
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
  }
}