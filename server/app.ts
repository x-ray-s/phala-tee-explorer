import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import report from './report.json'
const app = new Hono()


app.onError((err, c) => {
    console.error(err)
    return c.text(err.message, 500)
})
type AppBody = {
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
app.get('/', async (c) => {

    const body: AppBody = {
        app: {
            id: report.app_info.metadata.id,
            compose: report.app_info.metadata.compose,
            cert_chain: report.app_info.cert_chain,
            source_urls: report.app_info.source_urls
        },
        worker_info: {
            id: report.worker_info.id,
            cpu: report.worker_info.cpu,
            cores: report.worker_info.cores,
            memory: report.worker_info.memory,
            disk: report.worker_info.disk
        },
        eventlog: report.attestation.eventlog,
        ra: report.attestation.tdx_quote
    }
    return c.json(body)
})

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

app.get('/kms', async (c) => {
    const body: KMSBody = {
        id: '86775665cfa5cd3889e6cf2005ea7928d35f8a27a7cbe3b8d4da3a3bb9220116',
        cert: report.app_info.cert_chain[1],
        ra: report.attestation.tdx_quote
    }
    const parent: KMSParentBody = {
        code: 'https://github.com/Phala-Network/dstack',
        contract: '0x075ecc2685ba06ef4797e252b4b4f8830fa09b79d20d0de5c6e8fac4a42b8e65',
        scan_url: '',
        root_key: `MIIBljCCAT2gAwIBAgIUGv6/AdOVIGQHcK8ZwBKS+0ZEqyowCgYIKoZIzj0EAwIw
LzEWMBQGA1UECgwNUGhhbGEgTmV0d29yazEVMBMGA1UEAwwMUGhhbGEgS01TIENB
MCAXDTc1MDEwMTAwMDAwMFoYDzQwOTYwMTAxMDAwMDAwWjAvMRYwFAYDVQQKDA1Q
aGFsYSBOZXR3b3JrMRUwEwYDVQQDDAxQaGFsYSBLTVMgQ0EwWTATBgcqhkjOPQIB
BggqhkjOPQMBBwNCAASUyNiol6k9RUS4TbzeH7ANGzSf48TABUK2wx0YlbfVUMrS
ilenXF6LK6b5p+I4urTxqSdMvwLKEpq4Mx80ua6xozUwMzAdBgNVHQ4EFgQURMj7
U7lrIUBgAx19PbEZhnjFfR8wEgYDVR0TAQH/BAgwBgEB/wIBAzAKBggqhkjOPQQD
AgNHADBEAiBPXN6mKpGk+sE0RtfrcEuhelELVH7bbAZW/keJimiZawIgVGAXqBi4
b6iaq1eTtIuu2iaqe/mtfXTuTekYQ3JV8kE=`,
        compose: `services:
  web:
    build: .
    ports:
      - "8000:5000"
  redis:
    image: "redis:alpine"`
    }
    return c.json({
        kms: body,
        parent
    })
})

serve(app)
