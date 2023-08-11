import { Button } from "@/components/ui/button";
import { NextPage } from "next";
import { Input } from "@/components/ui/input";

interface Props {}

const SearchPage: NextPage<Props> = ({}) => {
  return (
    <div className="w-screen flex flex-col items-center space-y-6 py-14">
      <div className="flex w-full max-w-sm items-center justify-center space-x-2">
        <Input type="text" placeholder="Search Medicines" />
        <Button type="submit">Search</Button>
      </div>
      <div>List of Medicines Found</div>
    </div>
  );
};

export default SearchPage;
