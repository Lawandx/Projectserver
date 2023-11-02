import Vue from 'vue'
import Router from 'vue-router'
// Shoes
import ShoesIndex from '@/components/Shoes/Index'
import ShoesCreate from '@/components/Shoes/CreateShoe'
import ShoesEdit from '@/components/Shoes/EditShoe'
import ShoesShow from '@/components/Shoes/ShowShoe'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/shoes',
      name: 'shoes',
      component: ShoesIndex,
      meta: {
        title: 'Shoes'
      }
    },
    {
      path: '/shoe/create',
      name: 'shoe-create',
      component: ShoesCreate,
      meta: {
        title: 'Create Shoe'
      }
    },
    {
      path: '/shoe/edit/:shoeId',
      name: 'shoe-edit',
      component: ShoesEdit,
      meta: {
        title: 'Edit Shoe'
      }
    },
    {
      path: '/shoe/:shoeId',
      name: 'shoe',
      component: ShoesShow,
      meta: {
        title: 'Show Shoe'
      }
    },
  ]
})
