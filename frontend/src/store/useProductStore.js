import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL =import.meta.env.MODE==='development' ? "http://localhost:3000":""

export const useProductStore = create((set,get)=>({
    products:[],
    loading:false,
    error:null,
    currentProduct:null,

    //form state
    formData:{
        name:'',
        price:"",
        image:""

    },

    setFormData:(formData)=>set({formData}),

    resetForm:()=>set({formData:{ name:"", price:"",image:""}}),

    addProduct: async(e)=>{
        e.preventDefault()
        set({loading:true})
        try {
         const{formData}=get()
         await axios.post(`${BASE_URL}/api/products`,formData)
         await get().fetchProduct()
         get().resetForm()
         toast.success("product added successfully")
         document.getElementById('add_product_modal').close()
        } catch (error) {
            console.log('error adding data ',error)
            toast.error("something went wrong")
            
        }finally{
            set({loading:false})
        }

    },


    fetchProducts: async ()=>{

        set({loading:true})
        try {
            
           const response= await axios.get(`${BASE_URL}/api/products`)

           set({products:response.data.data,error:null})
        } catch (error) {
            if(error.status==429) set({error:'Rate limit exceed',products:[]})
            else set({error:'something went wrong',products:[]})
        }finally{
            set({loading:false})
        }
    },
    deleteProduct: async(id)=>{
        set({loading:true})
        try {
            await axios.delete(`${BASE_URL}/api/products/${id}`)
            set((prev)=>({
                products:prev.products.filter(product=>product.id !==id)
            }))
            toast.success("Product deleted successfully")
        } catch (error) {
            console.log("Error in deleteProduct",error)
            toast.error("Something went wrong")
            
        }finally{
            set({loading:false})
        }
    },

    fetchProduct: async(id)=>{
        set({loading:true})
        try {
            const response= await axios.get(`${BASE_URL}/api/products/${id}`)
            set({
                currentProduct:response.data.data,
                formData:response.data.data, //prefill the form,
                error:null
            })
        } catch (error) {
            console.log("Error in fetching product",error)
            set({error:'something went wrong',currentProduct:null})
        }finally{
            set({loading:false})
        }

    },

    updateProduct: async(id)=>{
       set({loading:true})
       try {
          const {formData}=get()
          const response= await axios.put(`${BASE_URL}/api/products/${id}`,formData)
          set({currentProduct:response.data.data})
          toast.success('product updated successfully')
        
         
       } catch (error) {
        toast.error("somthing went wrong")
        console.log("error in updateProduct ",error)
        
       }finally{
        set({loading:false})
       }
    }


    
}))