import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ReactChild } from "react"

export function Alert({ children }: ReactChild) {
    return <AlertDialog>
        {children}
    </AlertDialog>
}

Alert.Trigger = (props) => {
    return <AlertDialogTrigger asChild>
        {props.children}
    </AlertDialogTrigger>
}
Alert.Content = (props) => {
    return <AlertDialogContent>
        <AlertDialogHeader>
            <AlertDialogTitle>{props.title}</AlertDialogTitle>
            <div className="hidden">
                <AlertDialogDescription>
                </AlertDialogDescription>
            </div>
            {props.children}
        </AlertDialogHeader>
        <AlertDialogFooter>
            <AlertDialogCancel>Ok</AlertDialogCancel>
        </AlertDialogFooter>
    </AlertDialogContent>
}