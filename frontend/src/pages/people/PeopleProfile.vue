<template>
  <div style="max-height: 800px;" _class="overflow-y-auto">    
    <div class="min-h-screen bg-gray-100">
      <div class="py-10">
        <div class="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <div class="lg:col-span-1 xl:col-span-3"></div>
          <!-- main content -->
          <main class="lg:col-span-10 xl:col-span-6">
            <div>
              <div>
                <!-- wall picture -->
                <div>
                  <img class="h-32 w-full object-cover lg:h-48" src="https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80" alt="">
                </div>
                <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div class="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                    <!-- profile picture -->
                    <div class="flex">
                      <img class="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32" :src="userDetails.profilePic != '' ? userDetails.profilePic : '../../assets/profile_pic.png'" alt="">
                    </div>
                    <div v-if="userDetails" class="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                      <div class="sm:hidden 2xl:block mt-6 min-w-0 flex-1">
                        <h1 class="text-2xl font-bold text-gray-900 truncate">
                          {{userDetails.firstName}} {{userDetails.lastName}}
                        </h1>
                        <span>Joined {{new Date(userDetails.created_at).toString('dddd, MMMM, yyyy')}}</span>
                      </div>
                      <div class="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                        <button type="button" class="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                          <svg class="-ml-1 mr-2 h-5 w-5 text-gray-400" x-description="Heroicon name: solid/mail" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
            </svg>
                          <span>Message</span>
                        </button>
                        <button type="button" class="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                          <svg class="-ml-1 mr-2 h-5 w-5 text-gray-400" x-description="Heroicon name: solid/phone" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
            </svg>
                          <span>Add Friend</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div v-if="userDetails" class="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
                    <h1 class="text-2xl font-bold text-gray-900 truncate">
                      {{userDetails.firstName}} {{userDetails.lastName}}
                    </h1>
                    <span>Joined {{new Date(userDetails.created_at).toString('dddd, MMMM, yyyy')}}</span>
                  </div>
                </div>
              </div>
              <!-- user created posts -->
              <ul class="space-y-4 my-16">
                <post-card v-for="post in userPosts" :key="post._id" :post="post"></post-card>               
              </ul>
            </div>
          </main>
          <div class="lg:col-span-1 xl:col-span-3"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostCard from '../../components/PostCard.vue';

export default {
  props: ['userId'],
  components: {PostCard},
  data() {
    return {
      userDetails : {},
      userPosts : []
    }
  },
  created() {
    this.fetchProfileData();
    this.fetchProfilePosts();
  },
  methods: {
    async fetchProfileData() {
      try {
        this.userDetails = {};
        const peopleDict = await this.$store.getters['people/peopleDict'];
        const currentProfile = peopleDict[this.userId];
        if(!currentProfile){
          await this.$router.push('/this-path-not-exists');
        }
        this.userDetails = currentProfile;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchProfilePosts() {
      try {
        this.userPosts = [];
        const posts = this.$store.getters['post/posts'];
        if(!posts){
          await this.$router.push('/this-path-not-exists');
        }
        const userPosts = posts.filter((post)=>{
          if(post.userId == this.userId){
            return post;
          }
        });
        this.userPosts = userPosts;
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>