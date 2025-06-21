import * as React from "react"
import { useEffect, useState } from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronUp, HelpCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { useNavigate } from "react-router-dom"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300)
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0 })
  }

  if (!visible) return null

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "group fixed bottom-6 right-6 z-5 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-light-blue shadow-xl transition-all duration-300 overflow-hidden cursor-pointer",
        visible ? "opacity-100" : "opacity-0 pointer-events-none",
        "hover:bg-semi-dark-blue hover:-translate-y-[2.5px] active:translate-y-[1.5px] transition ease-in-out duration-200"
      )}
      style={{ transitionProperty: "all, background-color" }}
    >
      <ChevronUp
        className="font-black upArrow size-5 text-white transition-transform duration-300 group-hover:-translate-y-0.5"
      />
    </button>
  )
}



function AskQuestionButton() {
  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate();
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const handleAskQuestion = () => {
    navigate('/ask-question'); 
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-20 right-6 z-50">
      {/* 2. The entire button is now a group to control child elements on hover */}
      {isVisible && (
        <button
          onClick={handleAskQuestion}
          className="h-12 group flex items-center justify-center bg-light-blue hover:semi-dark-blue text-white font-bold rounded-full p-3 shadow-lg"
          aria-label="Đặt câu hỏi"
        >
          <HelpCircle className="h-6 w-6" />

          <span className="
            opacity-0
            overflow-hidden       
            max-w-0  
            group-hover:opacity-100
            group-hover:max-w-xs 
            group-hover:ml-2  
            transition-all duration-600 ease-in-out
          ">
            Đặt câu hỏi
          </span>
        </button>
      )}
    </div>
  );
};

export { Button, buttonVariants, ScrollToTopButton, AskQuestionButton };
