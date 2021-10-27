import { Card, CardContent, CardHeader, Typography } from "@mui/material";

export default function CovidCards({ title, total, cases, onClick }) {
    return (
        <Card sx={{ width: "-webkit-fill-available" }} onClick={(e) => onClick()}>
            <CardContent>
                <Typography color="textSecondary">
                    {title}
                </Typography>
                <Typography variant="h6">
                    {total}
                </Typography>
                <Typography color="textSecondary">
                    {cases} Total
                </Typography>
            </CardContent>
        </Card>
    )
};
