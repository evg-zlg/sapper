type createGridProps = {
  col: number;
  row: number;
}

export function createGrid({ col, row }: createGridProps) {
  console.log('col', col)
  console.log('row', row)
}