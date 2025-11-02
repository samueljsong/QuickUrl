import { useState, useEffect } from "react"

import { CreateUrlDialog }     from "./components/CreateUrlDialog"
import { Label }               from "@radix-ui/react-label"
import { QuickUrlCard }        from "./components/QuickUrlCard"
import { Toaster }             from "sonner"

import icon from "./assets/bolt.png"

function App() {

    const [urlList, setUrlList] = useState<{ [key: string] : string }>({});

    useEffect(() => {
        chrome.storage.local.get(null, (items) => {
            const sorteditems   = Object.entries(items).sort(([aKey], [bKey]) => aKey.localeCompare(bKey));
            const sortedObjects = Object.fromEntries(sorteditems);
            
            setUrlList(sortedObjects);
        });
    }, [urlList]);

    return (
        <div className=" w-[400px] h-[600px] overflow-hidden flex flex-col items-center p-4 bg-background">
            <Toaster richColors position="bottom-center" />
            <div className=" flex gap-2 items-center self-start">
                <img 
                    src={icon} 
                    alt="" 
                    className=" w-7 h-7"
                />
                <h1 className=" font-medium font-primary text-2xl text-primary squish">
                    QuickUrl
                </h1>
            </div>
            <div className= 'w-[100%] py-3'>
                <div className=" w-[100%] bg-accent h-[1px]" />
            </div>
            <div className=" w-[100%]">
                <CreateUrlDialog/>
            </div>
            <div className=" w-[100%] flex ">
                <Label className=" font-light squish text-left text-lg pb-2 pt-3">
                    Your QuickUrls
                </Label>
            </div>
            <div className=" w-[100%] overflow-y-auto flex flex-col gap-2 pt-4">
                {
                    Object.entries(urlList).map(([keyword, url], index) => (
                        <QuickUrlCard key={index} keyword={keyword} url={url} setUrlList={setUrlList}/>
                    ))
                }
            </div>
        </div>
    )
}

export default App