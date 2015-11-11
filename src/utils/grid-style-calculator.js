function calculateColumnStyle(opts={}) {
  let containerWidth = opts.containerWidth || 480;
  let itemIndex = opts.itemIndex || 0;
  let itemCount = opts.itemCount || 1;
  let columns = opts.columns || 1;
  let gutterWidth = (opts.gutter || 0) * (100 / columns);
  let gutterCount = columns - 1;
  let gutterDistribution = (gutterCount * gutterWidth) / columns;
  let colWidth = (100 / columns) - gutterDistribution;
  let colOffset = colWidth * itemIndex;
  
  let rowGutterPixels = Math.floor((opts.rowGutter || 0) * (colWidth/100) * containerWidth);

  let totalRows = Math.ceil(itemCount / columns);
  let currentRow = Math.ceil((itemIndex + 1) / columns);
  let lastInRow = (itemIndex+1) % columns === 0;
  let isLastRow = totalRows === currentRow;

  let style = {
    clear: 'both',
    float: 'none',
    display: 'inline',
    textAlign: 'inherit',
    paddingLeft: 0,
    paddingRight: 0,
    marginRight: 0,
    marginBottom: 0
  };

  if (columns > 1) {
    style['float'] = (lastInRow) ? 'right' : 'left';  
    style['clear'] = 'none';
    style['width'] = `${colWidth}%`;
    style['marginRight'] = !lastInRow ? `${gutterWidth}%` : 0;
    style['marginBottom'] = !isLastRow ? `${rowGutterPixels}px` : 0;
  }

  return style;
}

export default calculateColumnStyle;