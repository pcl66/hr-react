export function transListToTreeData(list: any[], value: any) {
  // console.log(list, value)
  const arr: any[] = [] // 搜集找到的结果
  list.forEach((item: { pid: any; id: any; children: any[] }) => {
    if (item.pid === value) {
      // 找到老父亲了，要尝试找找，看他有没有儿子
      // item一级，还要找二级，查找条件是 item.id
      const children = transListToTreeData(list, item.id)
      if (children.length > 0) {
        item.children = children
      }
      arr.push(item)
    }
  })
  return arr
}