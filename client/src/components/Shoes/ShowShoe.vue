<template>
  <div class="containerx mt-4">
    <h1>Show Shoe</h1>
    <div class="card" v-if="shoe">
      <div class="card-body row">
        <div class="col-md-6">
          <div class="image-container">
            <img :src="shoe.image" class="card-img-top" alt="Shoe Image">
          </div>
        </div>
        <div class="col-md-6">
          <div class="details-container">
            <p class="card-text"><strong class="text-danger">Brand:</strong> {{ shoe.brand }}</p>
            <p class="card-text"><strong class="text-danger">Model:</strong> {{ shoe.model }}</p>
            <p class="card-text"><strong class="text-danger">Size:</strong> {{ shoe.size }}</p>
            <p class="card-text"><strong class="text-danger">Color:</strong> {{ shoe.color }}</p>
            <p class="card-text"><strong class="text-danger">Price:</strong> {{ shoe.price }}</p>
            <div class="details-text">
              <p class="card-text"><strong class="text-danger">Details:</strong></p>
              <div class="overflow-container">{{ shoe.details }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ShoesService from '@/services/ShoesService';
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  data() {
    return {
      shoe: {}
    };
  },
  beforeRouteEnter(to, from, next) {
    document.title = to.meta.title || 'Default Title';
    next();
  },
  beforeRouteUpdate(to, from, next) {
    document.title = to.meta.title || 'Default Title';
    next();
  },
  async created() {
    try {
      let shoeId = this.$route.params.shoeId;
      const response = await ShoesService.show(shoeId);
      this.shoe = response.data || {};
      this.$router.replace('/shoe/' + shoeId);
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style scoped>
.containerx {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 15px;
}

h1 {
  font-size: 32px;
  color: #333;
  margin-bottom: 20px;
}

.card {
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 8px;
  background-color: #fff;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.text-danger {
  color: red;
}

.card-img-top {
  width: 100%; 
  height: auto;
  max-width: 100%;
  max-height: 300px; /* ตั้งค่าสูงสุดสำหรับความสูงของรูปภาพ */
}

.image-container {
  text-align: center;
}

.details-container {
  padding: 0 20px;
}

.overflow-container {
  max-height: 150px;
  overflow-y: auto; /* เพิ่มการแสดงแถบเลื่อนเมื่อข้อมูลเกินขนาดที่กำหนด */
}

.details-text {
  margin-bottom: 0;
}

</style>
