import { Button } from "@/components/ui/button";
import { NextPage } from "next";
import { Input } from "@/components/ui/input";
import MedicineListItem from "@/components/MedicineListItem";
import axios from "axios";
import { useState } from "react";

interface Props {}

const SearchPage: NextPage<Props> = ({}) => {
  const [searchList, setSearchList] = useState<Medicine[]>([]);
  const handleSearch = async (e: any) => {
    e.preventDefault();
    // console.log(e.currentTarget[0].value);
    const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/search", {
      name: e.currentTarget[0].value,
    });
    console.log(res.data);
    setSearchList(res.data);
  };

  return (
    <div className="w-screen flex flex-col items-center space-y-6 py-14">
      <form
        onSubmit={handleSearch}
        className="flex w-full max-w-4xl items-center justify-center space-x-2"
      >
        <Input type="text" name="name" placeholder="Search Medicines" />
        <Button type="submit">Search</Button>
      </form>
      <div className="w-[56rem] min-h-[50vh] flex flex-col outline outline-1 outline-gray-200 shadow-md ">
        <ul className="w-full">
          {searchList &&
            searchList.map((medicine: Medicine, index) => (
              <ul className="w-full" key={index}>
                <MedicineListItem key={index} medicine={medicine} />
              </ul>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchPage;
