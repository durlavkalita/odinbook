<template>
  <div style="max-height: 800px;" _class="overflow-y-auto">    
    <div class="min-h-screen bg-gray-100">
      <div class="py-10">
        <div class="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <div class="lg:col-span-1 xl:col-span-3"></div>
          <!-- main content -->
          <main class="lg:col-span-10 xl:col-span-6">
            <div class="mt-4">
              
              <post-create @post-data="createPost"></post-create>
              
              <ul class="space-y-4">
                <post-card v-for="post in fetchPosts" :key="post._id" :post="post"></post-card>               
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
import PostCreate from '../../components/PostCreate.vue';

export default {
  components: { PostCard, PostCreate },
  computed: {
    fetchPosts() {
      const posts = this.$store.getters['post/posts'];
      return posts;
    }
  },
  created() {
    this.loadPosts();
  },
  methods: {
    loadPosts(){
      try {
        this.$store.dispatch('post/loadPosts');
      } catch (error) {
        console.log(error);
      }
    },
    createPost(data){
      try {
        this.$store.dispatch('post/createPost', data);
        this.$store.dispatch('post/loadPosts');
        this.$router.replace('/timeline');
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>