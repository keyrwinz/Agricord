/**
 * TEST DATA FOR PRODUCT THUMBNAILS
 */

const products = [
  {
  id: 0,
  title: 'Paddock 1',
  type:'Spray Mix',
  due_date: '11/20/2020',
  status:'inprogress',
  appliedRate:'65L',
  batchNum:"1D",
  crop:'Wheat',
  machine:'',
  operator:'Steve123',
  started:'03/02/2020',
  products:[
    {
      title:'Product D',
      volume:'3.0L',
      batchNum:"1D",
    },
    {
      title:'Product E',
      volume:'3.0L',
      batchNum:"1D",
    },
    {
      title:'Product F',
      volume:'3.0L',
      batchNum:"1D",
    },
    {
      title:'Product D',
      volume:'3.0L',
      batchNum:"1D",
    },
  ]
  },
  {
    id: 1, 
    title: 'Paddock 2',
    type:'Spray Mix',
    due_date: '11/20/2020',
    status:'inprogress',
    appliedRate:'65L',
    batchNum:"2D",
    crop:'Wheat',
    machine:'',
    operator:'Steve123',
    started:'03/02/2020',
    products:[
      {
        title:'Product G',
        volume:'3.0L',
        batchNum:"1D",
      },
      {
        title:'Product H',
        volume:'3.0L',
        batchNum:"1D",
      },
      {
        title:'Product I',
        volume:'3.0L',
        batchNum:"1D",
      }
    ]
  },
  {
    id: 2,
    title: 'Paddock 3',
    type:'Spray Mix',
    due_date: '11/20/2020',
    status:'due',
    appliedRate:'65L',
    batchNum:"3D",
    products:[
      {
        title:'Product J',
        volume:'3.0L',
        batchNum:"1D",
      },
      {
        title:'Product K',
        volume:'3.0L',
        batchNum:"1D",
      },
      {
        title:'Product L',
        volume:'3.0L',
        batchNum:"1D",
      }
    ]
  },
  {
    id: 3,   
    title: 'Paddock 4',
    type:'Spray Mix',
    due_date: '11/20/2020',
    status:'completed',
    appliedRate:'65L',
    batchNum:"4D",
    crop:'Wheat',
    machine:'',
    operator:'Steve123',
    started:'03/02/2020 12:21',
    finished:'03/02/2020 15:21',
    products:[
      {
        title:'Product M',
        volume:'3.0L',
        batchNum:"1D",
      },
      {
        title:'Product N',
        volume:'3.0L',
        batchNum:"1D",

      },
      {
        title:'Product O',
        volume:'3.0L',
        batchNum:"1D",
      }
    ]
  }
]



export {
  products,
}