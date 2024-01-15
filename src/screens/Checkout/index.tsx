"use client";
import CheckedOut from "@/components/CheckedOut";
import { endProgress } from "@/store/features/ProgressLoader";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";

const CheckoutScreen:React.FC<any> = (props) => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {

    return () => {
      dispatch(endProgress())
    }
  }, [])

  return (
    <div >
      <CheckedOut
        event_id={props.event_id}
        initialData={props.cart_items}
        updated_at={props.updated_at}
      />
    </div>
  );
};



export default CheckoutScreen;
