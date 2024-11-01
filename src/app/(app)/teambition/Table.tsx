import request from "@/lib/request";
import DataTable, { ColumnProps, TableRowProps } from "@/components/DataTable";
import { TeambitionSearchParams } from "./page";
import Copy from "@/components/Copy";
import { _dayjs } from "@/lib/utils";
import Link from "next/link";
import AvatarTooltip from "@/components/AvatarTooltip";
import { priorityOptions } from "./config";

const dayjs = _dayjs();

type RowProps = {
  _id: string | number;
  _parent_id: string;
  content: string;
  url: string;
  name: string;
  avatarUrl?: string;
  _uid?: string;
  _uids?: string[];
  accomplished?: string;
  created?: string;
  priority: number;
  dueDate?: Date;
};

type fetchProps = {
  isDone: boolean;
  orderBy: "created" | "accomplished";
  pageSize: string;
};

async function fetchData(params: fetchProps, cookie: string) {
  const res: any = await request.get(
    "https://tb.raycloud.com/api/tasks/me:execute",
    params,
    {
      Cookie: cookie,
    }
  );
  return (res?.result || []).map((row: any): RowProps => {
    return {
      _id: row._id,
      _parent_id: row.parent?._id || row._id,
      content: row.content,
      url: `https://tb.raycloud.com/task/${row._id}`,
      name: row?.executor?.name || "-",
      avatarUrl: row?.executor?.avatarUrl,
      created: row.created,
      accomplished: row.accomplished,
      priority: row.priority,
      dueDate: row.dueDate,
    };
  });
}

export default async function TeambitionTable({
  values,
}: {
  values: TeambitionSearchParams;
}) {
  let data: Array<TableRowProps> = [];
  let { cookie = "", isDone = "0", pageSize = "30" } = values;
  let done = isDone === "1";

  // columns
  const columns: ColumnProps<RowProps | TableRowProps>[] = [
    {
      id: "index",
      title: "序号",
      type: "index",
    },
    {
      id: "name",
      title: "执行人",
      width: 100,
      render(row) {
        return (
          <AvatarTooltip
            hideTooltip={true}
            url={row.avatarUrl}
            name={row.name}
          />
        );
      },
    },
    {
      id: "priority",
      title: "优先级",
      width: 90,
      render(row) {
        let priorityOption = priorityOptions[row.priority];
        return (
          <span style={{ color: priorityOption.color }}>
            {priorityOption.name}
          </span>
        );
      },
    },
    {
      id: "content",
      title: "任务描述",
      render(row) {
        return (
          <>
            <a
              className="inline-block no-underline transition-colors hover:text-foreground text-muted-foreground"
              target="_blank"
              href={row.url}
            >
              {row.content}
            </a>
            <div className="ml-2 inline-flex">
              <Copy text={row.content} />
            </div>
          </>
        );
      },
    },
    {
      id: done ? "accomplished" : "created",
      title: done ? "完成时间" : "创建时间",
      width: 200,
      render(row) {
        let date = new Date(done ? row.accomplished : row.created);
        return (
          <>
            {dayjs(date).format("MM月DD日")}({dayjs(date).fromNow()})
          </>
        );
      },
    },
    {
      id: "dueDate",
      title: "截止时间",
      width: 120,
      render(row) {
        return row.dueDate ? (
          dayjs(new Date(row.dueDate)).format("MM月DD日截止")
        ) : (
          <span style={{ color: "gray" }}>未设置</span>
        );
      },
    },
    {
      id: "operate",
      title: "操作",
      width: 100,
      render(row) {
        return (
          <>
            <Link
              href={{
                pathname: `/teambition/${row._parent_id}`,
                query: values,
              }}
            >
              详情
            </Link>
            <div className="inline-flex">
              <Copy text={row.url} />
            </div>
          </>
        );
      },
    },
  ];

  if (cookie) {
    data = await fetchData(
      { isDone: done, pageSize, orderBy: done ? "accomplished" : "created" },
      cookie
    );
  }
  return (
    <div className="rounded-md border mt-4">
      <DataTable columns={columns} data={data}></DataTable>
    </div>
  );
}
