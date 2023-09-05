import { NextPage } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSession } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";

interface Props {
  cartItems: any;
  cartId: string;
}

const Cart: NextPage<Props> = ({ cartItems: CI, cartId }) => {
  const { data: session } = useSession();
  const [cartItems, setCartItems] = useState<any>(CI);

  let totalPrice = 0;

  cartItems.map((cartItem: any, index: number) => {
    const medicineInShops: MedicineInShops = cartItem.medicinesInShops;
    totalPrice += medicineInShops.price;
  });

  const removeItem = async (
    e: any,
    medicineInShop: MedicineInShops,
    id: string
  ) => {
    console.log(medicineInShop.medicine.name);
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/carts/${cartId}/${id}`,
        { headers: { Authorization: `Bearer ${session?.user.token}` } }
      );
      // filter cartItems such that deleted item is removed
      setCartItems((prevState: any) => {
        return prevState.filter((item: any) => item.id !== id);
      });
      // window.location.reload();
      toast({
        title: "Removed Item From Cart",
      });
    } catch (error) {
      toast({
        title: "OOPS! Something Went Wrong",
        description: "Error Removing Item From Cart",
      });
    }
  };

  return (
    <div className="p-10">
      <h1 className="scroll-m-20 text-3xl mb-10 font-extrabold tracking-tight lg:text-3xl">
        My Cart
      </h1>
      {cartItems.length == 0 ? (
        "Cart is Empty"
      ) : (
        <Table>
          <TableCaption>All Items In Your Cart.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Medicine</TableHead>
              <TableHead className="w-[300px]">Company</TableHead>
              <TableHead>Shop</TableHead>
              <TableHead className="text-center">Remove</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartItems.map((cartItem: any, index: number) => {
              const medicineInShops: MedicineInShops =
                cartItem.medicinesInShops;
              return (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {medicineInShops.medicine.name}
                  </TableCell>
                  <TableCell>{medicineInShops.medicine.Company.name}</TableCell>
                  <TableCell>{medicineInShops.shop.name}</TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant={"destructive"}
                      className="p-2 h-8 w-fit"
                      onClick={(e) =>
                        removeItem(e, medicineInShops, cartItem.id)
                      }
                    >
                      <AiFillDelete size={20} />
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    {medicineInShops.price}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
      <div className="w-full flex flex-col justify-end items-end">
        <h3>Total Price: {totalPrice}</h3>

        <Button>Checkout</Button>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx: any) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const res = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + "/carts/" + session?.user.id
  );
  console.log(res.data);
  return {
    props: {
      cartItems: res.data.CartItems,
      cartId: res.data.id,
    },
  };
};
export default Cart;
