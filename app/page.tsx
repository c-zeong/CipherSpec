import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, Cpu, HardDrive, Laptop, BarChart3, TrendingUp, Snowflake } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="h-[calc(100vh-76px)] flex flex-col">
      <div className="grid grid-cols-12 grid-rows-6 gap-6 flex-grow">
        {/* 热门趋势卡片 - 不规则形状 - 占据两行高度 */}
        <div className="col-span-4 row-span-6 bg-[#e74c3c] text-white rounded-[32px] overflow-hidden relative">
          {/* 不规则形状的切角，使用圆角 */}
          <div
            className="absolute top-0 right-0 w-24 h-24 bg-[#1e2942]"
            style={{ borderBottomLeftRadius: "32px" }}
          ></div>
          <div className="absolute top-4 right-4 bg-black bg-opacity-20 rounded-full p-2">
            <Snowflake className="h-6 w-6" />
          </div>
          <div className="p-6 h-full flex flex-col relative z-10">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">热门趋势</h2>
              <TrendingUp className="h-6 w-6" />
            </div>
            <p className="text-red-200 text-sm">本周搜索量上升最快</p>

            <div className="space-y-5 mt-8 flex-grow">
              <div className="flex items-center">
                <span className="text-lg font-bold mr-3 text-white">↑</span>
                <div>
                  <h3 className="font-bold">NVIDIA RTX 5000系列</h3>
                  <p className="text-xs text-red-200">搜索量增长 245%</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-lg font-bold mr-3 text-white">↑</span>
                <div>
                  <h3 className="font-bold">Intel Arrow Lake</h3>
                  <p className="text-xs text-red-200">搜索量增长 187%</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-lg font-bold mr-3 text-white">↑</span>
                <div>
                  <h3 className="font-bold">AMD Ryzen 9000系列</h3>
                  <p className="text-xs text-red-200">搜索量增长 156%</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-lg font-bold mr-3 text-white">↑</span>
                <div>
                  <h3 className="font-bold">Apple M4芯片</h3>
                  <p className="text-xs text-red-200">搜索量增长 134%</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-lg font-bold mr-3 text-white">↑</span>
                <div>
                  <h3 className="font-bold">DDR6内存</h3>
                  <p className="text-xs text-red-200">搜索量增长 122%</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-lg font-bold mr-3 text-white">↑</span>
                <div>
                  <h3 className="font-bold">PCIe 6.0接口</h3>
                  <p className="text-xs text-red-200">搜索量增长 118%</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-lg font-bold mr-3 text-white">↑</span>
                <div>
                  <h3 className="font-bold">三星8nm工艺</h3>
                  <p className="text-xs text-red-200">搜索量增长 105%</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-lg font-bold mr-3 text-white">↑</span>
                <div>
                  <h3 className="font-bold">华硕ROG新品</h3>
                  <p className="text-xs text-red-200">搜索量增长 98%</p>
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <Link href="/trends" className="flex items-center text-white hover:underline">
                查看全部 <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* 最新处理器卡片 - 不规则形状 */}
        <div className="col-span-4 row-span-3 bg-[#3498db] text-white rounded-[32px] overflow-hidden relative">
          {/* 不规则形状的切角，使用圆角 */}
          <div
            className="absolute top-0 right-0 w-24 h-24 bg-[#1e2942]"
            style={{ borderBottomLeftRadius: "32px" }}
          ></div>
          <div className="absolute top-4 right-4 bg-black bg-opacity-20 rounded-full p-2">
            <Cpu className="h-6 w-6" />
          </div>
          <div className="p-6 h-full flex flex-col relative z-10">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">最新处理器</h2>
            </div>
            <p className="text-blue-100 text-sm">刚刚发布的顶级CPU</p>

            <div className="space-y-4 mt-4 flex-grow">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold">Intel Core i9-14900K</h3>
                  <p className="text-sm text-blue-100">24核心 / 32线程</p>
                  <p className="text-sm text-blue-100 mt-1">基础频率: 3.2GHz</p>
                  <p className="text-sm text-blue-100">加速频率: 6.0GHz</p>
                </div>
                <Badge className="bg-white text-blue-700">新品</Badge>
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold">AMD Ryzen 9 7950X3D</h3>
                  <p className="text-sm text-blue-100">16核心 / 32线程</p>
                  <p className="text-sm text-blue-100 mt-1">基础频率: 4.2GHz</p>
                  <p className="text-sm text-blue-100">加速频率: 5.7GHz</p>
                </div>
                <Badge className="bg-white text-blue-700">热门</Badge>
              </div>
            </div>

            <div className="mt-auto">
              <Link href="/processors" className="flex items-center text-white hover:underline">
                查看全部 <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* 显卡排行榜卡片 - 规则圆角矩形 */}
        <div className="col-span-4 row-span-3 bg-[#2c3e50] text-white rounded-[32px] overflow-hidden">
          <div className="p-6 h-full flex flex-col">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">显卡性能排行</h2>
              <BarChart3 className="h-6 w-6" />
            </div>
            <p className="text-gray-300 text-sm">基于3DMark跑分</p>

            <div className="space-y-4 mt-4 flex-grow">
              <div className="flex items-center">
                <span className="text-xl font-bold mr-3">1</span>
                <div className="flex-grow">
                  <h3 className="font-bold">NVIDIA RTX 4090</h3>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{ width: "100%" }}></div>
                  </div>
                </div>
                <span className="ml-2 font-mono">35,800</span>
              </div>
              <div className="flex items-center">
                <span className="text-xl font-bold mr-3">2</span>
                <div className="flex-grow">
                  <h3 className="font-bold">AMD RX 7900 XTX</h3>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>
                <span className="ml-2 font-mono">30,400</span>
              </div>
              <div className="flex items-center">
                <span className="text-xl font-bold mr-3">3</span>
                <div className="flex-grow">
                  <h3 className="font-bold">NVIDIA RTX 4080</h3>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{ width: "80%" }}></div>
                  </div>
                </div>
                <span className="ml-2 font-mono">28,600</span>
              </div>
            </div>

            <div className="mt-auto">
              <Link href="/graphics-cards" className="flex items-center text-white hover:underline">
                查看全部 <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* 笔记本电脑推荐卡片 - 规则圆角矩形 */}
        <div className="col-span-4 row-span-3 bg-[#27ae60] text-white rounded-[32px] overflow-hidden">
          <div className="p-6 h-full flex flex-col">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">笔记本电脑推荐</h2>
              <Laptop className="h-6 w-6" />
            </div>
            <p className="text-green-100 text-sm">各价位最佳选择</p>

            <div className="space-y-4 mt-4 flex-grow">
              <div>
                <Badge className="mb-2 bg-white text-green-700">高性能</Badge>
                <h3 className="font-bold">MacBook Pro 16" M3 Max</h3>
                <p className="text-sm text-green-100">最佳创意工作站</p>
                <div className="flex items-center mt-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-4 h-4 text-yellow-300 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs ml-1 text-green-100">(92)</span>
                </div>
              </div>
              <div>
                <Badge className="mb-2 bg-white text-green-700">性价比</Badge>
                <h3 className="font-bold">ASUS ROG Zephyrus G14</h3>
                <p className="text-sm text-green-100">最佳游戏本</p>
                <div className="flex items-center mt-1">
                  <div className="flex">
                    {[1, 2, 3, 4].map((star) => (
                      <svg key={star} className="w-4 h-4 text-yellow-300 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                      </svg>
                    ))}
                    <svg className="w-4 h-4 text-green-100 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                    </svg>
                  </div>
                  <span className="text-xs ml-1 text-green-100">(78)</span>
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <Link href="/laptops" className="flex items-center text-white hover:underline">
                查看全部 <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* 硬盘性价比卡片 - 规则圆角矩形 */}
        <div className="col-span-4 row-span-3 bg-[#9b59b6] text-white rounded-[32px] overflow-hidden">
          <div className="p-6 h-full flex flex-col">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">硬盘性价比排行</h2>
              <HardDrive className="h-6 w-6" />
            </div>
            <p className="text-purple-200 text-sm">每GB价格最低的SSD</p>

            <div className="space-y-3 mt-4 flex-grow">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold">Crucial P3 2TB</h3>
                  <p className="text-sm text-purple-200">NVMe PCIe 3.0</p>
                </div>
                <Badge className="bg-white text-purple-700">¥0.35/GB</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold">Samsung 870 EVO 1TB</h3>
                  <p className="text-sm text-purple-200">SATA 2.5"</p>
                </div>
                <Badge className="bg-white text-purple-700">¥0.42/GB</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold">WD Black SN850X 1TB</h3>
                  <p className="text-sm text-purple-200">NVMe PCIe 4.0</p>
                </div>
                <Badge className="bg-white text-purple-700">¥0.55/GB</Badge>
              </div>
            </div>

            <div className="mt-auto">
              <Link href="/storage" className="flex items-center text-white hover:underline">
                查看全部 <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
