import { Terminal } from "lucide-react"
import {
    Alert,
    AlertDescription,
    AlertTitle, AlertVariants,
} from "@/components/ui/alerts/alert"
import {forwardRef} from "react";
import * as React from "react";
import {VariantProps} from "class-variance-authority";

interface AlertArgs extends VariantProps<typeof AlertVariants>{
    title: string,
    text: string | React.ReactNode,
    terminal?: boolean,
}

const AlertComponent = forwardRef<
    HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & AlertArgs
>(function AlertComponent({title, text, terminal, ...props}, ref) {
    return (
        <Alert {...props} ref={ref}>
            {terminal && <Terminal className="h-4 w-4" /> }
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{text}</AlertDescription>
        </Alert>
    );
})

export default  AlertComponent
