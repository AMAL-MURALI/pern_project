import { sql } from "../config/db.js"

export const getAllProducts = async (req, res) => {
    try {
        const products = await sql`
        SELECT * FROM products
        ORDER BY  created_at DESC
        `
        console.log('products created',products)
        res.status(200).json({
            message:'created successfully',
            data:products
        })
    } catch (error) {
        console.log('error in getproducts',error)
        res.status(500).json({success:false,message:error.message})
       
    }


    
}

export const createAllProducts = async (req, res) => {
   const {name,price,image}=req.body

   if(!name || !price || !image){
    return res.status(400).json({
        success:false,
        message:'all fields are required'
     })
   }
   try {
     const newProduct=await sql`
     INSERT INTO products (name,price,image)
     VALUES (${name},${price},${image})
     RETURNING *
     `
     res.status(201).json({success:true,data:newProduct[0]})
    
   } catch (error) {
    console.log('error in createproducts',error)
    res.status(500).json({success:false,message:error.message})
   }

}
export const getProduct = async (req, res) => {
   const {id} =req.params
   try {
   const product= await sql`
      SELECT * FROM products
      WHERE id=${id}
    `
    if(product.length==0){
        return res.status(404).json({success:false,message:'product not found'})
       }
    res.status(200).json({success:true,data:product[0]})
   } catch (error) {
    console.log('error in getproduct',error)
    res.status(500).json({success:false,message:error.message})
    
   }
}

export const updateProduct = async (req, res) => {
    const { id }= req.params
    const {name,price,image}=req.body

    try {
        const update=await sql`
        UPDATE  products
        SET name=${name},price=${price},image=${image}
        WHERE id=${id}
        RETURNING *
        `
       if(update.length==0){
        return res.status(404).json({success:false,message:'product not found'})
       }
       res.status(200).json({success:true,data:update[0]})

    } catch (error) {
        console.log('error in updateproduct',error)
    res.status(500).json({success:false,message:error.message})
    }

}
export const deleteProduct = async (req, res) => {
   const {id} =req.params
  try {
   const deletedata= await sql`
    DELETE FROM products
    WHERE id=${id}
    RETURNING *
    `
    if(deletedata.length==0){
        return res.status(404).json({success:false,message:'product not found'})
       }
    res.status(200).json({
     success:true,
     data:deletedata[0]
    })
  } catch (error) {
    console.log('error in deletedproduct',error)
    res.status(500).json({success:false,message:'internel servor error'})
  }
  
}



