import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export type TableRowProps = {
  [v: string]: any;
};

export type ColumnProps<T> = {
  id: string;
  title: string;
  type?: "index" | "selection";
  width?: number;
  render?(v: T, rowIdx: number): React.ReactNode | JSX.Element;
};

interface DataTableProps<T> {
  columns: ColumnProps<T>[];
  data: T[];
}

export default function DataTable<T extends TableRowProps>({
  columns,
  data,
}: DataTableProps<T>) {
  return (
    <Table>
      <colgroup>
        {columns.map((col) => {
          return (
            <col
              key={col.id}
              width={
                col.width ? col.width : col.type === "index" ? 60 : col.width
              }
            />
          );
        })}
      </colgroup>
      <TableHeader>
        <TableRow>
          {columns.map((col) => {
            return <TableHead key={col.id}>{col.title}</TableHead>;
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length > 0 ? (
          data.map((row, rowIdx) => {
            return (
              <TableRow key={row._id}>
                {columns.map((col) => {
                  return (
                    <TableCell key={col.id}>
                      {col.type === "index"
                        ? rowIdx + 1
                        : col.render
                        ? col.render(row, rowIdx)
                        : row[col.id]}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              暂无数据
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
