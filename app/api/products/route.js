import { prisma } from "@/lib/prisma";

export async function POST(request) {
  const { event, date } = await request.json();

  const newProduct = await prisma.product.create({
    data: { event, date },
  });

  return new Response(JSON.stringify({ success: true, product: newProduct }), {
    status: 201,
  });
}

export async function GET() {
  try {
    const products = await prisma.product.findMany();

    return new Response(JSON.stringify(products), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch products." }),
      { status: 500 }
    );
  }
}

