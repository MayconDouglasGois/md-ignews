import Head from "next/head"
import { GetStaticProps } from "next"
import { SubscribeButton } from "../components/SubscribeButton"
import style from "../styles/home.module.scss"
import { stripe } from "../services/stripe"

interface WomeProps {
  product: {
    priceId: String,
  amount: number
}
  }


export default function Home({product}: WomeProps) {
  return (
    <>
    <Head>
    <title>ig.news | Home</title>
    </Head>
    
    <main className={style.container}>

      <section className={style.content}>
        <span>👏 Hey, welcome</span>
        <h1>News about <br /> the <span>React</span> world</h1>
        <span>Get acess to all the publications</span>
        <span className={style.price}>for {product.amount} month</span>
        <SubscribeButton/>
      </section>
      <img src="/image/Mulher.svg" alt="mulher" />
    </main>
    </>

  )
  
}
export const getStaticProps : GetStaticProps = async()=>{
  const price = await stripe.prices.retrieve('price_1L8BjTLKJ2P3MYwCtbWcJlDw')

  const product = {
    priceId: price.id,
    amount: (price.unit_amount / 100),
  }

  return {
  props:{
    product,
  },
  revalidate: 60 * 60 * 24 //24 hours
}
    
}