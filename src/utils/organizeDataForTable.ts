import {TableHeader} from "../shared/Table/Table";

type IndexedHeaders = {
    [key: string]: TableHeader
}

type OrganizedItem = {
    [key: string]: any
}

export default function organizeData(data: any[], headers: TableHeader[]): [OrganizedItem[], IndexedHeaders] {
    const indexedHeaders: IndexedHeaders = {}

    headers.forEach((header: TableHeader): void => {
        indexedHeaders[header.key] = {
            ...header
        }
    })

    const headerKeysInOrder: string[] = Object.keys(indexedHeaders)

    const organizedData: OrganizedItem[] = data.map(item => {
        const organizedItem: OrganizedItem = {}

        headerKeysInOrder.forEach((key: string) => {
            organizedItem[key] = item[key]
        })

        organizedItem.$original = item

        return organizedItem
    })

    return [organizedData, indexedHeaders]
}
