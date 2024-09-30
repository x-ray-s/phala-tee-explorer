import { Button } from "@/components/ui/button"
import { mask } from "@/lib/utils"
import { Code, Highlight, CodeDownload } from "@/components/Code"
import { Alert } from "@/components/Alert"
import { decodeBase64, formatPem } from "@/lib/utils"
import { ShortId } from "@/components/ShortId"

export function KMS({ data }: { data: KMS }) {

    if (!data) return null

    return <div>
        <h1 className="text-3xl font-bold">KMS Instances</h1>
        <section className="mt-4 border rounded">
            <div className="px-4 py-2 border-b">
                <h2 className="text-lg font-bold">Overview</h2>
            </div>
            <div className="p-4 grid grid-cols-1 gap-4">
                <div className="grid grid-cols-[200px,1fr] items-center">
                    <div className="text-sm text-gray-500">KMS Instance ID</div>
                    <div className="">
                        <ShortId value={data?.kms.id} />
                    </div>
                </div>

                <div className="grid grid-cols-[200px,1fr] items-center">
                    <div className="text-sm text-gray-500">KMS Cert</div>
                    <Code download={true} scroll={true} wrap={true} filename="kms.pem" value={formatPem(data?.kms.cert)}></Code>
                </div>

                <div className="grid grid-cols-[200px,1fr] items-center">
                    <div className="text-sm text-gray-500">RA Report</div>
                    <div>
                        <CodeDownload value={data?.kms.ra} filename="ra.txt" />
                    </div>
                </div>
                <div className="border-b"></div>
                <div>
                    <Alert>
                        <Alert.Trigger>
                            <Button>Verify Public Key</Button>
                        </Alert.Trigger>
                        <Alert.Content title="Verify Public Key">
                            <VerifyPublicKey />
                        </Alert.Content>
                    </Alert>
                </div>
            </div>
        </section>
        <section className="mt-4 border rounded">
            <div className="px-4 py-2 border-b">
                <h2 className="text-lg font-bold">Parent</h2>
            </div>
            <div className="p-4 grid grid-cols-1 gap-4">
                <div className="grid grid-cols-[200px,1fr] items-center">
                    <div className="text-sm text-gray-500">Source Code</div>
                    <div >
                        <a href="" className="text-blue-600 " target="_blank">{data?.parent.code}</a>
                    </div>
                </div>

                <div className="grid grid-cols-[200px,1fr] items-center">
                    <div className="text-sm text-gray-500">Contract Address</div>
                    <div className="">
                        <a href={data?.parent.scan_url} className="text-blue-600 " target="_blank">
                            {mask(data?.parent.contract)}
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-[200px,1fr] items-center">
                    <div className="text-sm text-gray-500">Root Public Key</div>
                    <Code download={true} scroll={true} wrap={true} filename="root.pem" value={formatPem(data?.parent.root_key)}></Code>
                </div>

                <div className="grid grid-cols-[200px,1fr]">
                    <div className="text-sm text-gray-500">Compose</div>
                    <Highlight value={data?.parent.compose} >
                    </Highlight>
                </div>
                <div className="border-b"></div>
                <div>
                    <Alert>
                        <Alert.Trigger>
                            <Button>Verify Root Public Key</Button>
                        </Alert.Trigger>
                        <Alert.Content title="Verify Root Public Key">
                            <VerifyRootPublicKey />
                        </Alert.Content>
                    </Alert>
                </div>
            </div>
        </section>
    </div>
}

function VerifyRootPublicKey() {
    return <div className="mt-2">
        <div className="space-y-4">
            <div>
                <div className="text-black text-sm font-semibold">1. check the signed data on <a href="https://github.com/Phala-Network/dcap-qvl" target="_blank" className="text-blue-500">blockchain</a></div>

            </div>
            <div>
                <div className="text-black text-sm font-semibold">2. the input data includes root public key</div>

            </div>
        </div>
    </div>
}


function VerifyPublicKey() {
    return <div className="mt-2">
        <div className="space-y-4">
            <div>
                <div className="text-black text-sm font-semibold">1. public key can be verified by RA report.</div>
            </div>
            <div className="space-y-2">
                <div className="text-black text-sm font-semibold">2. public key signed by root public key</div>
                <Code cmd="true">openssl verify -CAfile app.pem kms.pem</Code>
            </div>
        </div>
    </div>
}
