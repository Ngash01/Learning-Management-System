"use client"
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { FormatPrice } from '@/lib/formatPrice';
import { cn } from '@/lib/utils';

const columns = [
  { field: 'title', headerName: 'Title', width: 280 },
  { field: 'price', headerName: 'Price', width: 150 },
  { field: 'isPublished', headerName: 'IsPublished', width: 200 },
  {field: "CategoryId", headerName:"Category", width:250},
  {
    field: 'courseId',
    headerName: '',
    type: '',
    width: 200,
  },
];


export default function DataTable({courses, categories}) {

  
  // const rows = [
  //   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  //   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  //   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  //   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  //   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  //   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  //   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  //   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  //   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  // ];

  const rows = courses.map((course)=>{
    const category = categories.find((category)=>category.id === course.categoryId)
    const newPrice = course.price 
    const convertedPrice = FormatPrice(newPrice)

    return({
      id: course.id,
      title: course.title,
      price: convertedPrice,
      isPublished: course.isPublished ? "Published" : "Draft",
      CategoryId: category?.name
    })
  })

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows} 
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}


