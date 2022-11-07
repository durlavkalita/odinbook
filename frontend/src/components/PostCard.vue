<template>
  <li class="bg-white px-4 py-6 shadow sm:p-6 sm:rounded-lg">
    <article aria-labelledby="question-title-81614">
      <div>
        <div class="flex space-x-3">
          <div class="flex-shrink-0">
            <img class="h-10 w-10 rounded-full" src="../assets/profile_pic.png" alt="">
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-sm font-medium text-gray-900">
              <router-link :to=UserProfileLink class="hover:underline">{{postUserDetails.firstName}} {{postUserDetails.lastName}}</router-link>
            </p>
            <p class="text-sm text-gray-500">
              <span href="#" class="hover:underline">{{postCreatedAt}}</span>
              <!-- <a href="#" class="hover:underline">December 9 at 11:43 AM</a> -->
            </p>
          </div>
        </div>
      </div>
      <!-- post content -->
      <div class="mt-2 text-sm text-gray-700 space-y-4">
        <p>{{postContent}}</p>
      </div>
      
      <div class="mt-6 flex justify-between space-x-8">
        <div class="flex space-x-6">
          <!-- like -->
          <span class="inline-flex items-center text-sm">
            <button @click="likePost(postId)" class="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
              <svg class="h-5 w-5" x-description="Heroicon name: solid/thumb-up" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
<path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
</svg>
              <span class="font-medium text-gray-900">{{postLikes}}</span>
              <span class="sr-only">likes</span>
            </button>
          </span>
          <!-- comment -->
          <span class="inline-flex items-center text-sm">
            <button @click="commentsToggle(postId)" class="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
              <svg class="h-5 w-5" x-description="Heroicon name: solid/chat-alt" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
<path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd"></path>
</svg>
              <span class="font-medium text-gray-900">comments</span>
              <span class="sr-only">comments</span>
            </button>
          </span>
        </div>
        <!-- share -->
        <div class="flex text-sm">
          <span class="inline-flex items-center text-sm">
            <button class="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
              <svg class="h-5 w-5" x-description="Heroicon name: solid/share" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
<path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"></path>
</svg>
              <span class="font-medium text-gray-900">Share</span>
            </button>
          </span>
        </div>
      </div>
      <!-- comments -->
      <div v-if="showComments">
        <div class="flex space-x-3 my-2 py-2">
          <img class="h-6 w-6 rounded-full" src="../assets/profile_pic.png" alt="">
          <div class="flex-1 space-y-1">
            <div class="mt-1 relative rounded-md shadow-sm">
              <!-- create comment -->
              <form class="space-y-6" @submit.prevent="createComment(postId)">
                <div>
                  <div class="border px-2 py-2">
                    <input v-model.trim="commentContent" type="text" name="commentContent" id="commentContent" class="border focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md" placeholder="000-00-0000">
                    <button type="submit" class="mt-2 inline-flex items-center justify-items-end px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Comment
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <!-- all comments of post -->
        <ul v-if="fetchComments.length" class="divide-y divide-gray-200" x-max="1">
          <li v-for="comment in fetchComments" :key="comment.id" class="py-2 my-2">
            <div class="flex space-x-3">
              <img class="h-6 w-6 rounded-full" src="../assets/profile_pic.png" alt="">
              <div class="flex-1 space-y-1">
                <div class="flex items-center justify-between">
                  <h3 class="text-sm font-medium">{{comment.userDetails.firstName}} {{comment.userDetails.lastName}}</h3>
                  <p class="text-sm text-gray-500">1h</p>
                </div>
                <p class="text-sm text-gray-500">{{comment.comment}}</p>
              </div>
            </div>
          </li>
        </ul>
        <p v-else>Wow so empty</p>
      </div>
    </article>
  </li>
</template>

<script>
export default {
  props: ['post'],
  data(){
    return {
      showComments: false,
      commentContent: '',
    }
  },
  computed: {
    postId() {
      return this.post._id;
    },
    postContent() {
      return this.post.content;
    },
    postUserId() {
      return this.post.userId;
    },
    postCreatedAt() {
      let d = new Date(this.post.created_at);
      return d.toString('dddd, MMMM ,yyyy')
      // return d.toString(`YYYY-MM-DDTHH:mm:ss.sssZ`)
    },
    fetchComments() {
      const comments = this.$store.getters['comment/comments'];
      return comments;
    },
    postLikes(){
      return this.post.likes.length;
    },
    postUserDetails() {
      return this.post.userDetails;
    },
    UserProfileLink() {
      let currentUserId =  this.post.userId;
      return `/profile/${currentUserId}`;
    }
  },
  methods: {
    commentsToggle(postId) {
      if(this.showComments == true){
        this.showComments = false;
      }else{
        this.showComments = true;
      }
      const payload = {
        postId: postId
      }
      try {
        this.$store.dispatch('comment/loadComments', payload);
      } catch (error) {
        console.log(error);
      }
    },
    createComment(postId){
      const payload = {
        postId: postId,
        comment: this.commentContent
      }
      this.commentContent = '';
      try {
        this.$store.dispatch('comment/createComment', payload);
        this.$store.dispatch('comment/loadComments', payload);
      } catch (error) {
        console.log(error);
      }
    },
    likePost(postId){
      const payload = {
        postId: postId
      }
      try {
        this.$store.dispatch('post/likePost', payload);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>