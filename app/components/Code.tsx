import { ReactChild, PropsWithChildren, useState } from "react"
import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/github.css';
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { Copy, Check } from "lucide-react"
import { useCopyToClipboard } from "@uidotdev/usehooks";
import dockerfile from 'highlight.js/lib/languages/dockerfile';

export function Code({ children, download = false, cmd = false, filename, value, wrap, scroll = false }: PropsWithChildren<{ wrap?: boolean, download?: boolean, cmd?: boolean, filename?: string, value?: string, scroll?: boolean }>) {

    const wrapClass = wrap ? "flex-1 px-2 whitespace-pre-wrap" : "flex-1 px-2 break-all whitespace-normal"
    const scrollClass = scroll ? "max-h-[200px] overflow-y-scroll" : ""
    const v = children || value
    return <pre className={`border rounded flex p-2 items-baseline flex-wrap ${scrollClass}`}>
        <code className={wrapClass} >{cmd ? "$ " : ""}{v}</code>
        {download && <CodeDownload value={v} variant="ghost" size="xs" className="p-2 mr-2" filename={filename} />}
        <CopyButton value={v} size="xs" />
    </pre>
}

export function Highlight({ value }: { value: string, lang?: string }) {

    hljs.registerLanguage('dockerfile', dockerfile);

    const code = () => {
        return hljs.highlight(
            value,
            {
                language: 'dockerfile'
            }
        ).value
    }

    return <div className="overflow-x-auto rounded-md bg-gray-100 p-2">
        <pre><code className="breal-all whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: code() }}></code></pre>
    </div>
}


export function CodeDownload({ value, filename, ...props }: { value: string, filename: string, [key: string]: any }) {

    const createFile = () => {
        const blob = new Blob([value], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }

    return <Button variant="outline" size="icon" {...props} onClick={createFile}>
        <Download className="w-3 h-3" />
    </Button>
}

export function CopyButton({ value, size = "md" }: { value: string, size: "xs" | "md" }) {
    const [copiedText, copyToClipboard] = useCopyToClipboard();
    const [check, setCheck] = useState(false);

    return <Button variant="ghost" size={size} className="p-2" onClick={() => {
        copyToClipboard(value)
        setCheck(true)
        setTimeout(() => {
            setCheck(false)
        }, 2000)
    }}>
        {check ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
    </Button>
}