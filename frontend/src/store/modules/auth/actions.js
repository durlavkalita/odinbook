import axios from 'axios';

export default {
  async login(context, payload){
    let url = `http://localhost:3000/login`;
    try {
      await axios
      .post(url, payload)
      .then((response) => {
        context.commit('setUser', {
          token: response.data.token,
          userId: response.data.body._id
        }); 
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.body._id);
      })
      .catch((error) => {
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
  },
  async register(context, payload){
    let url = `http://localhost:3000/register`;
    try {
      await axios
      .post(url, payload)
      .then((response) => {
        console.log(response.data);
        context.commit('setUser', {
          token: response.data.token,
          userId: response.data.body._id
        }); 
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.user._id);
      })
      .catch((error) => {
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
  },
  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (token && userId) {
        context.commit('setUser', {
            token: token,
            userId: userId,
        });
    }
  }
}