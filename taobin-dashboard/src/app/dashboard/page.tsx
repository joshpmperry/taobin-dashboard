'use client';
import Link from "next/link"
import {
  ArrowUpRight,
} from "lucide-react"


import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import AnalysticCard from "@/components/composite/analystic-card"
import { useEffect, useState } from "react"
import DashTable from "@/components/composite/dash-table";
import RecentSales from "@/components/composite/dash-sales-total";




export default function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const page = searchParams['page'] ?? '1'
  const per_page = searchParams['per_page'] ?? '5'

  const [data, setData] = useState([]);

  
  useEffect(()=>{
    fetch('http://localhost:5050/machine?isActive=1')
    .then(res => {
      return res.json();
    })
    .then(fetchdata => {
      setData(fetchdata);
    })
  }, []);

  const start = (Number(page) - 1) * Number(per_page) 
  const end = start + Number(per_page) 

  const entries = data.slice(start, end)

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <AnalysticCard/>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2 ">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Vending Machines</CardTitle>
                <CardDescription>
                  Recent sales and uptime of vending machines
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="/status">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID-Location</TableHead>
                    <TableHead className="text-right">Sales</TableHead>
                    <TableHead className="text-right">Alert</TableHead>
                    <TableHead className="text-right">Uptime</TableHead>
                    <TableHead className="text-right">Last maintenance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                {entries.map((entry, index) => ( <DashTable machine={entry}/> ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <RecentSales searchParams={{}}/>
          </Card>
        </div>
      </main>
    </div>
  )
}
