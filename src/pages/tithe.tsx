/* eslint-disable @next/next/no-sync-scripts */
import styles from '../styles/Tithe.module.scss';
import TitheLayout from '../components/TitheLayout'

const { buttonS4, inputs } = styles

import Head from "next/head";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { type NextPage } from "next";

import { api } from "~/utils/api";
import toast from "react-hot-toast";

const Tithe: NextPage = () => {

  const { data: sessionData } = useSession();

  const { mutate: payTithe } = api.tithe.payTithe.useMutation({})
  const { mutate: payGeneralTithe } = api.tithe.payGeneralTithe.useMutation({})

  const [amountInCents, setAmountInCents] = useState(0);
  const [nameOfTither, setNameOfTither] = useState('');

  const publicKey = "pk_test_ed3c54a6gOol69qa7f45";
  const currency = "ZAR";
  const name = "Tithe";
  const description = "Tithe Payment";

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.yoco.com/sdk/v1/yoco-sdk-web.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleCheckoutClick = () => {
    const yoco = new window.YocoSDK({ publicKey });
    yoco.showPopup({
      amountInCents,
      currency,
      name,
      description,
      callback: (result: { id?: string; error?: { message: string } }) => {
        if (result.error) {
          const errorMessage = result.error.message;
          toast.error("Something went wrong: " + errorMessage);
        } else {
          toast.success("Payment Successful! Thank You!");
          if (typeof result.id !== 'undefined') {
            const token = result.id;
            if (sessionData?.user?.name || sessionData?.user?.name) { 
              payTithe({ token, amountInCents})
            } else {
              payGeneralTithe({ name: nameOfTither, amountInCents, token })
            }
          }
        }
      },
    });
  };

  return (
    <TitheLayout>
        <Head>
            <title>CRC | Tithe</title>
            <meta name="description" content="Pay Tithe" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div className={styles.tithe}>
          <div>
            <h1>
            Thank You for Your Generosity🙌
            </h1>
          </div>
          <form>
            {
              ( sessionData?.user?.name || sessionData?.user?.email ) &&
               ( <div><h2>Tithing as: {sessionData?.user?.name ? sessionData?.user?.name : sessionData?.user?.email}</h2></div> )
              }
              {
              ( !sessionData?.user?.name && !sessionData?.user?.email ) &&
                (<div><input onChange={(e) => setNameOfTither(e.target.value)} type="text" name="name" placeholder="Name" /></div>)
              }
            <div className={inputs}><input onChange={(e) => setAmountInCents(parseInt(e.target.value) * 100)} type="text" name="amount" placeholder="100.00" /></div>
          </form>
          <button className={buttonS4} onClick={handleCheckoutClick}>
            <span>
            Pay
            </span>
          </button>
        </div>
    </TitheLayout>
  )
}

export default Tithe