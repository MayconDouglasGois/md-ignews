import { stripe } from "../../services/stripe";
import { NextApiResponse, NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import { fauna } from "../../services/fauna";
import { Collection, query as q, Ref } from "faunadb";


interface iUser {
ref: {
  id: string
}
data: {
  stripe_costumer_id: string
}
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method) {
    const session = await getSession({ req });


    const user = await fauna.query<iUser>(
      q.Get(
        q.Match(
          q.Index("users_by_email"),
          q.Casefold(session.user.email)
        )
      )
    );

    let costumerId = user.data.stripe_costumer_id


    if(!costumerId){
      const stripeCustomers = await stripe.customers.create({
        email: session.user.email,
      });

      await fauna.query(
        q.Update(q.Ref(
          q.Collection('Users'),user.ref.id),
          {
            data: {
              stripe_costumer_id: stripeCustomers.id
            }
          }
        )
      )
      costumerId = stripeCustomers.id
    }
    
    const stripeCheckouSessions = await stripe.checkout.sessions.create({
      customer: costumerId,
      payment_method_types: ["card"],
      billing_address_collection: "required",
      line_items: [
        {
          price: "price_1L8BjTLKJ2P3MYwCtbWcJlDw",
          quantity: 1,
        },
      ],
      mode: "subscription",
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    });

    return res.status(200).json({ sessionId: stripeCheckouSessions.id });
  } else {
    res.setHeader("allow", "POST");
    res.status(405).end("method not allowed");
  }
};
