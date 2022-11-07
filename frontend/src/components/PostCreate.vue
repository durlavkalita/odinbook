<template>
  <div class="bg-white sm:mx-auto sm:w-full shadow sm:rounded-lg mb-8">
    <div class="bg-white py-4 px-4 shadow sm:rounded-lg sm:px-10">
      <form class="space-y-6" @submit.prevent="submitPost">
        <div>
          <div class="border px-2 py-2">
            <textarea v-model="postContent" id="postContent" name="postContent" rows="3" class="resize-none shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 focus:outline-none rounded-md" placeholder="What's on your mind..."></textarea>
            <button type="submit" class="mt-2 inline-flex items-center justify-items-end px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['post-data'],
  data(){
    return {
      postContent: ''
    }
  },
  methods: {
    submitPost() {
      // console.log(this.postContent);
      const post = {
        content: this.postContent
      }
      this.postContent = ''
      this.$emit('post-data', post);
    }
  }
}
</script>