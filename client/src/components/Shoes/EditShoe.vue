<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h1 class="text-center mb-4">Edit Shoe</h1>
        <form @submit.prevent="editShoe">
          <div class="mb-3">
            <label for="brand" class="form-label">Brand:</label>
            <input type="text" class="form-control" v-model="shoe.brand" />
          </div>
          <div class="mb-3">
            <label for="model" class="form-label">Model:</label>
            <input type="text" class="form-control" v-model="shoe.model" />
          </div>
          <div class="mb-3">
            <label for="size" class="form-label">Size:</label>
            <input type="text" class="form-control" v-model="shoe.size" />
          </div>
          <div class="mb-3">
            <label for="color" class="form-label">Color:</label>
            <input type="text" class="form-control" v-model="shoe.color" />
          </div>
          <div class="mb-3">
            <label for="price" class="form-label">Price:</label>
            <input type="number" step="0.01" class="form-control" v-model="shoe.price" />
          </div>
          <div class="mb-3">
            <label for="details" class="form-label">Details:</label>
            <textarea class="form-control" v-model="shoe.details"></textarea>
          </div>
          <div class="mb-3">
            <label for="image" class="form-label">Image URL:</label>
            <input type="text" class="form-control" v-model="shoe.image" />
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary">Edit Shoe</button>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>

<script>
import ShoesService from "@/services/ShoesService";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  data() {
    return {
      shoe: {
        id: "",
        brand: "",
        model: "",
        size: "",
        color: "",
        price: 0.0,
        details: "",
        image: ""
      }
    };
  },
  async created() {
    try {
      this.shoeId = this.$route.params.shoeId;
      this.shoe = (await ShoesService.show(this.shoeId)).data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async editShoe() {
      try {
        this.shoe.id = this.shoeId;
        await ShoesService.put(this.shoe);
        this.$router.push({ name: "shoes" });
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
h1 {
  font-size: 32px;
  color: #333;
  margin-bottom: 20px;
}

input[type="text"],
input[type="number"],
textarea {
  width: 100%;
  padding: 8px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button[type="submit"] {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #45a049;
}
</style>
