import React, {JSX} from 'react'
import './Table.scss'
import Button from "../Button/Button";
import organizeData from "../../utils/organizeDataForTable";

export interface TableHeader {
    key: string
    value: string
    right?: boolean
}

declare interface TableProps {
    headers: TableHeader[]
    data: any[]

    enableActions?: boolean

    onDelete?: (item: any) => void
    onDetail?: (item: any) => void
    onEdit?: (item: any) => void
}

function Table(props: TableProps): JSX.Element {

    const [organizedData, indexedHeaders] = organizeData(props.data, props.headers)

    return (
        <table className="AppTable">
            <thead>
            <tr>
                {
                    props.headers.map((header: TableHeader) =>
                        <th
                            className={header.right ? 'right' : ''}
                            key={header.key}
                        >
                            {header.value}
                        </th>
                    )
                }
                {
                    props.enableActions
                    && <th className="right">
                        Actions
                    </th>
                }
            </tr>
            </thead>
            <tbody>
            {
                organizedData.map((row, i: number) => {
                    return <tr key={i}>
                        {
                            Object
                                .keys(row)
                                .map((item: string, i: number): JSX.Element | null =>
                                    item !== '$original'
                                        ? <td
                                            key={row.$original._id + i}
                                            className={indexedHeaders[item].right ? 'right' : ''}
                                        >
                                            {row[item]}
                                        </td>
                                        : null
                                )
                        }

                        {
                            props.enableActions
                            && <td className="actions right">
                                {
                                    props.onEdit &&
                                    <Button onClick={() => props.onEdit && props.onEdit(row.$original)}>
                                        Edit
                                    </Button>
                                }
                                {
                                    props.onDetail &&
                                    <Button onClick={() => props.onDetail && props.onDetail(row.$original)}>
                                        Detail
                                    </Button>
                                }
                                {
                                    props.onDelete &&
                                    <Button onClick={() => props.onDelete && props.onDelete(row.$original)}>
                                        Delete
                                    </Button>
                                }
                            </td>
                        }
                    </tr>
                })
            }
            </tbody>
        </table>
    );
}

export default Table
