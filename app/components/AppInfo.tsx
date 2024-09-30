import { Button } from "@/components/ui/button"
import { Code, Highlight, } from "@/components/Code"
import { Alert } from "@/components/Alert"
import { ShortId } from "@/components/ShortId"
import { decodeBase64, formatPem } from "@/lib/utils"
export function AppInfo({ data, id }: { data: AppData, id: string }) {
    const appLog = data?.eventlog.find(log => log.imr === 3)
    return <div>
        <h1 className="text-3xl font-bold">App Info</h1>
        <section className="mt-4 border rounded">
            <div className="px-4 py-2 border-b">
                <h2 className="text-lg font-bold">Overview</h2>
            </div>
            <div className="p-4 grid grid-cols-1 gap-4">
                <div className="grid grid-cols-[200px,1fr] items-center">
                    <div className="text-sm text-gray-500">App ID</div>
                    <div><ShortId value={id} /></div>
                </div>

                <div className="grid grid-cols-[200px,1fr] ">
                    <div className="text-sm text-gray-500">Compose</div>
                    <Highlight value={decodeBase64(data?.app?.compose)} lang="yml">
                    </Highlight>
                </div>

                <div className="grid grid-cols-[200px,1fr] ">
                    <div className="text-sm text-gray-500">Sources</div>
                    <div>
                        <ul>
                            {data?.app?.source_urls?.map((source, index) => (
                                <li key={index}><a href={source} className="text-blue-600 " title={source} target="_blank">{source}</a></li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-b"></div>

                <div className="grid grid-cols-[200px,1fr] items-center">
                    <div className="text-sm text-gray-500">App Cert</div>
                    <Code download={true} scroll={true} wrap={true} filename="app.pem" value={formatPem(data?.app?.cert_chain[0])}>

                    </Code>
                </div>
                <div className="grid grid-cols-[200px,1fr] items-center">
                    <div className="text-sm text-gray-500">KMS Cert</div>
                    <Code download={true} scroll={true} filename="kms.pem" wrap={true} value={formatPem(data?.app?.cert_chain[1])}></Code>
                </div>
                <div className="border-b"></div>
                <div className="flex gap-2">
                    <Alert>
                        <Alert.Trigger>
                            <Button>Verify App Root Key</Button>
                        </Alert.Trigger>
                        <Alert.Content title="Verify App Root Key">
                            <VerifyAppRootKey />
                        </Alert.Content>
                    </Alert>

                    <Alert>
                        <Alert.Trigger>
                            <Button>Verify App</Button>
                        </Alert.Trigger>
                        <Alert.Content title="Verify App">
                            <VerifyApp log={appLog} />
                        </Alert.Content>
                    </Alert>
                </div>
            </div>
        </section >
    </div >
}

function VerifyAppRootKey() {
    return <div className="pt-4">
        <div className="space-y-4">
            <div>
                <div className="text-black text-sm font-semibold">1. Download App cert and KMS cert</div>
            </div>
            <div className="space-y-2">
                <div className="text-black text-sm font-semibold ">2. Use openssl to verify</div>
                <Code cmd="true">openssl verify -CAfile app.pem kms.pem</Code>
            </div>
        </div>
    </div>
}

function VerifyApp({ log }: { log: AppData['eventlog'][number] }) {
    return <div className="pt-4">
        <div className="space-y-4">
            <div>
                <div className="text-black text-sm font-semibold">Event Logs</div>
                <div className="mt-2">
                    <Code>{log?.digest}</Code>
                </div>
            </div>
            <div>
                <div className="text-black text-sm font-semibold">Decoded Event Logs</div>
                <div className="mt-2">
                    <Code>app_id: 86775665cfa5cd3889e6cf2005ea7928d35f8a27a7cbe3b8d4da3a3bb9220116</Code>
                </div>
            </div>
        </div>
    </div>
}