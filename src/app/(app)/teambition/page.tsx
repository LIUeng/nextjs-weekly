import TeambitionTable from "./Table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RotateCcw } from "lucide-react";

export type TeambitionSearchParams = {
  cookie?: string;
  isDone?: "0" | "1";
  // orderBy?: string;
  pageSize?: "30" | "50" | "100";
  id?: string;
};

export type serverProps = {
  params: { id: string };
  searchParams: TeambitionSearchParams;
};

export default function Teambition({ searchParams }: serverProps) {
  const { cookie = "", isDone = "0", pageSize = "30" } = searchParams;
  return (
    <div className="py-6">
      <form action={"/teambition"} className="space-y-4">
        <div>
          <Input
            placeholder="输入 Cookie 信息"
            defaultValue={cookie}
            name="cookie"
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <RadioGroup className="flex" name="isDone" defaultValue={isDone}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="0" id="undone"></RadioGroupItem>
                <Label htmlFor="undone">未完成</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="done"></RadioGroupItem>
                <Label htmlFor="done">已完成</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <Select name="pageSize" defaultValue={pageSize}>
              <SelectTrigger className="w-[80px]">
                <SelectValue placeholder="分页"></SelectValue>
              </SelectTrigger>
              <SelectContent>
                {["30", "50", "100"].map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button type="submit" className="w-full" variant="secondary">
          <RotateCcw />
        </Button>
      </form>
      <TeambitionTable values={searchParams} />
    </div>
  );
}
