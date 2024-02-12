import CheckedOut from "@/components/CheckedOut";
import CheckoutScreen from "@/screens/Checkout";
import axios from "axios";

async function getData(eventId: string) {
    const URL = "https://myapi.runofshowapp.com/api/inventory/detailsByEventId";
    const image_url =
      "https://ros-rosbucket221548-newdev.s3.amazonaws.com/public/";
    const client_file_url =
      "https://ros-rosbucket221548-newdev.s3.amazonaws.com/inventory/";
    const Spec_Icons: string[] = [
      "/images/icons/flash.svg",
      "/images/icons/lightning.svg",
      "/images/icons/wifi.svg",
      "/images/icons/tec_spec.svg",
    ];
    //   const res = await fetch(URL, {...obj});
    // console.log("Event Id ", eventId);
  
    try {
      const res = await axios.post(
        URL,
        {
          eventId: eventId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      let data = await res.data;

  
      let {
        workspaceInfo,
        items,
        social_media,
        contacts,
        eventInfo,
        attachments,
        checkout_client_info,
        cart_items
      } = data;
      workspaceInfo = workspaceInfo[0];
  
      workspaceInfo = {
        ...workspaceInfo,
        logo_url: image_url + workspaceInfo?.logo_url,
      };



      let updated_at = ''
      // filter checkout info
      if(checkout_client_info?.length > 0) {
        updated_at = checkout_client_info[0]?.updated_at
      }
      
      // filter items
      items = items?.map((item: any) => ({
        ...item,
        icon_url: image_url + item?.icon_url,
        event_id: eventId
      }));
  
      // filter cartItems 
      cart_items = cart_items.map((item:any) =>  {
        let itemX = item;
        let itemFromList = items?.find((itemY:any) => itemY?.id === itemX?.item );
        itemFromList = {
          ...itemFromList,
          rental_price: itemX?.unit_price_when_purchased,
          selectedQuantity: itemX?.quantity,
          cart_id: itemX.id
        }
  
        return itemFromList;
      })
  

  
      return {
        updated_at,
        cart_items,
        event_id: eventId
      };
    } catch (error) {
      // console.log("Error at server : ", error);
      return null;
    }
  }

  

export default async function Checkout(params:ICheckout) {
    const data = await getData(params.params.eventId);
    
    return <main>
        <CheckedOut
            event_id={data?.event_id || ''}
            initialData={data?.cart_items || []}
            updated_at={data?.updated_at || ''}
          />
    </main>
}

interface ICheckout {
    params: {
      workspaceid: string;
      eventId: string;
    };
    searchParams: any;
  }
  