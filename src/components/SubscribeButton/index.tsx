import style from "./style.module.scss";
import { useSession, signIn } from "next-auth/react";
import { api } from "../../services/api";
import { GetStripeJs } from "../../services/stripe-js";

const SubscribeButton = () => {
  const { data: session } = useSession();

  async function handleSunbscribeNow() {

    if (!session) {
      signIn("github");
    } 
    
    try {

      const reponse = await api.post("/subscribe");

      const { sessionId } = reponse.data;

      const stripe = await GetStripeJs()

    stripe.redirectToCheckout({sessionId})
      
    } catch (err) {
        alert(err.message)
    }
  }

  return (
    <button
      className={style.button}
      onClick={() => {
        handleSunbscribeNow();
      }}
    >
      Subscribe now
    </button>
  );
};
export { SubscribeButton };
