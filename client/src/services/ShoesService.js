import Api from '@/services/Api'

export default {
  index(search) {
    return Api().get('shoes') 
  },
  show(shoeId) {
    return Api().get('shoe/' + shoeId) 
  },
  post(shoe) {
    return Api().post('shoe', shoe) 
  },
  put(shoe) {
    return Api().put('shoe/' + shoe.id, shoe) 
  },
  delete(shoeId) {
    return Api().delete('shoe/' + shoeId) 
  },
}
