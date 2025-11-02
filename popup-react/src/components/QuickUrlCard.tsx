import { useState } from "react";

import { Button } from "./ui/button";

import { 
    Card, 
    CardContent, 
    CardTitle 
} from "./ui/card"

import { 
    Drawer, 
    DrawerTrigger, 
    DrawerContent, 
    DrawerFooter, 
    DrawerClose, 
    DrawerHeader, 
    DrawerTitle, 
    DrawerDescription 
} from "./ui/drawer";

import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";
import { toast } from "sonner";

interface QuickUrlCardProps {
    keyword    : string;
    url        : string;
    setUrlList : React.Dispatch<React.SetStateAction<{ [key: string] : string }>>;
}

export const QuickUrlCard: React.FC<QuickUrlCardProps> = ({keyword, url, setUrlList}) => {

    const [inputTargetUrl, setInputTargetUrl] = useState(url);
    const [inputKeyword, setInputKeyword]     = useState(keyword);

    const onTargetUrlChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setInputTargetUrl(e.target.value);
    const onKeywordChangeHandler   = (e: React.ChangeEvent<HTMLInputElement>) => setInputKeyword(e.target.value);

    const refreshUrlList = () => {
        chrome.storage.local.get(null, (items) => {
            const sorteditems   = Object.entries(items).sort(([aKey], [bKey]) => aKey.localeCompare(bKey));
            const sortedObjects = Object.fromEntries(sorteditems);

            setUrlList(sortedObjects);
        });
    }

    const onDeleteClickHandler = () => {
        chrome.storage.local.remove(keyword, () => {
            refreshUrlList();
            toast.success("Url deleted successfully", {description: `The QuickUrl with keyword: ${keyword} has been deleted.`});
        });
    }

    const onSaveClickHandler = () => {
        if (inputKeyword !== keyword){
            chrome.storage.local.remove(keyword, () => {
                chrome.storage.local.set({ [inputKeyword]: inputTargetUrl }, () => {
                    refreshUrlList();
                    toast.success("Url updated successfully", {description: `The QuickUrl has been updated to keyword: ${inputKeyword}`});
                });
            });
        }
        else {
            chrome.storage.local.set({ [inputKeyword]: inputTargetUrl }, () => {
                refreshUrlList();
                toast.success("Url updated successfully", {description: `The QuickUrl with keyword: ${inputKeyword} has been updated.`});
            });
        }
    }

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Card className=" w-[100%] flex flex-row cursor-pointer">
                    <CardContent className=" flex flex-col max-w-[10%] ">
                        <CardTitle>Key</CardTitle>
                        <p>{keyword}</p>
                    </CardContent>
                    <CardContent className=" flex flex-col max-w-[90%] items-start text-left">
                        <CardTitle>Destination Url</CardTitle>
                        <p className=" text-wrap">{url}</p>
                    </CardContent>
                </Card>
            </DrawerTrigger>
            <DrawerContent className=" w-[100%] flex flex-col items-center">
                <DrawerHeader className=" w-[100%]">
                    <DrawerTitle className=" font-medium squish text-2xl">
                        QuickUrl Details
                    </DrawerTitle>
                    <DrawerDescription>
                        Edit your QuickUrl for keyword: {keyword}
                    </DrawerDescription>
                </DrawerHeader>
                <div className=" w-[100%] flex flex-col gap-2 items-center">
                    <Label className=" w-[90%]">
                        Target Url
                    </Label>
                    <Input 
                        className=" w-[90%] text-sm font-light squish" 
                        defaultValue={inputTargetUrl} 
                        onChange={onTargetUrlChangeHandler}
                    />
                    <Label className=" w-[90%]">Keyword</Label>
                    <Input 
                        className=" w-[90%] text-sm font-light squish" 
                        defaultValue={inputKeyword} 
                        onChange={onKeywordChangeHandler}
                    />
                </div>
                <DrawerFooter className=" w-[100%]">
                    <DrawerClose className=" flex flex-col gap-2 w-[100%]">
                        <Button 
                            className=" w-[100%]" 
                            onClick={onSaveClickHandler}
                        >
                            Save
                        </Button>
                        <Button 
                            className=" w-[100%] bg-red-500" 
                            onClick={onDeleteClickHandler}
                        >
                            Delete
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}