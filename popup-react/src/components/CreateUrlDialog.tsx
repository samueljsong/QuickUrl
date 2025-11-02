import { useState } from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Input } from "./ui/input"
import { Label } from "@radix-ui/react-label"
import { toast } from "sonner"

export const CreateUrlDialog = () => {

    const [targetUrl, setTargetUrl] = useState("");
    const [keyword, setKeyword]     = useState("");

    const onAlertDialogClickHandler = () => {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs: chrome.tabs.Tab[]) => {
            if(tabs[0].url) {
                setTargetUrl(tabs[0].url);
        } })
    }

    const onCreateClickHandler = () => {
        if (keyword.length === 0 || targetUrl.length === 0)
        {
            toast.error("Please provide a valid Target Url and Keyword");
            return;
        }

        chrome.storage.local.get(null, (items) => {
            const newItems = { ...items, [keyword]: targetUrl };
            chrome.storage.local.set(newItems, () => {
                toast.success("QuickUrl created successfully", {description: `The QuickUrl with keyword: ${keyword} and url: ${targetUrl} has been created.`});
            });
        });
    }

    const onTargetUrlChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setTargetUrl(e.target.value);
    const onKeywordChangeHandler   = (e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value);

    return (
        <AlertDialog>
            <AlertDialogTrigger 
                onClick={onAlertDialogClickHandler} 
                className=" w-[100%] 
                            cursor-pointer 
                            font-light bg-primary 
                            text-white 
                            py-2 
                            rounded-sm 
                            squish"
            >
                Create QuickUrl
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Creating a new QuickUrl
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        The Target Url is the url you want to shorten. The Keyword is the custom alias for your new url.
                    </AlertDialogDescription>
                    <Label className=" text-left font-light squish pt-2">
                        Target Url
                    </Label>
                    <Input 
                        className=" font-light squish text-sm" 
                        defaultValue={targetUrl} 
                        onChange={onTargetUrlChangeHandler} 
                    />
                    <Label className=" text-left font-light squish">
                        Keyword
                    </Label>
                    <Input 
                        className=" font-light squish text-sm" 
                        onChange={onKeywordChangeHandler} 
                    />
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={onCreateClickHandler}>
                        Create
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}