import Heading from "@/components/Heading";
import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <Heading>Not Found</Heading>
      <p>Could not find requested resource</p>
      <Link href="/" className="text-orange-800 hover:underline">
        Return Home
      </Link>
    </div>
  );
}
