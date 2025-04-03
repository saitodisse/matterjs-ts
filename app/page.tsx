import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center">
        <h1 className="text-4xl font-bold">Matter.js Simulations</h1>
        <p className="text-lg text-center">
          A collection of physics simulations using Matter.js.
        </p>
        <ul className="list-inside list-disc">
          <li>
            <Link
              href="/falling-object"
              className="text-blue-500 hover:underline"
            >
              Falling Object
            </Link>
          </li>
        </ul>
      </main>
    </div>
  );
}
