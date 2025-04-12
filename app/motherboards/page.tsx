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
import { CircuitBoard, Info, ArrowUpDown } from "lucide-react"

// 模拟主板数据
const motherboards = [
  // Intel主板
  {
    id: 1,
    name: "ASUS ROG Maximus Z790 Hero",
    type: "intel",
    socket: "LGA 1700",
    chipset: "Z790",
    memorySlots: 4,
    maxMemory: 128,
    memoryType: "DDR5",
    pciSlots: 3,
    m2Slots: 5,
    price: 4999,
    releaseDate: "2022-10-20",
    formFactor: "ATX",
    manufacturer: "ASUS",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "MSI MPG Z790 Gaming Edge WiFi",
    type: "intel",
    socket: "LGA 1700",
    chipset: "Z790",
    memorySlots: 4,
    maxMemory: 128,
    memoryType: "DDR5",
    pciSlots: 3,
    m2Slots: 4,
    price: 2899,
    releaseDate: "2022-10-20",
    formFactor: "ATX",
    manufacturer: "MSI",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Gigabyte Z790 AORUS Elite AX",
    type: "intel",
    socket: "LGA 1700",
    chipset: "Z790",
    memorySlots: 4,
    maxMemory: 128,
    memoryType: "DDR5",
    pciSlots: 3,
    m2Slots: 4,
    price: 2699,
    releaseDate: "2022-10-20",
    formFactor: "ATX",
    manufacturer: "Gigabyte",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "ASRock B760M Pro RS/D4",
    type: "intel",
    socket: "LGA 1700",
    chipset: "B760",
    memorySlots: 4,
    maxMemory: 128,
    memoryType: "DDR4",
    pciSlots: 2,
    m2Slots: 2,
    price: 899,
    releaseDate: "2023-01-03",
    formFactor: "Micro-ATX",
    manufacturer: "ASRock",
    image: "/placeholder.svg?height=100&width=100",
  },

  // AMD主板
  {
    id: 5,
    name: "ASUS ROG Crosshair X670E Hero",
    type: "amd",
    socket: "AM5",
    chipset: "X670E",
    memorySlots: 4,
    maxMemory: 128,
    memoryType: "DDR5",
    pciSlots: 3,
    m2Slots: 5,
    price: 5299,
    releaseDate: "2022-09-27",
    formFactor: "ATX",
    manufacturer: "ASUS",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 6,
    name: "MSI MPG X670E Carbon WiFi",
    type: "amd",
    socket: "AM5",
    chipset: "X670E",
    memorySlots: 4,
    maxMemory: 128,
    memoryType: "DDR5",
    pciSlots: 3,
    m2Slots: 4,
    price: 3899,
    releaseDate: "2022-09-27",
    formFactor: "ATX",
    manufacturer: "MSI",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 7,
    name: "Gigabyte B650 AORUS Elite AX",
    type: "amd",
    socket: "AM5",
    chipset: "B650",
    memorySlots: 4,
    maxMemory: 128,
    memoryType: "DDR5",
    pciSlots: 2,
    m2Slots: 3,
    price: 1999,
    releaseDate: "2022-10-10",
    formFactor: "ATX",
    manufacturer: "Gigabyte",
    image: "/placeholder.svg?height=100&width=100",
  },

  // ITX主板
  {
    id: 8,
    name: "ASUS ROG Strix Z790-I Gaming WiFi",
    type: "itx",
    socket: "LGA 1700",
    chipset: "Z790",
    memorySlots: 2,
    maxMemory: 64,
    memoryType: "DDR5",
    pciSlots: 1,
    m2Slots: 2,
    price: 3499,
    releaseDate: "2022-10-20",
    formFactor: "Mini-ITX",
    manufacturer: "ASUS",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 9,
    name: "Gigabyte B650I AORUS Pro AX",
    type: "itx",
    socket: "AM5",
    chipset: "B650",
    memorySlots: 2,
    maxMemory: 64,
    memoryType: "DDR5",
    pciSlots: 1,
    m2Slots: 2,
    price: 2299,
    releaseDate: "2022-10-10",
    formFactor: "Mini-ITX",
    manufacturer: "Gigabyte",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 10,
    name: "ASRock B650E PG-ITX WiFi",
    type: "itx",
    socket: "AM5",
    chipset: "B650E",
    memorySlots: 2,
    maxMemory: 64,
    memoryType: "DDR5",
    pciSlots: 1,
    m2Slots: 2,
    price: 2099,
    releaseDate: "2022-10-10",
    formFactor: "Mini-ITX",
    manufacturer: "ASRock",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function MotherboardsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [sortBy, setSortBy] = useState("releaseDate")
  const [sortOrder, setSortOrder] = useState("desc")
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    manufacturers: [] as string[],
    memoryTypes: [] as string[],
    formFactors: [] as string[],
    minPrice: 0,
    maxPrice: 6000,
  })

  // 过滤主板
  const filteredMotherboards = motherboards.filter((motherboard) => {
    // 类型过滤
    if (activeTab !== "all" && motherboard.type !== activeTab) {
      return false
    }

    // 搜索过滤
    if (searchQuery && !motherboard.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    // 制造商过滤
    if (filters.manufacturers.length > 0 && !filters.manufacturers.includes(motherboard.manufacturer)) {
      return false
    }

    // 内存类型过滤
    if (filters.memoryTypes.length > 0 && !filters.memoryTypes.includes(motherboard.memoryType)) {
      return false
    }

    // 板型过滤
    if (filters.formFactors.length > 0 && !filters.formFactors.includes(motherboard.formFactor)) {
      return false
    }

    // 价格过滤
    if (motherboard.price < filters.minPrice || motherboard.price > filters.maxPrice) {
      return false
    }

    return true
  })

  // 排序主板
  const sortedMotherboards = [...filteredMotherboards].sort((a, b) => {
    let comparison = 0

    switch (sortBy) {
      case "name":
        comparison = a.name.localeCompare(b.name)
        break
      case "price":
        comparison = a.price - b.price
        break
      case "m2Slots":
        comparison = a.m2Slots - b.m2Slots
        break
      case "memorySlots":
        comparison = a.memorySlots - b.memorySlots
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

  // 处理内存类型过滤器变化
  const handleMemoryTypeChange = (memoryType: string) => {
    setFilters((prev) => {
      const memoryTypes = prev.memoryTypes.includes(memoryType)
        ? prev.memoryTypes.filter((m) => m !== memoryType)
        : [...prev.memoryTypes, memoryType]

      return { ...prev, memoryTypes }
    })
  }

  // 处理板型过滤器变化
  const handleFormFactorChange = (formFactor: string) => {
    setFilters((prev) => {
      const formFactors = prev.formFactors.includes(formFactor)
        ? prev.formFactors.filter((f) => f !== formFactor)
        : [...prev.formFactors, formFactor]

      return { ...prev, formFactors }
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">主板</h1>
          <p className="text-gray-300 mt-1">浏览和比较各类主板的详细规格</p>
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="搜索主板..."
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
                {["ASUS", "MSI", "Gigabyte", "ASRock"].map((manufacturer) => (
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
              <h3 className="font-medium">内存类型</h3>
              <div className="space-y-2">
                {["DDR4", "DDR5"].map((memoryType) => (
                  <div key={memoryType} className="flex items-center space-x-2">
                    <Checkbox
                      id={`memory-${memoryType}`}
                      checked={filters.memoryTypes.includes(memoryType)}
                      onCheckedChange={() => handleMemoryTypeChange(memoryType)}
                      className="border-gray-500 data-[state=checked]:bg-[#3498db] data-[state=checked]:border-[#3498db]"
                    />
                    <Label htmlFor={`memory-${memoryType}`} className="text-white">
                      {memoryType}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">板型</h3>
              <div className="space-y-2">
                {["ATX", "Micro-ATX", "Mini-ITX"].map((formFactor) => (
                  <div key={formFactor} className="flex items-center space-x-2">
                    <Checkbox
                      id={`form-${formFactor}`}
                      checked={filters.formFactors.includes(formFactor)}
                      onCheckedChange={() => handleFormFactorChange(formFactor)}
                      className="border-gray-500 data-[state=checked]:bg-[#3498db] data-[state=checked]:border-[#3498db]"
                    />
                    <Label htmlFor={`form-${formFactor}`} className="text-white">
                      {formFactor}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">价格范围 (¥)</h3>
              <div className="flex justify-between text-sm text-gray-300">
                <span>{filters.minPrice}</span>
                <span>{filters.maxPrice}</span>
              </div>
              <Slider
                defaultValue={[0, 6000]}
                min={0}
                max={6000}
                step={100}
                value={[filters.minPrice, filters.maxPrice]}
                onValueChange={(value) => setFilters((prev) => ({ ...prev, minPrice: value[0], maxPrice: value[1] }))}
                className="mt-2"
              />
            </div>

            <Button
              variant="outline"
              className="w-full mt-4 border-gray-600 text-white hover:bg-gray-700"
              onClick={() =>
                setFilters({
                  manufacturers: [],
                  memoryTypes: [],
                  formFactors: [],
                  minPrice: 0,
                  maxPrice: 6000,
                })
              }
            >
              重置筛选
            </Button>
          </CardContent>
        </Card>

        {/* 主板列表 */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
              <TabsList className="bg-[#2c3e50] grid w-full grid-cols-4">
                <TabsTrigger value="all" className="data-[state=active]:bg-[#3498db]">
                  全部
                </TabsTrigger>
                <TabsTrigger value="intel" className="data-[state=active]:bg-[#3498db]">
                  Intel主板
                </TabsTrigger>
                <TabsTrigger value="amd" className="data-[state=active]:bg-[#3498db]">
                  AMD主板
                </TabsTrigger>
                <TabsTrigger value="itx" className="data-[state=active]:bg-[#3498db]">
                  ITX主板
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
                  <SelectItem value="price">价格</SelectItem>
                  <SelectItem value="m2Slots">M.2插槽数</SelectItem>
                  <SelectItem value="memorySlots">内存插槽数</SelectItem>
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
            {sortedMotherboards.length > 0 ? (
              sortedMotherboards.map((motherboard) => (
                <Card key={motherboard.id} className="bg-[#2c3e50] text-white overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="p-4 flex items-center justify-center md:w-32">
                      <div className="relative w-20 h-20 flex items-center justify-center bg-gray-800 rounded-full">
                        <CircuitBoard className="h-10 w-10 text-[#3498db]" />
                      </div>
                    </div>
                    <CardContent className="flex-1 p-4 md:p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-xl font-bold">{motherboard.name}</h3>
                            <Badge
                              className={`
                              ${motherboard.type === "intel" ? "bg-[#3498db]" : ""}
                              ${motherboard.type === "amd" ? "bg-[#e74c3c]" : ""}
                              ${motherboard.type === "itx" ? "bg-[#27ae60]" : ""}
                            `}
                            >
                              {motherboard.type === "intel" ? "Intel" : motherboard.type === "amd" ? "AMD" : "ITX"}
                            </Badge>
                          </div>
                          <p className="text-gray-300 mt-1">
                            {motherboard.socket} | {motherboard.chipset}
                          </p>
                        </div>
                        <div className="text-xl font-bold text-[#3498db]">¥{motherboard.price}</div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div>
                          <p className="text-gray-400 text-sm">内存</p>
                          <p className="font-medium">
                            {motherboard.memorySlots}槽 {motherboard.maxMemory}GB {motherboard.memoryType}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">扩展槽</p>
                          <p className="font-medium">
                            PCIe x16: {motherboard.pciSlots} | M.2: {motherboard.m2Slots}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">板型</p>
                          <p className="font-medium">{motherboard.formFactor}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">制造商</p>
                          <p className="font-medium">{motherboard.manufacturer}</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <div className="text-sm text-gray-400">
                          发布日期: {new Date(motherboard.releaseDate).toLocaleDateString()}
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
                <p>没有找到符合条件的主板</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
