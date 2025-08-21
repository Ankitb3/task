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
    
const capFirst = params.id.charAt(0).toUpperCase() + params.id.slice(1);
   
   const data = await prisma.product.findFirst({
    where: {
      event: capFirst,
    },
  });

    return new Response(JSON.stringify(data))

}