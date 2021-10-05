import {Container, Typography, Button, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import {useSelector} from "react-redux";
import {profileState} from "../../state-slices/user-profile/profile-slice";
import {
    DataGrid,
    GridColDef,
    GridApi,
    GridCellValue
} from "@mui/x-data-grid";
import {SetDocument} from "../../models/set-document";

/**
 * Component for rendering a user's Sets.
 * Will contain a button to render a modal for adding sets.
 * Each set will have a button for editing or deleting the corresponding set and a link to the set.
 * @authors Cody McDonald, Mitchell Panenko
 * */

const UserSets = () => {
    const state = useSelector(profileState);
    const userCreatedSets = state.userProfile.createdSets;

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'index', hide: true},
        {field: 'setId', headerName: 'setId', hide: true},
        {field: 'setName', headerName: 'Name', flex: 1},
        {field: 'tags', headerName: 'Tags', flex: 1},
        {field: 'isPublic', headerName: 'Public?', flex: 1},
        {field: 'views', headerName: 'Views', flex: 1},
        {field: 'plays', headerName: 'Plays', flex: 1},
        {field: 'studies', headerName: 'Studies', flex: 1},
        {field: 'favorites', headerName: 'Faves', flex: 1},
        {field: "updateSet",
            headerName: " ",
            sortable: false,
            width: 50,
            renderCell: (params) => {
                const removeSetFromUserFavorites = () => {
                    const api: GridApi = params.api;
                    // This makes the ui hitch and prints errors after returning for some reason
                    // alert(JSON.stringify(api.getRow(params.id).setId));
                    console.log(api.getRow(params.id).setId);
                    // axios call here
                    api.updateRows([{
                        id: params.id,
                        _action: 'delete'
                    }]);
                };

                return <IconButton onClick={() => {
                            removeSetFromUserFavorites()
                        }}>
                            <UpdateIcon/>
                    </IconButton>;
            }
        },
        {field: "deleteSet",
            headerName: " ",
            sortable: false,
            width: 50,
            renderCell: (params) => {
                const removeSetFromUserFavorites = () => {
                    const api: GridApi = params.api;
                    // This makes the ui hitch and prints errors after returning for some reason
                    // alert(JSON.stringify(api.getRow(params.id).setId));
                    console.log(api.getRow(params.id).setId);
                    // axios call here
                    api.updateRows([{
                        id: params.id,
                        _action: 'delete'
                    }]);
                };

                return <IconButton onClick={() => {
                            removeSetFromUserFavorites()
                        }}>
                            <DeleteIcon/>
                    </IconButton>;
            }
        }
    ]


    const rows = userCreatedSets.map((set: SetDocument, index: any) => (
            {
                id: index,
                setId: set.id,
                setName: set.setName,
                tags: set.tags.map((x) => (x.tagName)),
                isPublic: set.isPublic,
                views: set.views,
                plays: set.plays,
                studies: set.studies,
                favorites: set.favorites
            }
        )
    )

    return (
        <>
            <br/><br/>
            {userCreatedSets.length ?
                <DataGrid
                    columns={columns}
                    rows={rows}
                    autoHeight={true}
                    disableExtendRowFullWidth={true}
                    pagination={true}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
                :
                <Typography>
                    You haven't created any sets yet!
                </Typography>
            }
        </>
    )
};

export default UserSets;