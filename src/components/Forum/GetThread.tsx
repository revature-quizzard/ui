import { getAllThreads } from '../../remote/sub-forum-service';
import { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { Thread } from '../../models/thread';
import { useHistory } from 'react-router';
import { forumState, setCurrentThread } from '../../state-slices/forum/forum-slice';
import { useDispatch, useSelector } from 'react-redux';

const GetThreads = ()=> {
    let [threadName,setThread] = useState(undefined as Thread[] | undefined);
    const history = useHistory();
    const forumInfo = useSelector(forumState);
    const dispatch = useDispatch();

    useEffect(() => {
   
        const getThreads = async () => {
          try{
          console.log("Current Subforum: " + forumInfo.currentSubforum.subject);
          setThread(await getAllThreads(forumInfo.currentSubforum?.id));
          console.log('in component: ' + threadName[0]);
          }catch(error)
          {
            console.log(error);
          }
        };
        getThreads();
        
      }, []);

    function Navigate(id: string, thr: Thread){
      dispatch(setCurrentThread(thr));
      console.log(forumInfo);
      console.log("Navigating to " + id);
      history.push("/forum/thread/" + id);
    }


    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Subject</TableCell>
              <TableCell align="left">Author&nbsp;</TableCell>
              <TableCell align="left">Number of Comments&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {threadName?.map((sub) => (
              <TableRow>
                <TableCell
                align="left"
                onClick={() => Navigate(sub.subject, sub)}>
                {sub.subject}
                </TableCell>
                <TableCell
                align="left"
                onClick={() => Navigate(sub.subject, sub)}>
                {sub.owner}
                </TableCell>
                <TableCell align="left">{sub.child_count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );


}

export default GetThreads;