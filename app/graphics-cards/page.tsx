"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { MonitorSmartphone, Info, ArrowUpDown } from "lucide-react"

// 模拟显卡数据
const graphicsCards = [
  // 游戏显卡
  {
    id: 1,
    name: "NVIDIA GeForce RTX 4090",
    type: "gaming",
    vram: 24,
    vramType: "GDDR6X",
    boostClock: 2.52,
    tdp: 450,
    price: 12999,
    releaseDate: "2022-10-12",
    architecture: "Ada Lovelace",
    interface: "PCIe 4.0 x16",
    lithography: "TSMC 4nm",
    manufacturer: "NVIDIA",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "AMD Radeon RX 7900 XTX",
    type: "gaming",
    vram: 24,
    vramType: "GDDR6",
    boostClock: 2.5,
    tdp: 355,
    price: 8999,
    releaseDate: "2022-12-13",
    architecture: "RDNA 3",
    interface: "PCIe 4.0 x16",
    lithography: "TSMC 5nm + 6nm",
    manufacturer: "AMD",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "NVIDIA GeForce RTX 4080",
    type: "gaming",
    vram: 16,
    vramType: "GDDR6X",
    boostClock: 2.51,
    tdp: 320,
    price: 9499,
    releaseDate: "2022-11-16",
    architecture: "Ada Lovelace",
    interface: "PCIe 4.0 x16",
    lithography: "TSMC 4nm",
    manufacturer: "NVIDIA",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "AMD Radeon RX 7900 XT",
    type: "gaming",
    vram: 20,
    vramType: "GDDR6",
    boostClock: 2.4,
    tdp: 300,
    price: 7999,
    releaseDate: "2022-12-13",
    architecture: "RDNA 3",
    interface: "PCIe 4.0 x16",
    lithography: "TSMC 5nm + 6nm",
    manufacturer: "AMD",
    image: "/placeholder.svg?height=100&width=100",
  },

  // 专业显卡
  {
    id: 5,
    name: "NVIDIA RTX A6000",
    type: "professional",
    vram: 48,
    vramType: "GDDR6",
    boostClock: 1.8,
    tdp: 300,
    price: 32999,
    releaseDate: "2020-12-08",
    architecture: "Ampere",
    interface: "PCIe 4.0 x16",
    lithography: "Samsung 8nm",
    manufacturer: "NVIDIA",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 6,
    name: "AMD Radeon PRO W7900",
    type: "professional",
    vram: 48,
    vramType: "GDDR6",
    boostClock: 2.3,
    tdp: 295,
    price: 28999,
    releaseDate: "2023-06-05",
    architecture: "RDNA 3",
    interface: "PCIe 4.0 x16",
    lithography: "TSMC 5nm + 6nm",
    manufacturer: "AMD",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 7,
    name: "NVIDIA RTX A5000",
    type: "professional",
    vram: 24,
    vramType: "GDDR6",
    boostClock: 1.73,
    tdp: 230,
    price: 19999,
    releaseDate: "2021-04-12",
    architecture: "Ampere",
    interface: "PCIe 4.0 x16",
    lithography: "Samsung 8nm",
    manufacturer: "NVIDIA",
    image: "/placeholder.svg?height=100&width=100",
  },

  // 入门级显卡
  {
    id: 8,
    name: "NVIDIA GeForce RTX 4060",
    type: "entry",
    vram: 8,
    vramType: "GDDR6",
    boostClock: 2.46,
    tdp: 115,
    price: 2499,
    releaseDate: "2023-06-29",
    architecture: "Ada Lovelace",
    interface: "PCIe 4.0 x8",
    lithography: "TSMC 4nm",
    manufacturer: "NVIDIA",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 9,
    name: "AMD Radeon RX 7600",
    type: "entry",
    vram: 8,
    vramType: "GDDR6",
    boostClock: 2.65,
    tdp: 165,
    price: 2099,
    releaseDate: "2023-05-25",
    architecture: "RDNA 3",
    interface: "PCIe 4.0 x8",
    lithography: "TSMC 6nm",
    manufacturer: "AMD",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 10,
    name: "Intel Arc A770",
    type: "entry",
    vram: 16,
    vramType: "GDDR6",
    boostClock: 2.1,
    tdp: 225,
    price: 2299,
    releaseDate: "2022-10-12",
    architecture: "Alchemist",
    interface: "PCIe 4.0 x16",
    lithography: "TSMC 6nm",
    manufacturer: "Intel",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function GraphicsCardsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [sortBy, setSortBy] = useState("releaseDate")
  const [sortOrder, setSortOrder] = useState("desc")
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    manufacturers: [] as string[],
    minVram: 0,
    maxVram: 48,
    minClock: 0,
    maxClock: 3,
  })

  // 过滤显卡
  const filteredGraphicsCards = graphicsCards.filter((card) => {
    // 类型过滤
    if (activeTab !== "all" && card.type !== activeTab) {
      return false
    }

    // 搜索过滤
    if (searchQuery && !card.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    // 制造商过滤
    if (filters.manufacturers.length > 0 && !filters.manufacturers.includes(card.manufacturer)) {
      return false
    }

    // 显存过滤
    if (card.vram < filters.minVram || card.vram > filters.maxVram) {
      return false
    }

    // 频率过滤
    if (card.boostClock < filters.minClock || card.boostClock > filters.maxClock) {
      return false
    }

    return true
  })

  // 排序显卡
  const sortedGraphicsCards = [...filteredGraphicsCards].sort((a, b) => {
    let comparison = 0

    switch (sortBy) {
      case "name":
        comparison = a.name.localeCompare(b.name)
        break
      case "vram":
        comparison = a.vram - b.vram
        break
      case "clock":
        comparison = a.boostClock - b.boostClock
        break
      case "price":
        comparison = a.price - b.price
        break
      case "releaseDate":
        comparison = new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
        break
      default:
        comparison = 0
    }

    return sortOrder === "asc" ? comparison : -comparison
  })

  // 处理制造商过滤器变化
  const handleManufacturerChange = (manufacturer: string) => {
    setFilters((prev) => {
      const manufacturers = prev.manufacturers.includes(manufacturer)
        ? prev.manufacturers.filter((m) => m !== manufacturer)
        : [...prev.manufacturers, manufacturer]

      return { ...prev, manufacturers }
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">显卡</h1>
          <p className="text-gray-300 mt-1">浏览和比较各类显卡的详细规格</p>
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="搜索显卡..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-64 bg-[#2c3e50] text-white border-gray-700"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 过滤器侧边栏 */}
        <Card className="bg-[#2c3e50] text-white lg:col-span-1 h-fit">
          <CardHeader>
            <CardTitle>筛选</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-medium">制造商</h3>
              <div className="space-y-2">
                {["NVIDIA", "AMD", "Intel"].map((manufacturer) => (
                  <div key={manufacturer} className="flex items-center space-x-2">
                    <Checkbox
                      id={`manufacturer-${manufacturer}`}
                      checked={filters.manufacturers.includes(manufacturer)}
                      onCheckedChange={() => handleManufacturerChange(manufacturer)}
                      className="border-gray-500 data-[state=checked]:bg-[#3498db] data-[state=checked]:border-[#3498db]"
                    />
                    <Label htmlFor={`manufacturer-${manufacturer}`} className="text-white">
                      {manufacturer}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">显存容量 (GB)</h3>
              <div className="flex justify-between text-sm text-gray-300">
                <span>{filters.minVram}</span>
                <span>{filters.maxVram}</span>
              </div>
              <Slider
                defaultValue={[0, 48]}
                max={48}
                step={1}
                value={[filters.minVram, filters.maxVram]}
                onValueChange={(value) => setFilters((prev) => ({ ...prev, minVram: value[0], maxVram: value[1] }))}
                className="mt-2"
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">加速频率 (GHz)</h3>
              <div className="flex justify-between text-sm text-gray-300">
                <span>{filters.minClock.toFixed(1)}</span>
                <span>{filters.maxClock.toFixed(1)}</span>
              </div>
              <Slider
                defaultValue={[0, 3]}
                min={0}
                max={3}
                step={0.1}
                value={[filters.minClock, filters.maxClock]}
                onValueChange={(value) => setFilters((prev) => ({ ...prev, minClock: value[0], maxClock: value[1] }))}
                className="mt-2"
              />
            </div>

            <Button
              variant="outline"
              className="w-full mt-4 border-gray-600 text-white hover:bg-gray-700"
              onClick={() =>
                setFilters({
                  manufacturers: [],
                  minVram: 0,
                  maxVram: 48,
                  minClock: 0,
                  maxClock: 3,
                })
              }
            >
              重置筛选
            </Button>
          </CardContent>
        </Card>

        {/* 显卡列表 */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
              <TabsList className="bg-[#2c3e50] grid w-full grid-cols-4">
                <TabsTrigger value="all" className="data-[state=active]:bg-[#3498db]">
                  全部
                </TabsTrigger>
                <TabsTrigger value="gaming" className="data-[state=active]:bg-[#3498db]">
                  游戏显卡
                </TabsTrigger>
                <TabsTrigger value="professional" className="data-[state=active]:bg-[#3498db]">
                  专业显卡
                </TabsTrigger>
                <TabsTrigger value="entry" className="data-[state=active]:bg-[#3498db]">
                  入门级显卡
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] bg-[#2c3e50] text-white border-gray-700">
                  <SelectValue placeholder="排序方式" />
                </SelectTrigger>
                <SelectContent className="bg-[#2c3e50] text-white border-gray-700">
                  <SelectItem value="releaseDate">发布日期</SelectItem>
                  <SelectItem value="name">名称</SelectItem>
                  <SelectItem value="vram">显存容量</SelectItem>
                  <SelectItem value="clock">频率</SelectItem>
                  <SelectItem value="price">价格</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="icon"
                className="bg-[#2c3e50] text-white border-gray-700"
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              >
                <ArrowUpDown className={`h-4 w-4 ${sortOrder === "asc" ? "rotate-180" : ""}`} />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {sortedGraphicsCards.length > 0 ? (
              sortedGraphicsCards.map((card) => (
                <Card key={card.id} className="bg-[#2c3e50] text-white overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="p-4 flex items-center justify-center md:w-32">
                      <div className="relative w-20 h-20 flex items-center justify-center bg-gray-800 rounded-full">
                        <MonitorSmartphone className="h-10 w-10 text-[#3498db]" />
                      </div>
                    </div>
                    <CardContent className="flex-1 p-4 md:p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-xl font-bold">{card.name}</h3>
                            <Badge
                              className={`
                              ${card.type === "gaming" ? "bg-[#3498db]" : ""}
                              ${card.type === "professional" ? "bg-[#9b59b6]" : ""}
                              ${card.type === "entry" ? "bg-[#27ae60]" : ""}
                            `}
                            >
                              {card.type === "gaming" ? "游戏" : card.type === "professional" ? "专业" : "入门"}
                            </Badge>
                          </div>
                          <p className="text-gray-300 mt-1">
                            {card.architecture} | {card.interface}
                          </p>
                        </div>
                        <div className="text-xl font-bold text-[#3498db]">¥{card.price}</div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div>
                          <p className="text-gray-400 text-sm">显存</p>
                          <p className="font-medium">
                            {card.vram}GB {card.vramType}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">加速频率</p>
                          <p className="font-medium">{card.boostClock}GHz</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">制程工艺</p>
                          <p className="font-medium">{card.lithography}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">TDP</p>
                          <p className="font-medium">{card.tdp}W</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <div className="text-sm text-gray-400">
                          发布日期: {new Date(card.releaseDate).toLocaleDateString()}
                        </div>
                        <Button variant="outline" className="border-gray-600 hover:bg-gray-700">
                          查看详情 <Info className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="bg-[#2c3e50] text-white p-8 text-center">
                <p>没有找到符合条件的显卡</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
