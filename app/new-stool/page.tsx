import BowelMovementForm from "@/components/new-stool-form"

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">排便状況入力フォーム</h1>
      <BowelMovementForm />
    </main>
  )
}

