'use client' // これで onClick が使えるようになります

type Props = {
  handleDelete: () => Promise<void>
}

export default function DeleteButton({ handleDelete }: Props) {
  return (
    <button 
      type="button" 
      className="text-sm bg-red-50 hover:bg-red-100 text-red-600 py-2 px-4 rounded-lg transition"
      onClick={async () => {
        if (confirm('本当に削除しますか？')) {
          await handleDelete()
        }
      }}
    >
      削除
    </button>
  )
}
