import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { database } from "@/db";
import { bids as bidSchema } from "@/db/schema";
import { revalidatePath } from "next/cache";

export default async function Home() {
  const bids = await database.query.bids.findMany();

  return (
    <main className="container mx-auto py-12">
      <form
        action={async () => {
          "use server";
          await database.insert(bidSchema).values({});
          revalidatePath("/");
        }}
      >
        <Input name="bid" placeholder="Bidding" />
        <Button type="submit">Submit</Button>
      </form>

      {bids.map((bid) => (
        <div key={bid.id}>{bid.id}</div>
      ))}
    </main>
  );
}
