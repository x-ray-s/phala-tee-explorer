interface AppData {
    app: {
        id: string
        compose: string
        cert_chain: string[],
        source_urls: string[]
    }
    worker_info: {
        id: string
        cpu: string
        cores: number
        memory: string
        disk: string
    }
    eventlog: {
        imr: number
        type: string
        algorithm: number
        digest: string
        event: string
    }[]
    ra: string
}

type KMSBody = {
    id: string
    cert: string
    ra: string
}
type KMSParentBody = {
    code: string
    contract: string
    scan_url: string
    root_key: string
    compose: string
}

interface KMS {
    kms: KMSBody
    parent: KMSParentBody
}