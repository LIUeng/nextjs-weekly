import { TooltipContent } from "@radix-ui/react-tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipArrow,
} from "./ui/tooltip";

export default function AvatarTooltip(props: {
  url: string;
  name: string;
  hideTooltip?: boolean;
}) {
  let avatarJSX = (
    <Avatar className="h-8 w-8">
      <AvatarImage src={props.url} />
      <AvatarFallback>{props.name}</AvatarFallback>
    </Avatar>
  );

  return props.hideTooltip ? (
    avatarJSX
  ) : (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{avatarJSX}</TooltipTrigger>
        <TooltipContent
          className="rounded bg-background px-[15px] py-2.5 text-[15px] leading-none text-violet11 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity] data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade"
          side="top"
        >
          {props.name}
          <TooltipArrow className="fill-background" />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
