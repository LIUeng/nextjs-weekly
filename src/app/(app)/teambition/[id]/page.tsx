import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { serverProps } from "../page";
import request from "@/lib/request";
import AvatarTooltip from "@/components/AvatarTooltip";
import "./page.css";
import Link from "next/link";
import { priorityOptions } from "../config";
import MarkdownHtml from "./markdown-html";

type DataProps = {
  _id: string;
  executor?: { name: string };
  content?: string;
  involvers?: Array<{ avatarUrl: string; name: string }>;
  note?: string;
  subtaskCount?: { total: number; done: number };
  subtasks?: Array<DataProps>;
  priority: 0 | 1 | 2 | 3 | -10;
  taskflowstatus: { name: string };
};

const fetchData = async (
  id: string,
  cookie: string
): Promise<DataProps | null> => {
  return await request.get<DataProps>(
    "https://tb.raycloud.com/api/tasks/" + id,
    void 0,
    {
      Cookie: cookie,
    }
  );
};

export default async function TeambitionNext({
  searchParams,
  params,
}: serverProps) {
  const { id } = params;
  if (!id) return null;

  let data = await fetchData(id, searchParams.cookie || "");
  if (!data) return null;

  let priorityOption = priorityOptions[data.priority];
  return (
    <div className="py-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>{data?.content}</BreadcrumbItem>
          <BreadcrumbSeparator />
        </BreadcrumbList>
      </Breadcrumb>
      <div className="py-4 space-y-4">
        <div className="flex">
          <div className="w-[140px] shrink-0">状态：</div>
          <div>{data?.taskflowstatus.name}</div>
        </div>
        <div className="flex">
          <div className="w-[140px] shrink-0">优先级：</div>
          <div
            style={{
              color: priorityOption.color,
            }}
          >
            {priorityOption.name}
          </div>
        </div>
        <div className="flex">
          <div className="w-[140px] shrink-0">
            关联人({data?.involvers?.length})：
          </div>
          <div className="flex space-x-2">
            {data?.involvers?.map((item) => (
              <AvatarTooltip
                key={item.name}
                url={item.avatarUrl}
                name={item.name}
              />
            ))}
          </div>
        </div>
        <div className="flex">
          <div className="w-[140px] shrink-0">
            关联任务列表({data?.subtaskCount?.total})：
          </div>
          <ul className="space-y-2">
            {data?.subtasks?.map((item) => (
              <li key={item._id}>
                <Link
                  href={{
                    pathname: `/teambition/${item._id}`,
                    query: searchParams,
                  }}
                >
                  {item.content}
                </Link>
                (
                <span style={{ color: "orangered" }}>
                  {item.executor?.name}
                </span>
                )
                <a
                  href={`https://tb.raycloud.com/task/${item._id}`}
                  target="_blank"
                  style={{ color: "blue" }}
                >
                  跳转TB
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex">
          <div className="w-[140px] shrink-0">备注：</div>
          <MarkdownHtml data={data.note || ""} />
        </div>
      </div>
    </div>
  );
}
