import { Button } from "@/components/ui/button";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import { getServerSession } from "next-auth";

interface Props {
  medicine: Medicine;
}

const Index: NextPage<Props> = ({ medicine }) => {
  const addToCart = async (medicineInShop: MedicineInShops) => {
    console.log(medicineInShop);
    const res=await axios.get
  };
  const addToWishList = async () => {};
  return (
    <div className="px-10 min-h-[60vh] h-fit">
      <div className="">
        <h1>{medicine.name}</h1>
        <h2>{medicine.Company.name}</h2>
        <h3>{medicine.rating.toString()} ⭐</h3>
      </div>
      <div>
        List of Shops Selling These Medicines with buy or add to cart option
        <ul>
          {medicine.MedicineInShops.map(
            (medicineInShop: MedicineInShops, index) => (
              <li
                key={index}
                className="flex my-5 justify-between items-center h-fit "
              >
                <h2>{medicineInShop.shop.name}</h2>
                <h3>
                  {medicineInShop.price
                    ? medicineInShop.price
                    : "Not Available"}
                </h3>
                <div className="flex gap-4">
                  <Button variant={"outline"} onClick={addToWishList}>
                    Add To WishList
                  </Button>
                  <Button
                    variant={"default"}
                    onClick={() => addToCart(medicineInShop)}
                  >
                    Add To Cart
                  </Button>
                </div>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const medicineID = ctx.query.id;
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  console.log(medicineID);
  console.log(session);
  const res = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + "/medicines/" + medicineID,
    {
      headers: { Authorization: "Bearer " + session?.user.token },
    }
  );
  const medicine: Medicine = res.data.medicine;
  return {
    props: {
      medicine,
    },
  };
};

export default Index;
