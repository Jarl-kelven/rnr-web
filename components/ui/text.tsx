import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const textVariants = cva(
    "text-foreground transition-colors",
    {
        variants: {
            variant: {
                default: "leading-7",
                h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
                h2: "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0",
                h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
                p: "leading-7 [&:not(:first-child)]:mt-6",
                logo: "font-black tracking-tighter uppercase",
                muted: "text-sm text-muted-foreground",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface TextProps
    extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof textVariants> {
    as?: "p" | "span" | "h1" | "h2" | "h3" | "div"
}

const Text = React.forwardRef<HTMLSpanElement | HTMLHeadingElement | HTMLDivElement | HTMLParagraphElement, TextProps>(
    ({ className, variant, as: Component = "span", ...props }, ref) => {
        return (
            <Component
                className={cn(textVariants({ variant, className }))}
                // ref={ref}
                {...props}
            />
        )
    }
)
Text.displayName = "Text"

export { Text, textVariants }
