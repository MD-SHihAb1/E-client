import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Avatar, Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

function UpdateTable() {
  const axiosSecure = useAxiosPublic();
  
  const { data: product = [], refetch } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const res = await axiosSecure.get("/product");
      return res.data;
    },
  });




  const handleDelete = product => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
         
          axiosSecure.delete(`/product/${product._id}`)
          .then(res => {
            if(res.data.deletedCount > 0) {
              refetch();
               Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
  
            }
          })
        }
      });
  };






  return (
    <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          
          <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>Product Title</TableCell>
            
            <TableCell>Update</TableCell>
            <TableCell>Delate</TableCell>
            <TableCell />
         
        </TableHead>

        <TableBody>
          {product.map((user, index) => (
            <TableRow key={user.id}> {/* Ensure `user.id` is unique */}
              <th>{index + 1}</th>
              <TableCell>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Avatar src={user.image} alt="Avatar" sx={{ width: 48, height: 48 }} />
                  <div>
                    
                    <div style={{ fontSize: '0.875rem', opacity: 0.5 }}>{user.location}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {user.job}
                <br />
                <span style={{ fontSize: '0.75rem', color: 'rgba(0, 0, 0, 0.6)' }}>{user.title}</span>
              </TableCell>
              <TableCell><div style={{ fontWeight: 'bold' }}>{user.name}</div></TableCell>
            
              <TableCell>
              <Link className='text-blue-500' to={`/d/update/${user._id}`}>
                Update
              </Link>
            </TableCell>

              <TableCell>
                <Button
                onClick={() => handleDelete(user)}
                variant="text" size="small">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
     
      </Table>
    </TableContainer>
  );
}

export default UpdateTable;
