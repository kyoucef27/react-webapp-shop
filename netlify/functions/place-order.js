const { z } = require("zod");

const orderSchema = z.object({
  order: z.object({
    items: z.array(
      z.object({
        productId: z.string(),
        name: z.string(),
        price: z.number(),
        quantity: z.number().positive(),
        specid: z.string(),
      })
    ),
    total: z.number(),
    customer: z.object({
      name: z.string(),
      email: z.string().email(),
      phone: z.string(),
      city: z.string(),
      address: z.string(),
    }),
    timestamp: z.string(),
  }),
});

exports.handler = async (event) => {
  try {
    console.log("Received order data:", event.body);

    // First, make sure we can parse the JSON
    let body;
    try {
      body = JSON.parse(event.body || "{}");
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          message: "Invalid JSON in request body",
          error: parseError.toString(),
        }),
      };
    }

    // Log the body for debugging
    console.log("Parsed body:", JSON.stringify(body, null, 2));

    // Then validate with Zod
    let validatedData;
    try {
      validatedData = orderSchema.parse(body);
    } catch (zodError) {
      console.error("Validation error:", zodError.format());
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          message: "Validation failed",
          errors: zodError.format(),
        }),
      };
    }

    const { order } = validatedData;
    console.log("Validated order data:", JSON.stringify(order, null, 2));


    try {
      const backendRes = await fetch(`http://localhost:3000/api/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({order}),
        timeout: 8000, 
      });

      if (!backendRes.ok) {
        const errorText = await backendRes.text();
        throw new Error(
          `Backend responded with status: ${backendRes.status}, message: ${errorText}`
        );
      }

      const backendData = await backendRes.json();

      return {
        statusCode: 200,
        body: JSON.stringify(backendData),
      };
    } catch (fetchError) {
      console.error("Backend fetch error:", fetchError);
      return {
        statusCode: 500,
        body: JSON.stringify({
          success: false,
          message: "Failed to connect to backend API",
          error: fetchError.toString(),
        }),
      };
    }
  } catch (err) {
    console.error("Order processing error:", err);

    return {
      statusCode: 400,
      body: JSON.stringify({
        success: false,
        message: err.message || "Failed to process order",
        error: err.toString(),
      }),
    };
  }
};
