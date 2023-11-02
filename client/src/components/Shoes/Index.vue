<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between mb-4">
      <h2 class="mb-0 ">รายการรองเท้า</h2>
      <div>
        <h4 class="mb-0 text-white">จำนวนรองเท้า: {{ shoes.length }}</h4><br>
        <button @click="navigateTo('/shoe/create')" class="btn btn-primary">
          เพิ่มรองเท้า
        </button>
      </div>
    </div>
    <div class="row">
      <div v-for="shoe in shoes" :key="shoe.shoe_id" class="col-lg-4 col-md-6 mb-4">
        <div class="card h-100 shadow shoe-card">
          <img :src="shoe.image" class="card-img-top" alt="Shoe Image" style="max-height: 200px;">
          <div class="card-body">
            <h5 class="card-title">{{ shoe.brand }}</h5>
            <p class="card-text">Model: {{ shoe.model }}</p>
            <p class="card-text">Size: {{ shoe.size }}</p>
            <p class="card-text">Color: {{ shoe.color }}</p>
            <p class="card-text">Price:${{ shoe.price }} </p>
            <div class="d-grid gap-2 mt-4">
              <router-link :to="'/shoe/' + shoe.shoe_id" class="btn btn-info">ดูข้อมูลรองเท้า</router-link>
              <router-link :to="'/shoe/edit/' + shoe.shoe_id" class="btn btn-warning">แก้ไขข้อมูลรองเท้า</router-link>
              <button @click="confirmDelete(shoe)" class="btn btn-danger">ลบข้อมูลรองเท้า</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ShoesService from "@/services/ShoesService";
import 'bootstrap/dist/css/bootstrap.min.css';

export default {
  beforeRouteEnter(to, from, next) {
    document.title = to.meta.title || "Default Title";
    next();
  },
  beforeRouteUpdate(to, from, next) {
    document.title = to.meta.title || "Default Title";
    next();
  },
  data() {
    return {
      shoes: []
    };
  },
  created() {
    this.fetchShoes();
  },
  methods: {
    async fetchShoes() {
      try {
        this.shoes = (await ShoesService.index()).data;
        localStorage.setItem('shoes', JSON.stringify(this.shoes)); 
      } catch (err) {
        console.error(err);
      }
    },
    navigateTo(route) {
      this.$router.push(route);
    },
    async confirmDelete(shoe) {
      const confirmed = window.confirm("คุณต้องการลบรองเท้านี้ใช่หรือไม่?");

      if (confirmed) {
        try {
          await ShoesService.delete(shoe.shoe_id);
          this.fetchShoes();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
};
</script>

<style>
.card {
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 8px;
  background-color: #fff;
}

.card-title {
  color: #0275d8; 
  font-size: 1.5rem;
  font-weight: bold;
}

.text-info {
  color: #0275d8; 
}

.shoe-card {
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.shoe-card:hover {
  transform: scale(1.03);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn {
  border-radius: 4px;
}

img.card-img-top {
  object-fit: cover;
  max-height: 200px; /* Adjust this value */
}

.container {
  background-image: url('https://images.unsplash.com/photo-1454117096348-e4abbeba002c?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  border-radius: 30px;
  background-position: center;
  background-size: cover;
  padding: 20px; 
  margin-bottom: 20px; 
}
</style>
