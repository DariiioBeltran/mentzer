import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';

export interface ScrollableCardItem {
    id: number;
    name: string;
    children: string[];
}

export interface ScrollableCardProps {
    baseUrl: string;
    items: ScrollableCardItem[]
}

const ScrollableCard = ({ baseUrl, items }: ScrollableCardProps) => {
    const theme = useTheme();
    if (!items) {
        return (<p>NOTHING HERE</p>)
    }

    return (
        <Box
            display="flex"
            flexDirection="row"
            sx={{
                height: 1,
                flexGrow: 1,
                overflow: "auto"
            }}
        >
            <List
                sx={{
                    width: '100%',
                    borderTop: 1,
                    borderBottom: 1,
                    borderColor: theme.palette.primary.main,
                    position: 'relative',
                    overflow: 'auto',
                    mb: 2,
                    '& ul': { padding: 0 },
                }}
                subheader={<li />}
            >
                {items.map((item, idx) => {
                    return (
                        <li key={`section-${item.name}-${idx}`}>
                            <ul>
                                <Link to={`/${baseUrl}/${item.id}`}>
                                    <p style={{ fontWeight: "bold", marginBottom: "2px", marginLeft: "12px", color: theme.palette.primary.main }}>
                                        {item.name}
                                    </p>
                                </Link>

                                {item.children && item.children.map((child, idx2) => (
                                    <ListItem key={`item-${item.name}-${idx}-${child}-${idx2}`} sx={{ py: 0.25, pl: 4, color: theme.palette.primary.main }}>{child}</ListItem>
                                ))}
                                <Divider />
                            </ul>
                        </li>
                    )
                })}
            </List>
        </Box>
    )
}

export default ScrollableCard;