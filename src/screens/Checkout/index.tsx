"use client";
import CheckedOut from "@/components/CheckedOut";

const CheckoutScreen:React.FC<any> = (props) => {
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
