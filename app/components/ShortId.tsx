import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { mask } from "@/lib/utils"

export function ShortId({ value }: { value: string }) {
    return <TooltipProvider>
        <Tooltip>
            <TooltipTrigger>
                {mask(value)}
            </TooltipTrigger>
            <TooltipContent align="start">
                <p>{value}</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
}