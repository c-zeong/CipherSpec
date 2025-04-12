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
import { Cpu, Info, ArrowUpDown } from "lucide-react"

// 模拟处理器数据
const processors = [
  // 电脑处理器
  {
    id: 1,
    name: "Intel Core i9-14900K",
    type: "desktop",
    cores: 24,
    threads: 32,
    baseFrequency: 3.2,
    boostFrequency: 6.0,
    tdp: 125,
    price: 3999,
    releaseDate: "2023-10-17",
    architecture: "Raptor Lake Refresh",
    socket: "LGA 1700",
    lithography: "Intel 7 (10nm)",
    manufacturer: "Intel",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "AMD Ryzen 9 7950X3D",
    type: "desktop",
    cores: 16,
    threads: 32,
    baseFrequency: 4.2,
    boostFrequency: 5.7,
    tdp: 120,
    price: 4599,
    releaseDate: "2023-02-28",
    architecture: "Zen 4 3D V-Cache",
    socket: "AM5",
    lithography: "TSMC 5nm",
    manufacturer: "AMD",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Intel Core i7-14700K",
    type: "desktop",
    cores: 20,
    threads: 28,
    baseFrequency: 3.4,
    boostFrequency: 5.6,
    tdp: 125,
    price: 2899,
    releaseDate: "2023-10-17",
    architecture: "Raptor Lake Refresh",
    socket: "LGA 1700",
    lithography: "Intel 7 (10nm)",
    manufacturer: "Intel",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "AMD Ryzen 7 7800X3D",
    type: "desktop",
    cores: 8,
    threads: 16,
    baseFrequency: 4.2,
    boostFrequency: 5.0,
    tdp: 120,
    price: 2999,
    releaseDate: "2023-04-06",
    architecture: "Zen 4 3D V-Cache",
    socket: "AM5",
    lithography: "TSMC 5nm",
    manufacturer: "AMD",
    image: "/placeholder.svg?height=100&width=100",
  },

  // 手机处理器
  {
    id: 5,
    name: "Apple A17 Pro",
    type: "mobile",
    cores: 6,
    threads: 6,
    baseFrequency: 2.0,
    boostFrequency: 3.78,
    tdp: 5,
    price: null,
    releaseDate: "2023-09-12",
    architecture: "ARMv8",
    socket: "SoC",
    lithography: "TSMC 3nm",
    manufacturer: "Apple",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 6,
    name: "Qualcomm Snapdragon 8 Gen 3",
    type: "mobile",
    cores: 8,
    threads: 8,
    baseFrequency: 2.3,
    boostFrequency: 3.3,
    tdp: 5,
    price: null,
    releaseDate: "2023-10-24",
    architecture: "ARMv9",
    socket: "SoC",
    lithography: "TSMC 4nm",
    manufacturer: "Qualcomm",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 7,
    name: "MediaTek Dimensity 9300",
    type: "mobile",
    cores: 8,
    threads: 8,
    baseFrequency: 2.0,
    boostFrequency: 3.25,
    tdp: 5,
    price: null,
    releaseDate: "2023-11-06",
    architecture: "ARMv9",
    socket: "SoC",
    lithography: "TSMC 4nm",
    manufacturer: "MediaTek",
    image: "/placeholder.svg?height=100&width=100",
  },

  // 服务器处理器
  {
    id: 8,
    name: "AMD EPYC 9654",
    type: "server",
    cores: 96,
    threads: 192,
    baseFrequency: 2.4,
    boostFrequency: 3.7,
    tdp: 360,
    price: 45000,
    releaseDate: "2022-11-10",
    architecture: "Zen 4",
    socket: "SP5",
    lithography: "TSMC 5nm",
    manufacturer: "AMD",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 9,
    name: "Intel Xeon Platinum 8480+",
    type: "server",
    cores: 56,
    threads: 112,
    baseFrequency: 2.0,
    boostFrequency: 3.8,
    tdp: 350,
    price: 42000,
    releaseDate: "2023-01-10",
    architecture: "Sapphire Rapids",
    socket: "LGA 4677",
    lithography: "Intel 7 (10nm)",
    manufacturer: "Intel",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 10,
    name: "AMD EPYC 9374F",
    type: "server",
    cores: 32,
    threads: 64,
    baseFrequency: 3.85,
    boostFrequency: 4.8,
    tdp: 320,
    price: 22000,
    releaseDate: "2022-11-10",
    architecture: "Zen 4",
    socket: "SP5",
    lithography: "TSMC 5nm",
    manufacturer: "AMD",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function ProcessorsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [sortBy, setSortBy] = useState("releaseDate")
  const [sortOrder, setSortOrder] = useState("desc")
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    manufacturers: [] as string[],
    minCores: 0,
    maxCores: 100,
    minFrequency: 0,
    maxFrequency: 7,
  })

  // 过滤处理器
  const filteredProcessors = processors.filter((processor) => {
    // 类型过滤
    if (activeTab !== "all" && processor.type !== activeTab) {
      return false
    }

    // 搜索过滤
    if (searchQuery && !processor.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    // 制造商过滤
    if (filters.manufacturers.length > 0 && !filters.manufacturers.includes(processor.manufacturer)) {
      return false
    }

    // 核心数过滤
    if (processor.cores < filters.minCores || processor.cores > filters.maxCores) {
      return false
    }

    // 频率过滤
    if (processor.boostFrequency < filters.minFrequency || processor.boostFrequency > filters.maxFrequency) {
      return false
    }

    return true
  })

  // 排序处理器
  const sortedProcessors = [...filteredProcessors].sort((a, b) => {
    let comparison = 0

    switch (sortBy) {
      case "name":
        comparison = a.name.localeCompare(b.name)
        break
      case "cores":
        comparison = a.cores - b.cores
        break
      case "frequency":
        comparison = a.boostFrequency - b.boostFrequency
        break
      case "price":
        // 处理价格可能为null的情况
        if (a.price === null && b.price === null) comparison = 0
        else if (a.price === null) comparison = 1
        else if (b.price === null) comparison = -1
        else comparison = a.price - b.price
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
          <h1 className="text-3xl font-bold text-white">处理器</h1>
          <p className="text-gray-300 mt-1">浏览和比较各类处理器的详细规格</p>
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="搜索处理器..."
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
                {["Intel", "AMD", "Apple", "Qualcomm", "MediaTek"].map((manufacturer) => (
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
              <h3 className="font-medium">核心数</h3>
              <div className="flex justify-between text-sm text-gray-300">
                <span>{filters.minCores}</span>
                <span>{filters.maxCores}+</span>
              </div>
              <Slider
                defaultValue={[0, 100]}
                max={100}
                step={1}
                value={[filters.minCores, filters.maxCores]}
                onValueChange={(value) => setFilters((prev) => ({ ...prev, minCores: value[0], maxCores: value[1] }))}
                className="mt-2"
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">最高频率 (GHz)</h3>
              <div className="flex justify-between text-sm text-gray-300">
                <span>{filters.minFrequency.toFixed(1)}</span>
                <span>{filters.maxFrequency.toFixed(1)}</span>
              </div>
              <Slider
                defaultValue={[0, 7]}
                min={0}
                max={7}
                step={0.1}
                value={[filters.minFrequency, filters.maxFrequency]}
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, minFrequency: value[0], maxFrequency: value[1] }))
                }
                className="mt-2"
              />
            </div>

            <Button
              variant="outline"
              className="w-full mt-4 border-gray-600 text-white hover:bg-gray-700"
              onClick={() =>
                setFilters({
                  manufacturers: [],
                  minCores: 0,
                  maxCores: 100,
                  minFrequency: 0,
                  maxFrequency: 7,
                })
              }
            >
              重置筛选
            </Button>
          </CardContent>
        </Card>

        {/* 处理器列表 */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
              <TabsList className="bg-[#2c3e50] grid w-full grid-cols-3">
                <TabsTrigger value="all" className="data-[state=active]:bg-[#3498db]">
                  全部
                </TabsTrigger>
                <TabsTrigger value="desktop" className="data-[state=active]:bg-[#3498db]">
                  电脑处理器
                </TabsTrigger>
                <TabsTrigger value="mobile" className="data-[state=active]:bg-[#3498db]">
                  手机处理器
                </TabsTrigger>
                <TabsTrigger value="server" className="data-[state=active]:bg-[#3498db]">
                  服务器处理器
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
                  <SelectItem value="cores">核心数</SelectItem>
                  <SelectItem value="frequency">频率</SelectItem>
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
            {sortedProcessors.length > 0 ? (
              sortedProcessors.map((processor) => (
                <Card key={processor.id} className="bg-[#2c3e50] text-white overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="p-4 flex items-center justify-center md:w-32">
                      <div className="relative w-20 h-20 flex items-center justify-center bg-gray-800 rounded-full">
                        <Cpu className="h-10 w-10 text-[#3498db]" />
                      </div>
                    </div>
                    <CardContent className="flex-1 p-4 md:p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-xl font-bold">{processor.name}</h3>
                            <Badge
                              className={`
                              ${processor.type === "desktop" ? "bg-[#3498db]" : ""}
                              ${processor.type === "mobile" ? "bg-[#f1c40f] text-black" : ""}
                              ${processor.type === "server" ? "bg-[#e74c3c]" : ""}
                            `}
                            >
                              {processor.type === "desktop" ? "电脑" : processor.type === "mobile" ? "手机" : "服务器"}
                            </Badge>
                          </div>
                          <p className="text-gray-300 mt-1">
                            {processor.architecture} | {processor.socket}
                          </p>
                        </div>
                        {processor.price && <div className="text-xl font-bold text-[#3498db]">¥{processor.price}</div>}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div>
                          <p className="text-gray-400 text-sm">核心/线程</p>
                          <p className="font-medium">
                            {processor.cores}核 {processor.threads}线程
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">基础/加速频率</p>
                          <p className="font-medium">
                            {processor.baseFrequency}GHz / {processor.boostFrequency}GHz
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">制程工艺</p>
                          <p className="font-medium">{processor.lithography}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">TDP</p>
                          <p className="font-medium">{processor.tdp}W</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <div className="text-sm text-gray-400">
                          发布日期: {new Date(processor.releaseDate).toLocaleDateString()}
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
                <p>没有找到符合条件的处理器</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
