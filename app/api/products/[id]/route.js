import { prisma } from "@/lib/prisma";

export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return new Response(JSON.stringify({ error: "Invalid ID" }), { status: 400 });
    }

    await prisma.product.delete({
      where: { id },
    });

    return new Response(JSON.stringify({ success: true, message: "Deleted successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return new Response(JSON.stringify({ error: "Failed to delete product" }), { status: 500 });
  }
}



export async function GET(request,{params}){
   try{
    const {name} = await request.json();
    console.log('====================================');
    console.log(name);
    console.log('====================================');
   }catch(err){
    return new Response(
      JSON.stringify({
        error:"something wents wrong"
      })
    )
   }
}