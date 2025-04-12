import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <nav className="bg-[#1e2942] py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <Link href="/" className="text-white text-3xl font-bold mr-10">
          TechSpecs
        </Link>
      </div>
      <div className="hidden md:flex items-center space-x-8">
        <Link href="/" className="text-white hover:text-gray-300 transition-colors">
          首页
        </Link>
        <Link href="/processors" className="text-white hover:text-gray-300 transition-colors">
          处理器
        </Link>
        <Link href="/graphics-cards" className="text-white hover:text-gray-300 transition-colors">
          显卡
        </Link>
        <Link href="/motherboards" className="text-white hover:text-gray-300 transition-colors">
          主板
        </Link>
        <Button variant="outline" className="bg-white text-[#1e2942] hover:bg-gray-100 rounded-full px-6">
          登录
        </Button>
      </div>
    </nav>
  )
}
