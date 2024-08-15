import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Avatar, Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';

function AllUser() {
  const axiosSecure = useAxiosPublic();
  
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  return (
    <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox />
            </TableCell>
            <TableCell></TableCell>
            <TableCell>Name</TableCell>
          
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Avatar src={user.image} alt="Avatar" sx={{ width: 48, height: 48 }} />
                </div>
              </TableCell>
              <TableCell>
                {user.name}
                <br />
                <span style={{ fontSize: '0.75rem', color: 'rgba(0, 0, 0, 0.6)' }}>{user.jobTitle}</span>
              </TableCell>
              <TableCell>{user.favoriteColor}</TableCell>
              <TableCell>
                <Button variant="text" size="small">Details</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <tfoot>
          <TableRow>
            <TableCell padding="checkbox"></TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Job</TableCell>
            <TableCell>Favorite Color</TableCell>
            <TableCell />
          </TableRow>
        </tfoot>
      </Table>
    </TableContainer>
  );
}

export default AllUser;
