import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AiFillDelete } from "react-icons/ai";
import { useSession } from "next-auth/react";

const checkout = ({ cart }: any) => {
  const { data: session } = useSession();
  const { CartItems, id, userId } = cart;
  console.log(CartItems);
  let totalPrice = 0;
  CartItems.map((cartItem: any, index: number) => {
    const medicineInShops: MedicineInShops = cartItem.medicinesInShops;
    totalPrice += medicineInShops.price;
  });

  const order = async () => {
    const transaction = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/transactions`,
      { headers: { Authorization: `Bearer ${session?.user.token}` } }
    );
  };

  return (
    <div className="p-10">
      <h1 className="scroll-m-20 text-3xl mb-10 font-extrabold tracking-tight lg:text-3xl">
        Checkout
      </h1>
      {CartItems.length == 0 ? (
        "Cart is Empty"
      ) : (
        <Table>
          <TableCaption>All Items In Your Cart.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Medicine</TableHead>
              <TableHead className="w-[300px]">Company</TableHead>
              <TableHead>Shop</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {CartItems.map((cartItem: any, index: number) => {
              const medicineInShops: MedicineInShops =
                cartItem.medicinesInShops;
              return (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {medicineInShops.medicine.name}
                  </TableCell>
                  <TableCell>{medicineInShops.medicine.Company.name}</TableCell>
                  <TableCell>{medicineInShops.shop.name}</TableCell>

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

        <Button onClick={order}>
          <Link href="checkout">Order</Link>
        </Button>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const res = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + "/carts/" + session?.user.id
  );
  console.log(res.data);
  return {
    props: {
      cart: res.data,
    },
  };
};

export default checkout;
