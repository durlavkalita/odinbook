<template>
  <div class="max-w-sm mx-auto py-8 px-4 sm:px-0 md:py-16">
    <!-- request received -->
    <div class="mb-12">
      <div class="mt-2">
        <button @click="toggleShowRequestsReceived" class="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          Requests Received
        </button>
      </div>
      <div v-if="showRequestsReceived" class="flow-root mt-6">
        <ul v-if="fetchFriendRequests.length" class="-my-5 divide-y divide-gray-200">         
            <li v-for="friendRequest in fetchFriendRequests" :key="friendRequest" class="py-4">
              <div class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                  <img class="h-8 w-8 rounded-full" src="../../assets/profile_pic.png" alt="">
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 truncate">
                    {{friend.userDetails.firstName}} {{friend.userDetails.lastName}}
                  </p>
                  <p class="text-sm text-gray-500 truncate">
                    @{{friendRequest._id}}
                  </p>
                </div>
                <div>
                  <button @click="acceptFriendRequest(friendRequest._id)" class="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-white bg-green-500 hover:bg-gray-50">
                    Accept
                  </button>
                </div>
                <div>
                  <button @click="deleteFriendRequest(friendRequest._id)" class="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-white bg-red-500 hover:bg-gray-50">
                    Delete
                  </button>
                </div>
              </div>
            </li>
        </ul>
        <p v-else class="text-center">Wow so empty</p>
      </div>
    </div>

    <!-- friends -->
    <div class="mb-12">
      <div class="mt-2">
        <button @click="toggleShowFriends" class="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          Friends
        </button>
      </div>
      <div v-if="showFriends" class="flow-root mt-6">
        <ul v-if="fetchFriends.length" class="-my-5 divide-y divide-gray-200">
            <li v-for="friend in fetchFriends" :key="friend._id" class="py-4">
              <div class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                  <img class="h-8 w-8 rounded-full" src="../../assets/profile_pic.png" alt="">
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 truncate">
                    {{friend.userDetails.firstName}} {{friend.userDetails.lastName}}
                  </p>
                  <p class="text-sm text-gray-500 truncate">
                    @{{friend._id}}
                  </p>
                </div>
                <div>
                  <a href="#" class="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50">
                    View
                  </a>
                </div>
              </div>
            </li>
        </ul>
        <p v-else class="text-center">Wow so empty</p>
      </div>
    </div>

    <!-- find people -->
    <div class="mb-12">
      <div class="mt-2">
        <button @click="toggleShowFindPeople" class="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          Find People
        </button>
      </div>
      <div v-if="showFindPeople" class="flow-root mt-6">
        <ul class="-my-5 divide-y divide-gray-200">
          
            <li v-for="people in fetchPeople" :key="people._id" class="py-4">
              <div class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                  <img class="h-8 w-8 rounded-full" src="../../assets/profile_pic.png" alt="">
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 truncate">
                    {{people.firstName}} {{people.lastName}}
                  </p>
                  <p class="text-sm text-gray-500 truncate">
                    @{{people._id}}
                  </p>
                </div>
                <div>
                  <form @submit.prevent="sendFriendRequest(people._id)">
                    <button type="submit" class="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-white bg-blue-500 hover:bg-gray-50">
                      Send Request
                    </button>
                  </form>
                </div>
              </div>
            </li>
          
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data(){
    return {
      showRequestsReceived: false,
      showFriends: false,
      showFindPeople: true
    }
  },
  computed: {
    fetchFriends() {
      const friends = this.$store.getters['people/friends'];
      return friends;
    },
    fetchFriendRequests() {
      const friendRequests = this.$store.getters['people/friendRequests'];
      return friendRequests;
    },
    fetchPeople() {
      const people = this.$store.getters['people/people'];
      return people
    }
  },
  created() {
    this.loadFriends();
    this.loadFriendRequests();
  },
  methods: {
    toggleShowRequestsReceived() {
      this.showRequestsReceived = !this.showRequestsReceived;
    },
    toggleShowFriends() {
      this.showFriends = !this.showFriends;
    },
    toggleShowFindPeople() {
      this.showFindPeople = !this.showFindPeople;
    },
    loadFriends(){
      try {
        this.$store.dispatch('people/loadFriends');
      } catch (error) {
        console.log(error);
      }
    },
    loadFriendRequests(){
      try {
        this.$store.dispatch('people/loadFriendRequests');
      } catch (error) {
        console.log(error);
      }
    },
    acceptFriendRequest(data) {
      let payload = {}
      payload['friendId'] = data
      payload['response'] = true
      try {
        this.$store.dispatch('people/respondFriendRequest', payload);
      } catch (error) {
        console.log(error);
      }
    },
    deleteFriendRequest(data) {
      let payload = {}
      payload['friendId'] = data
      payload['response'] = false
      try {
        this.$store.dispatch('people/respondFriendRequest', payload);
      } catch (error) {
        console.log(error);
      }
    },
    sendFriendRequest(data) {
      try {
        this.$store.dispatch('people/sendFriendRequest', {receiverUserId: data});
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>