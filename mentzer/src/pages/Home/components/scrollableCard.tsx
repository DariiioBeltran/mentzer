import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';

export interface ScrollableCardItem {
    name: string;
    children: string[];
}

export interface ScrollableCardProps {
    items: ScrollableCardItem[]
}

const ScrollableCard = ({ items }: ScrollableCardProps) => {
    if (!items) {
        return (<p>NOTHING HERE</p>)
    }

    return (
        <List
            sx={{
                width: '100%',
                borderTop: 1,
                borderBottom: 1,
                borderColor: "primary",
                position: 'relative',
                overflow: 'auto',
                mb: 2,
                maxHeight: 300,
                '& ul': { padding: 0 },
            }}
            subheader={<li />}
        >
            {items.map((item, idx) => {
                return (
                    <li key={`section-${item.name}`}>
                        <ul>
                            <p style={{ fontWeight: "bold", marginBottom: "2px", marginLeft: "12px" }}>{item.name}</p>

                            {item.children && item.children.map((child) => (
                                <ListItem key={`item-${item.name}-${idx}`} sx={{ py: 0.25, pl: 4 }}>{child}</ListItem>
                            ))}
                            <Divider />
                        </ul>
                    </li>
                )
            })}
        </List>
    )
}

export default ScrollableCard;