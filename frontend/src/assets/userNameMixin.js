var userNameMixin = {
  data() {
    return {
      userId: ''
    };
  },
  methods: {
    greetings: function(userId) {
      this.userId = userId
    }
  }
};

export default userNameMixin;