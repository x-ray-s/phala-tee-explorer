import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Code, CodeDownload } from "@/components/Code"
import { mask } from "@/lib/utils"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Alert } from "@/components/Alert"
import { ShortId } from "@/components/ShortId"

export function Instances({ data }: { data: AppData }) {
    return <div>
        <h1 className="text-3xl font-bold">Worker Instances</h1>
        <section className="mt-4 border rounded">
            <div className="px-4 py-2 border-b">
                <h2 className="text-lg font-bold">Overview</h2>
            </div>
            <div className="p-4 grid grid-cols-1 gap-4">
                <div className="grid grid-cols-[200px,1fr] items-center">
                    <div className="text-sm text-gray-500">Worker ID</div>
                    <div className="">86775665cfa5cd3889e6cf2005ea7928d35f8a27a7cbe3b8d4da3a3bb9220116</div>
                </div>



                <div className="border-b"></div>

                <div className="grid grid-cols-[200px,1fr] items-center">
                    <div className="text-sm text-gray-500">CPU</div>
                    <div className="">Intel(R) Xeon(R) Gold 6240</div>
                </div>
                <div className="grid grid-cols-[200px,1fr] items-center">
                    <div className="text-sm text-gray-500">Cores</div>
                    <div className="">8</div>
                </div>
                <div className="grid grid-cols-[200px,1fr] items-center">
                    <div className="text-sm text-gray-500">Memory</div>
                    <div className="">8G</div>
                </div>
                <div className="grid grid-cols-[200px,1fr] items-center">
                    <div className="text-sm text-gray-500">Disk</div>
                    <div className="">100G</div>
                </div>
                <div className="grid grid-cols-[200px,1fr] items-center">
                    <div className="text-sm text-gray-500">Arch</div>
                    <div className="">x86_64</div>
                </div>
                <div className="grid grid-cols-[200px,1fr] items-center">
                    <div className="text-sm text-gray-500">Kernel</div>
                    <div className="">5.15.0-76-generic</div>
                </div>
                {
                    data?.eventlog?.length > 0 &&
                    <Logs logs={data?.eventlog} />
                }

                <div className="grid grid-cols-[200px,1fr] items-center">
                    <div className="text-sm text-gray-500">RA</div>
                    <div>
                        <CodeDownload filename="quote" value={data?.ra} />
                    </div>
                </div>

                <div className="border-b"></div>
                <div className="flex gap-2">
                    <Alert>
                        <Alert.Trigger>
                            <Button>Verify RA</Button>
                        </Alert.Trigger>
                        <Alert.Content title="Verify RA">
                            <VerifyRA />
                        </Alert.Content>
                    </Alert>
                </div>
            </div>
        </section>
    </div>
}

function Logs({ logs }: { logs: AppData['eventlog'] }) {

    const [isRaw, setIsRaw] = useState(false)

    if (logs.length === 0) return null

    return <>
        <div className="border-b"></div>
        <div className="grid grid-cols-[200px,1fr] ">
            <div className="text-sm text-gray-500">Event Logs</div>
            <div>
                {
                    isRaw ? (
                        <Textarea className="resize-none" value={JSON.stringify(logs)} rows={10} readOnly={true} />
                    ) : (
                        <div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Event</TableHead>
                                        <TableHead>Digest</TableHead>
                                        <TableHead>IMR</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead className="text-right">Algorithm</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {logs?.map((log) => (
                                        <TableRow key={log.event}>
                                            <TableCell className="font-medium">
                                                <ShortId value={log.event} />
                                            </TableCell>
                                            <TableCell>
                                                <ShortId value={log.digest} />
                                            </TableCell>
                                            <TableCell>{log.imr}</TableCell>
                                            <TableCell>{log.type}</TableCell>
                                            <TableCell className="text-right">{log.algorithm}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )
                }

                <Button className="mt-3" variant="outline" onClick={() => setIsRaw(!isRaw)}>
                    {isRaw ? 'Table View' : 'Raw Data'}
                </Button>
            </div>
        </div>
    </>
}


function VerifyRA() {

    return <div className="mt-2">
        <div className="space-y-4">
            <div>
                <div className="text-black text-sm font-semibold">1. Download RA</div>
            </div>
            <div>
                <div className="text-black text-sm font-semibold">2. Clone the <a href="https://github.com/Phala-Network/dcap-qvl" target="_blank" className="text-blue-500">repo</a></div>
            </div>
            <div>
                <div className="text-black text-sm font-semibold">3. Verify Quote</div>
            </div>
        </div>
    </div>
}