const stripe=require('stripe')('sk_test_51Ph7haRxahYVGxLcIxIW7dmeOS7dvmnzuZfKG0n4sgUrOtzPdCHY1hFLesfeNKf7OapkowXfs4VMZzWvqCAsg5fP008VkWSV5Z');

exports.makepayment=async(req,res)=>{
    try {
        const {products}=req.body;
        const lineItems = products.map((product)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:product.productId.productName,
                },
                unit_amount:product.productId.sellingPrice*100,
            },
            quantity:product.quantity
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            line_items:lineItems,
            mode:"payment",
            success_url:"http://localhost:3000/sucess",
            cancel_url:"http://localhost:3000/cancel",
        });

        res.json({id:session.id})
        
    } catch (error) {
        console.log("error aya hai",error)  
    }
}