import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button.tsx";

export const RestaurantTable = () => {
  return (
    <Table className="mx-auto w-2/4 mt-8">
      <TableCaption>A list of your added restaurants.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Price Range</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead>Edit</TableHead>
          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/*{invoices.map((invoice) => (*/}
        <TableRow>
          <TableCell className="font-medium">Some</TableCell>
          <TableCell>Some</TableCell>
          <TableCell>$</TableCell>
          <TableCell>Rating</TableCell>
          <TableCell>
            <Button variant="secondary">Update</Button>
          </TableCell>
          <TableCell>
            <Button variant="destructive">Delete</Button>
          </TableCell>
        </TableRow>
        {/*))}*/}
      </TableBody>
    </Table>
  );
};
