<script setup>
  import {ref} from 'vue';

  const images = ref([
    'src/assets/carousel/image1.jpg',
    'src/assets/carousel/image2.jpg',
    'src/assets/carousel/image3.jpg',
    'src/assets/carousel/image4.jpg',
    'src/assets/carousel/image5.jpg',
    'src/assets/carousel/image6.jpg'
  ])
</script>

<template>
  <div class="content-wrapper">
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in images" :key="item">
        <img :src="item" class="carousel-image">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped>
.content-wrapper {
  background-color: #f0f0f0; /* 打底框颜色 */
  padding: 20px;
  border-radius: 8px;
}

.carousel-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
</style>
