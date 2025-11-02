import { 
    Card, 
    CardContent, 
    CardTitle 
} from "./ui/card"

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";
import { Drawer, DrawerTrigger, DrawerContent, DrawerFooter, DrawerClose, DrawerHeader, DrawerTitle, DrawerDescription } from "./ui/drawer";
import { toast } from "sonner";

interface QuickUrlCardProps {
    key       : number;
    keyword   : string;
    url       : string;
    setUrlList: React.Dispatch<React.SetStateAction<{ [key: string] : string }>>;
}

export const QuickUrlCard: React.FC<QuickUrlCardProps> = ({key, keyword, url, setUrlList}) => {

    const onClickHandler = () => {
        console.log(key);
    }

    const refreshUrlList = () => {
        chrome.storage.local.get(null, (items) => {
            setUrlList(items);
        });
    }

    const onDeleteClickHandler = () => {
        chrome.storage.local.remove(keyword, () => {
            refreshUrlList();
            toast("Url deleted successfully");
        });
    }

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Card className=" w-[100%] flex flex-row cursor-pointer" onClick={onClickHandler}>
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
                        Manage your QuickUrl for keyword: {keyword}
                    </DrawerDescription>
                </DrawerHeader>
                <div className=" w-[100%] flex flex-col gap-2 items-center">
                    <Label className=" w-[90%]">Target Url</Label>
                    <Input className=" w-[90%] font-light squish" defaultValue={url}/>
                    <Label className=" w-[90%]">Keyword</Label>
                    <Input className=" w-[90%] font-light squish" defaultValue={keyword}/>
                </div>
                <DrawerFooter className=" w-[100%]">
                    <DrawerClose className=" flex flex-col gap-2 w-[100%]">
                        <Button className=" w-[100%]">Save</Button>
                        <Button className=" w-[100%] bg-red-500" onClick={onDeleteClickHandler}>Delete</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}