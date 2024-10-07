"use client";
import { Metadata } from "next"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Overview } from "@/components/overview"
import StateSwitcher from "@/components/state-switcher"
import { Component as RadarChart } from "@/components/radar_chart"
import StatCard from "@/components/stat-chart"
import EarthWrapper from "@/components/earth-wrapper"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DashboardPage() {
  // Move the useState hook inside the component function
  const [carbonReductionRate, setCarbonReductionRate] = useState(0);

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/dashboard-light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <Image
          src="/examples/dashboard-dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4 mx-4">
            <StateSwitcher />
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <Button>Download</Button>
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="simulator">
                Simulator
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Mean" amount="14" units="tonne CO₂/km²" />
                <StatCard title="Min" amount="0.8" units="tonne CO₂/km²" />
                <StatCard title="Max" amount="100" units="tonne CO₂/km²" />
                <StatCard title="Total Points" amount="110643" units="" />
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
                <RadarChart />
              </div>
            </TabsContent>
            <TabsContent value="simulator" className="space-y-4">
              {/* Added margin between left and right content */}
              <div className="flex gap-8">
                <Card className="w-1/2 h-[500px]">
                  <CardHeader>
                    <CardTitle>Disaster prediction</CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center items-center h-full">
                    <div className="w-full">
                      <Select onValueChange={(value) => setCarbonReductionRate(parseFloat(value))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a carbon reduction rate" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0.1">10%</SelectItem>
                          <SelectItem value="0.15">15%</SelectItem>
                          <SelectItem value="0.2">20%</SelectItem>
                          <SelectItem value="0.25">25%</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="mt-4 w-full h-full text-size-20">
                        You have selected a carbon reduction rate of {carbonReductionRate * 100}%.
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="w-1/2 h-[500px]">
                  <CardHeader>
                    <CardTitle>Earth Simulator</CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center items-center h-full">
                    {/* EarthWrapper frame */}
                    <div className="w-full h-full border border-gray-300 rounded-lg overflow-hidden">
                      <EarthWrapper earthType="normal" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
