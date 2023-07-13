import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';

const ContentList = (props) => {
    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <nav aria-label='pages'>
                <List
                    subheader={
                        <ListSubheader component='div'>
                            {props.header}
                        </ListSubheader>
                    }
                >
                    {props.children}
                </List>
            </nav>
        </Box>
    );
};

export default ContentList;
