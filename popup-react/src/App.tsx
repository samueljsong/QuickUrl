import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import icon from "./assets/bolt.png"

function App() {

    const onCreateButtonClickHandler = () => {
        console.log("Create New QuickUrl button clicked")
    }

    return (
        <div className=" w-[400px] max-h-[600px] overflow-hidden flex flex-col items-center p-4 bg-background">
            <div className=" flex gap-2 items-center self-start">
                <img src={icon} alt="" className=" w-7 h-7"/>
                <h1 className=" font-medium font-primary text-2xl text-primary squish">QuickUrl</h1>
            </div>
            <div className= 'w-[100%] py-3'>
                <div className=" w-[100%] bg-accent h-[1px]"></div>
            </div>
            <div className=" w-[100%]">
                <Button className=" w-[100%] cursor-pointer font-light bg-primary squish" onClick={onCreateButtonClickHandler}>Create New QuickUrl</Button>
            </div>
            <Accordion type="single" collapsible className=" w-[100%]">
                <AccordionItem value="item-1">
                    <AccordionTrigger className=" font-primary squish text-tertiary">Your QuickUrls</AccordionTrigger>
                        <AccordionContent>
                            Yes. It adheres to the WAI-ARIA design pattern.
                        </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default App
